import * as httprequest from '../utils/httprequest';

export const getAllCategories = async () => {
    try {
        const res = await httprequest.get('/categories');
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi trong quá trình lấy danh mục sản phẩm');
    }
};
