import React from "react";
import { useState } from "react";
import styles from "./ProductInfo.module.scss";
import classNames from "classnames/bind";
import { AddIcon, MinusIcon } from "../../../components/Icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import * as cartService from "../../../services/cartService";
import addtocart from "../../../redux/Action";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
const cx = classNames.bind(styles);
function ProductInfo({ dataDetail }) {
  const [loading, setLoading] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const token = localStorage.getItem("token");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddQuantity = () => {
    try {
      if (dataDetail?._quantity === 0) {
        alert("Sản phẩm hiện tại hết hàng, vui lòng quay lại sau!");
      } else {
        quantity < dataDetail?._quantity
          ? setQuantity((prevQuantity) => prevQuantity + 1)
          : alert("Không được vượt quá số lượng sản phẩm trong kho");
      }
    } catch (err) {}
  };

  const handleMinusQuantity = () => {
    if (dataDetail?._quantity === 0) {
      alert("Sản phẩm hiện tại hết hàng, vui lòng quay lại sau!");
    } else {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  const handleAddToCartClick = async (itemId, itemQuantity = 1) => {
    setLoading(true);
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
          setLoading(false);
          try {
            const token = localStorage.getItem("token");
            const data = await cartService.getCartByUserId(token);
            dispatch(addtocart(data.length));
          } catch (error) {
            console.error(error);
          }
          toast.success("Thêm thành công sản phẩm vào giỏ hàng!");
        } else {
          setLoading(false);
          toast.error("Có lỗi xảy ra trong quá trình thêm giỏ hàng!");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình thêm giỏ hàng!");
        console.error("Error:", error);
      } finally {
        setLoading(false);

        console.log("Done!");
      }
    } else {
      setLoading(false);

      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    }
  };

  const handleCheckOutClick = (quantity) => {
    if (token) {
      if (dataDetail?._quantity === 0) {
        alert("Sản phẩm hiện tại hết hàng, vui lòng quay lại sau!");
      }
      setLoadingBuy(false);
      sessionStorage.setItem("selectedProductsId", dataDetail._id);
      sessionStorage.setItem("selectedQuntity", quantity);
    } else {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("flex-item", "pInfo")}>
        <p className={cx("pName")}>{dataDetail?._name}</p>
        <p className={cx("pBrand-wrapper")}>
          Thương hiệu:{" "}
          <span className={cx("pBrandName")}>{dataDetail?._brand}</span>
        </p>
        <div className={cx("price-group")}>
          <p className={cx("pNewPrice")}>
            {(
              dataDetail?._price -
              dataDetail?._price * (dataDetail?._salePercent / 100)
            ).toLocaleString("vi-VN")}
            đ
          </p>
          <p className={cx("pOldPrice")}>
            {dataDetail?._price.toLocaleString("vi-VN")}đ
          </p>
        </div>
        {dataDetail?._quantity === 0 ? (
          <p className={cx("pStatus-wrapper")}>
            Tình trạng: <span className={cx("pStatus")}> Hết hàng</span>
          </p>
        ) : (
          <p className={cx("pStatus-wrapper")}>
            Số lượng kho:{" "}
            <span className={cx("pStatus")}> {dataDetail?._quantity} </span>
          </p>
        )}
      </div>
      <div className={cx("flex-item", "pChooseQuantity")}>
        <p className={cx("choose-quantity-title")}>Chọn số lượng: </p>
        <div className={cx("choose-quantity-wrapper")}>
          <div
            className={cx("minus-wrapper")}
            onClick={() => handleMinusQuantity()}
          >
            <MinusIcon />
          </div>
          <div className={cx("quantity-wrapper")}>
            <input
              className={cx("quantity")}
              type="text"
              value={quantity}
              role="spinbutton"
            ></input>
          </div>
          <div
            className={cx("add-wrapper")}
            onClick={() => handleAddQuantity()}
          >
            <AddIcon />
          </div>
        </div>
      </div>
      <Flex gap={20} style={{ marginTop: "20px" }}>
        <Button
          loading={loadingBuy}
          type="primary"
          onClick={() => {
            setLoadingBuy(true);
            handleCheckOutClick(quantity);
          }}
        >
          <Link to={"/cart/checkout"}>Mua ngay</Link>
        </Button>
        <Button
          loading={loading}
          type="primary"
          ghost
          onClick={() => handleAddToCartClick(dataDetail?._id, quantity)}
        >
          Thêm vào giỏ
        </Button>
      </Flex>
    </div>
  );
}

export default ProductInfo;
