import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminLogin.module.scss';
import classNames from 'classnames/bind';
import { GoogleIcon, FacebookIcon, CloseIcon, HomeIcon } from '../../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { Redirect } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login({ isShown = false, handleCloseForm }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Simple login authentication
        if (email !== '' && password !== '') {
            try {
                // Call your API to register the user
                const response = await fetch('https://cnpmmnhom14.onrender.com/api/accounts/adminLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _email: email,
                        _pw: password,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    // Registration was successful
                    setIsLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    toast.success('Đăng nhập thành công');
                } else {
                    // Registration failed
                    setError(data.message);
                    toast.error('Đăng nhập thất bại, vui lòng thử lại!');
                }
            } catch (error) {
                toast.error('Đăng nhập thất bại, vui lòng thử lại!');
            }
        } else {
            if (email === '') setError('Vui lòng điền email!');
            if (password === '') setError('Vui lòng điền mật khẩu!');
            if (email === '' && password === '') setError('Vui lòng điền đủ email và mật khẩu!');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {!isLoggedIn ? (
                <div className={cx('form-wrapper')}>
                    <form className={cx('loginForm')} onSubmit={handleSubmit}>
                        <div className={cx('icons-wrapper')}>
                            <div onClick={handleCloseForm}>
                                <CloseIcon
                                    className={cx('close-icon-wrapper', 'icon', `${!isShown ? 'hidden' : ''}`)}
                                />
                            </div>
                            {/* <Link to={'/'}><div className={cx('home-icon-wrapper', 'icon', `${isShown ? 'hidden' : ''}`)}><HomeIcon width={24} height={24} /></div></Link> */}
                            <p className={cx('form-title')}>Đăng nhập</p>
                        </div>

                        <div className={cx('input-wrapper')}>
                            <div className={cx('input-wrapper-item')}>
                                <label className={cx('form-label')} for="email">
                                    {' '}
                                    Email{' '}
                                </label>
                                <input
                                    className={cx('form-input')}
                                    type="text"
                                    id="email"
                                    autoComplete="on"
                                    name="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className={cx('input-wrapper-item')}>
                                <label className={cx('form-label')} for="pw">
                                    Mật khẩu
                                </label>
                                <div className={cx('password-input-wrapper')}>
                                    <input
                                        className={cx('form-input', 'password-input')}
                                        type={showPassword ? 'text' : 'password'}
                                        id="pw"
                                        name="pw"
                                        autocomplete="on"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                    <span className={cx('password-toggle')} onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </span>
                                </div>
                                {error && <p className={cx('form-error-message')}>{error}</p>}
                            </div>
                        </div>
                        <div className={cx('btns-group-control')}>
                            <button className={cx('btn', 'btn-SignIn')} type="submit">
                                Đăng nhập
                            </button>
                            {/* <p className={cx('options-title')}>-Or-</p>
                            <div className={cx('option-signIn')}>
                                <button className={cx('btn', 'btn-SignIn-google')}>
                                    <GoogleIcon />
                                    <Link to={'/'}>Đăng nhập bằng Gmail</Link>
                                </button>
                                <button className={cx('btn', 'btn-SignIn-facebook')}>
                                    <FacebookIcon width='24' height='24' />
                                    <Link to={'/'}> Đăng nhập bằng Facebook</Link>
                                </button>
                            </div> */}
                        </div>
                        <div className={cx('redirect-options', 'option-forgetPw')}>
                            <p>
                                Quên mật khẩu? <Link to={'/Forget Password'}>Đặt lại mật khẩu ngay</Link>
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                navigate('/admin/product-manager')
            )}
        </>
    );
}

export default Login;
