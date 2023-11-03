import React, { useEffect, useState } from 'react';
import styles from './OrderDetailAdmin.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import OrderListDetailItem from '../../../components/OrderListDetailItem';
import * as orderAdminService from '../../../services/orderAdminService';
const cx = classNames.bind(styles);

function OrderDetailAdmin({ id, rollbackListOrder }) {
    const [reloadData, setReloadData] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await orderAdminService.getOrder(id);
            setOrderItems(result._items);
            setOrder(result);
        };
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [id, reloadData]);

    const sendToShipper = async (orderId) => {
        const result = await orderAdminService.updateOrder(orderId, { _status: 1 });
        if (result === 1) {
            setReloadData(true);
        }
    };
    const cancelOrder = async (orderId) => {
        const result = await orderAdminService.updateOrder(orderId, { _status: 3 });
        if (result === 1) {
            setReloadData(true);
        }
    };
    return (
        <>
            <div className={cx('d-flex align-items-center ', 'title')}>
                <a onClick={rollbackListOrder} className={cx('arrow-left-icon')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </a>
                Chi tiết đơn hàng
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('container-fluid')}>
                        <div className={cx('row', 'header')}>
                            <div className={cx('col-md-6 col-lg-6 col-6', 'order-code')}>
                                <p>Mã đơn hàng: {order._id}</p>
                            </div>
                            <div
                                className={cx(
                                    'col-md-6 col-lg-6 col-6 d-flex justify-content-end text-primary',
                                    'order-status',
                                )}
                            >
                                {order._status === 0 ? (
                                    <p>Chưa giao</p>
                                ) : order._status === 1 ? (
                                    <p>Đang giao</p>
                                ) : order._status === 2 ? (
                                    <p>Đã giao</p>
                                ) : (
                                    <p>Đã hủy</p>
                                )}
                            </div>
                        </div>
                        <div className={cx('row', 'shipment-details')}>
                            <h2>THÔNG TIN GIAO HÀNG</h2>
                            <h4>{order._name}</h4>
                            <p>{order._address}</p>
                            <p>{order._phone}</p>
                        </div>
                        <div className={cx('row', 'order-details')}>
                            <div className={cx('list-items')}>
                                {orderItems.map((item) => (
                                    <OrderListDetailItem key={item.itemId} id={item.itemId} quantity={item.quantity} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('row', 'total-fee')}>
                            <div className={cx('col-md-6 col-lg-6')}></div>
                            <div className={cx('col-md-6 col-lg-6')}>
                                <div className={cx('row', 'ship-fee')}>
                                    <div className={cx('col-md-6 col-lg-6 col-6')}>
                                        <h2>Phí vận chuyển: </h2>
                                    </div>
                                    <div className={cx('col-md-6 col-lg-6 col-6')}>
                                        <div className={cx('d-flex justify-content-end')}>
                                            <p>{parseInt(order._shippingFee).toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row', 'order-fee')}>
                                    <div className={cx('col-md-6 col-lg-6 col-6')}>
                                        <h2>Thành tiền: </h2>
                                    </div>
                                    <div className={cx('col-md-6 col-lg-6 col-6')}>
                                        <div className={cx('d-flex justify-content-end')}>
                                            <p>{parseInt(order._totalPayment).toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('row', 'operation')}>
                            <div className={cx('col-md-8 col-lg-8')}></div>
                            <div className={cx('col-md-4 col-lg-4')}>
                                <div className={cx('row')}>
                                    <div className={cx('col-md-6 col-lg-6 col-6', 'hand-over-btn')}>
                                        <button
                                            type="button"
                                            disabled={order._status !== 0}
                                            className={cx('btn btn-primary', 'custom-large-button')}
                                            onClick={() => sendToShipper(order._id)}
                                        >
                                            Giao cho shiper
                                        </button>
                                    </div>
                                    <div className={cx('col-md-6 col-lg-6 col-6', 'cancel-btn')}>
                                        <div className={cx('d-flex justify-content-end')}>
                                            <button
                                                type="button"
                                                disabled={order._status !== 0}
                                                className={cx('btn btn-danger', 'custom-large-button')}
                                                onClick={() => cancelOrder(order._id)}
                                            >
                                                Hủy đơn
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetailAdmin;
