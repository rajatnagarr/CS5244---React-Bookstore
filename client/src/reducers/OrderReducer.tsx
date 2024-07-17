import type { OrderDetails } from '../types'; // Ensure this path matches your project structure

export const OrderTypes = {
    SET_DETAILS: "SET_DETAILS",
    CLEAR_DETAILS: "CLEAR_DETAILS"
};

// Define the type for action for better type checking
type AppActions = {
    type: string;
    orderDetails?: OrderDetails;
};

// Reducer function for managing order details
export const orderReducer = (state: OrderDetails, action: AppActions): OrderDetails => {
    switch (action.type) {
        case OrderTypes.SET_DETAILS:
            return action.orderDetails ? action.orderDetails : state;
        case OrderTypes.CLEAR_DETAILS:
            return {} as OrderDetails; // Return an empty object when clearing details, properly casted as OrderDetails
        default:
            return state;
    }
};
