import styles from './MobileMenu.module.scss';
import classNames from 'classnames/bind';

import { faHeadphonesSimple, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function MobileMenu({ isOpen, toggleMenu, category }) {
    return (
        <div>
            <a onClick={toggleMenu} className={cx('menu-mobi', `${isOpen ? 'openmenu' : ''}`)}></a>
            <div className={cx('side-menu', `${isOpen ? 'open' : ''}`)}>
                <ul>
                    {category.map((item) => (
                        <li key={item._id}>
                            <Link to={`./category/${item._name}`}>{item._name}</Link>
                        </li>
                    ))}
                </ul>
                <div className={cx('customer__care', 'd-flex align-items-center')}>
                    <FontAwesomeIcon icon={faHeadphonesSimple} />
                    <div className={cx('customer__care-text')}>
                        <a href="tel:1800 6868">1800 6868</a>
                        <p>Chăm sóc khách hàng</p>
                    </div>
                </div>
                <a onClick={toggleMenu} className={cx('close-button')}>
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </div>
        </div>
    );
}

export default MobileMenu;
