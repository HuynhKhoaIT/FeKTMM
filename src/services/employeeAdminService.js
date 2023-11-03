import * as httprequest from '../utils/httprequest';

export const getAllEmployees = async () => {
    try {
        const res = await httprequest.get(`/admin/employees`);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách nhân viên'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const deteleEmployee = async (userId) => {
    try {
        const res = await httprequest.put(
            '/admin/employees/delete/',
            {},
            {
                params: {
                    userId,
                },
            },
        );
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình xóa nhân viên'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const addEmployee = async (data) => {
    try {
        const res = await httprequest.post(`/admin/employees/add`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình thêm nhân viên'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
