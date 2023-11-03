import PropTypes from 'prop-types';
function ListGift({ children }) {
    return <>{children}</>;
}
ListGift.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ListGift;
