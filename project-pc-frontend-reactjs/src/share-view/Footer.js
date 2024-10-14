import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faDribbble,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

import "./css/Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const handleViewDesktop = () => {
    navigate("/Desktop");
  };

  const handleViewApple = () => {
    navigate("/Apple");
  };

  const handleViewASUS = () => {
    navigate("/ASUS");
  };

  const handleViewAll = () => {
    navigate("/All");
  };

  return (
    <footer className="site-footer_Footer">
      <div className="container_Footer">
        <div className="row_Footer">
          <div className="W30__Footer">
            <h6>Về Tôi</h6>
            <p className="text-justify_Footer">
              Xin chào! Tôi là sinh viên năm 3 chuyên ngành Công Nghệ Thông Tin
              tại Trường Đại học Trà Vinh. Trang web này là sản phẩm của đồ án
              cơ sở ngành của tôi. Nơi tôi chia sẻ và áp dụng kiến thức từ hành
              trình học tập của mình. Hy vọng bạn sẽ tận hưởng thăm trang web
              này!
            </p>
          </div>

          <div className="W30__Footer">
            <h6>Hãng sản xuất</h6>
            <ul className="footer-links_Footer">
              <li>
                <a onClick={handleViewDesktop}>Desktop</a>
              </li>
              <li>
                <a onClick={handleViewApple}>Apple</a>
              </li>
              <li>
                <a onClick={handleViewASUS}>ASUS</a>
              </li>
              <li>
                <a onClick={handleViewAll}>Tất cả</a>
              </li>
            </ul>
          </div>

          <div className="W30__Footer">
            <h6>ShopPC </h6>
            <ul className="footer-links_Footer">
              <li>
                <p>
                  Trang thương mại chính thức của Quốc Bảo. Luôn tìm kiếm những
                  sản phẩm vì game thủ.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <hr />
      </div>
      <div className="container_Footer">
        <div className="row_Footer">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text_Footer">
              Copyright &copy; 2023 All Rights Reserved by
              <a href="https://www.facebook.com/quocbao.nguyenlam.1/">
                {" "}
                Quốc Bảo
              </a>
              .
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons_Footer">
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/quocbao.nguyenlam.1/"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a className="Github" href="https://github.com/BaoQuocZero">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li>
                <a className="dribbble" href="https://dribbble.com/">
                  <FontAwesomeIcon icon={faDribbble} />
                </a>
              </li>
              <li>
                <a className="linkedin" href="https://www.linkedin.com/">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
