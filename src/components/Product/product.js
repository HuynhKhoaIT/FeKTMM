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
const btnText = "Thêm vào giỏ";
function ProductCard(props) {
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

  return (
    <Card style={{ width: "100%" }} className={cx("pCard")}>
      <div className={cx("pImg-wrapper")}>
        {props.salePercents > 0 && (
          <p className={cx("sale-tag")}>-{props.salePercents}%</p>
        )}
        <Link to={`/product-detail?id=${props.pId}`}>
          <Card.Img className={cx("pImg")} variant="top" src={props.url} />
        </Link>
      </div>
      <Card.Body className={cx("card-content")}>
        <Link to={"/search"}>
          <p className={cx("pCate")}>{capitalizeFirstLetter(props.pCate)}</p>
        </Link>

        <Link to={`/product-detail?id=${props.pId}`}>
          <Card.Title className={cx("pName")}>
            {capitalizeFirstLetter(props.pName)}
          </Card.Title>
        </Link>

        <div className={cx("pPrice")}>
          <span className={cx("oldPrice")}>
            {props.oldPrice.toLocaleString("vi-VN")}đ
          </span>
          <span className={cx("newPrice")}>
            {(
              props.oldPrice -
              props.oldPrice * (props.salePercents / 100)
            ).toLocaleString("vi-VN")}
            đ
          </span>
        </div>
        {/* <div className={cx('rating-display')}>
                    <div className={cx('rating-stars')}>
                        <div className={cx('stars')}>
                            <div className={cx('stars-wrapper')}>
                                {renderStars(props.stars)}
                            </div>
                        </div>
                        <span className={cx('ratingNumber')}>({props.ratingNumber})</span>
                    </div>
                    <span className={cx('origin')}>{props.origin}</span>
                </div> */}
        <div className={cx("btn-wrapper")}>
          <Button
            className={cx("btn-add-to-cart")}
            variant="primary"
            onClick={(e) => handleAddToCartClick(props.pId)}
          >
            {btnText}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
