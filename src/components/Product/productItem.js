import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './product.module.scss';
import { RatingStar } from '../Icons/Icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
function ProductItem(data) {
    const token = localStorage.getItem('token');
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <div className={cx('star-styles')}>
                    <RatingStar key={i} />
                </div>,
            );
        }

        return stars;
    };

    const capitalizeFirstLetter = (word) => {
        if (!word) {
            return ''; // Return an empty string or handle the case when word is undefined or empty
        } else return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const handleAddToCartClick = async (itemId, itemQuantity = 1) => {
        if (token) {
            try {
                const response = await fetch('/api/carts/add-to-cart', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        itemId: itemId,
                        quantity: itemQuantity,
                    }),
                });

                if (response.ok) {
                    toast.success('Thêm thành công sản phẩm vào giỏ hàng!');
                } else {
                    toast.error('Có lỗi xảy ra trong quá trình thêm giỏ hàng!');
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra trong quá trình thêm giỏ hàng!');
                console.error('Error:', error);
            } finally {
                console.log('Done!');
            }
        } else {
            alert('Vui lòng đăng nhập để thực hiện chức năng này!');
        }
    };

    return (
        <div className={cx('product-item')}>
            <div className={cx('product-item__img')}>
                <img src="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp" />
            </div>
            <div className={cx('product-item__info')}>
                <p className={cx('product-item__name')}>
                    Laptop ACER Aspire 3 A315-59-381E (NX.K6TSV.006) (i3-1215U/RAM 8GB/512GB SSD/ Windows 11)
                </p>
                <div>
                    <p className={cx('product-item__price')}>13.000.000đ</p>
                    <p className={cx('product-item__price-sale')}>14.000.000đ</p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
