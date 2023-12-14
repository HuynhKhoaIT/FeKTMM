const cartReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                value: action.payload,
            };

        default:
            return state;
    }
};
export default cartReducer;
