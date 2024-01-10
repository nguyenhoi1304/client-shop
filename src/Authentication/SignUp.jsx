import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import "./Auth.css";
import queryString from "query-string";
import MessengerAPI from "../API/MessengerAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";

SignUp.propTypes = {};

function SignUp(props) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorConfirmPassword, setConfirmPasswordError] = useState(false);
  const [errorFullname, setFullnameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);

  const [success, setSuccess] = useState(false);
  const navigation = useNavigate();

  const onChangeName = (e) => {
    setFullName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlerSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFullnameError(false);
      setEmailError(false);
      setPhoneError(false);
      setPasswordError(false);
      setConfirmPasswordError(true);
      setEmailRegex(false);
      return;
    } else if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setPasswordError(false);
      setEmailRegex(false);
      setConfirmPasswordError(false);

      return;
    } else {
      setFullnameError(false);
      setPhoneError(false);
      setPasswordError(false);
      setFullnameError(false);
      setEmailRegex(false);
      setConfirmPasswordError(false);

      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        return;
      } else {
        setEmailError(false);
        setPhoneError(false);
        setPasswordError(false);
        setFullnameError(false);
        setConfirmPasswordError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setPasswordError(false);
          setConfirmPasswordError(false);

          return;
        } else {
          setEmailRegex(false);
          if (!password) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setPasswordError(true);
            setConfirmPasswordError(false);

            return;
          } else {
            setFullnameError(false);
            setPhoneError(false);
            setPasswordError(false);
            setFullnameError(false);
            setEmailRegex(false);
            setConfirmPasswordError(false);

            if (!phone) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(true);
              setPasswordError(false);
              setConfirmPasswordError(false);
            } else {
              const fetchSignUp = async () => {
                const body = JSON.stringify({
                  fullname: fullname,
                  email: email,
                  password: password,
                  phone: phone,
                });

                const res = await UserAPI.postSignUp(body);
                res.message && alert(res.message);
                if (res.isRegister) {
                  alert("Tạo tài khoản thành công!");
                  navigation("/signin");
                }
                console.log(res);
                setSuccess(true);
              };

              fetchSignUp();

              // Hàm này dùng để tạo các conversation cho user và admin
              const fetchConversation = async () => {
                const params = {
                  email: email,
                  password: password,
                };

                const query = "?" + queryString.stringify(params);

                const response = await MessengerAPI.postConversation(query);
                console.log(response);
              };

              fetchConversation();
            }
          }
        }
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="signin">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <span className="login100-form-title p-b-33 text-light">
              Đăng ký
            </span>
            <div className="d-flex justify-content-center pb-5">
              {errorFullname && (
                <span className="text-danger">
                  * Tên đầy đủ không được để trống!
                </span>
              )}
              {errorEmail && (
                <span className="text-danger">
                  * Vui lòng kiểm tra Email, Email không được để trống!
                </span>
              )}
              {emailRegex && (
                <span className="text-danger">
                  * Email của bạn không đúng định dạng
                </span>
              )}
              {errorPassword && (
                <span className="text-danger">
                  *Vui lòng kiểm tra lại password!
                </span>
              )}
              {errorConfirmPassword && (
                <span className="text-danger">
                  * Mật khẩu xác nhận không trùng khớp với mật khẩu!
                </span>
              )}
              {errorPhone && (
                <span className="text-danger">
                  * Vui lòng kiểm tra lại số điện thoại!
                </span>
              )}
            </div>
            <div className=" validate-input inputbox">
              <input
                className="input100"
                value={fullname}
                onChange={onChangeName}
                type="text"
              />
              <label for="" className="text-white ">
                Tên đầy đủ
              </label>
            </div>

            <div className="inputbox rs1 validate-input">
              <input
                className="input100"
                value={email}
                onChange={onChangeEmail}
                type="email"
              />
              <label for="" className="text-white ">
                Email <FontAwesomeIcon icon={faEnvelope} />
              </label>
            </div>

            <div className="inputbox rs1 validate-input">
              <input
                className="input100"
                value={password}
                onChange={onChangePassword}
                type="password"
                required
              />
              <label for="" className="text-white ">
                Mật khẩu <FontAwesomeIcon icon={faLock} />
              </label>
            </div>

            <div className="inputbox rs1 validate-input">
              <input
                className="input100"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                type="password"
                required
              />
              <label for="" className="text-white ">
                Nhập lại mật khẩu <FontAwesomeIcon icon={faLock} />
              </label>
            </div>

            <div className="inputbox rs1 validate-input">
              <input
                className="input100"
                value={phone}
                onChange={onChangePhone}
                type="number"
              />
              <label for="" className="text-white ">
                Số điện thoại <FontAwesomeIcon icon={faPhone} />
              </label>
            </div>

            <div className="container-login100-form-btn m-t-20">
              <button
                className="login100-form-btn text-info"
                onClick={handlerSignUp}
              >
                Đăng ký
              </button>
            </div>

            <div className="text-center p-t-45 p-b-4">
              <span className="text-light font-weight-bold ">Đăng nhập?</span>
              &nbsp;
              <Link to="/signin" className="txt2 hov1">
                Click
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
