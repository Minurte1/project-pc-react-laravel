import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Divider,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCart } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const [cartItemsdata, setCartItems] = useState([]);
  const [totalAmountdata, setTotalAmount] = useState(0);
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      enqueueSnackbar("Vui lòng đăng nhập để xem giỏ hàng", {
        variant: "info",
      });
    }
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${api}/gio-hang/use/cart-user/${userInfo.USER_ID}`
      );

      setCartItems(response.data.DT);
      setTotalAmount(response.data.TOTAL_AMOUNT);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const handleRemoveProducts = async (PRODUCT_ID) => {
    try {
      const response = await axios.post(`${api}/gio-hang/remove-products/`, {
        USER_ID: userInfo.USER_ID,
        PRODUCT_ID: PRODUCT_ID,
      });
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const updateQuantity = async (productId, action) => {
    try {
      if (action === "add") {
        await axios.post(`${api}/gio-hang/add-single`, {
          USER_ID: userInfo.USER_ID,
          PRODUCT_ID: productId,
        });
      } else {
        await axios.post(`${api}/gio-hang/remove-single`, {
          USER_ID: userInfo.USER_ID,
          PRODUCT_ID: productId,
        });
      }
      fetchCartItems();
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật số lượng", { variant: "error" });
    }
  };
  const calculateItemTotal = (price, quantity) => {
    const numPrice = Number(price) || 0;
    const numQuantity = Number(quantity) || 0;
    return (numPrice * numQuantity).toLocaleString();
  };

  const handleClicknavigate = () => {
    navigate("/xacnhanthanhtoan", {
      state: {
        cartItemsdata,
      },
    });
  };

  const totalAmount = cartItemsdata.reduce(
    (total, item) => total + (item.QUANTITY || 0) * item.PRODUCT_PRICE,
    0
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Giỏ hàng
      </Typography>

      {cartItemsdata.map((item) => (
        <Card key={item.CART_ID} sx={{ display: "flex", mb: 2, p: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 150, objectFit: "contain" }}
            image={`${api}/images/${item.IMAGE_URL}`}
            alt={item.NAME}
          />

          <Box
            sx={{ display: "flex", flexDirection: "column", flex: 1, ml: 2 }}
          >
            <CardContent>
              <Typography variant="h6">{item.NAME}</Typography>
              <Typography variant="body2" color="text.secondary">
                Mã SP: {item.PRODUCT_ID}
              </Typography>
              <Typography variant="body1">
                Giá: {parseInt(item.PRODUCT_PRICE).toLocaleString()}đ
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton
                  onClick={() => updateQuantity(item.PRODUCT_ID, "remove")}
                  disabled={item.QUANTITY <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{item.QUANTITY}</Typography>
                <IconButton
                  onClick={() => updateQuantity(item.PRODUCT_ID, "add")}
                  disabled={item.QUANTITY >= item.SOLUONG_KHO}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemoveProducts(item.PRODUCT_ID)}
                  color="error"
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
            <Typography variant="h6">
              {calculateItemTotal(item.PRODUCT_PRICE, item.QUANTITY)}đ
            </Typography>
          </Box>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          Tổng tiền: {totalAmount?.toLocaleString()}đ
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => handleClicknavigate()}
        >
          Thanh toán
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
