import React from "react";
import { useState } from "react";
import styles from "./ResetPassWordByOTPForUsers.module.scss";
import classNames from "classnames/bind";
import { CloseIcon } from "../../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Button } from "antd";

// import Modal from 'react-bootstrap/Modal';

const cx = classNames.bind(styles);

function ResetPassWordByOTPForUsers({
  setShowModal,
  setShowModalRessetPassword,
}) {
  const location = useLocation();
  const data = location.state;
  const [loading, setLoading] = useState(false);

  const [otp, setOTP] = useState("");
  // const [otpError, setOTPError] = useState('')

  const [error, setError] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [rePassWord, setRePassWord] = useState("");
  const [showRePassword, setReShowRePassword] = useState(false);

  // const [passwordError, setPasswordError] = useState('')
  // const [rePasswordError, setRePasswordError] = useState('')

  const checkPasswordComplexity = (password) => {
    // Password should be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Password should contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Password should contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Password should contain at least one digit
    if (!/\d/.test(password)) {
      return false;
    }

    // Password should contain at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    // setOTPError('')
    // setPasswordError('')
    if (otp !== "" && password !== "" && rePassWord !== "") {
      setSucessMessage("");

      setError("");
      if (password === rePassWord) {
        if (checkPasswordComplexity(password)) {
          try {
            setLoading(false);

            // Call your API to register the user
            const response = await fetch(
              "https://cnpmmnhom14.onrender.com/api/verification/user-reset-password",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  otp: otp,
                  email: data.userMail,
                  password: password,
                  rePassword: rePassWord,
                }),
              }
            );

            if (response.ok) {
              // Registration was successful
              setShowModalRessetPassword(false);
              setShowModal(true);
              setSucessMessage("Reset mật khẩu thành công!");
            } else {
              // Registration failed
              const data = await response.json();
              setError(data.message);
            }
          } catch (error) {
            setLoading(false);
            setError("Reset mật khẩu thất bại, vui lòng thử lại!");
          }
        } else {
          setLoading(false);
          setError(
            "Mật khẩu dài ít nhất 8 ký tự, tối đa 20 ký tự, phải bao gồm số, chữ hoa, chữ thường và ký tự đặc biệt!"
          );
        }
      } else {
        setLoading(false);
        setError("Mật khẩu nhập lại không đúng!");
      }
    } else {
      setLoading(false);
      setError("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setReShowRePassword(!showRePassword);
  };

  return (
    <div className={cx("form-wrapper")}>
      <form className={cx("loginForm")} onSubmit={handleSubmit}>
        <div className={cx("icons-wrapper")}>
          <p className={cx("form-title")}>OTP</p>
          <div
            onClick={() => setShowModalRessetPassword(false)}
            style={{ cursor: "pointer" }}
          >
            <CloseIcon className={cx("close-icon-wrapper", "icon")} />
          </div>
        </div>
        <div className={cx("input-wrapper")}>
          <label className={cx("form-label")} for="otp">
            OTP
          </label>
          <div className={cx("input-wrapper-item")}>
            <input
              className={cx("form-input")}
              type="text"
              id="otp"
              name="otp"
              placeholder="Nhập OTP"
              onChange={(e) => setOTP(e.target.value)}
            ></input>
            {/* {otpError && <p className={cx('form-error-message', 'form-error')}>{otpError}</p>} */}
          </div>
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
          {/* {passwordError && <p className={cx('form-passwordError-message')}>{error}</p>} */}
        </div>
        <div className={cx("input-wrapper-item")}>
          <label className={cx("form-label")} for="re-pw">
            Nhập lại mật khẩu
          </label>
          <div className={cx("password-input-wrapper")}>
            <input
              className={cx("form-input", "password-input")}
              type={showRePassword ? "text" : "password"}
              id="re-pw"
              name="re-pw"
              autocomplete="on"
              placeholder="Nhập mật khẩu"
              value={rePassWord}
              onChange={(e) => setRePassWord(e.target.value)}
            ></input>
            <span
              className={cx("password-toggle")}
              onClick={toggleRePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {/* {rePasswordError && <p className={cx('form-rePasswordError-message')}>{error}</p>} */}
        </div>
        {sucessMessage && (
          <p className={cx("form-sucess-message")}>{sucessMessage}</p>
        )}
        {error && <p className={cx("form-error-message")}>{error}</p>}
        <Button
          type="primary"
          style={{ width: "100%", margin: "10px 0" }}
          htmlType="submit"
          loading={loading}
        >
          Xác nhận
        </Button>
        <div className={cx("redirect-options", "option-SignUp")}>
          <p>
            Đã có tài khoản?{" "}
            <a
              onClick={() => {
                setShowModal(true);
                setShowModalRessetPassword(false);
              }}
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetPassWordByOTPForUsers;
