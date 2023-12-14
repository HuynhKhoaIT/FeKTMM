import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ColProductCard from "../../../components/Product/product";
import ViewAll from "../../../components/view-all/view-all";
import ImageSlider from "../../../components/Slider/slider";
import { toast } from "react-toastify";

import styles from "./products.module.scss";
import { ProductSlider } from "./productSlider";
import {
  getAllProductsBestSeller,
  getAllProductsByCategory,
  getAllProductsMoreSearch,
  getAllProductsOnSale,
} from "../../../services/productService";
const cx = classNames.bind(styles);
function Products() {
  const [bestSellingProducts, setBestSellingProducts] = useState([
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

  const [onSaleProducts, setOnSaleProducts] = useState([
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

  const [mostSearchedProducts, setMostSearchedProducts] = useState([
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

  const [laptopData, setLoptopData] = useState([]);

  // get best selling products
  const fetchBestSellingProducts = async () => {
    try {
      const data = await getAllProductsBestSeller();
      setBestSellingProducts(data);
    } catch (error) {
      console.error("Không lấy được dữ liệu: ", error);
    }
  };

  //get on sale products
  const fetchOnSaleProducts = async () => {
    try {
      const data = await getAllProductsOnSale();
      setOnSaleProducts(data);
    } catch (error) {
      console.error("Không lấy được dữ liệu: ", error);
    }
  };
  //get most searched products
  const fetchMostSearchedProducts = async () => {
    try {
      const data = await getAllProductsMoreSearch();
      setMostSearchedProducts(data);
    } catch (error) {
      console.error("Không lấy được dữ liệu: ", error);
    }
  };

  const fetSearchResult = async () => {
    try {
      const data = await getAllProductsByCategory(1);
      setLoptopData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBestSellingProducts();
    fetchOnSaleProducts();
    fetchMostSearchedProducts();
    fetSearchResult();
  }, []);

  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);
  console.log("windowSize", windowSize);
  return (
    <>
      <ProductSlider
        slidesToShow={windowSize < 765 ? 3 : 5}
        dataDetail={mostSearchedProducts}
        title={"Sản phẩm được tìm kiếm nhiều nhất"}
        row={1}
      />
      <Row style={{ padding: "10px 0 40px 0" }}>
        <a>
          <img
            style={{ width: "auto", height: "115px" }}
            src={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2023/12/07/chuyen-muc-noen-1.gif"
            }
          />
        </a>
      </Row>

      <ProductSlider
        slidesToShow={windowSize < 765 ? 3 : 5}
        dataDetail={bestSellingProducts}
        title={"Sản phẩm bán chạy nhất"}
        row={1}
      />
      <Row style={{ padding: "10px 0 40px 0" }}>
        <a>
          <img
            style={{ width: "100%" }}
            src={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2023/12/01/redmi-note12-04.jpg"
            }
          />
        </a>
      </Row>
      <ProductSlider
        slidesToShow={windowSize < 765 ? 3 : 5}
        dataDetail={onSaleProducts}
        title={"Sản phẩm đang sale"}
        row={1}
      />
      {/* <ProductSlider
      slidesToShow={windowSize<765 ?3:5} dataDetail={bestSellingProducts} /> */}
    </>
  );
}

export default Products;
