import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ChiTietSanPham.scss";

import Nav2 from "../../share-view/Nav2";
import Footer from "../../share-view/Footer";
import { Button } from "@mui/material";
const ChiTietSanPham = () => {
  const [sanPham, setSanPham] = useState({});
  const [soLuong, setSoLuong] = useState(1); // Số lượng mặc định là 1
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchSanPham();
  }, [id]);

  const fetchSanPham = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sanpham/${id}`
      );
      // console.log("response.data.data: ", response.data.data);
      setSanPham(response.data.data); // Sửa ở đây, không lấy phần tử đầu tiên
      setLoading(false);
    } catch (error) {
      console.log("Error fetching product details:", error);
      // Xử lý khi không tìm thấy sản phẩm, ví dụ: chuyển hướng đến trang 404
    }
  };

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10);
    if (!isNaN(enteredQuantity)) {
      const limitedQuantity = Math.min(enteredQuantity, sanPham.TON_KHO_SP);
      setSoLuong(limitedQuantity);
    } else {
      alert("Vượt quá số lượng tồn kho !!!");
      console.error("Please enter a valid quantity.");
    }
  };

  const handlePurchase = () => {
    if (soLuong > sanPham.TON_KHO_SP) {
      alert("Số lượng mua vượt quá số lượng tồn kho.");
      return;
    }
    // Chuyển hướng đến trang mua hàng
    navigate(`/MuaHang/${sanPham.MASP}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Nav2 />
          <div className="container_ChiTietSanPham">
            <div className="product-info_ChiTietSanPham">
              <form className="form_ChiTietSanPham">
                <div className="product-image_ChiTietSanPham">
                  <img
                    className="image_ChiTietSanPham"
                    src={sanPham.imageUrl} // Sử dụng URL hình ảnh đã tạo
                    alt={sanPham.TENSP} // Sử dụng tên sản phẩm cho alt
                  />
                </div>
                <div className="product-h3_ChiTietSanPham">
                  <h3 className="h3_ChiTietSanPham">{sanPham.TENSP}</h3>
                  <p className="product-prices_ChiTietSanPham">
                    {sanPham.DON_GIA} VND
                  </p>
                  <hr />
                  <p className="Con_Het_ChiTietSanPham">
                    {sanPham.TON_KHO_SP > 0 ? "Còn hàng" : "Hết hàng"}
                  </p>
                  <div className="SoLuongSanPham_ChiTietSanPham">
                    <label htmlFor="quantity">Số lượng:</label>
                    <input
                      className="soLuong_ChiTietSanPham"
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={soLuong}
                      onChange={handleQuantityChange}
                    />
                  </div>

                  <div>
                    <table className="table_ChiTietSanPham">
                      <tbody>
                        <tr>
                          <td colSpan="2">
                            <b>Cấu hình chi tiết</b>
                          </td>
                        </tr>

                        <tr className="table_tr_ChiTietSanPham">
                          <td>
                            <b>Chip</b>
                          </td>
                          <td>{sanPham.CHIP || "Không có thông tin"}</td>{" "}
                          {/* Hiển thị nếu không có thông tin */}
                        </tr>

                        <tr className="table_tr_ChiTietSanPham">
                          <td>
                            <b>Main</b>
                          </td>
                          <td>{sanPham.MAIN || "Không có thông tin"}</td>
                        </tr>

                        <tr className="table_tr_ChiTietSanPham">
                          <td>
                            <b>VGA</b>
                          </td>
                          <td>{sanPham.VGA || "Không có thông tin"}</td>
                        </tr>

                        <tr className="table_tr_ChiTietSanPham">
                          <td>
                            <b>Ram</b>
                          </td>
                          <td>{sanPham.RAM || "Không có thông tin"}</td>
                        </tr>

                        <tr className="table_tr_ChiTietSanPham">
                          <td>
                            <b>Tồn kho</b>
                          </td>
                          <td>{sanPham.TON_KHO_SP}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="product-h3_muahang_ChiTietSanPham">
                    {sanPham.TON_KHO_SP > 0 && (
                      <>
                        {" "}
                        <Link
                          to={{
                            pathname: `/MuaHang/${sanPham.MASP}`,
                            state: { soLuong },
                          }}
                          className="purchase-button_ChiTietSanPham"
                        >
                          Mua Hàng
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default ChiTietSanPham;
