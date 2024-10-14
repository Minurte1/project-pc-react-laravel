import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SanPhamDesktop.scss";

import imageErr from "../../assets/images/Kothayanh.jpg";
import CookiesAxios from "../../services/CookiesAxios";
import Nav2 from "../../share-view/Nav2";
import Footer from "../../share-view/Footer";

const SanPhamDesktop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("0");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await CookiesAxios.get(
        "http://localhost:8000/api/sanphamDesktop",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setData(response.data.data || []); // Dữ liệu nằm trong response.data.data
    } catch (error) {
      console.error(error);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewSanPham = (SanPham) => {
    navigate(`/SanPham/${SanPham.MaSP}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredData = data
    .filter((item) =>
      item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (priceFilter === "0") return true; // Tất cả
      if (priceFilter === "10000000") return item.DonGiaSP < 10000000;
      if (priceFilter === "20000000")
        return item.DonGiaSP >= 10000000 && item.DonGiaSP < 20000000;
      if (priceFilter === "30000000") return item.DonGiaSP > 20000000;
      return true;
    });

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return order * (a.DonGiaSP - b.DonGiaSP);
  });

  return (
    <>
      <Nav2 />
      <div className="relative">
        <div className="container-bottom">
          <div className="tieude">
            <h1>Danh Sách Desktop</h1>
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

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : sortedData.length > 0 ? (
            <ul className="products">
              {sortedData.map((item, index) => (
                <li key={index}>
                  <div className="product-top">
                    <a
                      onClick={() => handleViewSanPham(item)}
                      className="product-thumb"
                    >
                      <img
                        src={`http://localhost:8000/api/image/${item.AnhSP}`}
                        alt={item.TenSP}
                        onError={(e) => {
                          e.target.src = imageErr;
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
                      {item.NhanSanXuat}
                    </a>
                    <a
                      onClick={() => handleViewSanPham(item)}
                      className="product-name"
                    >
                      {item.TenSP}
                    </a>
                    <div className="product-price">
                      {item.DonGiaSP.toLocaleString()} VND
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>Không có sản phẩm nào.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SanPhamDesktop;
