import * as httprequest from '../utils/httprequest';

export const getAllCustomers = async () => {
    try {
        const res = await httprequest.get(`/admin/customers`);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách khách hàng'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const hideCustomer = async (userId) => {
    try {
        const res = await httprequest.put(
            '/admin/customers/hide/',
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
        throw new Error('Lỗi trong quá trình xóa khách hàng'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const activeCustomer = async (userId) => {
    try {
        const res = await httprequest.put(
            '/admin/customers/active/',
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
        throw new Error('Lỗi trong quá trình kích hoạt khách hàng'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
