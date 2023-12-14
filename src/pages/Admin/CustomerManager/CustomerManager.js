import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomerManager.module.scss';
import ListCustomer from './ListCustomer/ListCustomer';
import CustomerListItem from '../../../components/CustomerListItem';
import SidebarAdmin from '../../../Layout/components/SidebarAdmin';
import SidebarAdminMobi from '../../../Layout/components/SidebarAdmin/SidebarAdminMobi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
//import Modal from 'react-bootstrap/Modal';
import * as customerAdminService from '../../../services/customerAdminService';

const cx = classNames.bind(styles);
function CustomerManager() {
    const [customerListItems, setCustomerListItems] = useState([]);
    const [reloadData, setReloadData] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await customerAdminService.getAllCustomers();
            setCustomerListItems(result);
        };

        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);

    const hideCustomer = async (userId) => {
        try {
            const response = await customerAdminService.hideCustomer(userId);
            if (response === 0) {
                throw new Error('Yêu cầu không thành công');
            }
            toast.success('Thao tác thành công');
            setReloadData(true);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu ẩn khách hàng:', error);
            return null;
        }
    };

    const hideItem = (itemId) => {
        const shouldDelete = window.confirm('Bạn có muốn kích hoạt khách hàng này không?');
        if (shouldDelete) {
            hideCustomer(itemId);
            //setCustomerListItems((prevCustomerListItems) => prevCustomerListItems.filter((item) => item.id !== itemId));
        }
    };

    const activeCustomer = async (userId) => {
        try {
            const response = await customerAdminService.activeCustomer(userId);
            if (response === 0) {
                throw new Error('Yêu cầu không thành công');
            }
            setReloadData(true);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu kích hoạt khách hàng:', error);
            return null;
        }
    };

    const activeItem = (itemId) => {
        const shouldActive = window.confirm('Bạn có muốn ẩn khách hàng này không?');
        if (shouldActive) {
            activeCustomer(itemId);

            toast.success('Thao tác thành công');
            //setCustomerListItems((prevCustomerListItems) => prevCustomerListItems.filter((item) => item.id !== itemId));
        }
    };
    const [currentPage, setCurrentPage] = useState(1); // page mặc định là 1
    const totalPages = Math.ceil(customerListItems.length / 5); // số page mỗi page 5 item
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(i);
    }
    const startIndex = (currentPage - 1) * 5; // item bắt đầu cho mỗi page
    const endIndex = startIndex + 5; // item kết thúc cho mỗi page
    const currentItems = customerListItems.slice(startIndex, endIndex); // item cho page hiện tại

    // const [addCustomer, setAddCustomer] = useState(false);
    // const showAddCustomerModal = () => setAddCustomer(true);
    // const closeAddCustomerModal = () => setAddCustomer(false);

    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarAdmin />
                </div>
                <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                    <SidebarAdminMobi />
                </div>
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    <div className={cx('d-flex align-items-center ', 'title')}>Quản lý khách hàng</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid')}>
                                {/* <div className={cx('add-btn')}>
                                    <button
                                        className={cx('btn btn-primary btn-lg font-weight-bold')}
                                        onClick={showAddCustomerModal}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Thêm
                                    </button>
                                </div> */}
                                <div className={cx('row align-items-center d-none d-md-flex', 'header')}>
                                    <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center')}>
                                        <p>ID</p>
                                    </div>
                                    <div className={cx('col-lg-3 col-md-3 d-flex justify-content-center')}>
                                        <p>Họ và tên</p>
                                    </div>
                                    <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center')}>
                                        <p>SĐT</p>
                                    </div>
                                    <div className={cx('col-lg-4 col-md-4 d-flex justify-content-center')}>
                                        <p>Địa chỉ</p>
                                    </div>
                                    <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center')}>
                                        <p>Hoạt động</p>
                                    </div>
                                </div>
                                <div className={cx('row align-items-center', 'customer-list')}>
                                    <ListCustomer>
                                        {currentItems.map((item) => (
                                            <CustomerListItem
                                                key={item._id}
                                                fullname={item._fname + ' ' + item._lname}
                                                phone={item._phones[0]}
                                                address={item._addresses[0]}
                                                status={item._status}
                                                hideItem={() => hideItem(item._id)}
                                                activeItem={() => activeItem(item._id)}
                                            />
                                        ))}
                                    </ListCustomer>
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
                    {/* <Modal show={addCustomer} onHide={closeAddCustomerModal} className={cx('add-customer-modal')}>
                        <Modal.Header closeButton>
                            <div className={cx('title-modal')}>Thêm khách hàng</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Tên:</div>
                                </div>
                                <input type="text" className={cx('col-lg-9 col-md-9')} />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Email:</div>
                                </div>
                                <input type="email" className={cx('col-lg-9 col-md-9')} />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Mật khẩu:</div>
                                </div>
                                <input type="password" className={cx('col-lg-9 col-md-9')} />
                            </div>

                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Số điện thoại:</div>
                                </div>
                                <input type="text" className={cx('col-lg-9 col-md-9')} />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Địa chỉ:</div>
                                </div>
                                <input type="text" className={cx('col-lg-9 col-md-9')} />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Ngày sinh:</div>
                                </div>
                                <input type="date" className={cx('col-lg-9 col-md-9')} />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Giới tính:</div>
                                </div>
                                <span className={cx('col-lg-9 col-md-9', 'gender')}>
                                    <input type="radio" id="male" name="gender" value="male" />
                                    <label for="male">Nam</label>
                                    <input type="radio" id="female" name="gender" value="female" />
                                    <label for="female">Nữ</label>
                                </span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={cx('btn btn-secondary btn-lg')} onClick={closeAddCustomerModal}>
                                Đóng
                            </button>
                            <button className={cx('btn btn-primary btn-lg')} onClick={closeAddCustomerModal}>
                                Thêm
                            </button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
            </div>
        </div>
    );
}

export default CustomerManager;
