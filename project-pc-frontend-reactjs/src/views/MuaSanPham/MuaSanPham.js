import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import "./MuaSanPham.scss"; // Import tệp CSS

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
    if (location.state && location.state.soLuong) {
      fetchProduct();
      setSoLuong(location.state.soLuong);
    }
  }, [id, location.state]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sanpham/${id}`
      );
      setSanPham(response.data.data || {});
      console.log("response.data.data", response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Không tìm thấy sản phẩm");
    }
  };
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedChiTietHoaDon = [...formData.ChiTietHoaDon];
    updatedChiTietHoaDon[index][name] = value;

    setFormData((prevState) => ({
      ...prevState,
      ChiTietHoaDon: updatedChiTietHoaDon,
    }));
  };
  console.log("sanPham", sanPham);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.MaKH ||
      !formData.MaNV ||
      !formData.DiaChiShip ||
      formData.ChiTietHoaDon.length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/create-hoadon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Đặt hàng thành công!");
        navigate("/");
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

  return (
    <>
      <Nav2 />
      <form onSubmit={handleSubmit} id="yourFormId">
        {formData.ChiTietHoaDon.map((item, index) => (
          <div className="muahang-container" key={index}>
            <div className="container-setup">
              <div className="muahang-giay-info">
                <div className="muahang-form">
                  <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
                  <label className="muahang-label">
                    <input
                      type="text"
                      name="name"
                      className="muahang-input hoten"
                      placeholder="Họ và tên"
                    />
                    <input
                      type="text"
                      name="SoLuong"
                      hidden
                      value={soLuong}
                      onChange={(e) => setSoLuong(e.target.value)}
                    />
                  </label>
                  <br />
                  <label className="muahang-label">
                    <input
                      type="text"
                      className="muahang-input muahang-sdt"
                      placeholder="Số điện thoại "
                      name="SdtShip"
                      value={formData.SdtShip}
                      onChange={(e) =>
                        setFormData({ ...formData, SdtShip: e.target.value })
                      }
                    />
                  </label>
                  <label className="muahang-label">
                    <input
                      type="text"
                      name="DiaChiShip"
                      value={formData.DiaChiShip}
                      onChange={(e) =>
                        setFormData({ ...formData, DiaChiShip: e.target.value })
                      }
                      className="muahang-input muahang-sonha"
                      placeholder="Số nhà và tên đường"
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
                      onChange={(e) =>
                        setFormData({ ...formData, GhiChu: e.target.value })
                      }
                    />
                  </label>
                  <p className="thanhtoan">
                    Hình thức thanh toán khi nhân hàng
                  </p>
                </div>
              </div>

              <div className="muahang-customer-info">
                <div className="hr-xoaydoc"></div>
                <div className="thongtin-sanpham">
                  <div className="thongtin-sanpham_2">
                    <span className="discount-bannerr">{soLuong}</span>
                    <img
                      src={`http://localhost:8000/api/image/${sanPham.AnhSP}`}
                      className="sanpham-img"
                      alt="san pham"
                    ></img>
                    <span className="sanpham-name">{sanPham.TenSP}</span>
                  </div>

                  <label className="muahang-magiamgia1">
                    <input
                      type="text"
                      name="GiamGia"
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
                    {sanPham.DonGiaSP ? (
                      <span className="sanpham-price">
                        {sanPham.DonGiaSP.toLocaleString()} VND
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
                      {(sanPham.DonGiaSP * 0.01).toLocaleString()} VND
                    </span>
                  </div>
                  <hr></hr>
                  <div className="muahang-tongcong">
                    <span>Tổng cộng</span>
                    {sanPham.DonGiaSP ? (
                      <span className="sanpham-price">
                        {(
                          sanPham.DonGiaSP * soLuong +
                          sanPham.DonGiaSP * soLuong * 0.01
                        ).toLocaleString()}{" "}
                        VND
                      </span>
                    ) : (
                      <span className="sanpham-price">Giá không xác định</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="muahang-button"
                    onClick={handleSubmit}
                  >
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default MuaSanPham;
