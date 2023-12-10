import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import ProductItem from "../../../components/Product/productItem";
const cx = classNames.bind(styles);
export function ProductSlider({ dataDetail }) {
  return (
    <Row className={cx("product-best-sale")}>
      <Col span={24}>
        <div className={cx("product-best__title")}>
          <div className={cx("title-slider__product")}>
            <h4>SẢN PHẨM BÁN CHẠY NHẤT</h4>
          </div>
          <Link to={"/search"}>
            <p className={cx("pCate")}>Xem Thêm</p>
          </Link>
        </div>
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={5}
          slidesToScroll={3}
        >
          {dataDetail?.map((item, index) => (
            <ProductItem key={index} data={item} />
          ))}
        </Slider>
      </Col>
    </Row>
  );
}
