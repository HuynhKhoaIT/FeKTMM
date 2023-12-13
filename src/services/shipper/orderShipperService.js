import * as httprequest from '../../utils/httprequest';

export const getAllOrders = async () => {
    try {
        const res = await httprequest.get(`/shipper/orders`);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách đơn hàng');
    }
};

export const getShipperOrders = async (shipperId) => {
    try {
        const res = await httprequest.get(`/shipper/orders/shipper/`, {
            params: {
                shipperId,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách đơn hàng');
    }
};
export const getOrdersbyStatus = async () => {
    try {
        const res = await httprequest.get(`/admin/orders/order-status-1`, {});
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách đơn hàng');
    }
};

export const getOrder = async (orderId) => {
    try {
        const res = await httprequest.get(`/shipper/orders/order-detail/`, {
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
        const res = await httprequest.put(`/shipper/orders/update-order/`, data, {
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

export const comfirmOrder = async (orderId, data) => {
    try {
        const res = await httprequest.put(`/shipper/orders/comfirm-order/`, data, {
            params: {
                orderId,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình nhận đơn hàng');
    }
};
