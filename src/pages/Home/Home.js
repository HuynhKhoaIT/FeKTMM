import Products from './Products/products.js';
import Sidebar from '../../components/Sidebar/sidebar.js';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import ImageSlider from '../../components/Slider/slider.js';
import { Row, Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import ColProductCard from '../../components/Product/product';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import baner1 from '../../assets/images/baner1.webp';
import banner2 from '../../assets/images/banner2.webp';
import banner3 from '../../assets/images/banner3.webp';
import banner4 from '../../assets/images/banner4.webp';

import ProductItem from '../../components/Product/productItem.js';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
    const [banners, setBanners] = useState([
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
    ]);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    useEffect(() => {
        const fetchBestSellingProducts = async () => {
            try {
                const response = await fetch('/api/products/bestSelling/');
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const data = await response.json();
                //console.log(data)
                setBestSellingProducts(data);
            } catch (error) {
                console.error('Không lấy được dữ liệu: ', error);
            }
        };
        fetchBestSellingProducts();
    }, []);
    //Lấy danh sách hình banners
    useEffect(() => {
        let mounted = true;
        fetch('/api/banners')
            .then((response) => response.json())
            .then((banners) => {
                if (mounted) {
                    console.log(banners);
                    setBanners(banners[0]._images);
                }
                return () => !mounted;
            })
            .catch((error) => alert('Failed to retrieve data'));
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Row style={{ height: '566px' }}>
                <Col span={24}>
                    <Slider infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                        <div>
                            <img style={{ width: '100%', height: '566px' }} src={baner1} />
                        </div>
                        <div>
                            <img style={{ width: '100%', height: '566px' }} src={banner2} />
                        </div>
                        <div>
                            <img style={{ width: '100%', height: '566px' }} src={banner3} />
                        </div>
                        <div>
                            <img style={{ width: '100%', height: '566px' }} src={banner4} />
                        </div>
                    </Slider>
                </Col>
            </Row>
            <div className={cx('container')} fluid="md">
                <div className={cx('main-section')}>
                    <Col className={cx('menu')}>
                        <Sidebar />
                    </Col>
                    <Row className={cx('product-best-sale')}>
                        <Col span={24}>
                            <div className={cx('product-best__title')}>
                                <h2>SẢN PHẨM BÁN CHẠY NHẤT</h2>
                                <Link to={'/search'}>
                                    <p className={cx('pCate')}>Xem Thêm</p>
                                </Link>
                            </div>
                            <Slider dots={false} infinite={true} speed={500} slidesToShow={5} slidesToScroll={3}>
                                {bestSellingProducts?.map((item, index) => (
                                    <ProductItem key={index} data={item} />
                                ))}
                            </Slider>
                        </Col>
                    </Row>
                    <Row>
                        <Products />
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Home;
