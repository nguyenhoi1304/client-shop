import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
function LogoutLink(props) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={`/signin`}>
        <i className="fas fa-user-alt mr-1 text-white"></i>{" "}
        <span className="text_login">Đăng nhập</span>
      </Link>
    </li>
  );
}

export default LogoutLink;
