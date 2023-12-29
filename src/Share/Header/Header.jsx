import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/Action/ActionCart";
import { addSession } from "../../Redux/Action/ActionSession";
import logo from "../img/cakes-shop-logo.jpg";
import { Link } from "react-router-dom";
import LoginLink from "../../Authentication/LoginLink";
import LogoutLink from "../../Authentication/LogoutLink";
import Name from "../../Authentication/Name";
import styles from "./Header.module.css";

function Header(props) {
  const dispatch = useDispatch();

  //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
  // đưa dữ liệu vào Redux
  if (localStorage.getItem("id_user")) {
    const action = addSession(localStorage.getItem("id_user"));
    dispatch(action);
  } else {
    //Đưa idTemp vào Redux temp để tạm lưu trữ
    localStorage.setItem("id_temp", "abc999");
    const action = addUser(localStorage.getItem("id_temp"));
    dispatch(action);
  }

  //Get IdUser từ redux khi user đã đăng nhập
  var idUser = useSelector((state) => state.Session.idUser);

  //Get idtemp từ redux khi user chưa đăng nhập
  var idTemp = useSelector((state) => state.Cart.id_user);

  const [loginUser, setLoginUser] = useState(false);
  const [nameUser, setNameUser] = useState(false);

  useEffect(() => {
    if (!idUser) {
      setLoginUser(false);
      setNameUser(false);
    } else {
      setLoginUser(true);
      setNameUser(true);
    }
  }, [idUser]);

  return (
    <div className={styles.header}>
      <div className="fluid px-0 px-lg-3">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          <div className="navbar-brand" to={`/`}>
            <input
              type="search"
              placeholder="Bạn cần tìm gì?..."
              className={styles.search_input}
            />
            <span>
              <button className={styles.btn_search}>
                <i className="fas fa-search mr-1 text-white" />
                Tìm Kiếm
              </button>
            </span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/`}>
                  <img className={styles.img_logo} src={logo} alt="logo" />
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/shop`}>
                  <i className="fas fa-store mr-1 text-white"></i>
                  <span className={styles.cart}>Cửa hàng</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/cart`}>
                  <i className="fas fa-dolly-flatbed mr-1 text-white"></i>
                  <span className={styles.cart}>Giỏ hàng</span>
                </Link>
              </li>
              {nameUser ? <Name /> : ""}
              {loginUser ? <LoginLink /> : <LogoutLink />}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
