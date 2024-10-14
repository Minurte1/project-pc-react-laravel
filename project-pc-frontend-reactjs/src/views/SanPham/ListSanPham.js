import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListSanPham.scss";
import imageErr from "../../assets/images/Kothayanh.jpg";

const ListSanPham = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sanpham", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Yêu cầu không thành công");
      }
      const jsonResponse = await response.json();
      setData(jsonResponse.data);
      setLoading(false);
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
    navigate(`/SanPham/${SanPham.MaSP}`);
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
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) =>
        priceFilter === "0"
          ? item.DonGiaSP > 0
          : priceFilter === "10000000"
          ? item.DonGiaSP < 10000000
          : priceFilter === "20000000"
          ? item.DonGiaSP < 20000000 && item.DonGiaSP >= 10000000
          : priceFilter === "30000000"
          ? item.DonGiaSP > 20000000
          : true
      );

  const sortedData =
    filteredData &&
    filteredData.length > 0 &&
    filteredData.sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return order * (a.DonGiaSP - b.DonGiaSP);
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
      </div>
    </div>
  );
};

export default ListSanPham;
