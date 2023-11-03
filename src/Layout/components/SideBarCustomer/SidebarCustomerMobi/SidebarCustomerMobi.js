import React from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarCustomerMobi.module.scss';
import { SidebarCustomerNavMobi } from './SidebarCustomerNavMobi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SidebarCustomerMobi() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };
    return (
        <>
            <div className={cx('col-2 d-flex align-items-center', 'sidebar-wrapper')}>
                <Link onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </Link>
            </div>
            <div>
                <Link onClick={toggleMenu} className={cx('menu-mobi', `${isMenuOpen ? 'openmenu' : ''}`)}></Link>
                <div className={cx('side-menu', `${isMenuOpen ? 'open' : ''}`)}>
                    <div className={cx('d-flex justify-content-end', 'close-button')}>
                        <Link onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Link>
                    </div>
                    <ul>
                        {SidebarCustomerNavMobi.map((val, key) => {
                            return (
                                <li
                                    key={key}
                                    className={cx('nav-item')}
                                    onClick={() => {
                                        window.location.pathname = val.to;
                                    }}
                                >
                                    <span>
                                        <span className={cx('nav-item__link')}>{val.title}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={cx('sign-out')}>
                        <span>Đăng xuất</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarCustomerMobi;
