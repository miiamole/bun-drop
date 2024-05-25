import React, { useState } from "react";
import { Link } from "react-router-dom";

function Payment() {
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(""); //borde kanske ha null??
  const [warning, setWarning] = useState("");


  function chooseCard() {
    setPaymentMethod("card");

  }

  function chooseSwish() {
    setPaymentMethod("swish");
  }

  function handleFirstNameChange(e) {
    setUser((prev) => ({ ...prev, firstName: e.target.value }));
  }

  function handleLastNameChange(e) {
    setUser((prev) => ({ ...prev, lastName: e.target.value }));
  }

  function handleAddressChange(e) {
    setUser((prev) => ({ ...prev, address: e.target.value }));
  }

  function handleCityChange(e) {
    setUser((prev) => ({ ...prev, city: e.target.value }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    };
    fetch("http://localhost:3001/users", postOptions);
  }

  function handlePaymentCardForm(e) {
    e.preventDefault();
    
  }

  function handlePaymentSwishForm(e) {
    e.preventDefault();
    
  }
  function placeOrder(){
    console.log("placing order...")
  }

  return (
    <>
      <div className="payment-container">
        <h2>Choose payment method:</h2>
        <button className="payment-btn" onClick={chooseCard}>
          Card
        </button>
        <button className="payment-btn" onClick={chooseSwish}>
          Swish
        </button>{" "}
      </div>

      {paymentMethod === "card" && (
        <div className="payWithCard form-container">
          <form
            onSubmit={handlePaymentCardForm}
            className="user-form user-form-swish"
          >
            <label>Card number:</label>
            <input type="number" placeholder="1234 5678 9012 3456" max="16" />
            <label>Security code:</label>
            <input type="number" placeholder="CVV" max="3" />
            <label>Expiration date:</label>
            <input type="text" placeholder="MM/YY" />
            {/* <button className="payment-btn">Send us your money</button> */}
          </form>
        </div>
      )}

      {paymentMethod === "swish" && (
        <div className="payWithSwish form-container">
          <form
            onSubmit={handlePaymentSwishForm}
            className="user-form user-form-swish"
          >
            <label>Phone number:</label>
            <input type="number" placeholder="555-34578" />
            {/* <button className="payment-btn">Send us your money</button> */}
          </form>
        </div>
      )}

      {paymentMethod && ( // Visa formuläret för personuppgifter bara om en betalningsmetod har valts
        <form onSubmit={handleSubmitForm} className="form-container">
          <div className="user-form">
            <h2>Customer information:</h2>
            <label>First name:</label>
            <input
              type="text"
              placeholder="first name"
              value={user.firstName}
              onChange={handleFirstNameChange}
            />
            <label>Last name:</label>
            <input
              type="text"
              placeholder="last name"
              value={user.lastName}
              onChange={handleLastNameChange}
            />
            <label>Street name and number:</label>
            <input
              type="text"
              placeholder="street name and number"
              value={user.address}
              onChange={handleAddressChange}
            />
            <label>City:</label>
            <input
              type="text"
              placeholder="city"
              value={user.city}
              onChange={handleCityChange}
            />
           
            <Link to="/confirmation" className="payment-btn place-order-btn" onClick ={placeOrder}>Place order</Link>
          </div>
        </form>
      )}
    </>
  );
}

export default Payment;
