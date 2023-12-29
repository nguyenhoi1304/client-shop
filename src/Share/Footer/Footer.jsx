/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
function Footer(props) {
  return (
    <footer className="footer ">
      <div className="container py-4 text-white">
        <div className="row py-5 text-white">
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase mb-3 ">Hỗ trợ khách hàng</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-home mr-1 text-white"></i>
                <a className="footer-link" href="#">
                  123 Nguyễn Tư giản, Đà Nẵng
                </a>
              </li>
              <li>
                <i className="fas fa-phone mr-1 text-white"></i>
                <a className="footer-link" href="#">
                  Hotline: 091 353 3457 – 09 1425 2542
                </a>
              </li>
              <li>
                <i className="fas fa-envelope mr-1 text-white"></i>
                <a className="footer-link" href="#">
                  Email : nguyenhoi130499@gmail.com
                </a>
              </li>
              <li>
                <i className="fas fa-share mr-1 text-white"></i>
                <a className="footer-link" href="#">
                  Facebook : fb.com/nguyenhoi130499
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase mb-3">Chính sách</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="footer-link" href="#">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Tin tức
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Hướng dẫn làm bánh
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Trả lời và hỏi đáp
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-uppercase mb-3">THEO DÕI CHÚNG TÔI TRÊN</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="footer-link" href="#">
                  Twitter
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
