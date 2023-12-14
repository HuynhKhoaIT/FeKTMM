import * as httprequest from '../utils/httprequest';

export const getProductDetails = async (productId) => {
    try {
        const res = await httprequest.get(`/products/${productId}`);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin');
    }
};

export const getAllProducts = async () => {
    try {
        const res = await httprequest.get(`/products`);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getAllProductsByCategory = async (categoryId) => {
    try {
        const res = await httprequest.get('/categories/products/', {
            params: {
                categoryId,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi trong quá trình lấy danh mục sản phẩm');
    }
};
export const getAllProductsMoreSearch = async () => {
    try {
        const res = await httprequest.get('/products/mostSearched', {
        });
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi trong quá trình lấy sản phẩm tìm kiếm nhiều nhất');
    }
};

export const getAllProductsBestSeller = async () => {
    try {
        const res = await httprequest.get('/products/bestSelling', {
        });
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi trong quá trình lấy sản phẩm bestSelling');
    }
};

export const getAllProductsOnSale = async () => {
    try {
        const res = await httprequest.get('/products/onSale', {
        });
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi trong quá trình lấy  sản phẩm on sale');
    }
};
export const addProduct = async (data) => {
    try {
        const res = await httprequest.post(`/products/add`, data);

        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình thêm sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const editProduct = async (pId, data) => {
    try {
        const res = await httprequest.put(`/products/edit`, data, {
            params: {
                pId,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật thông tin');
    }
};

export const hideProduct = async (pId) => {
    try {
        const res = await httprequest.put(
            '/products/hide/',
            {},
            {
                params: {
                    pId,
                },
            },
        );
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình ẩn sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const activeProduct = async (pId) => {
    try {
        const res = await httprequest.put(
            '/products/active/',
            {},
            {
                params: {
                    pId,
                },
            },
        );
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình kích hoạt sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
