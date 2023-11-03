import React from 'react';
import { useState } from 'react';
import styles from './ProductImgs.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function ProductImgs({ images, salePercents }) {

    const [pMainImg, setpMainImg] = useState(images[0])

    const handleChangeMainImg = (index) => {
        setpMainImg(images[index])
    }

    return (
        <div className={cx('pImages-wrapper')}>
            <div className={cx('main-pImages-wrapper')}>
                {salePercents > 0 && <p className={cx('sale-tag')}>-{salePercents}%</p>}
                <img className={cx('main-pImage')} alt='Ảnh sản phẩm' src={pMainImg}></img>
            </div>
            <div className={cx('sub-pImages-wrapper')}>
                {
                    images.map((image, index) => {
                        if (image === pMainImg) {
                            return <img key={index} className={cx('sub-pImage', 'current-pImg')} src={image} alt='Ảnh sản phẩm' onMouseOver={() => handleChangeMainImg(index)}></img>
                        }
                        else
                            return <img key={index} className={cx('sub-pImage')} src={image} alt='Ảnh sản phẩm' onMouseOver={() => handleChangeMainImg(index)}></img>
                    })
                }
            </div>
        </div>
    )
}

export default ProductImgs