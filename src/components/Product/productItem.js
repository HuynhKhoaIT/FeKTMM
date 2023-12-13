import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./product.module.scss";
import { RatingStar } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);
function ProductItem({ data }) {
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
        <img src={data?._images?.[0]} />
      </div>
      <div className={cx("product-item__info")}>
        <Link
          to={`/product-detail?id=${data?._id}`}
          className={cx("product-item__name")}
        >
          {data?._name}
        </Link>
        <div className={cx("product-price")}>
          <p className={cx("product-item__price")}>
            {formatCurrency(
              data?._price - (data?._price * data?._salePercent) / 100
            )}
          </p>
          <p className={cx("product-item__price-sale")}>
            {formatCurrency(data?._price)}
          </p>
        </div>
      </div>
      <div className={cx("product-sale")}>
        {Math.round(data?._salePercent)}%
      </div>
    </div>
  );
}

export default ProductItem;
