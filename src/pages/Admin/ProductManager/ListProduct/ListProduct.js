import PropTypes from 'prop-types';
function ListProduct({ children }) {
    return <>{children}</>;
}

ListProduct.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListProduct;
