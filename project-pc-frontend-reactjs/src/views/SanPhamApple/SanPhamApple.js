import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageErr from "../../assets/images/no_image_available.png"; // Hình ảnh lỗi
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";

const SanPhamApple = () => {
  const [data, setData] = useState([]); // Thay đổi từ null thành mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sanpham");
      console.log("response.data.data: ", response.data.data);
      if (response.status !== 200) {
        alert("Yêu cầu không thành công");
      } else {
        setData(response.data.data); // Lấy dữ liệu từ response
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewSanPham = (SanPham) => {
    navigate(`/SanPham/${SanPham.MASP}`); // Đảm bảo gọi đúng mã sản phẩm
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };
  // THÊM VÀO GIỎ HÀNG
  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        MASP: item.MASP,
        MA_KH: userInfo.MA_TK, // ID người dùng
        CHANGE: 1,
      };

      const response = await axios.post(
        `http://localhost:8000/api/cart/update`,
        payload
      );

      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.message, { variant: "error" });
    } finally {
    }
  };
  const filteredData =
    data &&
    data.length > 0 &&
    data
      .filter((item) =>
        item.TENSP
          ? item.TENSP.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
      .filter((item) =>
        priceFilter === "0"
          ? item.DON_GIA > 0
          : priceFilter === "10000000"
          ? item.DON_GIA < 10000000
          : priceFilter === "20000000"
          ? item.DON_GIA < 20000000 && item.DON_GIA >= 10000000
          : priceFilter === "30000000"
          ? item.DON_GIA > 20000000
          : true
      );

  const sortedData =
    filteredData &&
    filteredData.length > 0 &&
    filteredData.sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return order * (Number(a.DON_GIA) - Number(b.DON_GIA)); // Chuyển đổi giá thành số
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative">
      <div className="container-bottom">
        <div className="tieude">
          <h1>Danh Sách Sản Phẩm</h1>
        </div>
        <div className="Searchfillter">
          <div className="container_TimKiem">
            <label className="TimKiem_label">
              <b>Tìm kiếm</b>
            </label>
            <input
              className="TimKiem_input TimKiem_input-hover-green"
              placeholder="tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="fillter_TimKiem">
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="0"
                checked={priceFilter === "0"}
                onChange={() => handlePriceFilterChange("0")}
              />
              Tất cả
              <span className="checkmark"></span>
            </label>
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="10000000"
                checked={priceFilter === "10000000"}
                onChange={() => handlePriceFilterChange("10000000")}
              />
              Dưới 10 Triệu
              <span className="checkmark"></span>
            </label>
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="20000000"
                checked={priceFilter === "20000000"}
                onChange={() => handlePriceFilterChange("20000000")}
              />
              Từ 10 triệu đến 20 triệu
              <span className="checkmark"></span>
            </label>
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="30000000"
                checked={priceFilter === "30000000"}
                onChange={() => handlePriceFilterChange("30000000")}
              />
              Trên 20 triệu
              <span className="checkmark"></span>
            </label>
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="asc"
                checked={priceFilter === "0" && sortOrder === "asc"}
                onChange={() => {
                  handlePriceFilterChange("0");
                  handleSortChange();
                }}
              />
              Giá tăng dần
              <span className="checkmark"></span>
            </label>
            <label className="container_InputRadio_TimKiem">
              <input
                type="radio"
                name="priceFilter"
                value="desc"
                checked={priceFilter === "0" && sortOrder === "desc"}
                onChange={() => {
                  handlePriceFilterChange("0");
                  handleSortChange();
                }}
              />
              Giá giảm dần
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <ul className="products">
          {sortedData &&
            sortedData.length > 0 &&
            sortedData.map((item, index) => (
              <li key={index}>
                <div className="product-top">
                  <a
                    onClick={() => handleViewSanPham(item)}
                    className="product-thumb"
                  >
                    <img
                      src={
                        item.ANHSP
                          ? `http://localhost:8000/images/${item.ANHSP}`
                          : imageErr
                      }
                      alt={item.TENSP || "Sản phẩm"}
                      onError={(e) => {
                        e.target.src = imageErr; // Chuyển sang ảnh lỗi nếu không tải được
                      }}
                    />
                  </a>
                  <a onClick={() => handleViewSanPham(item)} className="mua">
                    Mua
                  </a>
                </div>
                <div className="product-info">
                  <a
                    onClick={() => handleViewSanPham(item)}
                    className="product-TheLoai"
                  >
                    {item.NHA_SAN_XUAT} {/* Cập nhật đúng tên trường */}
                  </a>
                  <a
                    onClick={() => handleViewSanPham(item)}
                    className="product-name"
                  >
                    {item.TENSP} {/* Cập nhật đúng tên trường */}
                  </a>
                  <div className="product-price">
                    {Number(item.DON_GIA).toLocaleString()} VND{" "}
                    {/* Đảm bảo giá là số */}
                  </div>{" "}
                  {/* Thêm icon giỏ hàng */}
                  <div className="add-to-cart">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="cart-btn"
                    >
                      <i className="fas fa-shopping-cart"></i>{" "}
                      {/* Icon giỏ hàng */}
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SanPhamApple;
