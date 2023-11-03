import classNames from 'classnames/bind';
import styles from './EmployeeListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function EmployeeListItem({ id, fname, lname, phone, address, deleteItem }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-1 col-md-1 d-flex', 'id')}>
                    <p>{id}</p>
                </div>
                <div className={cx('col-lg-3 col-md-3 d-flex justify-content-center')}>
                    <p>
                        {fname} {lname}
                    </p>
                </div>
                <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center text-truncate')}>
                    <p>{phone[0]}</p>
                </div>
                <div className={cx('col-lg-4 col-md-4 d-flex justify-content-center')}>
                    <p>{address[0]}</p>
                </div>
                <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center', 'item-delete')}>
                    <a onClick={deleteItem} className={cx('delete')}>
                        <FontAwesomeIcon icon={faTrash} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default EmployeeListItem;
