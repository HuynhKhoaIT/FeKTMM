import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
import OrderItemDetail from '../OrderItemDetail';
import React, { useState, useEffect } from 'react';
import Loading from '../loading';
import * as orderShipperService from '../../services/shipper/orderShipperService';
const cx = classNames.bind(styles);
function OrderItem({ id, cancelItem, updateItem, comfirmItem }) {
    const [reloadData, setReloadData] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [note, setNote] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await orderShipperService.getOrder(id);
            setOrderItems(result._items);
            setOrder(result);
            setTotalPrice(result._totalPayment.toLocaleString('vi-VN'));
            setNote(result._note);
            setLoading(false);
        };
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [id, reloadData]);
    return (
        <div className={cx('wrapper')}>
            <Loading show={loading} />
            <div className={cx('row')}>
                <div className={cx('col-lg-12', 'd-flex', 'product')}>
                    <div className={cx('col-lg-8')}>
                        {orderItems.map((item) => (
                            <OrderItemDetail key={item.itemId} note={note} id={item.itemId} quantity={item.quantity} />
                        ))}
                    </div>

                    <div className={cx('col-lg-4', 'order__money')}>
                        <p>{totalPrice}₫</p>
                    </div>
                </div>
                <div className={cx('col-lg-12', 'd-flex', 'under')}>
                    <div className={cx('col-lg-8', 'product__note')}>
                        <p className={cx('color')}>
                            Địa chỉ: <span>{order._address}</span>
                        </p>
                        <p className={cx('color')}>
                            Liên hệ:{' '}
                            <span>
                                {order._name} ({order._phone})
                            </span>
                        </p>
                    </div>
                    {order._status === 1 ? (
                        <div className={cx('col-lg-4', 'button', 'd-flex')}>
                            <div className={cx('col-lg-6', 'btn-center')}></div>
                            <div className={cx('col-lg-5', 'btn-center')}>
                                <input
                                    onClick={comfirmItem}
                                    type="button"
                                    className={cx('btn-success')}
                                    value={'Nhận đơn'}
                                />
                            </div>
                        </div>
                    ) : order._status === 2 ? (
                        <div className={cx('col-lg-4', 'button', 'd-flex')}>
                            <div className={cx('col-lg-6', 'btn-center')}>
                                <input
                                    onClick={updateItem}
                                    type="button"
                                    className={cx('btn-success')}
                                    value={'Giao hàng'}
                                />
                            </div>
                            <div className={cx('col-lg-6', 'btn-center')}>
                                <input onClick={cancelItem} type="button" className={cx('btn-cancel')} value={'Hủy'} />
                            </div>
                        </div>
                    ) : order._status === 3 ? (
                        <div className={cx('col-lg-4', 'd-flex', 'status_content')}>
                            <p className={cx('status')} style={{ color: 'green' }}>
                                {' '}
                                Đã giao
                            </p>
                        </div>
                    ) : (
                        <div className={cx('col-lg-4', 'd-flex', 'status_content')}>
                            <p className={cx('status')} style={{ color: 'red' }}>
                                {' '}
                                Đã hủy{' '}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
