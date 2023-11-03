import * as httprequest from '../utils/httprequest';

export const getUser = async (userId) => {
    try {
        const res = await httprequest.get(`/admin/profile/`, {
            params: {
                userId,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin');
    }
};

export const updateProfile = async (userId, data) => {
    try {
        const res = await httprequest.put(`/admin/profile/update-profile/`, data, {
            params: {
                userId,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật thông tin');
    }
};
export const changePassword = async (userId, newPassword) => {
    try {
        const res = await httprequest.put(`/admin/profile/update-password/`, newPassword, {
            params: {
                userId,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật mật khẩu');
    }
};
