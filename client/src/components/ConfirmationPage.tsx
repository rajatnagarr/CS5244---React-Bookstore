import React, { useContext } from "react";
import CartTable from "./CartTable";
import { CartStore } from "../contexts/CartContext"; // Adjust path as necessary
import "../assets/css/CartTable.css";
import { Link } from "react-router-dom";
import { useCategory } from "../contexts/CategoryContext";
import {OrderStore} from "../contexts/OrderContext"; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';
import ConfirmationTable from "./ConfirmationTable";

const Cart = () => {
    const { orderDetails} = useContext(OrderStore);
    const navigate = useNavigate();
    const { currentCategory } = useCategory(); // Use the current category
    return (
        <div>
            <br />
            <div className="center-text">
                <strong>CONFIRMATION</strong>
            </div>
            <br />
            {!orderDetails || !orderDetails.order ? (
                <>
                    <div className="center-text">
                        <p>We are sorry, the order you requested could not be found. </p>
                    </div>
                    <div className="center-text">
                        <button className="button pill-button white-border-gray-bg" onClick={() => navigate('/')}>Go to Home Page</button>
                    </div>
                </>
            ) : (
                <div className="center-text">
                    <ul>
                        <li>
                            Your confirmation number is {orderDetails.order.confirmationNumber }
                        </li>
                        <br/>
                        <li>Date created: {new Date(orderDetails.order.dateCreated).toString()}</li>
                        <br/>
                        <ConfirmationTable/>
                        <div className="cart-actions">
                            <Link
                                to={`/categories/${currentCategory}`}
                                className="no-underline"
                            >
                                <button className="button first-button">Continue Shopping</button>
                            </Link>
                        </div>
                    </ul>
                </div>
            )}
            <br />
        </div>
    );
};

export default Cart;
