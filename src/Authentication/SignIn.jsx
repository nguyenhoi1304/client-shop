import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function SignIn(props) {
  const navigation = useNavigate();
  //listCart được lấy từ redux
  const listCart = useSelector((state) => state.Cart.listCart);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [user, setUser] = useState([]);

  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [checkPush, setCheckPush] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();

      setUser(response.data);
    };

    fetchData();
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (!email) {
      setErrorEmail(true);
      return;
    } else {
      if (!password) {
        setErrorEmail(false);
        setErrorPassword(true);
        return;
      } else {
        setErrorPassword(false);
        if (!validateEmail(email)) {
          setEmailRegex(true);
          return;
        } else {
          setEmailRegex(false);

          const fetchLogin = async () => {
            const body = JSON.stringify({
              email: email,
              password: password,
            });

            const res = await UserAPI.postLogin(body);
            console.log(res);
            setIsLogin(res.isLogin);
            setUser(res.user);
            //Nhận về lỗi trả về khi mà không có dữ liệu được tìm thấy
            if (typeof res !== undefined) {
              setErrorEmail(res.invalidateUser);
              setErrorPassword(res.invalidatePassword);
            }

            //login Thành công
            if (res.isLogin) {
              localStorage.setItem("id_user", email);

              localStorage.setItem("name_user", user?.fullName);

              const action = addSession(localStorage.getItem("id_user"));
              dispatch(action);

              setCheckPush(true);

              navigation("/");
            }
          };

          fetchLogin();
        }
      }
    }
  };

  //Hàm này dùng để đưa hết tất cả carts vào API của user
  useEffect(() => {
    const fetchData = async () => {
      //Lần đầu sẽ không thực hiện insert được vì addCart = ''
      if (checkPush === true) {
        for (let i = 0; i < listCart.length; i++) {
          //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
          const params = {
            idUser: localStorage.getItem("id_user"),
            idProduct: listCart[i].idProduct,
            count: listCart[i].count,
          };

          const query = "?" + queryString.stringify(params);

          const response = await CartAPI.postAddToCart(query);
          console.log(response);
        }

        setRedirect(true);
      }
    };

    fetchData();
  }, [checkPush]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33 text-white">
            Đăng nhập
          </span>

          <div className="d-flex justify-content-center pb-5">
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
          </div>

          <div className="inputbox">
            <input
              type="email"
              className="input100"
              value={email}
              onChange={onChangeEmail}
            />
            <label for="" className="text-white ">
              Email <FontAwesomeIcon icon={faEnvelope} />
            </label>
          </div>
          <div className=" inputbox rs1 validate-input">
            <input
              className="input100"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
            <label for="" className="text-light">
              Mật khẩu <FontAwesomeIcon icon={faLock} />
            </label>
          </div>

          <div className="container-login100-form-btn m-t-20 ">
            {redirect && <redirect to={`/`} />}
            <button className="login100-form-btn text-info" onClick={onSubmit}>
              Đăng nhập
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="text-light font-weight-bold">Tạo tài khoản?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
