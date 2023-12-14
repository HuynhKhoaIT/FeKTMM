import classNames from 'classnames/bind';
import styles from './CheckOrder.module.scss';
import SidebarCustomer from '../../Layout/components/SideBarCustomer';
import SidebarCustomerMobi from '../../Layout/components/SideBarCustomer/SidebarCustomerMobi';
import * as profileCustomer from '../../services/profileCustomerService';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import noImage from '../../assets/images';
import { toast } from 'react-toastify';
import { Alert, Badge, Button, Col, Nav, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { cancelOrder, getOrder, getOrderByStatus } from '../../services/orderService';
import Loading from '../../components/loading';

const cx = classNames.bind(styles);

function CheckOrder() {
    const [listOrder, setListOrder] = useState([]);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState();
    const [show, setShow] = useState(false);
    const [orderID, setOrderID] = useState('');
    // const ref = useRef(null);

    // const element = ref.current;
    // console.log(element);
    // console.log(element?.id);

    useEffect(() => {
        const handleSelectedStatus = async (st) => {
            setLoading(true);
            const { data } = await getOrderByStatus(st);

            setListOrder(data);
            setLoading(false);
        };
        handleSelectedStatus(status);
    }, [status]);

    const handleOrderAll = async () => {
        setLoading(true);
        setStatus(5);
        const { data } = await getOrder();
        setListOrder(data);
        setLoading(false);
    };
    const handleOrderByStatus = async (body) => {
        setLoading(true);
        setStatus(body.status);
        const { data } = await getOrderByStatus(body.status);

        setListOrder(data.data);
        setLoading(false);
    };

    const handleCancelOrder = async (id) => {
        setLoading(true);
        const { data } = await cancelOrder(id);
        setStatus(status);

        setLoading(false);
    };
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (e) => {
        // console.log(typeof e.target.value);
        // const element = document.getElementById(e.target.value);
        // console.log(element);
        // // console.log(element.id);
        setOrderID(e.target.value);
        setShow(true);
    };

    return (
        <div className={cx('container-fluid')}>
            <Loading show={loading} />
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarCustomer />
                </div>
                <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                    <SidebarCustomerMobi />
                </div>
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    <div className={cx('d-flex align-items-center ', 'title')}>Thông tin cá nhân</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid bg-white mh-100 pt-3 rounded')}>
                                <Row>
                                    <Col md={12}>
                                        <Nav
                                            variant="pills"
                                            defaultActiveKey={status}
                                            className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around mb-3 mr-3 ml-3 rounded"
                                            style={{ textAlign: 'center' }}
                                        >
                                            <Nav.Item className="text-warning">
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="5"
                                                    onClick={() => handleOrderAll()}
                                                >
                                                    Tất cả
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="text-warning">
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="0"
                                                    onClick={() => handleOrderByStatus({ status: 0 })}
                                                >
                                                    Chờ xác nhận
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="text-warning">
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="1"
                                                    onClick={() => handleOrderByStatus({ status: 1 })}
                                                >
                                                    Đã xác nhận
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="text-warning">
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="2"
                                                    onClick={() => handleOrderByStatus({ status: 2 })}
                                                >
                                                    Đang giao
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="text-warning">
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="3"
                                                    onClick={() => handleOrderByStatus({ status: 3 })}
                                                >
                                                    Đã giao
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    className="text-dark"
                                                    eventKey="4"
                                                    onClick={() => handleOrderByStatus({ status: 4 })}
                                                >
                                                    Hủy
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col md={12} className="d-flex justify-content-around mt-4">
                                        <div className="col-lg-12">
                                            {listOrder && listOrder?.length !== 0 ? (
                                                listOrder.map((item) => (
                                                    <div className="card-page mb-4" key={item._id}>
                                                        <div className="card-container">
                                                            <div className="mb-3 d-flex justify-content-between">
                                                                <div className="d-flex justify-content-between">
                                                                    <span className="me-3">{'#' + item._id}</span>
                                                                    {/* <span className="me-3">
                                                                        {moment(item.createdAt).format('DD/MM/YYYY')}
                                                                    </span>
                                                                    <span className="me-3">{item.paymentMethod}</span> */}

                                                                    <Badge
                                                                        bg={
                                                                            item._status === 0
                                                                                ? 'dark'
                                                                                : item._status === 1
                                                                                ? 'info'
                                                                                : item._status === 2
                                                                                ? 'warning'
                                                                                : item._status === 3
                                                                                ? 'success'
                                                                                : 'danger'
                                                                        }
                                                                        style={{ maxHeight: '24px' }}
                                                                    >
                                                                        {item._status === 0
                                                                            ? 'Chờ xác nhận'
                                                                            : item._status === 1
                                                                            ? 'Đã xác nhận'
                                                                            : item._status === 2
                                                                            ? 'Đang giao'
                                                                            : item._status === 3
                                                                            ? 'Đã giao'
                                                                            : 'Hủy'}
                                                                    </Badge>
                                                                </div>
                                                                <div className="d-flex me-4">
                                                                    {(item._status === 0 || item._status === 1) && (
                                                                        <div>
                                                                            <Button
                                                                                onClick={() =>
                                                                                    handleCancelOrder(item._id)
                                                                                }
                                                                                variant="danger"
                                                                                className="rounded fs-4"
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <table className="table table-borderless">
                                                                <tbody>
                                                                    {item._items.map((detail) => (
                                                                        <tr key={detail._id}>
                                                                            <td>
                                                                                <div className="d-flex mb-2">
                                                                                    <div className="flex-shrink-0">
                                                                                        <img
                                                                                            src={
                                                                                                detail.itemId._images[0]
                                                                                            }
                                                                                            alt=""
                                                                                            width="56"
                                                                                            className="img-fluid"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="flex-lg-grow-1 ms-3">
                                                                                        <h6 className="small mb-0">
                                                                                            <Link
                                                                                                href="#"
                                                                                                className="text-reset"
                                                                                            >
                                                                                                {detail.itemId._name}
                                                                                            </Link>
                                                                                        </h6>
                                                                                        <span className="small">
                                                                                            Quantity: {detail.quantity}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td></td>
                                                                            <td className="text-end">
                                                                                {detail.itemId._price.toLocaleString(
                                                                                    'vi-VN',
                                                                                    {
                                                                                        style: 'currency',
                                                                                        currency: 'VND',
                                                                                    },
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td colSpan="2">Shipping</td>
                                                                        <td className="text-end">
                                                                            {item._shippingFee.toLocaleString('vi-VN', {
                                                                                style: 'currency',
                                                                                currency: 'VND',
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="fw-bold">
                                                                        <td colSpan="2">TOTAL</td>
                                                                        <td className="text-end">
                                                                            {item._totalPayment.toLocaleString(
                                                                                'vi-VN',
                                                                                {
                                                                                    style: 'currency',
                                                                                    currency: 'VND',
                                                                                },
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ))
                                            ) : (
                                                <Alert variant="info" style={{ textAlign: 'center' }}>
                                                    No order to show
                                                </Alert>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOrder;
