// MuaHang.js
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { format } from 'date-fns';

import './MuaSanPham.scss'; // Import tệp CSS

import Nav2 from '../Nav/Nav2';

class MuaSanPham extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sanPham: {},  // Khởi tạo sanPham với một đối tượng trống
            soLuong: 1,
            loading: true,
            error: '', // Thêm trạng thái error

            MaKH: 'QuocBaoKH1',
            MaNV: 'QuocBaoNV1',
            DiaChiShip: '',
            SdtShip: '',
            NgayDatHang: '',
            GhiChu: '',
            ChiTietHoaDon: [
                { MaSP: 0, SoLuong: 1, GiamGia: 1 },
                // Các mục ChiTietHoaDon khác nếu cần
            ],
        };
    }

    async componentDidMount() {
        const { match, location } = this.props;
        const id = match.params.id;

        // Khởi tạo ngày hiện tại
        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd HH:mm:ss');

        // Set state với ngày hiện tại
        this.setState({
            NgayDatHang: formattedDate,
        });

        if (location.state && location.state.soLuong) {
            this.setState({ soLuong: location.state.soLuong });
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/sanpham/${id}`);
            this.setState({
                sanPham: response.data.data || {},
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching product details:", error);
            // Xử lý khi không tìm thấy sản phẩm, ví dụ: chuyển hướng đến trang 404
        }
    }

    handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const updatedChiTietHoaDon = [...this.state.ChiTietHoaDon];
        updatedChiTietHoaDon[index][name] = value;

        this.setState({ ChiTietHoaDon: updatedChiTietHoaDon });
    };

    handleAddChiTietHoaDon = (event) => {
        event.preventDefault();

        // Kiểm tra xem thông tin giao hàng đã được nhập đầy đủ chưa
        if (!this.state.SdtShip || !this.state.DiaChiShip) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
            return;
        }

        // Kiểm tra xem một sản phẩm đã được chọn chưa
        if (this.state.ChiTietHoaDon.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm!");
            return;
        }

        this.setState((prevState) => {
            const updatedChiTietHoaDon = prevState.ChiTietHoaDon.map((item) => ({
                ...item,
                MaSP: prevState.sanPham.MaSP,
                SoLuong: prevState.soLuong,
            }));

            return {
                ChiTietHoaDon: [...updatedChiTietHoaDon, { MaSP: prevState.sanPham.MaSP, SoLuong: prevState.soLuong, GiamGia: 1 }],
            };
        }, () => {
            this.handleSubmit(event);
        });
    };


    handleSubmit = async (event) => {
        console.log(">>> Check:", this.state)

        event.preventDefault(); // Ngăn chặn form gửi đi và làm refresh trang

        // Kiểm tra xem tất cả các trường bắt buộc đã được nhập hay chưa
        if (!this.state.MaKH || !this.state.MaNV || !this.state.DiaChiShip || !this.state.NgayDatHang || this.state.ChiTietHoaDon.length === 0) {
            //this.setState({ error: "Vui lòng nhập đầy đủ thông tin!" });
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/create-hoadon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MaKH: this.state.MaKH,
                    MaNV: this.state.MaNV,
                    DiaChiShip: this.state.DiaChiShip,
                    NgayDatHang: this.state.NgayDatHang,
                    GhiChu: this.state.GhiChu,
                    ChiTietHoaDon: this.state.ChiTietHoaDon,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({ message: data.message });
            } else {
                throw new Error('Failed to create HoaDon');
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ message: 'Failed to create HoaDon' });
        }
        alert("Đặt hàng thành công!")
        this.props.history.push("/");
    };

    btnGiamGia = () => {
        alert("Sản phẩm không có chính sách giảm giá !!!")
    };

    render() {
        const { sanPham, loading, soLuong } = this.state;
        return (
            <>
                <Nav2 />
                <form onSubmit={this.handleSubmit} id='yourFormId'>
                    {this.state.ChiTietHoaDon.map((item, index) => (

                        <div className="muahang-container" key={index}>
                            <div className='container-setup'>
                                <div className="muahang-giay-info">
                                    <div className="muahang-form">
                                        <h5 className='thongtinh-muahang'>Thông tin giao hàng</h5>
                                        <label className="muahang-label">

                                            <input
                                                type="text"
                                                name="name"
                                                className="muahang-input hoten"
                                                placeholder='Họ và tên'
                                            />
                                            <input
                                                type="text"
                                                name="SoLuong"
                                                hidden
                                                value={soLuong}
                                                onChange={(e) => this.setState({ SdtShip: e.target.value })}
                                            />
                                        </label> <br />
                                        <label className="muahang-label">

                                            <input
                                                type="text"
                                                className="muahang-input muahang-sdt"
                                                placeholder='Số điện thoại '
                                                name="SdtShip"
                                                value={this.state.SdtShip}
                                                onChange={(e) => this.setState({ SdtShip: e.target.value })}
                                            />
                                        </label>
                                        <label className="muahang-label">

                                            <input
                                                type="text"
                                                name="DiaChiShip"
                                                value={this.state.DiaChiShip}
                                                onChange={(e) => this.setState({ DiaChiShip: e.target.value })}
                                                className="muahang-input muahang-sonha" placeholder='Số nhà và tên đường'
                                            />
                                        </label> <br />
                                        <label className="muahang-label">

                                            <input
                                                type="text"
                                                className="muahang-input" placeholder='Ghi chú'
                                                name="GhiChu"
                                                value={this.state.GhiChu}
                                                onChange={(e) => this.setState({ GhiChu: e.target.value })}
                                            />
                                        </label>
                                        <p className='thanhtoan'>Hình thức thanh toán khi nhân hàng</p>
                                    </div>
                                </div>

                                <div className="muahang-customer-info">
                                    <div className='hr-xoaydoc'></div>
                                    <div className='thongtin-sanpham'>
                                        <div className='thongtin-sanpham_2'>
                                            <span className='discount-bannerr' >{soLuong}</span>
                                            <img src={sanPham.imageUrl} className='sanpham-img'></img>

                                            <span className='sanpham-name'>{sanPham.TenSP}</span>
                                        </div>

                                        <label className="muahang-magiamgia1">

                                            <input
                                                type="text"
                                                name="GiamGia"
                                                // value={item.GiamGia}
                                                // onChange={(e) => this.handleInputChange(e, index)}
                                                className="muahang-magiamhgia" placeholder='Mã giảm giá (nếu có)'
                                            />
                                            <button type="button" className='muahang-xacnhan' onClick={() => this.btnGiamGia()}>Sử Dụng</button>
                                        </label>

                                        <div className='muahang-tamtinh'>  <span className='muahang-tamtinh1'>Tạm tính</span>

                                            {sanPham.DonGiaSP ? (
                                                <span className='sanpham-price'>{sanPham.DonGiaSP.toLocaleString()} VND</span>
                                            ) : (
                                                <span className='sanpham-price'>Giá không xác định</span>
                                            )}
                                        </div>
                                        <div className='muahang-phivanchuyen'>
                                            <span className='muahang-phivanchuyen-label'>Phí vận chuyển và lấp gáp: </span>
                                            <span className='muahang-phivanchuyen-value'>{(sanPham.DonGiaSP * 0.01).toLocaleString()} VND</span>
                                        </div>
                                        <hr></hr>
                                        <div className='muahang-tongcong'>
                                            <span>Tổng cộng</span>
                                            {sanPham.DonGiaSP ? (
                                                <span className='sanpham-price'>{((sanPham.DonGiaSP * soLuong) + ((sanPham.DonGiaSP * soLuong) * 0.01)).toLocaleString()} VND</span>
                                            ) : (
                                                <span className='sanpham-price'>Giá không xác định</span>
                                            )}
                                        </div>
                                        <button type="button" className="muahang-button" onClick={(event) => this.handleAddChiTietHoaDon(event)}>
                                            Đặt Hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    ))}
                </form>

            </>
        );
    }
};

export default withRouter(MuaSanPham);
