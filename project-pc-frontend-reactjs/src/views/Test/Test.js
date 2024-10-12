import React from "react";
import { withRouter } from "react-router-dom";
import "./Test.scss";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      error: null,
      searchTerm: "",
      priceFilter: "", // Thêm state để lưu trữ giá trị của nút radio
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sanpham", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Yêu cầu không thành công");
      }

      const jsonResponse = await response.json();

      this.setState({
        data: jsonResponse.data,
        loading: false,
      });

      console.log(jsonResponse);
    } catch (error) {
      console.error(error.message);
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handlePriceFilterChange = (value) => {
    this.setState({ priceFilter: value });
  };

  render() {
    const { data, loading, error, searchTerm, priceFilter } = this.state;

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
                onChange={this.handleSearchChange}
              />
            </div>
            <div className="fillter_TimKiem">
              <label className="container_InputRadio_TimKiem">
                <input
                  type="radio"
                  name="priceFilter"
                  value="0"
                  checked={priceFilter === "0"}
                  onChange={() => this.handlePriceFilterChange("0")}
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
                  onChange={() => this.handlePriceFilterChange("10000000")}
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
                  onChange={() => this.handlePriceFilterChange("20000000")}
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
                  onChange={() => this.handlePriceFilterChange("30000000")}
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
  }
}

export default withRouter(Test);
