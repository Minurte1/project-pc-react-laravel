import React from "react";
import { withRouter } from "react-router-dom";

import imageErr from '../../assets/images/Kothayanh.jpg'

import Nav2 from "../Nav/Nav2";
import Footer from "../Footer/Footer";

class SanPhamApple extends React.Component {

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

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/sanphamApple", {
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

    componentDidMount() {
        this.fetchData();
    }

    handleViewSanPham = (SanPham) => {
        const { history } = this.props;
        history.push(`/SanPham/${SanPham.MaSP}`)
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePriceFilterChange = (value) => {
        this.setState({ priceFilter: value });
    };

    handleSortChange = () => {
        const newSortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
        this.setState({ sortOrder: newSortOrder });
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
        // Sắp xếp dữ liệu
        const sortedData =
            filteredData &&
            filteredData.length > 0 &&
            filteredData.sort((a, b) => {
                const order = this.state.sortOrder === "asc" ? 1 : -1;
                return order * (a.DonGiaSP - b.DonGiaSP);
            });
        return (
            <>
                <Nav2 />
                <div className="relative">
                    <div className="container-bottom">
                        <div className="tieude"><h1>Danh Sách Apple</h1></div>

                        <div className="Searchfillter">
                            <div className="container_TimKiem">
                                <label className="TimKiem_label"><b>Tìm kiếm</b></label>
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
                                <label className="container_InputRadio_TimKiem">
                                    <input
                                        type="radio"
                                        name="priceFilter"
                                        value="asc"
                                        checked={priceFilter === "0" && this.state.sortOrder === "asc"} // Thêm "this."
                                        onChange={() => {
                                            this.handlePriceFilterChange("0");
                                            this.handleSortChange();
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
                                        checked={priceFilter === "0" && this.state.sortOrder === "desc"} // Thêm "this."
                                        onChange={() => {
                                            this.handlePriceFilterChange("0");
                                            this.handleSortChange();
                                        }}
                                    />
                                    Giá giảm dần
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        <ul className="products">
                            {sortedData && sortedData.length > 0 &&
                                sortedData.map((item, index) => (
                                    <li key={index}>
                                        <div className="product-top">
                                            <a onClick={() => this.handleViewSanPham(item)} className="product-thumb">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.TenSP}
                                                    onError={(e) => {
                                                        e.target.src = { imageErr } // Hoặc hiển thị thông báo lỗi khác
                                                    }}
                                                />
                                            </a>
                                            <a onClick={() => this.handleViewSanPham(item)} className="mua">Mua</a>
                                        </div>
                                        <div className="product-info">
                                            <a onClick={() => this.handleViewSanPham(item)} className="product-TheLoai">{item.NhanSanXuat}</a>
                                            <a onClick={() => this.handleViewSanPham(item)} className="product-name">{item.TenSP}</a>
                                            <div className="product-price">{item.DonGiaSP.toLocaleString()} VND</div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(SanPhamApple);
