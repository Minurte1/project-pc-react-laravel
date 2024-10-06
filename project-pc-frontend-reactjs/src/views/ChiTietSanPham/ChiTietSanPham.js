import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import './ChiTietSanPham.scss'

import Nav2 from "../Nav/Nav2";
import Footer from "../Footer/Footer"

class ChiTietSanPham extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sanPham: {},
      soLuong: 1, // Số lượng mặc định là 1
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;

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

  handleQuantityChange = (event) => {

    const { sanPham } = this.state;
    const enteredQuantity = parseInt(event.target.value, 10);

    if (!isNaN(enteredQuantity)) {
      // Nếu người dùng nhập một số hợp lệ
      const limitedQuantity = Math.min(enteredQuantity, sanPham.TonKhoSP);
      this.setState({ soLuong: limitedQuantity });
    } else {
      // Nếu người dùng nhập không phải là một số, bạn có thể xử lý tùy thuộc vào yêu cầu của bạn.
      // Ví dụ: có thể hiển thị một thông báo lỗi hoặc không thay đổi state.
      alert("Vược quá só lượng tồn kho !!!")
      console.error("Please enter a valid quantity.");
    }

  };

  handlePurchase = (SanPham) => {
    const { sanPham, soLuong } = this.state;

    if (soLuong > sanPham.TonKhoSP) {
      alert("Số lượng mua vượt quá số lượng tồn kho.");
      // Hoặc thực hiện một xử lý khác, chẳng hạn chuyển hướng đến trang thông báo
      return;
    }

    // Thực hiện xử lý mua hàng với số lượng hợp lệ
    const { history } = this.props;

    // Kiểm tra xem history có tồn tại không
    if (history) {
      history.push(`/MuaHang/${sanPham.MaSP}`);
    } else {
      console.error("Lỗi: history không tồn tại hoặc không được truyền vào đúng cách.");
    }
    // alert(`Bạn đã mua ${soLuong} sản phẩm thành công.`);
  };

  render() {
    const { sanPham, loading, soLuong } = this.state;

    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Nav2 />
            <div className="container_ChiTietSanPham">
              <div className="product-info_ChiTietSanPham">
                <form className='form_ChiTietSanPham'>
                  <div className="product-image_ChiTietSanPham">
                    <img className="image_ChiTietSanPham" src={sanPham.imageUrl} alt={sanPham.TenSP} />
                  </div>
                  <div className='product-h3_ChiTietSanPham'>
                    <h3 className='h3_ChiTietSanPham'>{sanPham.TenSP}</h3>
                    <p className='product-prices_ChiTietSanPham'>{sanPham.DonGiaSP.toLocaleString()} VND</p>
                    <hr></hr>
                    <p className='Con_Het_ChiTietSanPham'>
                      {sanPham.TonKhoSP > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </p>
                    <div className='SoLuongSanPham_ChiTietSanPham'>
                      <label htmlFor="quantity">Số lượng:</label>
                      <input className="soLuong_ChiTietSanPham"
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={soLuong}
                        onChange={this.handleQuantityChange}
                      />
                    </div>

                    <div>
                      <table className="table_ChiTietSanPham">

                        <tbody>
                          <tr>
                            <td colSpan="2"><b>Cấu hình chi tiết</b></td>
                          </tr>

                          <tr className="table_tr_ChiTietSanPham">
                            <td><b>Chip</b></td>
                            <td>{sanPham.Chip}</td>
                          </tr>

                          <tr className="table_tr_ChiTietSanPham">
                            <td><b>Main</b></td>
                            <td>{sanPham.Main}</td>
                          </tr>

                          <tr className="table_tr_ChiTietSanPham">
                            <td><b>VGA</b></td>
                            <td>{sanPham.VGA}</td>
                          </tr>

                          <tr className="table_tr_ChiTietSanPham">
                            <td><b>Ram</b></td>
                            <td>{sanPham.RAM}</td>
                          </tr>

                          <tr className="table_tr_ChiTietSanPham">
                            <td><b>Tồn kho</b></td>
                            <td>{sanPham.TonKhoSP}</td>
                          </tr>
                        </tbody>

                      </table>
                    </div>

                    <div className='product-h3_muahang_ChiTietSanPham'>

                      {sanPham.TonKhoSP > 0 && (
                        <Link
                          to={{
                            pathname: `/MuaHang/${sanPham.MaSP}`,
                            state: { soLuong: soLuong }
                          }}
                          className="purchase-button_ChiTietSanPham"
                        >
                          Mua Hàng
                        </Link>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    );
  }
}

export default withRouter(ChiTietSanPham);
