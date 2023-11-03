import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './products.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ColProductCard from '../../../components/Product/product';
import ViewAll from '../../../components/view-all/view-all';
import ImageSlider from '../../../components/Slider/slider';

const cx = classNames.bind(styles);
function Products() {
    const [banners, setBanners] = useState([
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
        'https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw',
    ]);

    const [bestSellingProducts, setBestSellingProducts] = useState([
        {
            _id: '',
            _name: '',
            _price: 0,
            _quantity: 0,
            _salePercent: 0,
            _sold: 0,
            _status: true,
            _images: [],
            _brandId: {
                _id: '',
                _name: '',
            },
        },
    ]);

    const [onSaleProducts, setOnSaleProducts] = useState([
        {
            _id: '',
            _name: '',
            _price: 0,
            _quantity: 0,
            _salePercent: 0,
            _sold: 0,
            _status: true,
            _images: [],
            _brandId: {
                _id: '',
                _name: '',
            },
        },
    ]);

    const [mostSearchedProducts, setMostSearchedProducts] = useState([
        {
            _id: '',
            _name: '',
            _price: 0,
            _quantity: 0,
            _salePercent: 0,
            _sold: 0,
            _status: true,
            _images: [],
            _brandId: {
                _id: '',
                _name: '',
            },
        },
    ]);

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

    // get best selling products
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

    //get on sale products
    useEffect(() => {
        const fetchOnSaleProducts = async () => {
            try {
                const response = await fetch('/api/products/onSale');
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const data = await response.json();
                //console.log(data)
                setOnSaleProducts(data);
            } catch (error) {
                console.error('Không lấy được dữ liệu: ', error);
            }
        };
        fetchOnSaleProducts();
    }, []);

    //get most searched products
    useEffect(() => {
        const fetchMostSearchedProducts = async () => {
            try {
                const response = await fetch('/api/products/mostSearched');
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const data = await response.json();
                //console.log(data)
                setMostSearchedProducts(data);
            } catch (error) {
                console.error('Không lấy được dữ liệu: ', error);
            }
        };
        fetchMostSearchedProducts();
    }, []);

    return (
        <Col xs={12} sm={8} md={8} lg={9} xl={9} className={cx('col-products')}>
            <div className={cx('row-slider')}>
                <Row>
                    <ImageSlider sliderImages={banners} />
                </Row>
            </div>

            <div className={cx('tag-wrapper')}>
                <p>
                    <a href="#top-sale-section">Top sale</a>
                </p>
                <p>
                    <a href="#on-sale-section">Đang sale</a>
                </p>
                <p>
                    <a href="#top-search-section">Tìm kiếm nhiều nhất</a>
                </p>
            </div>

            {/* Top sale */}
            <div id="top-sale-section" className={cx('row-products')}>
                {/* Bán chạy nhất */}
                <p className={cx('row-products-label')}>Sản phẩm bán chạy nhất</p>
                <Row sm xs={2} md={3} lg={3} xl={5}>
                    {bestSellingProducts.map((product, index) => (
                        <div className={cx('card-wrapper')}>
                            <ColProductCard
                                key={product._id}
                                pId={product._id}
                                url="https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp"
                                pCate={product._brandId._name}
                                pName={product._name}
                                oldPrice={product._price}
                                salePercents={product._salePercent}
                                count={1}
                            />
                        </div>
                    ))}
                </Row>
            </div>

            {/* Sản phẩm đang sale */}
            <div id="on-sale-section" className={cx('row-products')}>
                <p className={cx('row-products-label')}>Sản phẩm đang sale</p>
                <Row sm xs={2} md={3} lg={3} xl={5}>
                    {
                        onSaleProducts.map((product, index) => (
                            <div className={cx('card-wrapper')}>
                                <ColProductCard
                                    key={product._id}
                                    pId={product._id}
                                    url='https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp'
                                    pCate={product._brandId._name}
                                    pName={product._name}
                                    oldPrice={product._price}
                                    salePercents={product._salePercent}
                                    count={1}
                                />
                            </div>))
                    }
                </Row>
                <div className={cx('view-all-products')}>
                    <ViewAll />
                </div>
            </div>

            {/*Most searched  */}
            <div id="top-search-section" className={cx('row-products')}>
                <p className={cx('row-products-label')}>Sản phẩm được tìm kiếm nhiều nhất</p>
                <Row sm xs={2} md={3} lg={3} xl={5}>
                    {
                        mostSearchedProducts.map((product, index) => (
                            (<div className={cx('card-wrapper')}>
                                <ColProductCard
                                    key={product._id}
                                    pId={product._id}
                                    url='https://res.cloudinary.com/dawwzvnhe/image/upload/v1692778654/src/images/products/Monitor/Dell/LCD_S2421H/front1_zcl5i8.webp'
                                    pCate={product._brandId._name}
                                    pName={product._name}
                                    oldPrice={product._price}
                                    salePercents={product._salePercent}
                                    count={1}
                                />
                            </div>)
                        ))
                    }
                </Row>
            </div>
        </Col>
    );
}

export default Products;
