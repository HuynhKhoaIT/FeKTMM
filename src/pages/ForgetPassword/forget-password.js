import React from 'react';
import { useState } from 'react';
import styles from './forget-password.module.scss'
import classNames from 'classnames/bind';
import { HomeIcon } from '../../components/Icons';
import { Link } from 'react-router-dom';

// import Modal from 'react-bootstrap/Modal';

const cx = classNames.bind(styles)

function ForgetPassword() {


    const [email, setEmail] = useState('')


    const [error, setError] = useState('')
    const [sucessMessage, setSucessMessage] = useState('');

    const [mailError, setMailError] = useState('')



    const checkEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        setMailError('')

        if (email !== '') {
            if (checkEmailValid(email)) {
                setSucessMessage('')
                setError('')
                setMailError('')
                try {
                    // Call your API to register the user
                    const response = await fetch('/api/verification/send-otp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            {

                                "userEmail": email,

                            }
                        ),
                    });

                    if (response.ok) {
                        // successful
                        setSucessMessage('Gửi mã OTP thành công!')

                    } else {
                        // failed
                        const data = await response.json()
                        setError(data.message)
                    }
                } catch (error) {
                    setError('Gửi OTP thất bại, vui lòng thử lại!')
                }

            }
            else {
                setSucessMessage('')
                if (!checkEmailValid(email))
                    setMailError('Email không đúng định dạng!')
            }
        } else {
            setError('Vui lòng điền mail!')
        }

    }

    return (
        <div className={cx('form-wrapper')}>
            <form className={cx('loginForm')} onSubmit={handleSubmit}>
                <div className={cx('icons-wrapper')}>

                    <Link to={'/'}><div className={cx('home-icon-wrapper', 'icon')}><HomeIcon width={24} height={24} /></div></Link>
                    <p className={cx('form-title')}>Quên mật khẩu</p>
                </div>
                <div className={cx('input-wrapper')}>

                    <div className={cx('input-wrapper-item')}>
                        <label className={cx('form-label')} for="email"> Email </label>
                        <input className={cx('form-input')} type="text" id="email" name="email" placeholder='Nhập email' onChange={(e) => setEmail(e.target.value)}></input>
                        {mailError && <p className={cx('form-error-message', 'form-error')}>{mailError}</p>}
                    </div>
                    {sucessMessage && <p className={cx('form-sucess-message')}>{sucessMessage}</p>}
                    {error && <p className={cx('form-error-message')}>{error}</p>}

                </div>
                <div className={cx('btns-group-control')}>
                    <button className={cx('btn', 'btn-SignIn')} type="submit" >Nhận OTP</button>
                    {
                        sucessMessage && <div className={cx('redirect-options', 'option-SignUp')}>
                            <p><Link to={'/forget-password/reset-password'} state={{ userMail: `${email}` }}>Tiếp tục</Link></p>
                        </div>

                    }
                    {
                        error && <div className={cx('redirect-options', 'option-SignUp')}>
                            <p>Chưa nhận được OTP? <Link onClick={handleSubmit}>Gửi lại ngay</Link></p>
                        </div>
                    }

                </div>

            </form>
        </div>

    )
}

export default ForgetPassword;
