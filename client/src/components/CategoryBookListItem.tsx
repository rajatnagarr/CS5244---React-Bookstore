import '../assets/css/CategoryBookListItem.css';
import '../assets/css/global.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.gif`;
};

function CategoryBookListItem(book:BookItem) {
    const { dispatch } = useContext(CartStore);

    const addBookToCart = () => {
        dispatch({
            type: CartTypes.ADD,
            item: book, // Make sure 'item' is a BookItem, not a ShoppingCartItem
        });
    };
    return (
        <ul id="book-boxes">
            <li className="book-box">
                <div className="book-image">
                    <img src={require('../assets/images/books/' + bookImageFileName(book))}
                         alt="book.title"
                         className="book-width"
                    />
                    {book.isPublic && (
                        <button
                            className="button read-now-pos round-button blue-border-white-bg"
                        >
                            <i className="fas fa-book-reader"></i>
                        </button>
                    )}
                </div>
                <div className="description-box">
                    <div className="book-title">
                        {book.title}
                    </div>
                    <div className="book-author">
                        {book.author}
                    </div>
                    <div className="book-price price-pos price-font">
                        ${(book.price).toFixed(2) }
                    </div>
                    {/*<button className="button round-button add-to-cart-pos white-border-black-bg"*/}
                    {/*>*/}
                    {/*    Add to Cart*/}
                    {/*</button>*/}
                    <button className="button round-button add-to-cart-pos white-border-black-bg" onClick={addBookToCart}>Add to Cart</button>
                </div>
            </li>
        </ul>
    )
}

export default CategoryBookListItem;
