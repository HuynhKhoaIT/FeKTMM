import * as httprequest from '../utils/httprequest';

export const getUser = async (token) => {
    try {
        const res = await httprequest.get(`/accounts/getProfile`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin');
    }
};

export const editProfile = async (data, token) => {
    console.log('====================================');
    console.log('get', data);
    console.log('====================================');
    try {
        const res = await httprequest.put(`/accounts/updateProfile`, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật thông tin');
    }
};
export const changePassword = async (data, token) => {
    try {
        const res = await httprequest.put(`/accounts/changePassWord`, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật mật khẩu');
    }
};
