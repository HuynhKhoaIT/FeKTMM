import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./product.module.scss";
import { RatingStar } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);
function ProductItem(data) {
  const token = localStorage.getItem("token");
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <div className={cx("star-styles")}>
          <RatingStar key={i} />
        </div>
      );
    }

    return stars;
  };

  const capitalizeFirstLetter = (word) => {
    if (!word) {
      return ""; // Return an empty string or handle the case when word is undefined or empty
    } else return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleAddToCartClick = async (itemId, itemQuantity = 1) => {
    if (token) {
      try {
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/carts/add-to-cart",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              itemId: itemId,
              quantity: itemQuantity,
            }),
          }
        );

        if (response.ok) {
          toast.success("Thêm thành công sản phẩm vào giỏ hàng!");
        } else {
          toast.error("Có lỗi xảy ra trong quá trình thêm giỏ hàng!");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình thêm giỏ hàng!");
        console.error("Error:", error);
      } finally {
        console.log("Done!");
      }
    } else {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    }
  };
  const formatCurrency = (price) => {
    const formattedPrice = Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    // Loại bỏ ký hiệu đơn vị để chỉ lấy phần số
    const parts = formattedPrice.split(" ");
    const priceWithoutSymbol = parts[0];

    return `${priceWithoutSymbol}`;
  };
  return (
    <div className={cx("product-item")}>
      <div className={cx("product-item__img")}>
        <img src="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp" />
      </div>
      <div className={cx("product-item__info")}>
        <Link
          to={`/product-detail?id=${data?.data?._id}`}
          className={cx("product-item__name")}
        >
          {data?.data?._name}
        </Link>
        <div className={cx("product-price")}>
          <p className={cx("product-item__price")}>
            {formatCurrency(
              data?.data?._price -
                (data?.data?._price * data?.data?._salePercent) / 100
            )}
          </p>
          <p className={cx("product-item__price-sale")}>
            {formatCurrency(data?.data?._price)}
          </p>
        </div>
      </div>
      <div className={cx("product-sale")}>
        {Math.round(data?.data?._salePercent)}%
      </div>
    </div>
  );
}

export default ProductItem;
