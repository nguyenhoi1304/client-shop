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
  const [valueActive, setValueActive] = useState("home");

  const listMenuItemLeft = {
    home: "Trang chủ",
    introduce: "Giới thiệu",
    news: "Tin tức",
    promotion: "Khuyến mãi",
    formula: "Công thức làm bánh",
    contact: "Liên hệ",
    book: "Đặt nhanh",
  };

  const listMenuItemRight = {
    store: "Cửa hàng",
    cart: "Giỏ hàng",
  };

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

  const handleActive = (value) => {
    setValueActive(value);
  };

  return (
    <div className={styles.header}>
      <div className="fluid px-0 px-lg-3">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          {/* button icon menu */}
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
            <ul className="navbar-nav mr-auto align-items-center">
              <li className="nav-item">
                <img className={styles.img_logo} src={logo} alt="logo" />
              </li>
              {/* list item left */}
              <li className="nav-item" onClick={() => handleActive("home")}>
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "home"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.home}
                  </span>
                </Link>
              </li>

              <li
                className="nav-item"
                onClick={() => handleActive("introduce")}
              >
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "introduce"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.introduce}
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => handleActive("Công thức làm bánh")}
              >
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "Công thức làm bánh"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.formula}
                  </span>
                </Link>
              </li>
              <li className="nav-item" onClick={() => handleActive("news")}>
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "news"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.news}
                  </span>
                </Link>
              </li>
              <li className="nav-item" onClick={() => handleActive("contact")}>
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "contact"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.contact}
                  </span>
                </Link>
              </li>
              <li className="nav-item" onClick={() => handleActive("book")}>
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "book"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.book}
                  </span>
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => handleActive("promotion")}
              >
                <Link className="nav-link " to={`/`}>
                  <span
                    className={
                      valueActive === "promotion"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemLeft.promotion}
                  </span>
                </Link>
              </li>
            </ul>

            {/* list item right */}
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item px-1">
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
              </li>
              <li
                className="nav-item px-1"
                onClick={() => handleActive("store")}
              >
                <Link className="nav-link active" to={`/shop`}>
                  <i className="fas fa-store mr-1 text-white"></i>
                  <span
                    className={
                      valueActive === "store"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemRight.store}
                  </span>
                </Link>
              </li>
              <li
                className="nav-item px-1"
                onClick={() => handleActive("cart")}
              >
                <Link className="nav-link" to={`/cart`}>
                  <i className="fas fa-dolly-flatbed mr-1 text-white"></i>
                  <span
                    className={
                      valueActive === "cart"
                        ? styles.active
                        : styles.none_active
                    }
                  >
                    {listMenuItemRight.cart}
                  </span>
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
