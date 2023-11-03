import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarShipper.module.scss';
import Image from '../../../components/Images';
import { SignOutIcon } from '../../../components/Icons';
import { SidebarShipperNav } from './SidebarShipperNav';
import * as profileShipperService from '../../../services/shipper/profileShipperService';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SidebarShipper() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div className={cx(' d-flex flex-column justify-content-between', 'sidebar-wrapper')}>
            <div>
                <div className={cx('d-flex align-items-center justify-content-center', 'profil')}>
                    <div className={cx('logo')}>
                        <Image src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg" alt="logo" />
                    </div>
                </div>
                <div className={cx('nav')}>
                    <ul className={cx('nav-list')}>
                        {SidebarShipperNav.map((val, key) => {
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
                                        <span className={cx('nav-item__link')}>
                                            {val.title}
                                        </span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className={cx('d-flex align-items-center justify-content-center text-bg-primary', 'sign-out')} onClick={handleSignOut}>
                <SignOutIcon />
            </div>
        </div>
    );
}

export default SidebarShipper;
