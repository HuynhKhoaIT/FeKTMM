import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import Image from "../../components/Images";
import Button from "../../components/Button";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import * as product from "../../services/productService";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import ProductItem from "../../components/Product/productItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import SearchResult from "../Search/SearchResult/searchResult";
import Loading from "../../components/loading";

const cx = classNames.bind(styles);
function Category() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const queryParams = new URLSearchParams(useLocation().search);
  // Access individual query parameters
  const categoryId = queryParams.get("categoryId");
  const data = location.state;
  useEffect(() => {
    setLoading(true);
    // Hàm fetch dữ liệu sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const listProducts = await product.getAllProductsByCategory(data.keyId);
        setProducts(listProducts); // Lưu dữ liệu sản phẩm vào state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // setLoading(false);
      }
    };

    fetchProducts();
  }, [data.keyId]);
  return (
    <Container>
      <Loading show={loading} />
      <Row className={cx("main-section")}>
        <SearchResult foundProducts={products} />
      </Row>
    </Container>
  );
}

export default Category;
