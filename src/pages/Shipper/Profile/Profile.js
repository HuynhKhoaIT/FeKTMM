import React, { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import moment from 'moment';
import SidebarShipper from '../../../Layout/components/SidebarShipper';
import SidebarShipperMobi from '../../../Layout/components/SidebarShipper/SidebarShipperMobi';
import * as profileShipperService from '../../../services/shipper/profileShipperService';
import noImage from '../../../assets/images';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Profile() {
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const datePickerRef = useRef(null);
    useEffect(() => {
        flatpickr(datePickerRef.current, {
            dateFormat: 'd/m/Y',
            // Các tùy chọn khác cho date picker
            onChange: (selectedDates, dateStr) => {
                setDateOfBirth(dateStr);
            },
        });
    }, []);

    const [uid, setUid] = useState([]);
    const [reloadData, setReloadData] = useState(true);
    const [avatar, setAvatar] = useState();
    const [user, setUser] = useState([]);
    const [name, setName] = useState([]);
    const [gender, setGender] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState([]);
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
            setName(result._fname + ' ' + result._lname);
            setAvatar(result._avatar);
            setGender(result._gender);
            setDateOfBirth(result._dateOfBirth);
        };
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);

    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleChange2 = (event) => {
        setGender(event.target.value);
    };

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0]; // Lấy tệp đã chọn
    //     if (selectedFile) {
    //         // Đọc tệp và cập nhật state avatar với URL hình ảnh mới
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             setAvatar(event.target.result);
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     }
    // };
    const handleFileChange = async (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('upload_preset', 'laj3rqxg');
            setIsAdding(true);
            // Gửi ảnh lên Cloudinary
            const response = await fetch('https://api.cloudinary.com/v1_1/doqcndr2c/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.secure_url;

                setAvatar(imageUrl);
                setIsAdding(false);
            } else {
                console.error('Failed to upload image to Cloudinary');
            }
        }
    };

    const submitHandler = async () => {
        const editData = {
            _fname: name.split(' ').slice(0, -1).join(' '),
            _lname: name.split(' ').slice(-1).join(' '),
            _avatar: avatar,
            _gender: gender,
            _dateOfBirth: dateOfBirth,
        };
        const result = await profileShipperService.editProfile(uid, editData);
        if (result === 1) {
            setReloadData(true);
            toast.success('Cập nhật thông tin thành công');
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
                <div className={cx('d-flex align-items-center', 'section')}>Hồ sơ</div>
                <div className={cx('row justify-content-center', 'col-lg-12')}>
                    <div className={cx('form_profile', 'row justify-content-center', 'col-lg-11')}>
                        <div class={cx('float-left')}>
                            <p class={cx('title')}>Hồ sơ của tôi</p>
                        </div>
                        <div class="row justify-content-center">
                            <form enctype="multipart/form-data">
                                <div class={cx('d-inline', 'col-md-12', 'centerP')}>
                                    <div class={cx('left')}>
                                        <div class={cx('avatar', 'justify-content-center')}>
                                            <img
                                                src={avatar ? avatar : noImage.noImage}
                                                class="rounded-circle avatar"
                                                alt="Ảnh"
                                            />
                                        </div>
                                        <div class={cx('file')}>
                                            <input
                                                type="file"
                                                class={cx('form-control')}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class={cx('d-inline', 'col-md-8')}>
                                        <div class={cx('profile__input', 'd-flex')}>
                                            <p>Tên</p>
                                            <input
                                                type="text"
                                                class={cx('form-control')}
                                                value={name}
                                                onChange={handleChange}
                                                name="name"
                                                required
                                            />
                                        </div>
                                        <div class={cx('profile__input', 'd-flex')}>
                                            <p>Email</p>
                                            <input
                                                type="text"
                                                class={cx('form-control')}
                                                value={user._email}
                                                name="email"
                                                required
                                            />
                                        </div>
                                        <div class={cx('profile__input', 'd-flex')}>
                                            <p>Số điện thoại</p>
                                            <input
                                                type="number"
                                                class={cx('form-control')}
                                                value={user._phones && user._phones.length > 0 ? user._phones[0] : ''}
                                                name="phone"
                                                required
                                            />
                                        </div>
                                        <div class={cx('form-check', 'd-flex')}>
                                            <p>Giới tính</p>
                                            <div class={cx('form-check-content')}>
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkbox1"
                                                    value="male"
                                                    checked={gender === 'male'}
                                                    onChange={handleChange2}
                                                />
                                                <label class="form-check-label" for="checkbox1">
                                                    Nam
                                                </label>
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    value="female"
                                                    checked={gender === 'female'}
                                                    onChange={handleChange2}
                                                />
                                                <label class="form-check-label" for="checkbox1">
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>
                                        <div class={cx('profile__input', 'd-flex')}>
                                            <p>Ngày sinh</p>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepicker"
                                                placeholder="Chọn ngày"
                                                ref={datePickerRef}
                                                value={moment(dateOfBirth).format('DD/MM/YYYY')}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            />
                                        </div>
                                        <div class={cx('button_Luu')} style={{ padding: '15px' }}>
                                            <input
                                                type="button"
                                                disabled={isAdding}
                                                value="Lưu"
                                                onClick={submitHandler}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
