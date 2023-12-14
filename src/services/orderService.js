import * as httprequest from '../utils/httprequest';

const getOrder = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await httprequest.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response;
    } catch (error) {
        console.log('Lỗi lấy danh sách đơn hàng:', error);
        throw new Error('Đã xảy ra lỗi lấy danh sách đơn hàng');
    }
};
const getOrderByStatus = async (status) => {
    const token = localStorage.getItem('token');
    try {
        const response = await httprequest.get(`/orders/${status}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response;
    } catch (error) {
        console.log('Lỗi lấy danh sách đơn hàng:', error);
        throw new Error('Đã xảy ra lỗi lấy danh sách đơn hàng');
    }
};

const postOrder = async (token, orderData) => {
    try {
        // Sử dụng axios.post thay vì httprequest.post
        const response = await httprequest.post('/orders/create', orderData, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });

        return response; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
        console.log('Lỗi khi đặt hàng:', error);
        throw new Error('Đã xảy ra lỗi khi đặt hàng');
    }
};
const cancelOrder = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const response = await httprequest.put(
            `/orders/cancel/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Gửi token trong header
                },
            },
        );
        return response;
    } catch (error) {
        console.log('Lỗi khi hủy đơn:', error);
        throw new Error('Đã xảy ra lỗi khi hủy đơn hàng');
    }
};

const postOrderVnpay = async (orderData) => {
    try {
        const response = await httprequest.post('/orders/vnpayCreatePayment', orderData);
        console.log(response);
        const vnpayPaymentUrl = response.vnpayPaymentUrl;
        console.log(vnpayPaymentUrl);
        window.location.href = vnpayPaymentUrl;
    } catch (error) {
        console.log('Lỗi khi đặt hàng:', error);
        throw new Error('Đã xảy ra lỗi khi đặt hàng');
    }
};

export { postOrder, postOrderVnpay, getOrder, getOrderByStatus, cancelOrder }; // Export hàm postOrder
