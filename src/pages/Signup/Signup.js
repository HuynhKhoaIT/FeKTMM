import React from "react";
import { useState } from "react";
import styles from "./Signup.module.scss";
import classNames from "classnames/bind";
import {
  GoogleIcon,
  FacebookIcon,
  HomeIcon,
  CloseIcon,
} from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "antd";

// import Modal from 'react-bootstrap/Modal';

const cx = classNames.bind(styles);

function Signup({ isShown, setShowModalSignup, setShowModal }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mailError, setMailError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

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

  const hasDiacritics = (name) => {
    // Regular expression to match diacritics
    const diacriticsRegex = /[À-ÿ]/; // Range of characters with diacritics

    return diacriticsRegex.test(name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSucessMessage("");
    setError("");
    setMailError("");
    setPasswordError("");
    setFNameError("");
    setLNameError("");
    if (fName !== "" && lName !== "" && password !== "" && email !== "") {
      if (
        checkEmailValid(email) &&
        checkPasswordComplexity(password) &&
        !hasDiacritics(fName) &&
        !hasDiacritics(lName)
      ) {
        setSucessMessage("");
        setError("");
        setMailError("");
        setPasswordError("");
        setFNameError("");
        setLNameError("");
        try {
          // Call your API to register the user
          const response = await fetch(
            "https://cnpmmnhom14.onrender.com/api/accounts/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _fname: fName,
                _lname: lName,
                _email: email,
                _pw: password,
              }),
            }
          );

          if (response.ok) {
            setLoading(false);

            // Registration was successful
            setShowModalSignup(false);
            setShowModal(true);
            setSucessMessage("Đăng ký thành công!");
            toast.success("Đăng ký thành công!");
          } else {
            // Registration failed
            const data = await response.json();
            setError(data.message);
            toast.success("Đăng ký thất bại, vui lòng thử lại!");
          }
        } catch (error) {
          setLoading(false);

          setError("Đăng ký thất bại, vui lòng thử lại!");
          toast.success("Đăng ký thất bại, vui lòng thử lại!");
        }
      } else {
        setLoading(false);

        setSucessMessage("");
        if (!checkEmailValid(email))
          setMailError("Email không đúng định dạng!");
        if (!checkPasswordComplexity(password))
          setPasswordError(
            "Mật khẩu dài ít nhất 8 ký tự, tối đa 20 ký tự, phải bao gồm số, chữ hoa, chữ thường và ký tự đặc biệt!"
          );
        if (hasDiacritics(fName)) setFNameError("Vui lòng dùng chữ không dấu!");
        if (hasDiacritics(lName)) setLNameError("Vui lòng dùng chữ không dấu!");
      }
    } else {
      setLoading(false);
      setError("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <div className={cx("form-wrapper")}>
      <form className={cx("loginForm")} onSubmit={handleSubmit}>
        <div className={cx("icons-wrapper")}>
          <Link to={"/"}>
            <div className={cx("home-icon-wrapper", "icon")}>
              <HomeIcon width={24} height={24} />
            </div>
          </Link>
          <p className={cx("form-title")}>Đăng ký</p>
          <div
            onClick={() => setShowModalSignup(false)}
            style={{ cursor: "pointer" }}
          >
            <CloseIcon
              className={cx(
                "close-icon-wrapper",
                "icon",
                `${!isShown ? "hidden" : ""}`
              )}
            />
          </div>
        </div>
        <div className={cx("input-wrapper")}>
          <div>
            <div className={cx("input-wrapper-item")}>
              <label className={cx("form-label")} for="fName">
                {" "}
                Họ{" "}
              </label>
              <input
                className={cx("form-input")}
                type="text"
                id="fName"
                name="fName"
                required
                placeholder="Nhập họ"
                onChange={(e) => setFName(e.target.value)}
              ></input>
              {fNameError && (
                <p className={cx("form-error-message", "form-error")}>
                  {fNameError}
                </p>
              )}
            </div>
            <div className={cx("input-wrapper-item")}>
              <label className={cx("form-label")} for="lName" required>
                Tên
              </label>
              <input
                className={cx("form-input")}
                type="text"
                id="lName"
                name="lName"
                placeholder="Nhập tên"
                required
                onChange={(e) => setLName(e.target.value)}
              ></input>
              {lNameError && (
                <p className={cx("form-error-message", "form-error")}>
                  {lNameError}
                </p>
              )}
            </div>
          </div>

          <div className={cx("input-wrapper-item")}>
            <label className={cx("form-label")} for="email">
              {" "}
              Email{" "}
            </label>
            <input
              className={cx("form-input")}
              type="text"
              id="email"
              name="email"
              placeholder="Nhập email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {mailError && (
              <p className={cx("form-error-message", "form-error")}>
                {mailError}
              </p>
            )}
          </div>
          <div className={cx("input-wrapper-item")}>
            <label className={cx("form-label")} for="pw" required>
              Mật khẩu
            </label>
            <div className={cx("password-input-wrapper")}>
              <input
                required
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
            {passwordError && (
              <p className={cx("form-error-message", "form-error")}>
                {passwordError}
              </p>
            )}
          </div>
          {sucessMessage && (
            <p className={cx("form-sucess-message")}>{sucessMessage}</p>
          )}
          {error && <p className={cx("form-error-message")}>{error}</p>}
        </div>
        <div className={cx("redirect-options")}>
          <p>Đã có tài khoản? </p>
          <a
            onClick={() => {
              setShowModal(true);
              setShowModalSignup(false);
            }}
          >
            Đăng nhập ngay
          </a>
        </div>
        <Button
          type="primary"
          style={{ width: "100%", margin: "10px 0" }}
          htmlType="submit"
          loading={loading}
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}

export default Signup;
