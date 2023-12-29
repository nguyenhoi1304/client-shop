import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";

function Name(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getDetailData(
        localStorage.getItem("id_user")
      );
      setName(response);
    };

    fetchData();
  }, []);
  return (
    <li className="nav-item dropdown">
      <p
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-white"></i>
        {name.fullName}
      </p>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        <Link
          className="dropdown-item border-0 transition-link"
          to={"/history"}
        >
          Lịch sử giao dịch
        </Link>
      </div>
    </li>
  );
}

export default Name;
