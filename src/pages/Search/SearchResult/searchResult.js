import ColProductCard from "../../../components/Product/product";
import styles from "./searchResult.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import classNames from "classnames/bind";
import PaginationBar from "../../../components/PaginationBar/PaginationBar";
import ProductItem from "../../../components/Product/productItem";

const cx = classNames.bind(styles);
function SearchResult({ foundProducts }) {
  return (
    <>
      {foundProducts.length > 0 ? (
        <>
          <Col xs={12} sm={12} md={12} lg={12} className={cx("col-products")}>
            <div className={cx("row-products")}>
              <p className={cx("row-products-label")}>
                Tìm thấy {foundProducts.length} sản phẩm
              </p>
              <Row sm xs={2} md={4} lg={5} xl={5} style={{ gap: "20px 0" }}>
                {foundProducts.map((product, index) => (
                  <div className={cx("card-wrapper")}>
                    <ProductItem data={product} />
                  </div>
                ))}
              </Row>
            </div>
          </Col>
        </>
      ) : (
        <Col className={cx("col-products")}>
          <Row>
            <div className={cx("cart__null")}>
              <div className={cx("cart__null-icon")}>
                <FontAwesomeIcon icon={faFaceMeh} />
              </div>
              <div className={cx("cart__null-text")}>
                Không tìm thấy sản phẩm
              </div>
              <Button primary to={"/"}>
                Quay lại trang chủ
              </Button>
            </div>
          </Row>
        </Col>
      )}
    </>
  );
}

export default SearchResult;
