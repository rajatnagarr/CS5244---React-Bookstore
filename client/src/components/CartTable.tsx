import React, { useContext } from 'react';
import { CartStore } from '../contexts/CartContext'; // Adjust path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/CartTable.css';
import { BookItem } from "../types";
import {getSubtotal, getTotal, isEmpty} from "../reducers/CartReducer";
import {useCategory} from "../contexts/CategoryContext"; // Adjust path as necessary

const getBookImageUrl = (book: BookItem) => {
    let filename = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "") + ".gif";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        return require('../assets/images/books/the-iliad.gif');
    }
};

const CartTable = () => {
    const { cart, dispatch } = useContext(CartStore);
    const { currentCategory } = useCategory(); // Use the current category

    const updateBookQuantity = (bookId: number, quantity: number) => {
        if (quantity <= 0) {
            // If the quantity is 0 or less, remove the book from the cart
            removeBookFromCart(bookId);
        } else {
            // Otherwise, update the quantity of the book in the cart
            dispatch({ type: 'UPDATE_QUANTITY', item: { bookId }, quantity });
        }
    };

    const removeBookFromCart = (bookId: number) => {
        dispatch({ type: 'REMOVE', item: { bookId } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const asDollarsAndCents = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <div>
            <div className="cart-table">
                <ul className="ull">
                    <li className="table-heading lii">
                        <div className="heading-book">Book</div>
                        <div className="heading-price">Price</div>
                        <div className="heading-quantity">Quantity</div>
                        <div className="heading-subtotal">Amount</div>
                    </li>
                    {cart.map((item) => (
                        <React.Fragment key={item.book.bookId}>
                            <li className="center-order lii">
                                <div className="cart-book-image">
                                    <img src={getBookImageUrl(item.book)} alt={item.book.title} />
                                </div>
                                <div>
                                    <div className="cart-book-title">{item.book.title}</div>
                                    <br/>
                                    <button className="trash button pill-button blue-border-white-bg" onClick={() => removeBookFromCart(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                                <div className="cart-book-quantity">
                                    <button className="icon-button dec-button" onClick={() => updateBookQuantity(item.id, Math.max(0, item.quantity - 1))}>
                                        <FontAwesomeIcon icon={faMinusCircle} />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button className="icon-button inc-button" onClick={() => updateBookQuantity(item.id, item.quantity + 1)}>
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </button>
                                </div>
                                <div className="cart-book-subtotal">{asDollarsAndCents(item.book.price * item.quantity)}</div>
                            </li>
                            <li className="line-sep lii"></li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
            <br />
            <div className="center-text">
                -------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className="center-text">
                {!isEmpty(cart) && (
                    <ul className="ull">
                        <li className="lii">
                            <b>Cart subtotal:</b> {asDollarsAndCents(getSubtotal(cart))}
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartTable;
