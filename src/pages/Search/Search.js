import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/sidebar";
import styles from "./Search.module.scss";
import SearchResult from "./SearchResult/searchResult";
import classNames from "classnames/bind";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { toast } from "react-toastify";
import * as searchSrvices from "../../services/searchService";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const cx = classNames.bind(styles);
function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("keyword");
  const [foundProducts, setFoundProducts] = useState([
    {
      _id: "",
      _name: "",
      _price: 0,
      _quantity: 0,
      _salePercent: 0,
      _sold: 0,
      _status: true,
      _images: [],
      _brandId: {
        _id: "",
        _name: "",
      },
    },
  ]);
  const data = location.state;

  // fetch products found
  useEffect(() => {
    const fetSearchResult = async () => {
      try {
        const response = await fetch(
          `https://cnpmmnhom14.onrender.com/api/products/get-by-keyId?categoryId=${data.keyId}&brandId=${data.keyId}`
        );
        if (!response.ok) {
          toast.error("Yêu cầu thất bại!");
        }
        const foundProducts = await response.json();
        setFoundProducts(foundProducts);
      } catch (error) {
        const result = await searchSrvices.search(searchQuery);
        setFoundProducts(result);
      }
    };
    fetSearchResult();
  }, [data, searchQuery]);
  return (
    <Container>
      <Row className={cx("main-section")}>
        <SearchResult foundProducts={foundProducts} />
      </Row>
    </Container>
  );
}
export default Search;
