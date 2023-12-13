import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import ProductItem from "../../../components/Product/productItem";
const cx = classNames.bind(styles);
export function ProductSlider({
  dataDetail,
  title,
  row,
  styles,
  slidesToShow = 5,
  slidesToScroll = 3,
  dots = false,
  infinite,
}) {
  console.log("styles", styles);
  return (
    <Row className={cx("product-best-sale")} style={styles}>
      <Col span={24}>
        {title !== undefined ?? (
          <div className={cx("product-best__title")}>
            <div className={cx("title-slider__product")}>
              <h4>{title}</h4>
            </div>
            <Link to={"/search"}>
              <p className={cx("pCate")}>Xem Thêm</p>
            </Link>
          </div>
        )}

        <Slider
          dots={dots}
          infinite={true}
          speed={500}
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToScroll}
          rows={1}
          slidesPerRow={row}
        >
          {dataDetail?.map((item, index) => (
            <ProductItem key={index} data={item} />
          ))}
        </Slider>
      </Col>
    </Row>
  );
}
