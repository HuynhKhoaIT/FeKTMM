/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', { separate: data.separate });
    console.log('11111111111111111');
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data._name}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
