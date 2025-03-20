import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CartStore } from "../contexts/CartContext";
import {
  getSubtotal,
  getSurcharge,
  getTotal,
} from "../reducers/CartReducer";
import { Link, useNavigate } from "react-router-dom";
import { isCreditCard, isMobilePhone, isvalidEmail } from "../utils";
import "../assets/css/Checkout.css";
import {CustomerForm, months, OrderDetails} from "../types";
import { useCategory } from "../contexts/CategoryContext";
import axios from "axios";
import { OrderStore } from '../contexts/OrderContext';
import {OrderTypes} from "../reducers/OrderReducer";
import { buildApiUrl } from "../utils";

function CheckoutPage() {
  const { cart, dispatch } = useContext(CartStore);
  const navigate = useNavigate();
  const { currentCategory } = useCategory(); // Use the current category

  const cartTotalPrice = getTotal(cart);
  const cartQuantity = cart.length;
  const {dispatch: orderDispatch} = useContext(OrderStore);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    ccNumber: "",
    ccExpiryMonth: new Date().getMonth() + 1,
    ccExpiryYear: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    ccNumber: "",
  });

  const [checkoutStatus, setCheckoutStatus] = useState("");

  const handleInputChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      switch (name) {
        case "name":
        case "address":
          if (value.length < 4 || value.length > 45) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be between 4 and 45 characters long`;
          }
          break;
        case "phone":
          if (!isMobilePhone(value)) {
            error = "Invalid phone number";
          }
          break;
        case "email":
          if (!isvalidEmail(value)) {
            error = "Invalid email address";
          }
          break;
        case "ccNumber":
          if (!isCreditCard(value)) {
            error = "Invalid credit card number";
          }
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAllFields = () => {
    Object.keys(formData).forEach((key) => {
      // @ts-ignore
      validateField(key, formData[key]);
    });
  };

  const isValidForm = () => {
    validateAllFields(); // Force validate all fields on submission
    return (
        Object.values(errors).every((x) => x === "") &&
        Object.values(formData).every((x) => x !== "")
    );
  };


  async function submitOrder(event:FormEvent) {
    event.preventDefault();
    console.log("Submit order");
    const isFormCorrect =  isValidForm();
    console.log(isFormCorrect);
    if (!isFormCorrect) {
      setCheckoutStatus("ERROR");
    } else {
      setCheckoutStatus("PENDING");
      const orders = await placeOrder({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        ccNumber: formData.ccNumber,
        ccExpiryMonth: formData.ccExpiryMonth,
        ccExpiryYear: formData.ccExpiryYear,
      })
      if(orders) {
        setCheckoutStatus("OK");
        console.log(orders);
        orderDispatch({ type: OrderTypes.SET_DETAILS, orderDetails: orders });
        navigate('/confirmation');}
      else{
        setCheckoutStatus("ERROR_GENERAL");
        console.log("Error placing order");
      }
    }
  }
  const placeOrder =  async (customerForm: CustomerForm) =>  {

    const order = { customerForm: customerForm, cart:{itemArray:cart} };

    const orders = JSON.stringify(order);

    // console.log("here you go", orders);     //you can uncomment this to see the orders JSON on the console
    const url = buildApiUrl('orders');
    const orderDetails: OrderDetails = await axios.post(url, orders,
        {headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
          dispatch({ type: "CLEAR" });
          return response.data;
        })
        .catch((error)=>console.log(error));
    console.log("order details: ", orderDetails);
    return orderDetails;
  }

  const yearFrom = (index: number) => new Date().getFullYear() + index;
  return (
      <div>
        <br />
        <div className="center-text">
          <strong>CHECKOUT</strong>
        </div>
        <div className="checkout-page">
          {cart.length >= 1 && (
              <div className="checkout-page-body">
                <form
                    onSubmit={submitOrder}
                    method="post"
                    className="checkout-form"
                >
                  <div>
                    <label htmlFor="name" className="form-label">
                      <strong>Name</strong>
                    </label>
                    <input
                        type="text"
                        id="name"
                        size={20}
                        name="name"
                        className="form-input set-form-width"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="error">{errors.name || <>&nbsp;</>}</div>
                  <div>
                    <label htmlFor="address" className="form-label">
                      <strong>Address</strong>
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-input set-form-width"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="error">{errors.address || <>&nbsp;</>}</div>
                  <div>
                    <label htmlFor="phone">
                      <strong>Phone</strong>
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-input set-form-width"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="error">{errors.phone || <>&nbsp;</>}</div>
                  <div>
                    <label htmlFor="email">
                      <strong>Email</strong>
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-input set-form-width"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="error">{errors.email || <>&nbsp;</>}</div>
                  <div>
                    <label htmlFor="ccNumber">
                      <strong>Credit Card</strong>
                    </label>
                    <input
                        type="text"
                        id="ccNumber"
                        name="ccNumber"
                        className="form-input set-form-width"
                        value={formData.ccNumber}
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="error">{errors.ccNumber || <>&nbsp;</>}</div>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                  >
                    <label htmlFor="ccExpiryMonth" className="form-label">
                      <strong>Expiry:</strong>
                    </label>
                    <div>
                      <select
                          name="ccExpiryMonth"
                          className="form-input set-form-width"
                          value={formData.ccExpiryMonth}
                          onChange={handleInputChange}
                          style={{
                            marginRight: "5px",
                            width: "auto",
                            backgroundColor: "#c0c0c0",
                            color: "black",
                          }}
                      >
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month} ({index + 1})
                            </option>
                        ))}
                      </select>
                      <select
                          name="ccExpiryYear"
                          className="form-input set-form-width"
                          value={formData.ccExpiryYear}
                          onChange={handleInputChange}
                          style={{
                            marginRight: "5px",
                            width: "auto",
                            backgroundColor: "#c0c0c0",
                            color: "black",
                          }}
                      >
                        {Array.from({ length: 15 }, (_, i) => (
                            <option key={i} value={yearFrom(i)}>
                              {yearFrom(i)}
                            </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="center-text">
                    <button type="submit" className="button second-button">
                      Complete Purchase
                    </button>
                  </div>

                  <div className="center-text">
                    -------------------------------------------------------------------------------------------------------------------------------------
                  </div>
                  <div className="center-text-2">
                    Your cart will be charged <strong>${getTotal(cart)}</strong>
                  </div>
                  <div className="center-text-2">
                    (<strong>${getSubtotal(cart)}</strong> +{" "}
                    <strong>${getSurcharge(cart)}</strong> shipping)
                  </div>
                  <br />
                  <div className="status-message-container">
                    {checkoutStatus !== "" && (
                        <div className="center-text">
                          {checkoutStatus === "ERROR" && (
                              <div className="error-2">
                                Error: Please fix the problems above and try again.
                              </div>
                          )}
                          {checkoutStatus === "PENDING" && (
                              <div className="spinner"></div>
                          )}
                          {checkoutStatus === "OK" && <div>Order placed...</div>}
                          {checkoutStatus === "ERROR_GENERAL" && (
                              <div className="error-2">An unexpected error occurred, please try again.</div>
                          )}
                        </div>
                    )}
                  </div>
                </form>
              </div>
          )}
          {cart.length === 0 && (
              <>
                <div className="center-text">
                  Please select some books to checkout.
                </div>
                <br />
                <div className="center-text">
                  <Link
                      to={`/categories/${currentCategory}`}
                      className="no-underline"
                  >
                    <button className="button first-button">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </>
          )}
        </div>
      </div>
  );
}

export default CheckoutPage;
