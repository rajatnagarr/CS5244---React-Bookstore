import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { orderReducer } from '../reducers/OrderReducer'; // Make sure this path is correct
import type { OrderDetails } from '../types'; // Verify the path

const ORDER_DETAILS_STORAGE_KEY = 'orderDetails';

const initialOrderState: OrderDetails = JSON.parse(localStorage.getItem(ORDER_DETAILS_STORAGE_KEY) || '{}');

export type OrderContextType = {
    orderDetails: OrderDetails;
    dispatch: React.Dispatch<any>;
};

export const OrderStore = createContext<OrderContextType>({
    orderDetails: initialOrderState,
    dispatch: () => undefined, // Default dispatch function
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderDetails, dispatch] = useReducer(orderReducer, initialOrderState);

    useEffect(() => {
        localStorage.setItem(ORDER_DETAILS_STORAGE_KEY, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return (
        <OrderStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderStore.Provider>
    );
};
