import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderManager.module.scss';
import SidebarAdmin from '../../../Layout/components/SidebarAdmin';
import SidebarAdminMobi from '../../../Layout/components/SidebarAdmin/SidebarAdminMobi';
import ListOrder from './ListOrder';
import OrderListItem from '../../../components/OrderListItem/OrderListItem';
import OrderDetailAdmin from '../../../Layout/components/OrderDetailAdmin';
import * as orderAdminService from '../../../services/orderAdminService';

const cx = classNames.bind(styles);

function OrderManager() {
    const [reloadData, setReloadData] = useState(true);
    const [orderListItems, setOrderListItems] = useState([]);
    const [orderListItemTagCurrent, setOrderListItemTagCurrent] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await orderAdminService.getAllOrders();
            setOrderListItems(result);
            setOrderListItemTagCurrent(result);
        };
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);

    const [tagCurrent, setTagcurrent] = useState(1);
    const filter = (tag) => {
        setOrderListItemTagCurrent(orderListItems);
        if (tag === 1) {
            setTagcurrent(1);
        }
        if (tag === 2) {
            setTagcurrent(2);
            setOrderListItemTagCurrent(
                (prevOrderListItemTagCurrent) => prevOrderListItemTagCurrent.filter((item) => item._status === 0), //chưa xác nhận
            );
        }
        if (tag === 3) {
            setTagcurrent(3);
            setOrderListItemTagCurrent(
                (prevOrderListItemTagCurrent) => prevOrderListItemTagCurrent.filter((item) => item._status === 1), //đã xác nhận
            );
        }
        if (tag === 4) {
            setTagcurrent(4);
            setOrderListItemTagCurrent(
                (prevOrderListItemTagCurrent) => prevOrderListItemTagCurrent.filter((item) => item._status === 2), //đang giao
            );
        }
        if (tag === 5) {
            setTagcurrent(5);
            setOrderListItemTagCurrent(
                (prevOrderListItemTagCurrent) => prevOrderListItemTagCurrent.filter((item) => item._status === 3), //đã giao
            );
        }
        if (tag === 6) {
            setTagcurrent(6);
            setOrderListItemTagCurrent(
                (prevOrderListItemTagCurrent) => prevOrderListItemTagCurrent.filter((item) => item._status === 4), //đã huỷ
            );
        }
    };
    const [currentPage, setCurrentPage] = useState(1); // page mặc định là 1
    const totalPages = Math.ceil(orderListItemTagCurrent.length / 5); // số page mỗi page 5 item
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(i);
    }
    const startIndex = (currentPage - 1) * 5; // item bắt đầu cho mỗi page
    const endIndex = startIndex + 5; // item kết thúc cho mỗi page
    const currentItems = orderListItemTagCurrent.slice(startIndex, endIndex); // item cho page hiện tại

    const [displayOrderDetail, setDisplayOrderDetail] = useState(false); // false ở trang danh sách, true là trang chi tiết
    const [orderDetail, setOrderDetail] = useState('64b8f72b29869c0f9f0dab70');
    const showOrderDetail = (orderId) => {
        setOrderDetail(orderId);
        setDisplayOrderDetail(true);
    };

    const rollbackListOrder = () => {
        setDisplayOrderDetail(false);
        setReloadData(true);
    };

    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarAdmin />
                </div>
                {!displayOrderDetail ? (
                    <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                        <SidebarAdminMobi />
                    </div>
                ) : (
                    ''
                )}
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    {!displayOrderDetail ? (
                        <>
                            <div className={cx('d-flex align-items-center ', 'title')}>Quản lý đơn hàng</div>
                            <div className={cx('wrapper')}>
                                <div className={cx('content')}>
                                    <div className={cx('container-fluid')}>
                                        <div className={cx('d-flex justify-content-center', 'filter')}>
                                            <div class="btn-group btn-group-lg">
                                                {tagCurrent === 1 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Tất cả
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(1);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Tất cả
                                                    </button>
                                                )}
                                                {tagCurrent === 2 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Chưa xác nhận
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(2);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Chưa xác nhận
                                                    </button>
                                                )}

                                                {tagCurrent === 3 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Đã xác nhận
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(3);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Đã xác nhận
                                                    </button>
                                                )}
                                                {tagCurrent === 4 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Đang giao
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(4);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Đang giao
                                                    </button>
                                                )}
                                                {tagCurrent === 5 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Đã giao
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(5);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Đã giao
                                                    </button>
                                                )}
                                                {tagCurrent === 6 ? (
                                                    <button type="button" class="btn btn-light btn-outline-dark active">
                                                        Đã huỷ
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            filter(6);
                                                            setCurrentPage(1);
                                                        }}
                                                        type="button"
                                                        class="btn btn-light btn-outline-dark"
                                                    >
                                                        Đã huỷ
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('row align-items-center d-none d-md-flex', 'header')}>
                                            <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center')}>
                                                <p>ID</p>
                                            </div>
                                            <div className={cx('col-lg-3 col-md-3 d-flex justify-content-center')}>
                                                <p>Họ và tên</p>
                                            </div>
                                            <div className={cx('col-lg-4 col-md-4 d-flex justify-content-center')}>
                                                <p>Địa chỉ</p>
                                            </div>
                                            <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center')}>
                                                <p>SĐT</p>
                                            </div>
                                            <div
                                                className={cx('col-lg-1 col-md-1 col-2 d-flex justify-content-center')}
                                            >
                                                <p>Trạng thái</p>
                                            </div>
                                            <div
                                                className={cx('col-lg-1 col-md-1 col-1 d-flex justify-content-center')}
                                            >
                                                <p>Thao tác</p>
                                            </div>
                                        </div>
                                        <div className={cx('row align-items-center', 'order-list')}>
                                            <ListOrder>
                                                {currentItems.map((item) => (
                                                    <OrderListItem
                                                        key={item._id}
                                                        id={item._id}
                                                        name={item._name}
                                                        address={item._address}
                                                        phone={item._phone}
                                                        status={item._status}
                                                        showOrderDetail={() => showOrderDetail(item._id)}
                                                    />
                                                ))}
                                            </ListOrder>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'paging')}>
                                            <ul className={cx('pagination pagination-lg')}>
                                                {currentPage === 1 ? (
                                                    <li className={cx('page-item disabled')}>
                                                        <span className={cx('page-link')}>Trước</span>
                                                    </li>
                                                ) : (
                                                    <li className={cx('page-item')}>
                                                        <span
                                                            onClick={() => setCurrentPage(currentPage - 1)}
                                                            className={cx('page-link')}
                                                        >
                                                            Trước
                                                        </span>
                                                    </li>
                                                )}
                                                {pageItems.map((index) =>
                                                    currentPage === index ? (
                                                        <li className={cx('page-item active')}>
                                                            <span className={cx('page-link')}>{index}</span>
                                                        </li>
                                                    ) : (
                                                        <li className={cx('page-item')}>
                                                            <span
                                                                onClick={() => setCurrentPage(index)}
                                                                className={cx('page-link')}
                                                            >
                                                                {index}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                                {currentPage === totalPages ? (
                                                    <li className={cx('page-item disabled')}>
                                                        <span className={cx('page-link')}>Sau</span>
                                                    </li>
                                                ) : (
                                                    <li className={cx('page-item')}>
                                                        <span
                                                            onClick={() => setCurrentPage(currentPage + 1)}
                                                            className={cx('page-link')}
                                                        >
                                                            Sau
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <OrderDetailAdmin
                            id={orderDetail}
                            rollbackListOrder={() => {
                                rollbackListOrder();
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderManager;
