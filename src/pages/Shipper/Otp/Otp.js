import React, { useState } from 'react';
import styles from './Otp.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SidebarShipper from '../../../Layout/components/SidebarShipper';
import SidebarShipperMobi from '../../../Layout/components/SidebarShipper/SidebarShipperMobi';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function Otp() {
    const navigate = useNavigate ();
    const location = useLocation();
    const data = location.state;
    const [otp, setOTP] = useState('')
    const handleChange = (event) => {
        const value = event.target.value.slice(0, 6); // Giới hạn chỉ lấy 6 ký tự đầu tiên
        setOTP(value);
    };
    const handleButtonClick = (event) => {
        navigate('/shipper/changePass'); // Chuyển hướng đến trang "/changePass"
      }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setOTPError('')
        // setPasswordError('')
        if (otp.length === 6) {
            try {
                // Call your API to register the user
                const response = await fetch('https://cnpmmnhom14.onrender.com/api/verification/shipper-reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "otp": otp,
                            "email": data.email,
                            "password": data.password,
                        }
                    ),
                });

                if (response.ok) {
                    // Registration was successful
                    window.alert('Reset mật khẩu thành công!')
                    navigate('/shipper/changePass'); // Chuyển hướng đến trang "/changePass"
                } else {
                    // Registration failed
                    const data = await response.json()
                    window.alert(data.message)
                    console.log(data)
                }
            } catch (error) {
                window.alert('Reset mật khẩu thất bại, vui lòng thử lại!')
            }
        }
        else {
            window.alert('Vui lòng điền đầy đủ thông tin!')
        }

    }

    return (  
        <div className={cx('d-flex', 'page')}>
            <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                <SidebarShipper />
            </div>
            <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                <SidebarShipperMobi />
            </div>
            <div class={cx('container')}>
                <div className={cx('d-flex align-items-center', 'section')}>Mật khẩu</div>
                <div className={cx('row justify-content-center','col-lg-12')}>
                    <div className={cx('form_profile','row justify-content-center','col-lg-11')}>
                        <div class={cx('float-left', 'd-flex')}>
                            <FontAwesomeIcon icon={faArrowLeft} class={cx('icon')} onClick={handleButtonClick}/>
                            <p class={cx('title')}>Xác minh tài khoản</p>
                        </div>
                        <div class="row justify-content-center">
                            <div class={cx('d-inline')}>
                                <div class={cx('label')}>
                                    <p>
                                        Mã OTP được gửi đến email ngkhacduong@gmail.com
                                    </p>
                                    <p>
                                        Nhập mã OTP gồm 6 chữ số
                                    </p>
                                </div>
                                <form action="/Web/editProfile">
                                    <div class={cx('otp__input')}>
                                        <input type="text" class={cx('form-control')} maxLength={6} value={otp}
                                            onChange={handleChange}
                                            name="otp" required="" />
                                    </div>

                                    <div class={cx('button_Luu')} style={{ padding: '15px' }}>
                                        <input type="button" onClick={handleSubmit} value="Xác nhận" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}
export default Otp;