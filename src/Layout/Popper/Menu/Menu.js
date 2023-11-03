/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFun = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFun }) {
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            {items.map((item) => {
                <div className={cx('menu-body')}>{item._name}</div>;
            })}
        </div>
    );

    return (
        <HeadlessTippy delay={[0, 700]} interactive render={renderResult} trigger="click" hideOnClick>
            {children}
        </HeadlessTippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
