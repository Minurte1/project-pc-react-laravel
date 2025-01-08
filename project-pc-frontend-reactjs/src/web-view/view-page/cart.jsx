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
import imageErr from "../../assets/images/no_image_available.png"; // Hình ảnh lỗi
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
  const [tongTienGioHang, setTongTienGioHang] = useState(0);
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
        `http://localhost:8000/api/cart/${userInfo.MA_TK}`
      );

      setCartItems(response.data.data);
      setTongTienGioHang(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleRemoveProducts = async (PRODUCT_ID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cart/${userInfo.MA_TK}/remove/${PRODUCT_ID}`
      );

      enqueueSnackbar(response.data.message, { variant: "info" });
      fetchCartItems();
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const updateQuantity = async (productId, action) => {
    try {
      if (action === "add") {
        await axios.post(`http://localhost:8000/api/cart/update`, {
          MA_KH: userInfo.MA_TK,
          MASP: productId,
          CHANGE: 1, // Giảm bớt 1
        });
      } else {
        await axios.post(`http://localhost:8000/api/cart/update`, {
          MA_KH: userInfo.MA_TK,
          MASP: productId,
          CHANGE: -1, // Giảm bớt 1
        });
      }
      fetchCartItems();
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật số lượng", { variant: "error" });
    }
  };

  const handleClicknavigate = () => {
    navigate("/cart-thanh-toan");
  };

  console.log("cart ", cartItemsdata);
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, marginTop: "100px", minHeight: "700px" }}
    >
      <Typography variant="h4" gutterBottom>
        Giỏ hàng
      </Typography>

      {cartItemsdata.length > 0 ? (
        cartItemsdata.map((item, index) => (
          <Card key={index} sx={{ display: "flex", mb: 2, p: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 150, objectFit: "contain" }}
              image={
                item.ANHSP
                  ? `http://localhost:8000/images/${item.ANHSP}`
                  : imageErr
              }
              alt={item.TENSP}
            />
            <Box
              sx={{ display: "flex", flexDirection: "column", flex: 1, ml: 2 }}
            >
              <CardContent>
                <Typography variant="h6">{item.TENSP}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Mã SP: {item.MASP}
                </Typography>
                <Typography variant="body1">
                  Giá: {parseInt(item.DON_GIA).toLocaleString()}đ
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton
                    onClick={() => updateQuantity(item.MASP, "remove")}
                    disabled={item.SO_LUONG_SP <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{item.SO_LUONG_SP}</Typography>
                  <IconButton
                    onClick={() => updateQuantity(item.MASP, "add")}
                    disabled={item.SO_LUONG_SP >= item.TON_KHO_SP}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveProducts(item.MASP)}
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
                {parseInt(item.THANH_TIEN).toLocaleString()}đ
              </Typography>
            </Box>
          </Card>
        ))
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          Giỏ hàng của bạn hiện tại đang rỗng
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          Tổng tiền: {tongTienGioHang?.toLocaleString()}đ
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
