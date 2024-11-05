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
    MaKH: "QuocBaoKH1",
    MaNV: "QuocBaoNV1",
    DiaChiShip: "",
    SdtShip: "",
    NgayDatHang: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    GhiChu: "",
    ChiTietHoaDon: [{ MaSP: 0, SoLuong: 1, GiamGia: 1 }],
  });

  useEffect(() => {
    // Fetch product details when component mounts or id/location.state changes
    if (location.state && location.state.soLuong) {
      setSoLuong(location.state.soLuong);
    }
    fetchProduct();
  }, [id, location.state]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sanpham/${id}`);
      console.log("response.data.data: ", response.data.data);
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

    // Ensure all required fields are filled
    if (!formData.MaKH || !formData.MaNV || !formData.DiaChiShip) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create-hoadon", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Đặt hàng thành công!");
        navigate("/"); // Redirect after successful order
      } else {
        throw new Error("Failed to create HoaDon");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create HoaDon");
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
                  <span className="muahang-phivanchuyen-label">Phí vận chuyển và lắp ráp: </span>
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