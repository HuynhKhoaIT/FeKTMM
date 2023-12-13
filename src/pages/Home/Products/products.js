import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ColProductCard from "../../../components/Product/product";
import ViewAll from "../../../components/view-all/view-all";
import ImageSlider from "../../../components/Slider/slider";

import styles from "./products.module.scss";
import { ProductSlider } from "./productSlider";
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

  // get best selling products
  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/products/bestSelling"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        //console.log(data)
        setBestSellingProducts(data);
      } catch (error) {
        console.error("Không lấy được dữ liệu: ", error);
      }
    };
    fetchBestSellingProducts();
  }, []);

  //get on sale products
  useEffect(() => {
    const fetchOnSaleProducts = async () => {
      try {
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/products/onSale"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        //console.log(data)
        setOnSaleProducts(data);
      } catch (error) {
        console.error("Không lấy được dữ liệu: ", error);
      }
    };
    fetchOnSaleProducts();
  }, []);

  //get most searched products
  useEffect(() => {
    const fetchMostSearchedProducts = async () => {
      try {
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/products/mostSearched"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        //console.log(data)
        setMostSearchedProducts(data);
      } catch (error) {
        console.error("Không lấy được dữ liệu: ", error);
      }
    };
    fetchMostSearchedProducts();
  }, []);

  return (
    <>
      <ProductSlider
        dataDetail={mostSearchedProducts}
        title={"Sản phẩm được tìm kiếm nhiều nhất"}
        row={1}
      />
      <Row style={{ padding: "10px 40px 40px 40px" }}>
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
        dataDetail={bestSellingProducts}
        title={"Sản phẩm bán chạy nhất"}
        row={1}
      />
      <Row style={{ padding: "10px 40px 40px 40px" }}>
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
        dataDetail={onSaleProducts}
        title={"Sản phẩm đang sale"}
        row={1}
      />
      {/* <ProductSlider dataDetail={bestSellingProducts} /> */}
    </>
  );
}

export default Products;
