import classNames from 'classnames/bind';
import styles from './GiftItem.module.scss';
import Image from '../../Images';
const cx = classNames.bind(styles);
function GiftItem() {
    return (
        <div className={cx('gift__item', 'd-flex')}>
            <div className={cx('gift__item-img')}>
                <Image
                    src="https://lh3.googleusercontent.com/Jsg6-adZeI1TZnmeIT8Tpal63lIr4tLji5QjZaOWJjjXPY1blN5K9cG1MWkI7LesQj-8Xw80MVRBQwXWd9fs-kC03cyFCxo=w230-rw"
                    alt="img"
                />
            </div>
            <h4 className={cx('gift__item-name')}>Chuột Apple Magic Mouse 2021 MK2E3 | Chính hãng Apple Việt Nam</h4>
        </div>
    );
}

export default GiftItem;
