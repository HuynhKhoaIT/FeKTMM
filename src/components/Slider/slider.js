
import React, { useState } from 'react';
import styles from './slider.module.scss';
import classNames from 'classnames/bind';
import { RightArrowWithTail, LeftArrowWithTail } from '../Icons/Icons';

const cx = classNames.bind(styles);

function ImageSlider({ sliderImages }) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % sliderImages.length);
    };

    const prevImage = () => {
        setCurrentImage((currentImage - 1 + sliderImages.length) % sliderImages.length);
    };

    console.log(sliderImages)

    return (
        <div className={cx('slider-container')}>
            <button className={cx('btn', 'prev')} onClick={prevImage}> <LeftArrowWithTail color='#fff' /></button>
            <img src={sliderImages[currentImage]} alt={`Image ${currentImage + 1}`} />
            <button className={cx('btn', 'next')} onClick={nextImage}><RightArrowWithTail color='#fff' /></button>

        </div>
    );
}

export default ImageSlider;
