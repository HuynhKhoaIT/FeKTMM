import PropTypes from 'prop-types';
function ListCart({ children }) {
    return <>{children}</>;
}
ListCart.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ListCart;
