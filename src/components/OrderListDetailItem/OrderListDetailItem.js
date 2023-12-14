import classNames from 'classnames/bind';
import styles from './OrderListDetailItem.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function OrderListDetailItem({ id, quantity }) {
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await fetch(`https://cnpmmnhom14.onrender.com/api/products/${id}`);
            const product = await result.json();
            console.log(product._images[0]);
            setImage(product._images[0]);
            setProduct(product);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row', 'content')}>
                <div className={cx('col-lg-2 col-md-2')}>
                    <div className={cx('d-flex justify-content-center', 'img-product')}>
                        <img src={image} alt="img-product" />
                    </div>
                </div>
                <div className={cx('col-lg-8 col-md-8', 'decs-product')}>
                    <div className={cx('name-product')}>
                        <p>{product._name}</p>
                    </div>
                    {/* <div className={cx('classify-product')}>8GB 256GB </div> */}
                    <div className={cx('quantity')}>x{quantity}</div>
                </div>
                <div className={cx('col-lg-2 col-md-2', 'price-product')}>
                    <div className={cx('d-flex justify-content-end align-items-end')}>
                        <p>{parseInt(product._price).toLocaleString('vi-VN')}đ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderListDetailItem;
