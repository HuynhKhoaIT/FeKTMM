import React from 'react';
import { useEffect, useState } from 'react';
import styles from './ChangePass.module.scss'
import classNames from 'classnames/bind';
import SidebarShipper from '../../../Layout/components/SidebarShipper';
import SidebarShipperMobi from '../../../Layout/components/SidebarShipper/SidebarShipperMobi';
import * as profileShipperService from '../../../services/shipper/profileShipperService';
import { useNavigate, Navigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function ChangePass() {
    const [uid, setUid] = useState([]);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [user, setUser] = useState([]);
    const [reloadData, setReloadData] = useState(true);
    const navigate = useNavigate ();
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token'); // Lấy token từ Local Storage
            if (!token) {
                // Xử lý trường hợp token không tồn tại
                setShouldNavigate(true);
                return;
            }
            const result = await profileShipperService.getUser(token);
            setUser(result);
            setUid(result._id);
        };
        
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);
    const checkPasswordComplexity = (password) => {
        // Password should be at least 8 characters long
        if (password.length < 8) {
            return false;
        }

        // Password should contain at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Password should contain at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return false;
        }

        // Password should contain at least one digit
        if (!/\d/.test(password)) {
            return false;
        }

        // Password should contain at least one special character
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            return false;
        }

        return true;
    }
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const handleSaveChangePassword = async () => {
        if (oldPassword !== '' && newPassword !== '' && confirmNewPassword !== '') {
            if (checkPasswordComplexity(newPassword)) {
                if (newPassword === confirmNewPassword) {
                    try {
                        // Call your API to register the user
                        const response = await fetch('/api/shipper/profile/checkPass', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(
                                {
                                    "oldPassword": oldPassword,
                                    "id": uid,
                                }
                            ),
                        });
                        if (response.ok) {
                            // successful
                            setOldPassword('');
                            setNewPassword('');
                            setConfirmNewPassword('');
                            try {
                                // Call your API to register the user
                                const response = await fetch('/api/verification/send-otp', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(
                                        {
                                            "userEmail": user._email,
                                        }
                                    ),
                                });
                                const data = {
                                    email: user._email,
                                    password: newPassword,
                                };
                                if (response.ok) {
                                    // successful
                                    
                                    navigate('/shipper/otp', { state: data });
                                    window.alert('Gửi OTP thành công!')
                                } else {
                                    // failed
                                    const data = await response.json()
                                    window.alert(data.message)
                                    console.log(data)
                                }
            
                            } catch (error) {
                                window.alert('Gửi OTP thất bại, vui lòng thử lại!')
                            }
                            window.alert('ĐÚng r!')
                        } else {
                            // failed
                            const data = await response.json()
                            window.alert(data.message)
                            console.log(data)
                        }

                    } catch (error) {
                        window.alert('Kiểm tra thất bại, vui lòng thử lại!')
                    }
                } else {
                    window.alert('Nhập lại mật khẩu không khớp!');
                }
            }
            else {
                window.alert('Mật khẩu dài ít nhất 8 ký tự, tối đa 20 ký tự, phải bao gồm số, chữ hoa, chữ thường và ký tự đặc biệt!')
            }
        }
        else {
            window.alert('Vui lòng điền đầy đủ thông tin!')
        }
    };
    return (  
        <div className={cx('d-flex', 'page')}>
            {shouldNavigate ? <Navigate to="/login" /> : null}
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
                        <div class={cx('float-left')}>
                            <p class={cx('title')}>Đổi mật khẩu</p>
                        </div>
                        <div class="row justify-content-center">
                            <form action="/Web/editProfile">
                                <div class={cx('d-inline')}>
                                    <div class={cx('profile__input', 'd-flex')}>
                                    <p>
                                        Mật khẩu cũ
                                    </p>
                                    <input type="password" class={cx('form-control')} 
                                        name="oldpass" required="" onChange={(e) => setOldPassword(e.target.value)} />
                                    </div>
                                    <div class={cx('profile__input', 'd-flex')}>
                                    <p>
                                        Mật khẩu mới
                                    </p>
                                    <input type="password" class={cx('form-control')} 
                                        name="newpass" required="" onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div class={cx('profile__input', 'd-flex')}>
                                    <p>
                                        Nhập lại mật khẩu
                                    </p>
                                    <input type="password" class={cx('form-control')} 
                                        name="repass" required="" onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                                    </div>
                                    
                                    <div class={cx('button_Luu')} style={{ padding: '15px' }}>
                                        <input type="button" value="Xác nhận" onClick={handleSaveChangePassword}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}
export default ChangePass;