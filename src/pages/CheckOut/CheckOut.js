import classNames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPencil } from "@fortawesome/free-solid-svg-icons";
import ListCart from "../Cart/ListCart";
import CartItemCheckOut from "../../components/CartItemCheckOut";
import { CodIcon, PayIcon } from "../../components/Icons";
import Image from "../../components/Images";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import AddressForm from "./AddressForm/AddressForm";
import { useNavigate } from "react-router-dom";
import * as profileCustomer from "../../services/profileCustomerService";
import { useDispatch } from "react-redux";
import { postOrder, postOrderVnpay } from "../../services/orderService";
import e from "cors";
import * as cartService from "../../services/cartService";
import addtocart from "../../redux/Action";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function CheckOut() {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [order, setOrder] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const dataValues = cartItems.map((item) => item[1]);
  const [user, setUser] = useState();
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("selectedProducts");
    const fetchData = async () => {
      try {
        const { data } = await profileCustomer.getUser(token);
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      const item = sessionStorage.getItem("selectedProductsId");
      const quantity = sessionStorage.getItem("selectedQuntity");
      const listorder = [];
      getProducts(item)
        .then((listItemObject) => {
          listorder.push(listItemObject);
          listorder.push({ itemId: item, quantity: quantity });
          const newArray = [];

          newArray.push(listorder);

          setCartItems(newArray);
          console.log(newArray);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);
  async function getProducts(itemId) {
    try {
      const response = await fetch(
        `https://cnpmmnhom14.onrender.com/api/products/${itemId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const productData = await response.json();

      return productData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  useEffect(() => {
    const initialAddressInfo = {
      fullName: user?._lname,
      phoneNumber: user?._phones[0],
      email: user?._email,
      province: "",
      district: "",
      ward: "",
      address: user?._addresses[0],
    };
    setAddressInfo(initialAddressInfo);
  }, [user]);

  const [addressInfo, setAddressInfo] = useState();

  const handleSave = (newAddressInfo) => {
    setAddressInfo(newAddressInfo);
    setChangeAddress(false);
  };

  const shippingFee = 30000;
  const shippingFeeDiscount = 0;
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // xóa sản phẩm ra khỏi giỏ hàng
  const deleteItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item[0]._id !== itemId)
    );
    sessionStorage.setItem("selectedProducts", []);
    sessionStorage.setItem("selectedProductsId", null);
    sessionStorage.setItem("selectedQuntity", 0);

    if (cartItems.length === 1) {
      navigate("/cart");
    }
  };

  // Tạm tính giá trị đơn hàng
  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item[0]._price * item[1].quantity,
      0
    );
  };
  const subtotal = calculateSubTotal();

  // Tính tổng giá trị đơn hàng
  const totalPayment =
    subtotal + shippingFee - shippingFeeDiscount - voucherDiscount;

  const handleRetryPayment = () => {
    // Xử lý khi người dùng bấm "Thanh toán lại"
    setIsOrderPlaced(null);
  };

  const handleContinueShopping = () => {
    // Xử lý khi người dùng bấm "Tiếp tục mua sắm"
    setIsOrderPlaced(null);
  };

  // Xóa dữ liệu trong sessionStorage khi người dùng nhấn F5
  // Kiểm tra trạng thái isOrderPlaced khi người dùng nhấn F5
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isOrderPlaced) {
        sessionStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOrderPlaced]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token");
    console.log(addressInfo.address);
    if (
      addressInfo.address &&
      addressInfo.ward &&
      addressInfo.district &&
      addressInfo.province &&
      addressInfo.phoneNumber
    ) {
      if (paymentMethod === "shipcod") {
        // Tạo dữ liệu đơn hàng
        const orderData = {
          _address:
            addressInfo.address +
            ", " +
            addressInfo.ward +
            ", " +
            addressInfo.district +
            ", " +
            addressInfo.province,
          _name: addressInfo?.fullName,
          _phone: addressInfo.phoneNumber,
          _status: 0,
          _totalPayment: totalPayment,
          _note: note,
          // _uId: token,
          _shippingFee: shippingFee,
          _items: dataValues,
        };
        // Gửi yêu cầu POST đến API endpoint

        postOrder(token, orderData)
          .then(async (response) => {
            if (response !== null) {
              setOrder(response);
              setIsOrderPlaced(true);
              try {
                const token = localStorage.getItem("token");
                const data = await cartService.getCartByUserId(token);
                dispatch(addtocart(data.length));
              } catch (error) {
                console.error(error);
              }
            } else {
              setIsOrderPlaced(false);
            }
          })
          .catch((error) => {
            console.error("Lỗi khi đặt hàng:", error);
            setIsOrderPlaced(false);
          });

        sessionStorage.setItem("selectedProducts", []);
        sessionStorage.setItem("selectedProductsId", null);
        sessionStorage.setItem("selectedQuntity", 0);
      } else if (paymentMethod === "vnpay") {
        // Tạo dữ liệu đơn hàng
        const orderData = {
          amount: totalPayment,
          bankCode: "NCB",
          orderDescription: `Nap tien cho thue bao ${addressInfo.phoneNumber}. So tien ${totalPayment} VND`,
          orderType: "100000",
          language: "vn",
          _address: addressInfo.address,
          _name: addressInfo.fullName,
          _phone: addressInfo.phoneNumber,
          _status: 0,
          _totalPayment: totalPayment,
          // _uId: userId,
          _shippingFee: shippingFee,
          _items: dataValues,
        };
        // Gửi yêu cầu POST đến API endpoint

        postOrderVnpay(orderData)
          .then((response) => {
            // if (response !== null) {
            //     setIsOrderPlaced(true);
            // } else {
            //     setIsOrderPlaced(false);
            // }
          })
          .catch((error) => {
            console.error("Lỗi khi đặt hàng:", error);
            setIsOrderPlaced(false);
          });
        sessionStorage.setItem("selectedProducts", []);
        sessionStorage.setItem("selectedProductsId", null);
        sessionStorage.setItem("selectedQuntity", 0);
      } else {
        alert("Vui lòng chọn hình thức thanh toán trước khi đặt hàng.");
      }
    } else {
      toast.warn("Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <div className={cx("wrapper")}>
      {isOrderPlaced === null && (
        <>
          <h2 className={cx("d-flex justify-content-center", "title")}>
            Thanh Toán
          </h2>

          <div className={cx("container")}>
            <div className={cx("row", "address")}>
              <div className={cx("address-title", "d-flex")}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={cx("address-icon")}
                />
                <h3>Địa chỉ nhận hàng</h3>
              </div>
              <div
                className={cx("d-flex justify-content-between", "address-text")}
              >
                <div>
                  <span>
                    {addressInfo?.fullName} {addressInfo?.phoneNumber}
                  </span>{" "}
                  {addressInfo?.address} {addressInfo?.ward}
                  {addressInfo?.district} {addressInfo?.province}
                </div>
                <div>
                  <a onClick={() => setChangeAddress(true)}>
                    <FontAwesomeIcon
                      className={cx("icon-repair")}
                      icon={faPencil}
                    />
                    <p
                      className={cx(
                        "d-none d-md-inline-block d-lg-inline-block"
                      )}
                    >
                      Thay đổi
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div
                className={cx(
                  "col-lg-8 col-md-12",
                  "d-flex flex-column",
                  "order-left"
                )}
              >
                <div className={cx("row align-items-center", "header")}>
                  <div
                    className={cx(
                      "col-lg-6 col-md-6",
                      "header__products",
                      "d-flex"
                    )}
                  >
                    <p>Chi tiết sản phẩm</p>
                  </div>
                  <div
                    className={cx(
                      "col-lg-6 col-md-6 row text-center",
                      "header__info"
                    )}
                  >
                    <div className={cx("col-lg-3 col-md-3")}>
                      <p>Đơn giá</p>
                    </div>
                    <div className={cx("col-lg-3 col-md-3")}>
                      <p>Số lượng</p>
                    </div>
                    <div className={cx("col-lg-3 col-md-3")}>
                      <p>Thành tiền</p>
                    </div>
                    <div className={cx("col-lg-3 col-md-3")}>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div
                  className={cx(
                    "row align-items-center",
                    "checkout__cart-detail"
                  )}
                >
                  <ListCart>
                    {cartItems.map((item) => (
                      <CartItemCheckOut
                        key={item[0]._id}
                        itemName={item[0]._name}
                        itemImage={item[0]._images[1]}
                        itemPrice={item[0]._price}
                        itemQuantity={item[1].quantity}
                        deleteItem={() => {
                          deleteItem(item[0]._id);
                        }}
                      />
                    ))}
                  </ListCart>
                </div>
                <div className={cx("row", "payment-form")}>
                  <div className={cx("payment-title")}>
                    <h3>Hình thức thanh toán</h3>
                  </div>
                  <div className={cx("payment-list", "d-flex flex-column")}>
                    <label className={cx("d-flex")}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="shipcod"
                        checked={paymentMethod === "shipcod"}
                        onChange={handlePaymentMethodChange}
                        required
                      />
                      <div className={cx("payment-logo")}>
                        <CodIcon />
                      </div>
                      Thanh toán tiền mặt khi nhận hàng (COD)
                    </label>
                    {/* <label className={cx('d-flex')}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="bankTransfer"
                                                checked={paymentMethod === 'bankTransfer'}
                                                onChange={handlePaymentMethodChange}
                                                required
                                            />
                                            <div className={cx('payment-logo')}>
                                                <PayIcon />
                                            </div>
                                            Chuyển khoản
                                        </label> */}
                    {/* <label className={cx('d-flex')}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="vnpay"
                                                checked={paymentMethod === 'vnpay'}
                                                onChange={handlePaymentMethodChange}
                                                required
                                            />
                                            <div className={cx('payment-logo')}>
                                                <Image
                                                    className={cx('payment')}
                                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                                    alt="vnpay"
                                                />
                                            </div>
                                            Thanh toán bằng VNPAY
                                        </label> */}
                  </div>
                </div>
                {/* <div className={cx("row", "order-note")}>
                  <div className={cx("order-note-text")}>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Ghi chú
                    </label>
                    <textarea
                      placeholder="Nhập lời nhắn cho cửa hàng hoặc đơn vị vận chuyển"
                      className={cx("form-control", "font-size-16")}
                      id="exampleFormControlTextarea1"
                      rows="5"
                      value={note} // Hiển thị giá trị từ trạng thái note
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>
                  <label className={cx("d-flex")}>
                    <input type="checkbox" name="paymentInfo" />
                    Thông tin xuất hóa đơn
                  </label>
                </div> */}
              </div>
              <div className={cx("col-lg-4 col-md-12")}>
                <div className={cx("row", "order__info-form")}>
                  <div className={cx("order__info-title")}>
                    <h3>Thông tin đơn hàng</h3>
                  </div>
                  {/* <div className={cx('order__info-discount')}>
                                        <h4>Mã giảm giá</h4>
                                        <div className={cx('d-flex', 'discount-input')}>
                                            <input placeholder="ABCXYZ" />
                                            <Button primary small>
                                                Áp dụng
                                            </Button>
                                        </div>
                                    </div> */}
                  <div>
                    <div className={cx("order__info")}>
                      <div className={cx("order__info-detail")}>
                        <div
                          className={cx(
                            "d-flex justify-content-between align-items-center",
                            "subtotal"
                          )}
                        >
                          <h4>Tạm tính</h4>
                          <p>{subtotal.toLocaleString("vi-VN")}₫</p>
                        </div>
                        <div
                          className={cx(
                            "d-flex justify-content-between align-items-center",
                            "shipping-fee"
                          )}
                        >
                          <h4>Phí vận chuyển</h4>
                          <p>{shippingFee.toLocaleString("vi-VN")}₫</p>
                        </div>
                        <div
                          className={cx(
                            "d-flex justify-content-between align-items-center",
                            "discounted-shipping-fee"
                          )}
                        >
                          <h4>Giảm giá phí vận chuyển</h4>
                          <p>{shippingFeeDiscount.toLocaleString("vi-VN")}₫</p>
                        </div>

                        <div
                          className={cx(
                            "d-flex justify-content-between align-items-center",
                            "discounted-voucher"
                          )}
                        >
                          <h4>Giảm giá voucher</h4>
                          <p>{voucherDiscount.toLocaleString("vi-VN")}₫</p>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "order__info-total",
                          "d-flex justify-content-between"
                        )}
                      >
                        <p>Tổng thanh toán</p>
                        <div className={cx("total-payment", "text-end")}>
                          <p>{totalPayment.toLocaleString("vi-VN")}đ</p>
                          <h4>Đã bao gồm VAT nếu có</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("btn-order")}>
                    <Button onClick={handlePlaceOrder} primary>
                      Đặt hàng
                    </Button>
                  </div>
                  <div className={cx("text-center")}>
                    Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                    <a href="/" style={{ color: "#1d6fdf" }}>
                      Chính sách đặt hàng
                    </a>{" "}
                    của chúng tôi.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Khi đặt hàng thành công */}
      {isOrderPlaced === true && (
        <div className={cx("inner", "wrapper-success")}>
          <div className={cx("container")}>
            <div className={cx("row justify-content-center", "order__success")}>
              <div className={cx("col-lg-10", "order__success-full")}>
                <div className={cx("order__success-title", "text-center")}>
                  <h1>Đặt hàng thành công</h1>
                  <p>
                    Cảm ơn quý khách đã tin tưởng lựa chọn sản phẩm/dịch vụ của
                    chúng tôi.Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong
                    thời gian sớm nhất. Nếu cần hỗ trợ quý khách vui lòng gọi
                    hotline <a href='tel:"18006666"'>1800 6666</a> (miễn phí
                    cước) để được tư vấn miễn phí.
                  </p>
                </div>
                <div className={cx("info-client")}>
                  <div className={cx("info-client-title")}>
                    <h3>Thông tin khách hàng</h3>
                  </div>
                  <div className={cx("info-client-content")}>
                    <div
                      className={cx(
                        "info-client-name",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>Họ và tên</div>
                      <div className={cx("col-lg-8", "text-2")}>
                        {addressInfo?.fullName}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-client-phone",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Số điện thoại
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        {addressInfo?.phoneNumber}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-client-email",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>Email</div>
                      <div className={cx("col-lg-8", "text-2")}>
                        {addressInfo?.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("info-order")}>
                  <div className={cx("info-order-title")}>
                    <h3>Thông tin đặt hàng</h3>
                  </div>
                  <div
                    className={cx("info-order-content", "d-flex flex-column")}
                  >
                    <div
                      className={cx(
                        "info-order-code",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Mã đơn hàng
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        {order._id}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-order-address",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Địa chỉ nhận hàng
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        {addressInfo?.address +
                          addressInfo?.ward +
                          addressInfo?.district +
                          addressInfo?.province}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-order-pay",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Phương thức thanh toán
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        Thanh toán tiền mặt khi nhận hàng (COD)
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-order-note",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>Ghi chú</div>
                      <div className={cx("col-lg-8", "text-2")}>{note}</div>
                    </div>
                  </div>
                </div>
                <div className={cx("ordered-product")}>
                  <div className={cx("ordered-product-title")}>
                    <h3>Sản phẩm đã đặt</h3>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className={cx(
                        "ordered-product-item",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("ordered-product-left", "d-flex")}>
                        <div className={cx("product-img")}>
                          <Image src={item[0]._images[0]} alt="img" />
                        </div>
                        <div className={cx("product__info")}>
                          <h4 className={cx("product__info-name")}>
                            {item[0]._name}
                          </h4>
                          <div
                            className={cx("product__info-memory", "d-flex")}
                          ></div>
                        </div>
                      </div>
                      <div className={cx("product-right")}>
                        <p className={cx("product-price", "text-end")}>
                          {parseInt(item[0]._price).toLocaleString("vi-VN")}₫
                        </p>
                        <p className={cx("product-quantity", "text-end")}>
                          x<span>{item[1].quantity}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cx("order__info")}>
                  <div
                    className={cx("order__info-detail", "d-flex flex-column")}
                  >
                    <div
                      className={cx(
                        "d-flex justify-content-between align-items-center",
                        "subtotal"
                      )}
                    >
                      <h4>Tạm tính</h4>
                      <p>{subtotal.toLocaleString("vi-VN")}₫</p>
                    </div>
                    <div
                      className={cx(
                        "d-flex justify-content-between align-items-center",
                        "shipping-fee"
                      )}
                    >
                      <h4>Phí vận chuyển</h4>
                      <p>{shippingFee.toLocaleString("vi-VN")}₫</p>
                    </div>
                    <div
                      className={cx(
                        "d-flex justify-content-between align-items-center",
                        "discounted-shipping-fee"
                      )}
                    >
                      <h4>Giảm giá phí vận chuyển</h4>
                      <p>{shippingFeeDiscount.toLocaleString("vi-VN")}₫</p>
                    </div>

                    <div
                      className={cx(
                        "d-flex justify-content-between align-items-center",
                        "discounted-voucher"
                      )}
                    >
                      <h4>Giảm giá voucher</h4>
                      <p>{voucherDiscount.toLocaleString("vi-VN")}₫</p>
                    </div>
                  </div>
                  <div
                    className={cx(
                      "order__info-total",
                      "d-flex justify-content-between"
                    )}
                  >
                    <p>Tổng thanh toán</p>
                    <div className={cx("total-payment", "text-end")}>
                      <p>{totalPayment.toLocaleString("vi-VN")}đ</p>
                    </div>
                  </div>
                </div>
                <div
                  className={cx(
                    "btn-continuel",
                    "d-flex justify-content-center"
                  )}
                >
                  <Button to={"/"} primary onClick={handleContinueShopping}>
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Khi đặt hàng thất bại */}
      {isOrderPlaced === false && (
        <div className={cx("inner", "wrapper-success")}>
          <div className={cx("container")}>
            <div className={cx("row justify-content-center", "order__success")}>
              <div className={cx("col-lg-10", "order__success-full")}>
                <div className={cx("order__success-title", "text-center")}>
                  <h1>Thanh toán thất bại</h1>
                  <p>
                    <span>Thanh toán thất bại.</span> Vui lòng thanh toán lại
                    hoặc chọn phương thức thanh toán khác
                  </p>
                </div>

                <div className={cx("info-order")}>
                  <div
                    className={cx("info-order-content", "d-flex flex-column")}
                  >
                    <div
                      className={cx(
                        "info-order-code",
                        "d-flex justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Mã đơn hàng
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>KHOA123</div>
                    </div>
                    <div
                      className={cx(
                        "info-order-address",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Địa chỉ nhận hàng
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        Chung cư Văn Hoàng, 890 Nguyễn Thị Minh Khai, Phường
                        Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-order-pay",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>
                        Phương thức thanh toán
                      </div>
                      <div className={cx("col-lg-8", "text-2")}>
                        Thanh toán tiền mặt khi nhận hàng (COD)
                      </div>
                    </div>
                    <div
                      className={cx(
                        "info-order-note",
                        "d-flex flex-column flex-md-row flex-lg-row justify-content-between"
                      )}
                    >
                      <div className={cx("col-lg-4", "text-1")}>Ghi chú</div>
                      <div className={cx("col-lg-8", "text-2")}>
                        Giao cẩn thận, hàng dễ vỡ
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("order__info")}>
                  <div
                    className={cx(
                      "order__info-total",
                      "d-flex justify-content-between"
                    )}
                  >
                    <p>Tổng tiền cần thanh toán</p>
                    <div className={cx("total-payment", "text-end")}>
                      <p>{totalPayment.toLocaleString("vi-VN")}đ</p>
                    </div>
                  </div>
                </div>
                <div
                  className={cx(
                    "btn-continuel",
                    "d-flex flex-column flex-md-row flex-lg-row align-items-center justify-content-center"
                  )}
                >
                  <Button to={"/"} outline onClick={handleContinueShopping}>
                    Tiếp tục mua sắm
                  </Button>
                  <Button
                    className={cx("pay-back")}
                    to={""}
                    primary
                    onClick={handleRetryPayment}
                  >
                    Thanh toán lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* form thay đổi địa chỉ mặc định */}
      {changeAddress && (
        <AddressForm
          addressInfo={addressInfo}
          onSave={handleSave}
          onCancel={() => setChangeAddress(false)}
        />
      )}
    </div>
  );
}

export default CheckOut;
