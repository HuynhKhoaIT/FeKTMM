import classNames from 'classnames/bind';
import styles from './OrderListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OrderListItem({ id, name, address, phone, status, showOrderDetail }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-1 col-md-1 d-flex ', 'id')}>
                    <p>{id}</p>
                </div>
                <div className={cx('col-lg-3 col-md-3 d-flex justify-content-center')}>
                    <p>{name.toLocaleString('vi-VN')}</p>
                </div>
                <div className={cx('col-lg-4 col-md-4 d-flex justify-content-center')}>
                    <p>{address}</p>
                </div>
                <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center text-truncate')}>
                    <p>{phone}</p>
                </div>
                <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center')}>
                    {status === 0 ? (
                        <p>Chưa giao</p>
                    ) : status === 1 ? (
                        <p>Đang giao</p>
                    ) : status === 2 ? (
                        <p>Đã giao</p>
                    ) : (
                        <p>Đã hủy</p>
                    )}
                </div>
                <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center text-info', 'info')}>
                    <a onClick={showOrderDetail}>
                        <FontAwesomeIcon icon={faFileLines} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OrderListItem;
