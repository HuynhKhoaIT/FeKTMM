import PropTypes from 'prop-types';
function ListCustomer({ children }) {
    return <>{children}</>;
}

ListCustomer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListCustomer;
