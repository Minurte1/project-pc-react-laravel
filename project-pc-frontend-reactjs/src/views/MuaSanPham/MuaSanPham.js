import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import "./MuaSanPham.scss"; // Import CSS

import Nav2 from "../../share-view/Nav2";

const MuaSanPham = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [sanPham, setSanPham] = useState({});
  const [soLuong, setSoLuong] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    MaKH: 1,
    DiaChiShip: "",
    SdtShip: "",
    NgayDatHang: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    GhiChu: "",
    ChiTietHoaDon: [{ MaSP: null, SoLuong: null, GiamGia: 1 }],
  });

  useEffect(() => {
    if (location.state && location.state.soLuong) {
      setSoLuong(location.state.soLuong);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      ChiTietHoaDon: [{ MaSP: id, SoLuong: soLuong, GiamGia: 1 }],
    }));

    fetchProduct();
  }, [id, location.state, soLuong]); // Thêm soLuong vào dependency

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sanpham/${id}`
      );
      // console.log("response.data.data: ", response.data.data);
      setSanPham(response.data.data || {});
      setLoading(false);
    } catch (error) {
      console.log("Error fetching product details:", error);
      setError("Không tìm thấy sản phẩm");
      setLoading(false); // Set loading to false even on error
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific form field
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      !formData.MaKH ||
      !formData.DiaChiShip ||
      !formData.SdtShip ||
      !formData.ChiTietHoaDon[0].MaSP
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      // Cập nhật formData nếu cần
      const updatedFormData = {
        ...formData,
        ChiTietHoaDon: [
          {
            MaSP: sanPham.MASP, // Gán mã sản phẩm từ sanPham
            SoLuong: soLuong,
            GiamGia: 1,
          },
        ],
      };

      console.log(updatedFormData); // Kiểm tra dữ liệu gửi đi

      const response = await axios.post(
        "http://localhost:8000/api/create-hoadon",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json", // Đảm bảo gửi dữ liệu dưới dạng JSON
          },
        }
      );

      if (response.status === 200) {
        alert("Đặt hàng thành công!");
        navigate("/"); // Điều hướng sau khi đặt hàng thành công
      } else {
        alert("Tạo hóa đơn thất bại");
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Error");
      navigate("/");
    }
  };

  const btnGiamGia = () => {
    alert("Sản phẩm không có chính sách giảm giá !!!");
  };

  // Render loading or error message if needed
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Nav2 />
      <form onSubmit={handleSubmit} id="yourFormId">
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
                  <input
                    type="hidden"
                    name="SoLuong" // Use a meaningful name
                    value={soLuong}
                  />
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
                <label className="muahang-label">
                  <input
                    type="text"
                    className="muahang-input"
                    placeholder="Ghi chú"
                    name="GhiChu"
                    value={formData.GhiChu}
                    onChange={handleInputChange}
                  />
                </label>
                <p className="thanhtoan">Hình thức thanh toán khi nhận hàng</p>
              </div>
            </div>

            <div className="muahang-customer-info">
              <div className="hr-xoaydoc"></div>
              <div className="thongtin-sanpham">
                <div className="thongtin-sanpham_2">
                  <span className="discount-bannerr">{soLuong}</span>
                  <img
                    src={`${sanPham.imageUrl}`} // Link ảnh
                    className="sanpham-img"
                    alt="san pham"
                  />
                  <span className="sanpham-name">{sanPham.TENSP}</span>
                </div>

                <label className="muahang-magiamgia1">
                  <input
                    type="text"
                    name="GiamGia" // Use a meaningful name
                    className="muahang-magiamhgia"
                    placeholder="Mã giảm giá (nếu có)"
                  />
                  <button
                    type="button"
                    className="muahang-xacnhan"
                    onClick={btnGiamGia}
                  >
                    Sử Dụng
                  </button>
                </label>

                <div className="muahang-tamtinh">
                  <span className="muahang-tamtinh1">Tạm tính</span>
                  {sanPham.DON_GIA ? (
                    <span className="sanpham-price">
                      {parseInt(sanPham.DON_GIA).toLocaleString()} VND
                    </span>
                  ) : (
                    <span className="sanpham-price">Giá không xác định</span>
                  )}
                </div>
                <div className="muahang-phivanchuyen">
                  <span className="muahang-phivanchuyen-label">
                    Phí vận chuyển và lắp ráp:{" "}
                  </span>
                  <span className="muahang-phivanchuyen-value">
                    {(parseInt(sanPham.DON_GIA) * 0.01).toLocaleString()} VND
                  </span>
                </div>
                <hr />
                <div className="muahang-tongcong">
                  <span>Tổng cộng</span>
                  {sanPham.DON_GIA ? (
                    <span className="sanpham-price">
                      {(
                        parseInt(sanPham.DON_GIA) * soLuong +
                        parseInt(sanPham.DON_GIA) * soLuong * 0.01
                      ).toLocaleString()}{" "}
                      VND
                    </span>
                  ) : (
                    <span className="sanpham-price">Giá không xác định</span>
                  )}
                </div>
                <button
                  type="submit" // Change to submit
                  className="muahang-button"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MuaSanPham;
