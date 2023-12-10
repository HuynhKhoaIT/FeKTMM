import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import SidebarCustomer from '../../Layout/components/SideBarCustomer';
import SidebarCustomerMobi from '../../Layout/components/SideBarCustomer/SidebarCustomerMobi';
import * as profileCustomer from '../../services/profileCustomerService';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import noImage from '../../assets/images';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ProfileCustomer() {
    const [updateProfile, setUpdateProfile] = useState(false);
    const [user, setUser] = useState();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phones, setPhones] = useState();
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [addresses, setAddresses] = useState();
    const [dateOfBirth, setDateOfBirth] = useState('');
    const showUpdateModal = () => setUpdateProfile(true);
    const closeUpdateModal = () => setUpdateProfile(false);

    const [changePassword, setChangePassword] = useState(false);
    const showChangePassWordModal = () => setChangePassword(true);
    const closeChangePassWordModal = () => {
        setChangePassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    //From cập nhật avatar
    const [changeAvatar, setChangeAvatar] = useState(false);
    const showChangeAvatarModal = () => setChangeAvatar(true);
    const closeChangeAvatarModal = () => setChangeAvatar(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Lấy tệp đã chọn
        if (selectedFile) {
            // Đọc tệp và cập nhật state avatar với URL hình ảnh mới
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleChangePhone = (e) => {
        let phoneList = [];
        if (phoneList.length > 0) {
            phoneList = [...phones];
            phoneList[0] = e.target.value;
        } else phoneList.push(e.target.value);
        setPhone(e.target.value);
        setPhones(phoneList);
    };
    const handleChangeAddress = (e) => {
        let addrList = [...addresses];
        if (addrList.length > 0) {
            addrList[0] = e.target.value;
        } else addrList.push(e.target.value);
        setAddress(e.target.value);
        setAddresses(addrList);
    };

    const handleEditProfile = async () => {
        try {
            const editData = {
                _fname: fname,
                _lname: lname,
                _email: email,
                _phones: phones,
                _gender: gender,
                _addresses: addresses,
                _avatar: avatar,
                _dateOfBirth: dateOfBirth,
            };
            const token = localStorage.getItem('token'); // Lấy token từ Local Storage
            if (!token) {
                // Xử lý trường hợp token không tồn tại
                return;
            }
            const result = await profileCustomer.editProfile(editData, token);

            console.log('====================================');
            console.log('result: ', result);
            console.log('====================================');
            window.alert('Cập nhật thông tin thành công');
        } catch (error) {
            toast.error(error);
        }
    };

    const handleSaveChangePassword = async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ Local Storage
            if (!token) {
                // Xử lý trường hợp token không tồn tại
                return;
            }
            if (newPassword === confirmNewPassword) {
                const saveChangePassword = await profileCustomer.changePassword(
                    { oldPassword, newPassword, retypedNewPassword: confirmNewPassword },
                    token,
                );
                console.log('====================================');
                console.log('changePassword', saveChangePassword);
                console.log('====================================');
                window.alert('Cập nhật mật khẩu thành công!');
            } else {
                window.alert('Nhập lại mật khẩu không khớp!');
            }
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ Local Storage
                if (!token) {
                    // Xử lý trường hợp token không tồn tại
                    return;
                }

                const { data } = await profileCustomer.getUser(token);
                setFname(data.user._fname); 
                setLname(data.user._lname);
                setEmail(data.user._email);
                setPhone(data.user._phones ? data.user._phones[0] : '');
                setPhones(data.user._phones);
                setGender(data.user._gender);
                setAddress(data.user._addresses ? data.user._addresses[0] : '');
                setAddresses(data.user._addresses);
                setDateOfBirth(data.user._dateOfBirth);
                setAvatar(data.user._avatar);
                setUser(data.user);
                console.log('====================================');
                console.log('data', data);
                console.log('====================================');
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarCustomer />
                </div>
                <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                    <SidebarCustomerMobi />
                </div>
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    <div className={cx('d-flex align-items-center ', 'title')}>Thông tin cá nhân</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid')}>
                                <div className={cx('row align-items-center', 'profile')}>
                                    <div className={cx('col-lg-7 col-md-7 d-none d-lg-block', 'profile-info')}>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Họ:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={fname}
                                                    onChange={(e) => setFname(e.target.value)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Tên:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={lname}
                                                    onChange={(e) => setLname(e.target.value)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Email:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Số điện thoại:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={phone}
                                                    onChange={(e) => handleChangePhone(e)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Địa chỉ:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => handleChangeAddress(e)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Ngày sinh:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="date"
                                                    value={dateOfBirth ? dateOfBirth.slice(0, 10) : ''}
                                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('col-lg-3 col-md-3 lh-lg', 'heading')}>
                                                <div>Giới tính:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-9 col-md-9 d-flex justify-content-start align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <span className={cx('col-lg-9 col-md-9 d-flex', 'gender')}>
                                                    <div className={cx('me-4')}>
                                                        <input
                                                            type="radio"
                                                            id="male"
                                                            checked={gender === 'male'}
                                                            onClick={(e) => setGender('male')}
                                                            name="gender"
                                                            value="male"
                                                        />
                                                        <label for="male" className={cx('ms-2')}>
                                                            Nam
                                                        </label>
                                                    </div>
                                                    <div className={cx('mx-2')}>
                                                        <input
                                                            type="radio"
                                                            id="female"
                                                            checked={gender === 'female'}
                                                            onClick={(e) => setGender('female')}
                                                            name="gender"
                                                            value="female"
                                                        />
                                                        <label for="female" className={cx('ms-2')}>
                                                            Nữ
                                                        </label>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('row pb-2')}>
                                            <div className={cx('d-flex justify-content-end', 'update-profile-btn')}>
                                                <button
                                                    className={cx('btn btn-primary btn-lg px-5 fs-4')}
                                                    onClick={handleEditProfile}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-lg-5 col-md-5 d-none d-lg-block', 'profile-avatar')}>
                                        <div className={cx('d-flex justify-content-center')}>
                                            <div>
                                                <img
                                                    src={avatar && avatar.trim() !== '' ? avatar : noImage.noImage}
                                                    className={cx('avatar')}
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'change-avatar-btn')}>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg"
                                                onClick={showChangeAvatarModal}
                                            >
                                                Đổi ảnh
                                            </button>
                                        </div>

                                        <div className={cx('d-flex justify-content-center', 'change-pass-btn')}>
                                            <button
                                                type="button"
                                                className={cx('btn btn-primary btn-lg')}
                                                onClick={showChangePassWordModal}
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-md-12 d-block d-lg-none', 'profile-avatar')}>
                                        <div className={cx('d-flex justify-content-center')}>
                                            <div className={cx('avatar')}>
                                                <img
                                                    src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg"
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'change-avatar-btn')}>
                                            <button type="button" className="btn btn-primary btn-lg">
                                                Đổi ảnh
                                            </button>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'change-pass-btn')}>
                                            <button
                                                type="button"
                                                className={cx('btn btn-primary btn-lg')}
                                                onClick={showChangePassWordModal}
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-md-12 d-block d-lg-none', 'profile-info')}>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Tên:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-8 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Email:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-8 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Số điện thoại:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-8 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Địa chỉ:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-8 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Ngày sinh:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-8 col-md-9 d-flex justify-content-end align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <input
                                                    type="date"
                                                    class={cx('form-control fs-4 py-3')}
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Giới tính:</div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'col-lg-8 col-md-9 d-flex justify-content-start align-items-start',
                                                    'info',
                                                )}
                                            >
                                                <span className={cx('col-lg-8 col-md-9 d-flex', 'gender')}>
                                                    <div className={cx('me-4')}>
                                                        <input type="radio" id="male" name="gender" value="male" />
                                                        <label for="male" className={cx('ms-2')}>
                                                            Nam
                                                        </label>
                                                    </div>
                                                    <div className={cx('mx-2')}>
                                                        <input type="radio" id="female" name="gender" value="female" />
                                                        <label for="female" className={cx('ms-2')}>
                                                            Nữ
                                                        </label>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('row pb-2')}>
                                                <div className={cx('d-flex justify-content-end', 'update-profile-btn')}>
                                                    <button
                                                        className={cx('btn btn-primary btn-lg px-5 fs-4')}
                                                        onClick={showUpdateModal}
                                                    >
                                                        Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        show={changePassword}
                        onHide={closeChangePassWordModal}
                        className={cx('change-password-modal')}
                    >
                        <Modal.Header closeButton>
                            <div className={cx('title-modal')}>Đổi mật khẩu</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-5 col-md-5', 'heading-modal')}>
                                    <div>Mật khẩu:</div>
                                </div>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    className={cx('col-lg-7 col-md-7')}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-5 col-md-5', 'heading-modal')}>
                                    <div>Mật khẩu mới:</div>
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    className={cx('col-lg-7 col-md-7')}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-5 col-md-5', 'heading-modal')}>
                                    <div>Nhập lại mật khẩu mới:</div>
                                </div>
                                <input
                                    type="password"
                                    value={confirmNewPassword}
                                    className={cx('col-lg-7 col-md-7')}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={cx('btn btn-secondary btn-lg')} onClick={closeChangePassWordModal}>
                                Đóng
                            </button>
                            <button className={cx('btn btn-primary btn-lg')} onClick={handleSaveChangePassword}>
                                Lưu thay đổi
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={changeAvatar} onHide={closeChangeAvatarModal} className={cx('change-avatar-modal')}>
                        <Modal.Header closeButton>
                            <div className={cx('title-modal')}>Đổi ảnh</div>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="file"
                                id="fileInput"
                                name="fileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={cx('btn btn-secondary btn-lg')} onClick={closeChangeAvatarModal}>
                                Đóng
                            </button>
                            <button className={cx('btn btn-primary btn-lg')} onClick={closeChangeAvatarModal}>
                                Lưu thay đổi
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ProfileCustomer;
