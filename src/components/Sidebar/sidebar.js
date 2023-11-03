import React, { useState, useEffect } from 'react'

import styles from './sidebar.module.scss'
import classNames from 'classnames/bind'
import Col from 'react-bootstrap/esm/Col'
import ViewAll from '../view-all/view-all.js'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function Sidebar() {
    const [brands, setBrands] = useState([
        {
            _id: '',
            _name: ''
        }
    ])

    const [categories, setCategories] = useState([
        {
            _id: '',
            _name: '',
            status: true
        }
    ])

    const capitalizeFirstLetter = (word) => {
        if (!word) {
            return ""; // Return an empty string or handle the case when word is undefined or empty
        }
        else
            return word.charAt(0).toUpperCase() + word.slice(1);
    }

    //get all brands
    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const response = await fetch('/api/brands')
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                const data = await response.json()
                //console.log(data)
                setBrands(data)


            }
            catch (error) {
                console.error('Không lấy được dữ liệu: ', error)
            }
        }
        fetchAllBrands()
    }, [])

    //get all categories
    useEffect(() => {
        const fetchAllCagtegories = async () => {
            try {
                const response = await fetch('/api/categories/')
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                const data = await response.json()
                //console.log(data)
                setCategories(data)


            }
            catch (error) {
                console.error('Không lấy được dữ liệu: ', error)
            }
        }
        fetchAllCagtegories()

    }, [])

    return (
        <Col sm={3} md={3} lg={2} className={cx('sidebar-container')}>
            <div className={cx('side-bar-wrapper')}>
                {/* <nav class="category">
                    <h3 className={cx('category__heading')}><i className={cx('heading__icon fa-solid fa-list')}></i>Lọc theo giá</h3>
                    <ul className={cx('category-list')}>
                        <li className={cx('category-item')}>
                            <a href="#" className={cx('category-item__link')}>Thấp đến cao</a>
                        </li>
                        <li className={cx('category-item')}>
                            <a href="#" className={cx('category-item__link')}>Cao đến thấp</a>
                        </li>

                    </ul>
                </nav> */}
            </div>
            <div className={cx('side-bar-wrapper')}>
                <nav class="category">
                    <h3 className={cx('category__heading')}><i className={cx('heading__icon fa-solid fa-list')}></i>Danh mục</h3>
                    <ul className={cx('category-list')}>
                        {
                            categories.map((category) => (<li className={cx('category-item')}>
                                <Link key={category._id} to={`/search?keyword=${category._name}`} state={{ keyId: `${category._id}` }} className={cx('category-item__link')}>{capitalizeFirstLetter(category._name)}</Link>
                            </li>))
                        }
                    </ul>
                </nav>
            </div>

            <div className={cx('side-bar-wrapper')}>
                <nav class="category">
                    <h3 className={cx('category__heading')}><i className={cx('heading__icon fa-solid fa-list')}></i>Hãng</h3>
                    <ul className={cx('category-list')}>
                        {
                            brands.map((brand) => (
                                <li key={brand.id} className={cx('category-item')}>
                                    <Link key={brand._id} to={`/search?keyword=${brand._name}`} state={{ keyId: `${brand._id}` }} className={cx('category-item__link')}>{capitalizeFirstLetter(brand._name)}</Link>
                                </li>
                            )

                            )
                        }


                        {/* <li className={cx('category-item')}>
                            <ViewAll />
                        </li> */}
                    </ul>
                </nav>
            </div>

        </Col>
    )
}
export default Sidebar