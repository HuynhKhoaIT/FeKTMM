import Image from '../Images';
import classNames from 'classnames/bind';
import styles from './CartItemCheckOut.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faXmark } from '@fortawesome/free-solid-svg-icons';
import ListGift from '../../pages/CheckOut/ListGift';
import GiftItem from './GiftItem';
const cx = classNames.bind(styles);
function CartItemCheckOut({ itemName, itemImage, itemPrice, itemQuantity, deleteItem }) {
    return (
        <div className={cx('wrapper', 'd-flex flex-column')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-6 col-md-6 d-flex')}>
                    <div className={cx('product', 'd-flex')}>
                        <div className={cx('product-img')}>
                            <Image src={itemImage} alt="img" />
                        </div>
                        <div className={cx('product__info')}>
                            <h3 className={cx('product__info-name')}>{itemName}</h3>
                            {/* <div className={cx('product__info-memory', 'd-flex')}>
                                <p>
                                    Bộ nhớ: <span>256GB</span>
                                </p>
                                <p className={cx('color')}>
                                    Màu: <span>Xám bạc</span>
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div
                    className={cx(
                        'col-lg-6 col-md-6 row align-items-center text-end text-md-center text-lg-md',
                        'cart__item-info',
                    )}
                >
                    <div className={cx('col-lg-3 col-md-3', 'cart__item-price')}>
                        <p>{parseInt(itemPrice).toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className={cx('col-lg-3 col-md-3', 'cart__item-quantity')}>
                        <div className={cx('quantity')}>{itemQuantity}</div>
                    </div>
                    <div className={cx('col-lg-3 col-md-3', 'cart__item-money')}>
                        <div>
                            <p
                                className={cx('d-inline-block d-md-none d-lg-none')}
                                style={{ color: '#000', marginRight: '4px' }}
                            >
                                Thành tiền:<span> </span>{' '}
                            </p>
                            {(itemQuantity * itemPrice).toLocaleString('vi-VN')}₫
                        </div>
                    </div>
                    <div className={cx('col-lg-3 col-md-3', 'cart__item-delete')}>
                        <a onClick={deleteItem} className={cx('delete')}>
                            <FontAwesomeIcon className={cx('d-md-none d-lg-none', 'icon-delete')} icon={faXmark} />
                            <span className={cx('d-none d-md-block d-lg-block')}>Xóa</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx('cart__gift')}>
                <div className={cx('cart__gift-title', 'd-flex')}>
                    <FontAwesomeIcon icon={faGift} />
                    <h3>Quà tặng</h3>
                </div>
                <div className={cx('cart__gift-item')}>
                    <ListGift>
                        <GiftItem />
                    </ListGift>
                </div>
            </div>
        </div>
    );
}

export default CartItemCheckOut;
