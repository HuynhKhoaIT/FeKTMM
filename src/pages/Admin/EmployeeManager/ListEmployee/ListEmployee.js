import PropTypes from 'prop-types';
function ListEmployee({ children }) {
    return <>{children}</>;
}

ListEmployee.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListEmployee;
