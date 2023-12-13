import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  GoogleIcon,
  FacebookIcon,
  CloseIcon,
  HomeIcon,
} from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

// import { Redirect } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login({
  isShown = false,
  handleCloseForm,
  fetchUserInfo,
  setUser,
  setShowModalSignup,
  setShowModalForgetPassWord,
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Simple login authentication
    if (email !== "" && password !== "") {
      try {
        // Call your API to register the user
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/accounts/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _email: email,
              _pw: password,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          // Registration was successful
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          handleCloseForm();
          fetchUserInfo();
          toast.success("Đăng nhập thành công!");
        } else {
          // Registration failed
          setError(data.message);
          toast.success("Đăng nhập thất bại!");
        }
      } catch (error) {
        setError("Đăng nhập thất bại, vui lòng thử lại!");
        toast.error("Đăng nhập thất bại, vui lòng thử lại!");
      }
    } else {
      if (email === "") setError("Vui lòng điền email!");
      if (password === "") setError("Vui lòng điền mật khẩu!");
      if (email === "" && password === "")
        setError("Vui lòng điền đủ email và mật khẩu!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const hanleSignUp = () => {
    handleCloseForm();
    setShowModalSignup(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className={cx("form-wrapper")}>
          <form className={cx("loginForm")} onSubmit={handleSubmit}>
            <div className={cx("icons-wrapper")}>
              <p className={cx("form-title")}>Đăng nhập</p>
              <div onClick={handleCloseForm}>
                <CloseIcon
                  className={cx(
                    "close-icon-wrapper",
                    "icon",
                    `${!isShown ? "hidden" : ""}`
                  )}
                />
              </div>
              <Link to={"/"}>
                <div
                  className={cx(
                    "home-icon-wrapper",
                    "icon",
                    `${isShown ? "hidden" : ""}`
                  )}
                >
                  <HomeIcon width={24} height={24} />
                </div>
              </Link>
            </div>

            <div className={cx("input-wrapper")}>
              <div className={cx("input-wrapper-item")}>
                <label className={cx("form-label")} for="email">
                  {" "}
                  Email{" "}
                </label>
                <input
                  className={cx("form-input")}
                  type="text"
                  id="email"
                  autoComplete="on"
                  name="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className={cx("input-wrapper-item")}>
                <label className={cx("form-label")} for="pw">
                  Mật khẩu
                </label>
                <div className={cx("password-input-wrapper")}>
                  <input
                    className={cx("form-input", "password-input")}
                    type={showPassword ? "text" : "password"}
                    id="pw"
                    name="pw"
                    autocomplete="on"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <span
                    className={cx("password-toggle")}
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                {error && <p className={cx("form-error-message")}>{error}</p>}
              </div>
            </div>
            <div className={cx("redirect-options", "option-SignUp")}>
              <p>Chưa có tài khoản?</p>{" "}
              <a onClick={hanleSignUp}>Đăng ký ngay</a>
            </div>
            <div className={cx("btns-group-control")}>
              <button className={cx("btn", "btn-SignIn")} type="submit">
                Đăng nhập
              </button>
              {/* <p className={cx('options-title')}>-Or-</p>
                            <div className={cx('option-signIn')}>
                                <button className={cx('btn', 'btn-SignIn-google')}>
                                    <GoogleIcon />
                                    <Link to={'/'}>Đăng nhập bằng Gmail</Link>
                                </button>
                                <button className={cx('btn', 'btn-SignIn-facebook')}>
                                    <FacebookIcon width='24' height='24' />
                                    <Link to={'/'}> Đăng nhập bằng Facebook</Link>
                                </button>
                            </div> */}
            </div>
            <div className={cx("redirect-options", "option-forgetPw")}>
              <p>Quên mật khẩu? </p>
              <a
                onClick={() => {
                  setShowModalForgetPassWord(true);
                  handleCloseForm();
                }}
              >
                Đặt lại mật khẩu ngay
              </a>
            </div>
          </form>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default Login;
