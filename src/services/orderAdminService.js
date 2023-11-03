import * as httprequest from '../utils/httprequest';

export const getAllOrders = async () => {
    try {
        const res = await httprequest.get(`/admin/orders`);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách đơn hàng');
    }
};

export const getOrder = async (orderId) => {
    try {
        const res = await httprequest.get(`/admin/orders/order-detail/`, {
            params: {
                orderId,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy đơn hàng');
    }
};

export const updateOrder = async (orderId, data) => {
    try {
        const res = await httprequest.put(`/admin/orders/update-order/`, data, {
            params: {
                orderId,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật đơn hàng');
    }
};
