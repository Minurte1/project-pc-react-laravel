import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss";

const Test = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const filteredData =
    data &&
    data.length > 0 &&
    data
      .filter((item) =>
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => {
        if (priceFilter === "0") return item.DonGiaSP > 0;
        if (priceFilter === "10000000") return item.DonGiaSP < 10000000;
        if (priceFilter === "20000000") {
          return item.DonGiaSP < 20000000 && item.DonGiaSP >= 10000000;
        }
        if (priceFilter === "30000000") return item.DonGiaSP > 20000000;
        return true;
      });

  return (
    <div className="container-bottom">
      <div className="tieude1">
        <div>
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
          </div>
        </div>
      </div>

      <ul className="products">
        {filteredData &&
          filteredData.map((item, index) => (
            <li key={index}>
              <div className="product-top">
                <a
                  href={`/thongtinchitietsp/${item.MaSP}`}
                  className="product-thumb"
                >
                  <img
                    src={`http://localhost:8000/api/image/${item.AnhSP}`}
                    alt={item.TenSP}
                  />
                </a>
                <a href={`/thongtinchitietsp/${item.MaSP}`} className="mua">
                  Mua
                </a>
              </div>
              <div className="product-info">
                <div className="product-name">{item.TenSP}</div>
                <div className="product-price">
                  {item.DonGiaSP.toLocaleString()} VND
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Test;
