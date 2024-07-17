import React, { useContext } from "react";
import CartTable from "./CartTable";
import { CartStore } from "../contexts/CartContext"; // Adjust path as necessary
import "../assets/css/CartTable.css";
import { Link } from "react-router-dom";
import { useCategory } from "../contexts/CategoryContext"; // Adjust path as necessary

const Cart = () => {
  const { cart, dispatch } = useContext(CartStore);
  const { currentCategory } = useCategory(); // Use the current category

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };
  return (
    <div>
      <br />
      <div className="center-text">
        <strong>YOUR CART</strong>
      </div>
      <br />
      <div className="center-text">
        <ul>
          {cart.length > 1 ? (
            <li>Your shopping cart contains {cart.length} books.</li>
          ) : cart.length === 1 ? (
            <li>Your shopping cart contains 1 book.</li>
          ) : (
            <li>Your shopping cart is empty.</li>
          )}
        </ul>
      </div>
      <br />
      {cart.length > 0 && (
        <>
          <CartTable />
          <div className="cart-actions">
            <Link
              to={`/categories/${currentCategory}`}
              className="no-underline"
            >
              <button className="button first-button">Continue Shopping</button>
            </Link>
            <Link to="/checkout" className="no-underline">
              <button className="button second-button">
                Proceed to Checkout
              </button>
            </Link>
          </div>
          <div className="center-text">
            <button
              className="button pill-button blue-border-white-bg"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <br />
        </>
      )}
      {cart.length == 0 && (
        <>
          <div className="center-text">
            <Link
              to={`/categories/${currentCategory}`}
              className="no-underline"
            >
              <button className="button first-button">Continue Shopping</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
