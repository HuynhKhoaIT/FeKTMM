import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Image from "../../../components/Images";
import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  InstagramIcon,
} from "../../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function Footer() {
  const handleClick = () => {
    window.scrollTo(0, 0); // Di chuyển đến đầu trang (vị trí y=0)
  };
  return (
    <footer>
      <div className={cx("container", "footer")}>
        <div className={cx("row", "footer__content")}>
          <div className={cx(" col-lg-6 col-md-6")}>
            <div className={cx("col-md-4 col-lg-4")}>
              <div className={cx("logo")}>
                <Image
                  src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg"
                  alt="logo"
                />
              </div>
            </div>
            <div
              className={cx(
                "col-md-8 col-lg-8",
                "d-none d-md-block d-lg-block"
              )}
            >
              <div className={cx("footer__contact")}>
                <div className={cx("footer__contact-address")}>
                  01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
                </div>
                <div className={cx("contact")}>
                  <h3>Liên hệ</h3>
                  <div className={cx("footer__contact-phone")}>
                    <FontAwesomeIcon icon={faPhone} />
                    <a href="tel:0123.456.789">0123.456.789</a>
                  </div>
                  <div className={cx("footer__contact-mail")}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <a href="mailto:contact@gmail.com">contact@gmail.com</a>
                  </div>
                </div>
                {/* <div className={cx('footer__contact-certification')}>
                                    <p>Chứng nhận bởi</p>
                                    <Image
                                        src="https://shopfront-cdn.tekoapis.com/common/da-dang-ky.png"
                                        alt="certification"
                                    />
                                </div> */}
              </div>
            </div>
          </div>
          <div className={cx("col-lg-6 col-md-6")}>
            <div className={cx("row")}>
              <div className={cx("col-lg-3", "footer-policy")}>
                <h3>Chính sách</h3>
                <ul>
                  <li>
                    <a>Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a>Hệ thống bảo hành</a>
                  </li>
                  <li>
                    <a>Chính sách thanh toán</a>
                  </li>
                  <li>
                    <a>Giao hàng lắp đặt tại nhà</a>
                  </li>
                </ul>
              </div>
              <div className={cx("col-lg-3", "footer-pay")}>
                <h3>Thanh toán</h3>
                <ul>
                  <li>
                    <a>Ship Cod</a>
                  </li>
                  <li>
                    <a>Vnpay</a>
                  </li>
                </ul>
              </div>
              <div className={cx("col-lg-6", "footer-social")}>
                <h3>Theo dõi chúng tôi trên</h3>
                <FacebookIcon className={cx("icon-social")} />
                <YoutubeIcon className={cx("icon-social")} />
                <TiktokIcon className={cx("icon-social")} />
                <InstagramIcon className={cx("icon-social")} />
              </div>
              <div className={cx("footer-certification")}>
                <p>Chứng nhận bởi</p>
                <div className={cx("footer-certification-img")}>
                  <Image
                    src="https://mona.media/wp-content/uploads/2020/07/tai-sao-can-dang-ky-website-voi-bo-cong-thuong.jpg"
                    alt="certification"
                  />
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("footer-license")}>
                Copyright © 2023. Địa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức,
                Thành phố Hồ Chí Minh.
              </div>
            </div>
          </div>
        </div>
        <a className={cx("up-arrow")} onClick={handleClick}>
          <div className={cx("icon")}>
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
