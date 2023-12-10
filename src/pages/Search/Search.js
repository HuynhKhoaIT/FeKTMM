import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import styles from './Search.module.scss';
import SearchResult from './SearchResult/searchResult'
import classNames from 'classnames/bind';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles)
function Search() {

    const [foundProducts, setFoundProducts] = useState([
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
                _name: ''
            }
        }
    ])
    const location = useLocation();
    const data = location.state;
    // console.log(data);

    // fetch products found
    useEffect(() => {
        const fetSearchResult = async () => {
            try {
                const response = await fetch(`https://cnpmmnhom14.onrender.com/api/products/get-by-keyId?categoryId=${data.keyId}&brandId=${data.keyId}`);
                if (!response.ok) {
                    toast.error('Yêu cầu thất bại!')

                }
                const foundProducts = await response.json()
                setFoundProducts(foundProducts)
            }
            catch (error) {
                toast.error('Không lấy được dữ liệu, vui lòng thử lại sau1')
            }
        }
        fetSearchResult()

    }, [data])


    // let searchResults = [{
    //     id: 1,
    //     name: 'Laptop Lenovo IdeaPad 315IAU7 - 82RK001NVN',
    //     price: 12000000,
    //     salePercents: 10,
    //     quantity: 1000,
    //     images: ['https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw'],
    //     category: 'DATA',
    //     rating: 4.1,
    //     ratingNumber: 67
    // },
    // {
    //     id: 2,
    //     name: 'Laptop Lenovo IdeaPad 315IAU7 - 82RK001NVN',
    //     price: 12000000,
    //     salePercents: 10,
    //     quantity: 1000,
    //     images: ['https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw'],
    //     category: 'DATA',
    //     rating: 4,
    //     ratingNumber: 67
    // },
    // {
    //     id: 3,
    //     name: 'Laptop Lenovo IdeaPad 315IAU7 - 82RK001NVN',
    //     price: 12000000,
    //     salePercents: 10,
    //     quantity: 1000,
    //     images: ['https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw'],
    //     category: 'DATA',
    //     rating: 4,
    //     ratingNumber: 67
    // },
    // {
    //     id: 4,
    //     name: 'Laptop Lenovo IdeaPad 315IAU7 - 82RK001NVN',
    //     price: 12000000,
    //     salePercents: 10,
    //     quantity: 1000,
    //     images: ['https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw'],
    //     category: 'DATA',
    //     rating: 4, ratingNumber: 67

    // },
    // {
    //     id: 5,
    //     name: 'Laptop Lenovo IdeaPad 315IAU7 - 82RK001NVN',
    //     price: 12000000,
    //     salePercents: 10,
    //     quantity: 1000,
    //     images: ['https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw',
    //         'https://lh3.googleusercontent.com/cBdOXgYGm5cLGaxviqHQflM2yCWnvYv3uU__kFllR0ZMqEVW-IUK6xIizab9q0NVmHjQJzdQ9bVyNTmRp4dbUOkwo5ZEOVPJ=w500-rw'],
    //     category: 'DATA',
    //     rating: 4,
    //     ratingNumber: 67
    // }
    // ]
    //let searchResults = []
    return (
        <Container>
            <Row className={cx('main-section')}>
                {
                    foundProducts.length > 0 && <Sidebar />
                }
                <SearchResult
                    foundProducts={foundProducts}
                />
            </Row >
        </Container>

    )
}
export default Search