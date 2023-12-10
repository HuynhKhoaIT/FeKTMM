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
          "https://cnpmmnhom14.onrender.com/api/products/bestSelling/"
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
        const response = await fetch("/api/products/mostSearched");
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
    // <div className={cx("col-products")}>
    //   <div id="top-sale-section" className={cx("row-products")}>
    //     <h2 className={cx("row-products-label")}>Sản phẩm bán chạy nhất</h2>
    //     <Row sm xs={2} md={3} lg={3} xl={5}>
    //       {bestSellingProducts.map((product, index) => (
    //         <div className={cx("card-wrapper")}>
    //           <ColProductCard
    //             key={product._id}
    //             pId={product._id}
    //             url="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp"
    //             pCate={product._brandId._name}
    //             pName={product._name}
    //             oldPrice={product._price}
    //             salePercents={product._salePercent}
    //             count={1}
    //           />
    //         </div>
    //       ))}
    //     </Row>
    //   </div>

    //   {/* Sản phẩm đang sale */}
    //   <div id="on-sale-section" className={cx("row-products")}>
    //     <p className={cx("row-products-label")}>Sản phẩm đang sale</p>
    //     <Row sm xs={2} md={3} lg={3} xl={5}>
    //       {onSaleProducts.map((product, index) => (
    //         <div className={cx("card-wrapper")}>
    //           <ColProductCard
    //             key={product._id}
    //             pId={product._id}
    //             url="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp"
    //             pCate={product._brandId._name}
    //             pName={product._name}
    //             oldPrice={product._price}
    //             salePercents={product._salePercent}
    //             count={1}
    //           />
    //         </div>
    //       ))}
    //     </Row>
    //     <div className={cx("view-all-products")}>
    //       <ViewAll />
    //     </div>
    //   </div>

    //   {/*Most searched  */}
    //   <div id="top-search-section" className={cx("row-products")}>
    //     <p className={cx("row-products-label")}>
    //       Sản phẩm được tìm kiếm nhiều nhất
    //     </p>
    //     <Row sm xs={2} md={3} lg={3} xl={5}>
    //       {mostSearchedProducts.map((product, index) => (
    //         <div className={cx("card-wrapper")}>
    //           <ColProductCard
    //             key={product._id}
    //             pId={product._id}
    //             url="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp"
    //             pCate={product._brandId._name}
    //             pName={product._name}
    //             oldPrice={product._price}
    //             salePercents={product._salePercent}
    //             count={1}
    //           />
    //         </div>
    //       ))}
    //     </Row>
    //   </div>
    // </div>
    <>
      <ProductSlider
        dataDetail={mostSearchedProducts}
        title={"Sản phẩm được tìm kiếm nhiều nhất"}
        row={1}
      />
      <ProductSlider
        dataDetail={bestSellingProducts}
        title={"Sản phẩm bán chạy nhất"}
        row={1}
      />
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
