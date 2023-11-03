import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EmployeeManager.module.scss';
import ListEmployee from './ListEmployee/ListEmployee';
import EmployeeListItem from '../../../components/EmployeeListItem';
import SidebarAdmin from '../../../Layout/components/SidebarAdmin';
import SidebarAdminMobi from '../../../Layout/components/SidebarAdmin/SidebarAdminMobi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as employeeAdminService from '../../../services/employeeAdminService';

const cx = classNames.bind(styles);
function EmployeeManager() {
    const [employeeListItems, setEmployeeListItems] = useState([]);
    const [reloadData, setReloadData] = useState(true);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phones, setPhones] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [dateOfBirth, setDateOfbirth] = useState([]);
    const [gender, setGender] = useState('');
    useEffect(() => {
        const fetchApi = async () => {
            const result = await employeeAdminService.getAllEmployees();
            setEmployeeListItems(result);
        };

        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);
    const deleteEmployee = async (userId) => {
        try {
            const response = await employeeAdminService.deteleEmployee(userId);
            if (response === 0) {
                throw new Error('Yêu cầu không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu xóa nhân viên:', error);
            return null;
        }
    };
    const deleteItem = (itemId) => {
        const shouldDelete = window.confirm('Bạn có muốn xóa nhân viên này không?');
        if (shouldDelete) {
            deleteEmployee(itemId);
            setReloadData(true);
        }
    };

    const [currentPage, setCurrentPage] = useState(1); // page mặc định là 1
    const totalPages = Math.ceil(employeeListItems.length / 5); // số page mỗi page 5 item
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(i);
    }
    const startIndex = (currentPage - 1) * 5; // item bắt đầu cho mỗi page
    const endIndex = startIndex + 5; // item kết thúc cho mỗi page
    const currentItems = employeeListItems.slice(startIndex, endIndex); // item cho page hiện tại
    //Form thêm nhân viên
    const [addEmployee, setAddEmpolyee] = useState(false);
    const showAddEmployeeModal = () => setAddEmpolyee(true);
    const closeAddEmployeeModal = () => setAddEmpolyee(false);
    const handleAddEmployee = async () => {
        const newEmployee = {
            _fname: fname,
            _lname: lname,
            _email: email,
            _pw: 'Em123@',
            _role: 'shipper',
            _phones: phones,
            _addresses: addresses,
            _dateOfBirth: dateOfBirth,
            _gender: gender,
            _status: true,
        };
        const result = await employeeAdminService.addEmployee(newEmployee);
        if (result !== null) {
            setFname('');
            setLname('');
            setEmail('');
            setPhones('');
            setAddresses('');
            setDateOfbirth('');
            setGender('');
            window.alert('Thêm nhân viên thành công');
            closeAddEmployeeModal();
            setReloadData(true);
        }
    };
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
                    <div className={cx('d-flex align-items-center ', 'title')}>Quản lý nhân viên</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid')}>
                                <div className={cx('add-btn')}>
                                    <button
                                        className={cx('btn btn-primary btn-lg font-weight-bold')}
                                        onClick={showAddEmployeeModal}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Thêm
                                    </button>
                                </div>
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
                                        <p>Thao tác</p>
                                    </div>
                                </div>
                                <div className={cx('row align-items-center', 'employee-list')}>
                                    <ListEmployee>
                                        {currentItems.map((item) => (
                                            <EmployeeListItem
                                                key={item._id}
                                                id={item._id}
                                                fname={item._fname}
                                                lname={item._lname}
                                                phone={item._phones}
                                                address={item._addresses}
                                                deleteItem={() => deleteItem(item._id)}
                                            />
                                        ))}
                                    </ListEmployee>
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
                    <Modal show={addEmployee} onHide={closeAddEmployeeModal} className={cx('add-employee-modal')}>
                        <Modal.Header closeButton>
                            <div className={cx('title-modal')}>Thêm nhân viên</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Họ:</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setFname(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Tên:</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setLname(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Email:</div>
                                </div>
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Số điện thoại:</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setPhones(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Địa chỉ:</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setAddresses(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Ngày sinh:</div>
                                </div>
                                <input
                                    type="date"
                                    onChange={(e) => setDateOfbirth(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Giới tính:</div>
                                </div>
                                <span className={cx('col-lg-9 col-md-9', 'gender')}>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label for="male">Nam</label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label for="female">Nữ</label>
                                </span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={cx('btn btn-secondary btn-lg')} onClick={closeAddEmployeeModal}>
                                Đóng
                            </button>
                            <button className={cx('btn btn-primary btn-lg')} onClick={handleAddEmployee}>
                                Thêm
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default EmployeeManager;
