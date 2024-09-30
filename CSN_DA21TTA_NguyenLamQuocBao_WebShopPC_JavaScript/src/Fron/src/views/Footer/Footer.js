import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons'; // Cập nhật dòng này
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Thêm dòng này
import { withRouter } from 'react-router-dom';

import './Footer.scss';

class Footer extends Component {


  handleViewDesktop = () => {
    this.props.history.push("/Desktop");
  };

  handleViewApple = () => {
    this.props.history.push("/Apple");
  };

  handleViewASUS = () => {
    this.props.history.push("/ASUS");
  };

  handleViewAll = () => {
    this.props.history.push("/All");
  };

  render() {
    return (
      <footer className="site-footer_Footer">
        <div className="container_Footer">
          <div className="row_Footer">

            <div className="W30__Footer">
              <h6>Về Tôi</h6>
              <p className="text-justify_Footer">Xin chào! Tôi là sinh viên năm 3 chuyên ngành Công Nghệ Thông Tin tại Trường Đại học Trà Vinh. Trang web này là sản phẩm của đồ án cơ sở ngành của tôi. Nơi tôi chia sẻ và áp dụng kiến thức từ hành trình học tập của mình. Hy vọng bạn sẽ tận hưởng thăm trang web này!</p>
            </div>

            <div className="W30__Footer">
              <h6>Hãng sản xuất</h6>
              <ul className="footer-links_Footer">
                <li><a onClick={this.handleViewDesktop}>Desktop</a></li>
                <li><a onClick={this.handleViewApple}>Apple</a></li>
                <li><a onClick={this.handleViewASUS}>ASUS</a></li>
                <li><a onClick={this.handleViewAll}>Tất cả</a></li>
              </ul>
            </div>

            <div className="W30__Footer">
              <h6>ShopPC </h6>
              <ul className="footer-links_Footer">
                <li><p>Trang thương mại chính thức của Quốc Bảo. Luôn tìm kiếm những sản phẩm vì game thủ.</p></li>
              </ul>
            </div>
          </div>

          <hr />
        </div>
        <div className="container_Footer">
          <div className="row_Footer">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text_Footer">Copyright &copy; 2023 All Rights Reserved by
                <a href="https://www.facebook.com/quocbao.nguyenlam.1/">Quốc Bảo</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons_Footer">
                <li><a className="facebook" href="https://www.facebook.com/quocbao.nguyenlam.1/"><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a className="Github" href="https://github.com/BaoQuocZero"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a className="dribbble" href="https://dribbble.com/"><FontAwesomeIcon icon={faDribbble} /></a></li>
                <li><a className="linkedin" href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default withRouter(Footer);
