import classNames from 'classnames/bind';
import styles from './ProfileAdmin.module.scss';
import SidebarAdmin from '../../../Layout/components/SidebarAdmin';
import SidebarAdminMobi from '../../../Layout/components/SidebarAdmin/SidebarAdminMobi';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as profileAdminService from '../../../services/profileAdminService';

const cx = classNames.bind(styles);
function ProfileAdmin() {
    const userId = '64b8b48d116933190a3d3543';
    const [reloadData, setReloadData] = useState(true);
    const [user, setUser] = useState([]);
    const [fname, setFname] = useState([]);
    const [lname, setLname] = useState([]);
    const [email, setEmail] = useState([]);
    const [phones, setPhones] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [dateOfBirth, setDateOfbirth] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await profileAdminService.getUser(userId);
            setUser(result);
            setFname(result._fname);
            setLname(result._lname);
            setEmail(result._email);
            setPhones(result._phones);
            setAddresses(result._addresses);
            setDateOfbirth(result._dateOfBirth);
            setGender(result._gender);
        };
        if (reloadData) {
            fetchApi();
            setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
        }
    }, [reloadData]);
    //Form cập nhật thông tin
    const [updateProfile, setUpdateProfile] = useState(false);
    const showUpdateModal = () => setUpdateProfile(true);
    const closeUpdateModal = () => setUpdateProfile(false);
    const handleSaveChangeProfile = async () => {
        const updateProfileData = {
            _fname: fname,
            _lname: lname,
            _email: email,
            _phones: phones[0],
            _addresses: addresses[0],
            _dateOfBirth: dateOfBirth,
            _gender: gender,
        };
        const result = await profileAdminService.updateProfile(userId, updateProfileData);
        if (result === 1) {
            setReloadData(true);
            closeUpdateModal();
            window.alert('Cập nhật thông tin thành công');
        }
    };
    //Form cập nhật mật khẩu
    const [changePassword, setChangePassword] = useState(false);
    const showChangePassWordModal = () => {
        setChangePassword(true);
    };
    const closeChangePassWordModal = () => setChangePassword(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const handleSaveChangePassword = async () => {
        if (newPassword === confirmNewPassword) {
            if (oldPassword === user._pw) {
                const saveChangePassword = await profileAdminService.changePassword(userId, { _pw: newPassword });
                if (saveChangePassword === 1) {
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setReloadData(true);
                    closeChangePassWordModal();
                    window.alert('Cập nhật mật khẩu thành công!');
                }
            } else {
                window.alert('Mật khẩu không chính xác!');
            }
        } else {
            window.alert('Nhập lại mật khẩu không khớp!');
        }
    };

    //From cập nhật avatar
    const [changeAvatar, setChangeAvatar] = useState(false);
    const showChangeAvatarModal = () => setChangeAvatar(true);
    const closeChangeAvatarModal = () => setChangeAvatar(false);

    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarAdmin />
                </div>
                <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                    <SidebarAdminMobi />
                </div>
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    <div className={cx('d-flex align-items-center ', 'title')}>Thông tin cá nhân</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid')}>
                                <div className={cx('row align-items-center', 'profile')}>
                                    <div className={cx('col-lg-7 col-md-7 d-none d-lg-block', 'profile-info')}>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Tên:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>
                                                    {user._fname} {user._lname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Email:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._email}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Số điện thoại:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{phones[0]}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Địa chỉ:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{addresses[0]}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Ngày sinh:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._dateOfBirth}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-lg-3 col-md-3', 'heading')}>
                                                <div>Giới tính:</div>
                                            </div>
                                            <div className={cx('col-lg-9 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._gender === 'female' ? <p>Nữ</p> : <p>Nam</p>}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-lg-5 col-md-5 d-none d-lg-block', 'profile-avatar')}>
                                        <div className={cx('d-flex justify-content-center')}>
                                            <div className={cx('avatar')}>
                                                <img
                                                    src="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'change-avatar-btn')}>
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg"
                                                onClick={showChangeAvatarModal}
                                            >
                                                Đổi ảnh
                                            </button>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'update-profile-btn')}>
                                            <button className={cx('btn btn-primary btn-lg')} onClick={showUpdateModal}>
                                                Cập nhật thông tin cá nhân
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
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg"
                                                onClick={showChangeAvatarModal}
                                            >
                                                Đổi ảnh
                                            </button>
                                        </div>
                                        <div className={cx('d-flex justify-content-center', 'update-profile-btn')}>
                                            <button className={cx('btn btn-primary btn-lg')} onClick={showUpdateModal}>
                                                Cập nhật thông tin cá nhân
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
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>
                                                    {user._fname} {user._lname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Email:</div>
                                            </div>
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._email}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Số điện thoại:</div>
                                            </div>
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{phones[0]}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Địa chỉ:</div>
                                            </div>
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{addresses[0]}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Ngày sinh:</div>
                                            </div>
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._dateOfBirth}</div>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('col-4 col-md-3', 'heading')}>
                                                <div>Giới tính:</div>
                                            </div>
                                            <div className={cx('col-8 col-md-9 d-flex justify-content-end', 'info')}>
                                                <div>{user._gender === 'female' ? <p>Nữ</p> : <p>Nam</p>}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={updateProfile} onHide={closeUpdateModal} className={cx('update-profile-modal')}>
                        <Modal.Header closeButton>
                            <div className={cx('title-modal')}>Cập nhật thông tin cá nhân</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Họ:</div>
                                </div>
                                <input
                                    type="text"
                                    defaultValue={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Tên:</div>
                                </div>
                                <input
                                    type="text"
                                    defaultValue={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Email:</div>
                                </div>
                                <input
                                    type="email"
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Số điện thoại:</div>
                                </div>
                                <input
                                    type="text"
                                    defaultValue={phones[0]}
                                    onChange={(e) => setPhones(e.target[0].value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Địa chỉ:</div>
                                </div>
                                <input
                                    type="text"
                                    defaultValue={addresses[0]}
                                    onChange={(e) => setAddresses(e.target[0].value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Ngày sinh:</div>
                                </div>
                                <input
                                    type="date"
                                    defaultValue={dateOfBirth}
                                    onChange={(e) => setDateOfbirth(e.target.value)}
                                    className={cx('col-lg-9 col-md-9')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-3 col-md-3', 'heading-modal')}>
                                    <div>Giới tính:</div>
                                </div>
                                <span className={cx('col-lg-9 col-md-9', 'gender')}>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label for="male">Nam</label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label for="female">Nữ</label>
                                </span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={cx('btn btn-secondary btn-lg')} onClick={closeUpdateModal}>
                                Đóng
                            </button>
                            <button className={cx('btn btn-primary btn-lg')} onClick={handleSaveChangeProfile}>
                                Lưu thay đổi
                            </button>
                        </Modal.Footer>
                    </Modal>
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
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className={cx('col-lg-7 col-md-7')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-5 col-md-5', 'heading-modal')}>
                                    <div>Mật khẩu mới:</div>
                                </div>
                                <input
                                    type="password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={cx('col-lg-7 col-md-7')}
                                />
                            </div>
                            <div className={cx('row align-items-center')}>
                                <div className={cx('col-lg-5 col-md-5', 'heading-modal')}>
                                    <div>Nhập lại mật khẩu mới:</div>
                                </div>
                                <input
                                    type="password"
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className={cx('col-lg-7 col-md-7')}
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
                            <input type="file" id="fileInput" name="fileInput" accept="image/*" />
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

export default ProfileAdmin;
