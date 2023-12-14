import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import {
  PhoneIcon,
  MailIcon,
  TruckIcon,
  GuaranteeIcon,
  QuanlityIcon,
  MenuIcon,
  CartIcon,
} from "../../../components/Icons";
import Image from "../../../components/Images";
import MobileMenu from "./MobileMenu";
import {
  faSortDown,
  faBars,
  faCartShopping,
  faArrowRightFromBracket,
  faUser,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Search";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../../../pages/Login/Login";
import * as categoryService from "../../../services/categoryService";
import axios from "axios";
import Signup from "../../../pages/Signup/Signup";
import ForgetPassword from "../../../pages/ForgetPassword/forget-password";
import ResetPassWordByOTPForUsers from "../../../pages/ForgetPassword/ResetPassWordByOTPForUsers/ResetPassWordByOTPForUsers";
import * as cartService from "../../../services/cartService";

const cx = classNames.bind(styles);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSignup, setShowModalSignup] = useState(false);
  const [showModalForgetPassword, setShowModalForgetPassWord] = useState(false);
  const [showModalRessetPassword, setShowModalRessetPassword] = useState(false);

  const [category, setCategory] = useState([]);
  const [user, setUser] = useState();
  const capitalizeFirstLetter = (word) => {
    if (!word) {
      return ""; // Return an empty string or handle the case when word is undefined or empty
    } else return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const [savedLengthCart, setSavedLengthCart] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await cartService.getCartByUserId(token);
        setSavedLengthCart(data?.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);
  const handleShowLoginForm = () => {
    setShowModal(true);
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token"); // Lấy token từ Local Storage
    if (token) {
      try {
        const response = await axios.get(
          "https://cnpmmnhom14.onrender.com/api/accounts/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );

        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
          localStorage.setItem("userName", userData._fname);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      }
    }
  };
  // Sử dụng useEffect để gọi hàm fetchUserInfo khi component được tạo
  useEffect(() => {
    fetchUserInfo();
  }, []); // Rỗng [] đảm bảo fetchUserInfo chỉ được gọi một lần khi component được tạo

  const handleCloseForm = () => {
    setShowModal(false);
  };

  const userName = localStorage.getItem("userName");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  console.log("showModalSignup", showModalSignup);
  return (
    <header>
      <div className={cx("row", "header__top")}>
        <div
          className={cx("container")}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className={cx("col-md-12 col-lg-6 d-flex align-items-center")}>
            <div
              className={cx("header__top-item-1", "d-flex align-items-center")}
            >
              <PhoneIcon />
              <div className={cx("header__top-item-text")}>
                Hotline 1900 2098 - 0898109810
              </div>
            </div>
            <div
              className={cx("header__top-item-1", "d-flex align-items-center")}
            >
              <MailIcon />
              <div className={cx("header__top-item-text")}>
                Email contact@gmail.com
              </div>
            </div>
          </div>
          <div
            className={cx(
              "d-none col-lg-6 d-lg-flex align-items-center justify-content-between"
            )}
          >
            <div
              className={cx("header__top-item-2", "d-flex align-items-center")}
            >
              <TruckIcon />
              <div className={cx("header__top-item-text")}>
                Giao hàng tận nơi
              </div>
            </div>
            <div
              className={cx("header__top-item-2", "d-flex align-items-center")}
            >
              <GuaranteeIcon />
              <div className={cx("header__top-item-text")}>
                Bảo hành chính hãng
              </div>
            </div>
            <div
              className={cx("header__top-item-2", "d-flex align-items-center")}
            >
              <QuanlityIcon />
              <div className={cx("header__top-item-text")}>
                Sản phẩm chất lượng
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("row align-items-center", "header__bot")}>
            <div
              className={cx(
                "header__bot-nav",
                "d-flex align-items-center justify-content-between"
              )}
            >
              <div
                className={cx(
                  " d-flex align-items-center justify-content-between",
                  "header__bot-nav-left"
                )}
              >
                <Link to={"/"} className={cx("logo")}>
                  <Image
                    className={cx("d-none d-lg-flex")}
                    src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg"
                    alt="logo"
                  />
                  <Image
                    className={cx("d-lg-none")}
                    src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                    alt="logo"
                  />
                </Link>
                <HeadlessTippy
                  delay={[0, 200]}
                  interactive
                  placement="bottom-start"
                  // hideOnClick={false} // Không ẩn khi nhấp chuột vào subcategory
                  render={(attrs) => (
                    <div
                      className={cx("menu-list")}
                      tabIndex="-1"
                      // onMouseLeave={() => handleMouseLeave()} // Xử lý khi di chuột ra khỏi menu-list
                      {...attrs}
                    >
                      {category.map((item) => (
                        <div key={item._id}>
                          <Link
                            to={`/category?categoryId=${item._name}`}
                            state={{ keyId: `${item._id}` }}
                            className={cx("menu-body")}
                          >
                            {capitalizeFirstLetter(item._name)}
                          </Link>
                          {item._subCategory && (
                            <div className={cx("abc")}>
                              {item._subCategory.map((subCategory) => (
                                <Link
                                  state={{keyId: `${subCategory._id}`}}
                                  to={`?categoryId=${subCategory._name}`}
                                >
                                  {capitalizeFirstLetter(subCategory._name)}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                >
                  <div className={cx("menu", "d-flex align-items-center")}>
                    <MenuIcon />
                    <div className={cx("menu-text")}>
                      <span style={{ whiteSpace: "nowrap" }}>Danh Mục</span>
                    </div>
                  </div>
                </HeadlessTippy>
              </div>
              <div
                className={cx(
                  " d-flex align-items-center justify-content-between",
                  "search"
                )}
              >
                <Search />
              </div>

              <div
                className={cx(
                  "d-flex align-items-center justify-content-between",
                  "header__bot-nav-right"
                )}
              >
                {/* <div
                  className={cx("notification", "d-flex align-items-center")}
                >
                  <FontAwesomeIcon
                    className={cx("icon-notification")}
                    icon={faBell}
                  />
                  <div className={cx("notification-quantity")}>3</div>
                  <div className={cx("nav__text", "d-none d-lg-block")}>
                    <p>Thông báo</p>
                  </div>
                  <div className={cx("notification-box")}>
                    <h3>Thông báo mới nhận</h3>
                    <div className={cx("list-notification")}>
                      <div className={cx("item-notification")}>
                        <Image
                          className={cx("d-block", "img-notification")}
                          src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                          alt="logo"
                        />
                        <div className={cx("item-title")}>
                          <h4>Đơn hàng bạn đã được giao thành công</h4>
                          <p>
                            🛒 Giá rẻ nhất trong ngày 💥 Triệu deal hot đang chờ
                            🏃 Mua ngay trước khi hết!
                          </p>
                        </div>
                      </div>
                      <div className={cx("item-notification")}>
                        <Image
                          className={cx("d-block", "img-notification")}
                          src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                          alt="logo"
                        />
                        <div className={cx("item-title")}>
                          <h4>Đơn hàng bạn đã được giao thành công</h4>
                          <p>
                            🛒 Giá rẻ nhất trong ngày 💥 Triệu deal hot đang chờ
                            🏃 Mua ngay trước khi hết!
                          </p>
                        </div>
                      </div>
                      <div className={cx("item-notification")}>
                        <Image
                          className={cx("d-block", "img-notification")}
                          src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                          alt="logo"
                        />
                        <div className={cx("item-title")}>
                          <h4>ĐẠI TIỆC ĐỒNG GIÁ TỪ 9.000Đ</h4>
                          <p>🎉 Nhanh tay mua ngay trước khi hết hàng!</p>
                        </div>
                      </div>
                      <div className={cx("item-notification")}>
                        <Image
                          className={cx("d-block", "img-notification")}
                          src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg"
                          alt="logo"
                        />
                        <div className={cx("item-title")}>
                          <h4>Đơn hàng bạn đã được giao thành công</h4>
                          <p>
                            Freeship cho mọi đơn, giảm tối đa 15.000đ 🚛
                            Freeship đến 300.000đ cho đơn trên 100.000đ ⏰ Nhanh
                            tay đặt hàng, số lượng có hạn!
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to={"/notification"}>
                      <h3 className={cx("see-all", "text-center")}>
                        Xem tất cả
                      </h3>
                    </Link>
                  </div>
                </div> */}
                <div className={cx("account", "d-flex align-items-center")}>
                  <FontAwesomeIcon
                    className={cx("icon-user")}
                    icon={faCircleUser}
                    color="var(--primary)"
                  />
                  <div className={cx("nav__text", "d-none d-lg-block")}>
                    {!userName ? (
                      <p
                        className={cx("nav__text-login")}
                        onClick={handleShowLoginForm}
                      >
                        Đăng nhập
                      </p>
                    ) : (
                      <HeadlessTippy
                        delay={[0, 700]}
                        interactive
                        placement="bottom-end"
                        trigger="click"
                        render={(attrs) => (
                          <div className={cx("accout-result")}>
                            <Link to={"/profile"}>
                              <FontAwesomeIcon icon={faUser} />
                              <p>Xem hồ sơ</p>
                            </Link>
                            <Link to={"/check-order"}>
                              <FontAwesomeIcon icon={faTruckFast} />
                              <p>Theo dõi đơn hàng</p>
                            </Link>
                            <Link to={"/"} onClick={handleLogout}>
                              <FontAwesomeIcon icon={faArrowRightFromBracket} />
                              <p>Đăng Xuất</p>
                            </Link>
                          </div>
                        )}
                        // onHide={handleResetMenu}
                        hideOnClick
                      >
                        <div className={cx("d-flex")}>
                          <p>{user?._fname}</p>
                          <FontAwesomeIcon
                            icon={faSortDown}
                            className={cx("icon-down")}
                          />
                        </div>
                      </HeadlessTippy>
                    )}
                  </div>
                </div>
                <Link
                  to={"/cart"}
                  className={cx(
                    "cart",
                    "d-flex align-items-center justify-content-center"
                  )}
                >
                  <CartIcon />
                  <div className={cx("cart-quantity")}>{savedLengthCart}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobi */}
      <div className={cx("header__mobi")}>
        <div className={cx("header")}>
          <div
            className={cx("row d-flex", "header__mobi-top")}
            style={{ marginBottom: "8px" }}
          >
            <div className={cx("col-3")}>
              <a onClick={toggleMenu}>
                <FontAwesomeIcon className={cx("header-icon")} icon={faBars} />
              </a>
            </div>
            <div className={cx("col-6")}>
              <Link to={"/"} className={cx("logo")}>
                <Image
                  src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-mobile.svg"
                  alt="logo"
                />
              </Link>
            </div>
            <div
              className={cx("col-3 d-flex justify-content-end")}
              style={{ gap: "20px" }}
            >
              <div className={cx("cart")}>
                <Link to={"/cart"}>
                  <FontAwesomeIcon
                    className={cx("header-icon")}
                    icon={faCartShopping}
                  />
                </Link>
                <div className={cx("cart-quantity")}>3</div>
              </div>
              <div className={cx("account")}>
                <FontAwesomeIcon
                  className={cx("header-icon")}
                  icon={faCircleUser}
                />
              </div>
            </div>
          </div>
          <div className={cx("row", "header__mobi-bot")}>
            <div
              className={cx(
                " d-flex align-items-center justify-content-between",
                "search"
              )}
            >
              <Search />
            </div>
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        category={category}
      />
      {showModal && (
        <div className={cx("form-modal-wrapper")}>
          <Login
            isShown={showModal}
            handleCloseForm={() => handleCloseForm()}
            fetchUserInfo={fetchUserInfo}
            setUser={setUser}
            setShowModalForgetPassWord={setShowModalForgetPassWord}
            setShowModalSignup={setShowModalSignup}
          />
        </div>
      )}
      {showModalSignup && (
        <div className={cx("form-modal-wrapper")}>
          <Signup
            isShown={showModalSignup}
            setShowModalSignup={setShowModalSignup}
            setShowModal={setShowModal}
          />
        </div>
      )}
      {showModalForgetPassword && (
        <div className={cx("form-modal-wrapper")}>
          <ForgetPassword
            isShown={showModalForgetPassword}
            setShowModalForgetPassWord={setShowModalForgetPassWord}
            fetchUserInfo={fetchUserInfo}
            setShowModalRessetPassword={setShowModalRessetPassword}
          />
        </div>
      )}
      {showModalRessetPassword && (
        <div className={cx("form-modal-wrapper")}>
          <ResetPassWordByOTPForUsers
            setShowModal={setShowModal}
            setShowModalRessetPassword={setShowModalRessetPassword}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
