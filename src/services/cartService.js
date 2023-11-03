import * as httprequest from '../utils/httprequest';

export const getCartByUserId = async (token) => {
    try {
        const res = await httprequest.get(`/carts/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return res._cartItems;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin giỏ hàng'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const deleteItemCart = async (token, itemId) => {
    try {
        console.log(itemId);
        // Gửi yêu cầu DELETE đến API để xóa sản phẩm từ giỏ hàng
        const response = await httprequest.deleteRequest(`/carts/delete-cart`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
            data: {
                itemId: itemId, // Gửi ID sản phẩm cần xóa trong dữ liệu request body
            },
        });
        console.log(response);

        // Kiểm tra phản hồi từ API
        if (response.data !== null) {
            // Nếu thành công, bạn có thể xử lý phản hồi ở đây nếu cần
            console.log('Sản phẩm đã được xóa khỏi giỏ hàng.');
        } else {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', response.statusText);
        }
    } catch (error) {
        // Xử lý lỗi nếu có lỗi kết nối hoặc lỗi khác
        console.error('Lỗi khi gửi yêu cầu xóa sản phẩm khỏi giỏ hàng:', error.message);
    }
};
