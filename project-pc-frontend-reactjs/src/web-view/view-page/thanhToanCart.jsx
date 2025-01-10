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

import imageErr from "../../assets/images/no_image_available.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCart } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav2 from "../../share-view/Nav2";
const CartThanhToan = () => {
  const [cartItemsdata, setCartItems] = useState([]);
  const [totalAmountdata, setTotalAmount] = useState(0);
  const api = process.env.REACT_APP_URL_SERVER;
  const [tongTienGioHang, setTongTienGioHang] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    MaKH: 4,
    DiaChiShip: "",
    SdtShip: "",
    NgayDatHang: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    GhiChu: "",
    ChiTietHoaDon: cartItemsdata,
  });

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

      setFormData((prevFormData) => ({
        ...prevFormData,
        MaKH: userInfo.MA_TK,
        ChiTietHoaDon: response.data.data,
      }));

      setCartItems(response.data.data);
      setTongTienGioHang(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific form field
    }));
  };
  const handleThanhToanCart = async () => {
    // Validate form data
    if (!formData.DiaChiShip.trim()) {
      enqueueSnackbar("Địa chỉ giao hàng không được để trống!", {
        variant: "error",
      });
      return;
    }

    if (!formData.SdtShip.trim()) {
      enqueueSnackbar("Số điện thoại không được để trống!", {
        variant: "error",
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.SdtShip)) {
      enqueueSnackbar("Số điện thoại phải gồm 10 chữ số hợp lệ!", {
        variant: "error",
      });
      return;
    }

    if (formData.ChiTietHoaDon.length === 0) {
      enqueueSnackbar("Giỏ hàng của bạn đang trống!", { variant: "error" });
      return;
    }

    // Nếu tất cả hợp lệ, tiếp tục xử lý
    try {
      const response = await axios.post(
        `http://localhost:8000/api/cart/checkout`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Checkout completed successfully.") {
        enqueueSnackbar("Đơn hàng của bạn đã được ghi nhận !!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response.data.message, { variant: "info" });
      }
      navigate("/cart");
    } catch (error) {
      console.error("Error fetching cart:", error);
      enqueueSnackbar("Đã có lỗi xảy ra khi thanh toán. Vui lòng thử lại!", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Nav2 />
      <div id="yourFormId">
        <div className="muahang-container">
          <div className="container-setup">
            <div className="muahang-giay-info">
              <div className="muahang-form">
                <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
                <label className="muahang-label">
                  <input
                    type="text"
                    name="HoTen" // Use a meaningful name
                    className="muahang-input hoten"
                    placeholder="Họ và tên"
                    required
                  />
                  {/* <input
                    type="hidden"
                    name="SoLuong" // Use a meaningful name
                    value={soLuong}
                  /> */}
                </label>
                <br />
                <label className="muahang-label">
                  <input
                    type="text"
                    className="muahang-input muahang-sdt"
                    placeholder="Số điện thoại"
                    name="SdtShip"
                    value={formData.SdtShip}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label className="muahang-label">
                  <input
                    type="text"
                    name="DiaChiShip"
                    value={formData.DiaChiShip}
                    onChange={handleInputChange}
                    className="muahang-input muahang-sonha"
                    placeholder="Số nhà và tên đường"
                    required
                  />
                </label>
                <br />
                {/* <label className="muahang-label">
                  <input
                    type="text"
                    className="muahang-input"
                    placeholder="Ghi chú"
                    name="GhiChu"
                    value={formData.GhiChu}
                    onChange={handleInputChange}
                  />
                </label> */}
                <p className="thanhtoan">Hình thức thanh toán khi nhận hàng</p>
              </div>
            </div>
            <div className="muahang-customer-info">
              <div className="hr-xoaydoc"></div>
              <div className="thongtin-sanpham">
                {cartItemsdata.map((item, index) => {
                  const productPrice = parseInt(item.DON_GIA); // Lấy giá sản phẩm
                  const quantity = item.SO_LUONG_SP; // Lấy số lượng sản phẩm
                  const subTotal = productPrice * quantity; // Tính tổng tạm tính cho sản phẩm
                  const shippingFee = subTotal * 0.01; // Tính phí vận chuyển (1% của tổng tạm tính)
                  const total = subTotal + shippingFee; // Tính tổng cộng (tạm tính + phí vận chuyển)

                  return (
                    <div
                      key={index}
                      className="thongtin-sanpham_2"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span className="discount-bannerr">{quantity}</span>
                      <img
                        src={
                          item.ANHSP
                            ? `http://localhost:8000/images/${item.ANHSP}` // Hiển thị ảnh sản phẩm nếu có
                            : imageErr // Nếu không có ảnh, sử dụng ảnh lỗi
                        }
                        className="sanpham-img"
                        alt={item.TENSP} // Tên sản phẩm
                      />
                      <span className="sanpham-name">{item.TENSP}</span>{" "}
                      {/* Tên sản phẩm */}
                      <div
                        className="muahang-tamtinh"
                        style={{ textAlign: "right" }}
                      >
                        <span className="muahang-tamtinh1">Tạm tính</span>
                        <span className="sanpham-price">
                          {subTotal.toLocaleString()} VND{" "}
                          {/* Hiển thị tạm tính */}
                        </span>
                      </div>
                      {/* <div className="muahang-phivanchuyen">
                        <span className="muahang-phivanchuyen-label">
                          Phí vận chuyển và lắp ráp:{" "}
                        </span>
                        <span className="muahang-phivanchuyen-value">
                          {shippingFee.toLocaleString()} VND{" "}
                         
                        </span>
                      </div> */}
                      <hr />
                      {/* <div className="muahang-tongcong">
                        <span>Tổng cộng</span>
                        <span className="sanpham-price">
                          {total.toLocaleString()} VND{" "}
                    
                        </span>
                      </div> */}
                    </div>
                  );
                })}
                <hr />
                <div className="muahang-tongcong">
                  <span>Tổng giỏ hàng</span>
                  <span className="sanpham-price">
                    {cartItemsdata
                      .reduce((acc, item) => {
                        const productPrice = parseInt(item.DON_GIA);
                        const quantity = item.SO_LUONG_SP;
                        const subTotal = productPrice * quantity;
                        const shippingFee = subTotal * 0.01;
                        return acc + subTotal + shippingFee;
                      }, 0)
                      .toLocaleString()}{" "}
                    VND
                  </span>
                </div>{" "}
                <button
                  onClick={handleThanhToanCart}
                  className="muahang-button"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartThanhToan;
