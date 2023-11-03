import Products from './Products/products.js';
import Sidebar from '../../components/Sidebar/sidebar.js';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './home.module.scss'
const cx = classNames.bind(styles)
function Home() {
    return (
        <Container fluid="md">
            <Row className={cx('main-section')}>
                <Sidebar />
                <Products />
            </Row >
        </Container>


    );
}

export default Home;
