import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListSanPham.scss";
import imageErr from "../../assets/images/no_image_available.png"; // Hình ảnh lỗi
import axios from "axios";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ListSanPham = () => {
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
                ? item.DON_GIA < 30000000 && item.DON_GIA >= 20000000
                : priceFilter === "40000000"
                  ? item.DON_GIA < 40000000 && item.DON_GIA >= 30000000
                  : priceFilter === "50000000"
                    ? item.DON_GIA < 100000000 && item.DON_GIA >= 40000000  // Từ 40 triệu đến 100 triệu
                    : priceFilter === "100000000"
                      ? item.DON_GIA >= 100000000 // Trên 100 triệu
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
          <div className="container_TimKiem mb-3">
            <label className="form-label">
              <b>Tìm kiếm</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="fillter_TimKiem mx-3">
            {/* Lọc Tất cả */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="0"
                checked={priceFilter === "0"}
                onChange={() => handlePriceFilterChange("0")}
                id="all"
              />
              <label className="form-check-label" htmlFor="all">
                Tất cả
              </label>
            </div>

            {/* Lọc Dưới 10 Triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="10000000"
                checked={priceFilter === "10000000"}
                onChange={() => handlePriceFilterChange("10000000")}
                id="under10M"
              />
              <label className="form-check-label" htmlFor="under10M">
                Dưới 10 Triệu
              </label>
            </div>

            {/* Lọc Từ 10 triệu đến 20 triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="20000000"
                checked={priceFilter === "20000000"}
                onChange={() => handlePriceFilterChange("20000000")}
                id="10to20M"
              />
              <label className="form-check-label" htmlFor="10to20M">
                Từ 10 triệu đến 20 triệu
              </label>
            </div>

            {/* Lọc Từ 20 triệu đến 30 triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="30000000"
                checked={priceFilter === "30000000"}
                onChange={() => handlePriceFilterChange("30000000")}
                id="20to30M"
              />
              <label className="form-check-label" htmlFor="20to30M">
                Từ 20 triệu đến 30 triệu
              </label>
            </div>

            {/* Lọc Từ 30 triệu đến 40 triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="40000000"
                checked={priceFilter === "40000000"}
                onChange={() => handlePriceFilterChange("40000000")}
                id="30to40M"
              />
              <label className="form-check-label" htmlFor="30to40M">
                Từ 30 triệu đến 40 triệu
              </label>
            </div>

            {/* Lọc Từ 40 triệu đến 100 triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="50000000"
                checked={priceFilter === "50000000"}
                onChange={() => handlePriceFilterChange("50000000")}
                id="40to100M"
              />
              <label className="form-check-label" htmlFor="40to100M">
                Từ 40 triệu đến 100 triệu
              </label>
            </div>

            {/* Lọc Trên 100 triệu */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="100000000"
                checked={priceFilter === "100000000"}
                onChange={() => handlePriceFilterChange("100000000")}
                id="above100M"
              />
              <label className="form-check-label" htmlFor="above100M">
                Trên 100 triệu
              </label>
            </div>

            {/* Lọc Giá tăng dần */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="asc"
                checked={priceFilter === "0" && sortOrder === "asc"}
                onChange={() => {
                  handlePriceFilterChange("0");
                  handleSortChange();
                }}
                id="priceAsc"
              />
              <label className="form-check-label" htmlFor="priceAsc">
                Giá tăng dần
              </label>
            </div>

            {/* Lọc Giá giảm dần */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="priceFilter"
                value="desc"
                checked={priceFilter === "0" && sortOrder === "desc"}
                onChange={() => {
                  handlePriceFilterChange("0");
                  handleSortChange();
                }}
                id="priceDesc"
              />
              <label className="form-check-label" htmlFor="priceDesc">
                Giá giảm dần
              </label>
            </div>
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
                  </div>
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

export default ListSanPham;
