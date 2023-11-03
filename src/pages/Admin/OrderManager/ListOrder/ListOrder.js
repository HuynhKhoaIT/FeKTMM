import PropTypes from 'prop-types';
function ListOrder({ children }) {
    return <>{children}</>;
}

ListOrder.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListOrder;
