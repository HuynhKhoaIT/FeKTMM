/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'; // ES6
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Images';

const cx = classNames.bind(styles);
function SearchItem({ data }) {
    return (
        <Link to={`/product-detail?id=${data._id}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data._images[0]} alt={data.nickname} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data._name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                </p>
                <p className={cx('username')}>{data.full_name}</p>
            </div>
        </Link>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default SearchItem;
