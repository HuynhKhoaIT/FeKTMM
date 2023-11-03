import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Image from '../../components/Images';
import Button from '../../components/Button';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import * as product from '../../services/productService';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function Category() {
    const [products, setProducts] = useState([]);
    const queryParams = new URLSearchParams(useLocation().search);
    // Access individual query parameters
    const categoryId = queryParams.get('categoryId');
    console.log(categoryId);
    useEffect(() => {
        // Hàm fetch dữ liệu sản phẩm từ API
        const fetchProducts = async () => {
            try {
                const listProducts = await product.getAllProductsByCategory(categoryId);
                setProducts(listProducts); // Lưu dữ liệu sản phẩm vào state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId]);
    console.log(products);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <h2>Danh Mục</h2>
                </div>
                <div className={cx('row')}>
                    <div className={cx('product-list', 'd-flex')}>
                        {products.map((item) => (
                            <div className={cx('product__item')}>
                                <div className={cx('product-img')}>
                                    <Image src={item._images[0]} alt="img" />
                                </div>
                                <p className={cx('product__item-name')}>{item._name} </p>
                                <div className={cx('product__item-price')}>
                                    <p>{item._price.toLocaleString()}đ</p>
                                    <p className={cx('price-sale')}>{item._price.toLocaleString()}đ</p>
                                </div>
                                <Link to={`/product-detail?id=${item._id}`}>
                                    <Button className={cx('btn-add')} primary small>
                                        Xem chi tiết
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
