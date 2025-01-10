import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DonHang_DaHuy_User = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Lấy danh sách đơn hàng khi component được mount
  useEffect(() => {
    if (userInfo) {
      fetchOrders();
    } else {
      navigate("/login");
    }
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/orders/cancel/${userInfo.MA_TK}`
      ); // Đảm bảo URL đúng với API của bạn
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Mở modal xem chi tiết đơn hàng
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom mt={2}>
        Đơn hàng đã hủy
      </Typography>

      {/* Hiển thị danh sách đơn hàng */}
      {orders.map((order) => (
        <Card key={order.MAHD} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Đơn hàng #{order.MAHD}</Typography>
            <Typography variant="body2">
              Người dùng: {order.TEN_KHACH_HANG || "Không xác định"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  order.GHI_CHU_HOA_DON === "Đơn thanh toán thành công"
                    ? "#4ca944"
                    : order.GHI_CHU_HOA_DON === "Đơn hàng đã hủy"
                    ? "#ff0033"
                    : "#cca70b",
              }}
            >
              Trạng thái: {order.GHI_CHU_HOA_DON || "Chưa cập nhật"}
            </Typography>
            <Typography variant="body2">
              Tổng tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                order.products.reduce(
                  (acc, product) => acc + product.DON_GIA * product.SO_LUONG,
                  0
                )
              )}
            </Typography>
            {order.GHI_CHU_HOA_DON === "Đang chờ thanh toán" ? <></> : null}
            <Button
              onClick={() => handleOpenModal(order)}
              variant="outlined"
              sx={{ marginTop: 1, ml: 2 }}
            >
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          {selectedOrder && (
            <div>
              <Typography variant="h5" gutterBottom>
                Chi Tiết Đơn Hàng #{selectedOrder.MAHD}
              </Typography>

              <Typography variant="h6">Thông tin người dùng:</Typography>
              <Typography variant="body1">
                Tên: {selectedOrder.TEN_KHACH_HANG || "Không xác định"}
              </Typography>
              <Typography variant="body1">
                Email: {selectedOrder.TEN_DANG_NHAP || "Không xác định"}
              </Typography>
              <Typography variant="body1">
                SĐT: {selectedOrder.SDT_KH || "Không xác định"}
              </Typography>
              <Typography variant="body1">
                Địa chỉ: {selectedOrder.DIA_CHI || "Không xác định"}
              </Typography>

              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Sản phẩm trong đơn hàng:
              </Typography>
              <Grid container spacing={2}>
                {/* Duyệt qua các sản phẩm trong đơn hàng */}
                {selectedOrder.products?.map((item) => (
                  <Grid item xs={12} md={6} key={item.MASP}>
                    <Card sx={{ padding: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="body1">
                            Mã sản phẩm: {item.MASP}
                          </Typography>
                          <Typography variant="body1">
                            Tên sản phẩm: {item.TENSP}
                          </Typography>
                          <Typography variant="body1">
                            Số lượng: {item.SO_LUONG}
                          </Typography>
                          <Typography variant="body1">
                            Giá:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.DON_GIA)}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Mô tả: {item.GHI_CHU_SP || "Không có mô tả"}
                          </Typography>
                        </Box>
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={`${api}/images/${item.ANHSP}`}
                          alt={item.TENSP}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

// Styles for modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 4,
  borderRadius: 2,
  boxShadow: 24,
  maxWidth: "80%",
  overflowY: "auto",
};

export default DonHang_DaHuy_User;
