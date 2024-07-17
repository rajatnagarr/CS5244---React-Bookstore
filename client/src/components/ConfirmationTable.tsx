import React, { useContext } from 'react';
import { CartStore } from '../contexts/CartContext'; // Adjust path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/CartTable.css';
import { BookItem } from "../types";
import {getSubtotal, getSurcharge, getTotal, isEmpty} from "../reducers/CartReducer";
import {useCategory} from "../contexts/CategoryContext";
import {OrderStore} from "../contexts/OrderContext"; // Adjust path as necessary
import '../assets/css/ConfirmationPage.css';

const ConfirmationTable = () => {
    const { cart, dispatch } = useContext(CartStore);
    const { orderDetails} = useContext(OrderStore);
    function displayCreditCard(ccNumber: string) {
        ccNumber = ccNumber.replace(/ /g, "").replace(/-/g, "");
        const visiblePart = ccNumber.slice(-4);
        return `**** **** **** ${visiblePart}`;
    }
    
    function formatMonth(month: number) {
        return month < 10 ? `0${month + 1}` : month.toString();
    }

    const asDollarsAndCents = (price: number) => {
        return `$${price.toFixed(2)}`;
    };


    return (
        <div>
            <div className="cart-table-2">
                <ul className="ull">
                    <li className="table-heading lii">
                        <div className="heading-book-2">Book</div>
                        <div className="heading-quantity-2">Quantity</div>
                        <div className="heading-subtotal-2">Price</div>
                    </li>
                    {orderDetails.lineItems?.map((item, index) => (
                        <React.Fragment key={index}>
                            <li className="center-order lii">
                                <div className="heading-book-2">{orderDetails.books[index].title}</div>
                                <div className="heading-quantity-2">{ item.quantity }</div>
                                <div className="heading-subtotal-2">{asDollarsAndCents(orderDetails.books[index].price *  item.quantity) }</div>
                            </li>
                            <li className="line-sep"></li>
                        </React.Fragment>
                    ))}
                    <br/>
                    <li className="center-order lii">
                        <div className="heading-delivery">
                            --- Delivery Surcharge ---
                        </div>
                        <div className="heading-price-2">
                            ${getSurcharge(cart)}
                        </div>
                    </li>
                    <li className="line-sep-2"></li>
                    <li className="center-order lii">
                        <div className="heading-delivery">
                            <strong>Total</strong>
                        </div>
                        <div className="heading-price-2">
                            <strong>{asDollarsAndCents(orderDetails.order.amount)}</strong>
                        </div>
                    </li>
                </ul>

            </div>
            <br />
            <div className="center-text">
                -------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className="center-text">
                <strong>CUSTOMER INFORMATION</strong>
            </div>
            <div className="center-text">
                <ul style={{ paddingTop: '1em' }}>
                    <li>{orderDetails.customer.customerName}</li>
                    <li>({orderDetails.customer.email})</li>
                    <li>{orderDetails.customer.address}</li>
                    <li>{orderDetails.customer.phone}</li>
                    <li>
                        {displayCreditCard(orderDetails.customer.ccNumber)} (
                        {formatMonth(new Date(orderDetails.customer.ccExpDate).getUTCMonth())}/{formatMonth(new Date(orderDetails.customer.ccExpDate).getUTCFullYear())})
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ConfirmationTable;
