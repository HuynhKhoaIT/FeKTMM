import React from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarCustomer.module.scss';
import { SignOutIcon } from '../../../components/Icons';
import { SidebarCustomerNav } from './SidebarCustomerNav';
const cx = classNames.bind(styles);
function SidebarCustomer() {
    return (
        <div className={cx(' d-flex flex-column justify-content-between', 'sidebar-wrapper')}>
            <div>
                <div className={cx('nav')}>
                    <ul className={cx('nav-list')}>
                        {SidebarCustomerNav.map((val, key) => {
                            return (
                                <li
                                    key={key}
                                    className={cx('nav-item')}
                                    id={window.location.pathname === val.to ? cx('active') : ''}
                                    onClick={() => {
                                        window.location.pathname = val.to;
                                    }}
                                >
                                    <span>
                                        {val.icon !== null ? val.icon : null}
                                        <span> </span>
                                        <span className={cx('nav-item__link')}>{val.title}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className={cx('d-flex align-items-center justify-content-center text-bg-primary', 'sign-out')}>
                <SignOutIcon />
            </div>
        </div>
    );
}

export default SidebarCustomer;
