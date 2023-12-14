import classNames from 'classnames/bind';
import styles from './ProductListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faPencil, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from '../Images';
import noImage from '../../assets/images';
const cx = classNames.bind(styles);
function ProductListItem({ pId, product, price, quantity, image, editItem, hideItem, activeItem, status }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-1 col-md-1', 'center')}>
                    <p style={{ padding: '2px', wordWrap: 'break-word', width: '100%', textAlign: 'center' }}>{pId}</p>
                </div>
                <div className={cx('col-lg-5 col-md-5 d-flex', 'product')}>
                    <div
                        className={cx('col-lg-2', 'text-center', 'product-img')}
                        style={{ marginRight: '10px', maxWidth: '20%' }}
                    >
                        <Image src={image ? image : noImage.noImage} alt="img" />
                    </div>
                    <p className={cx('product-name')}>{product}</p>
                </div>
                <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center text-truncate')}>
                    <p>{price.toLocaleString('vi-VN')}đ</p>
                </div>
                <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center')}>
                    <p>{quantity}</p>
                </div>
                <div className={cx('col-lg-1 col-md-1 d-flex justify-content-center')}>
                    <p>
                        {status ? (
                            <a className={cx('item-active')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </a>
                        ) : (
                            <a className={cx('item-hide')}>
                                <FontAwesomeIcon icon={faTimes} />
                            </a>
                        )}
                    </p>
                </div>
                <div className={cx('col-lg-2 col-md-2 d-flex justify-content-center', 'item-delete')}>
                    <a onClick={editItem} className={cx('edit')}>
                        <FontAwesomeIcon icon={faPencil} />
                    </a>
                    <p>
                        {status ? (
                            <a onClick={hideItem} className={cx('item-hide')}>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </a>
                        ) : (
                            <a onClick={activeItem} className={cx('item-active')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </a>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductListItem;
