import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import {Link, useLocation} from 'react-router-dom';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";


function AppHeader(){
    const { cart } = useContext(CartStore);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const location = useLocation(); // Use location to determine the current path

    // Determine the button text based on the current pathname
    let buttonText = "Rajat N"; // Default text

    if (location.pathname == "/") {

        buttonText = "Log in / Sign up"; // Set text for category page
    }
        return(

        <header className="container header header-space">
          <div className="header-div">
              <section className="bookstore-logo">
                  <Link to="/">
                      <img
                          src={require('../assets/img/logo.png')}
                          alt="The Bookery Logo"
                          width="50"
                          height="auto"
                      />
                  </Link>
              </section>
              <section className="title-and-search-bar">
                  <Link to="/" style={{ textDecoration: 'none' }}>
                      <h1 className="text-logo">The Bookery</h1>
                  </Link>
              </section>
              <section className="title-and-search-bar">
                  <form action="category.html" className="search-bar-and-button">
                      <input
                          type="text"
                          className="search-bar blue-border-white-bg"
                          placeholder="Search"
                      />
                      <button
                          type="submit"
                          className="button search-button white-border-blue-bg"
                      >
                          <i className="fa fa-search"></i>
                      </button>
                  </form>
              </section>
          </div>
          <section className="header-dropdown-and-cart header-div">
              <HeaderDropdown  />
              <button className="button pill-button white-border-blue-bg">
                  {buttonText}
              </button>
              <div className="relative">
                  <Link to="/cart">
                      <button className="button pill-button-cart white-border-blue-bg"><i className="fa fa-shopping-cart"></i></button>
                      <button className="button pill-button-count absolute yellow-border-yellow-bg">{cartQuantity}</button>
                  </Link>
              </div>
          </section>
        </header>
        )
}
export default AppHeader;

