import React from 'react'
import styles from './view-all.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

function ViewAll() {
    return (
        <div className={cx('view-all')}>
            <a href="#" className={cx('category-item__link')}>Xem tất cả<svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" fill="none">
                <path d="M7.5 15L12.5 9.99997L7.5 4.99997" stroke="#1570EF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg></a>

        </div>
    )
}

export default ViewAll