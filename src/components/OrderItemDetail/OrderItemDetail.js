import { useEffect, useState } from 'react';
import Image from '../Images';
import classNames from 'classnames/bind';
import styles from './OrderItemDetail.module.scss';
import Loading from '../../components/loading';

const cx = classNames.bind(styles);
function OrderItemDetail({ id, quantity, note }) {
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await fetch(`https://cnpmmnhom14.onrender.com/api/products/${id}`);
            const product = await result.json();
            console.log(product);
            setProduct(product);
            setPrice((product._price * quantity).toLocaleString('vi-VN'));
            setImages(product._images);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('col-lg-12', 'd-flex', 'product')}>
            <div className={cx('col-lg-3', 'product-img', 'text-center')}>
                <Image src={images[0]} alt="img" />
            </div>
            <div className={cx('col-lg-10', 'product__info')}>
                <h3 className={cx('product__info-name')}>
                    {product._name} (x{quantity})
                </h3>
                <div className={cx('product__info-user')}>
                    <p className={cx('color')}>
                        Giá: <span>{price}đ</span>
                    </p>
                </div>
                <div className={cx('product__info-user')}>
                    <p className={cx('color')}>Ghi chú: {note}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderItemDetail;
