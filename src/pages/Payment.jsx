import React, { useState } from "react";
function Payment() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");

  const [user, setUser] = useState({});

  function chooseCard() {}
  function chooseSwish() {}
  function handlePaymentCardForm() {}
function handlePaymentSwishForm(){}
  function handleFirstNameChange(e) {
    //
    setUser((prev) => ({ ...prev, firstName: e.target.value }));
  }
  function handleLastNameChange(e) {
    //   setLastName(e.target.value);
    setUser((prev) => ({ ...prev, lastname: e.target.value }));
  }
  function handleAddressChange(e) {
    //   setAddress(e.target.value);
    setUser((prev) => ({ ...prev, address: e.target.value }));
  }
  function handleCityChange(e) {
    //   setCity(e.target.value);
    setUser((prev) => ({ ...prev, city: e.target.value }));
  }
  function handleSubmitForm(e) {
    e.preventDefault();
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify({ firstName: firstName, lastName: lastName, address: address, city: city }),
      body: JSON.stringify({ user: user }),
    };
    fetch("http://localhost:3001/users", postOptions);
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
        </button>
      </div>
      <div className="payWithCard form-container">
        <form onSubmit={handlePaymentCardForm} className="user-form">
          <input type="number" placeholder="card number" />
          <input type="number" placeholder="CVV" />
          <input type="date" placeholder="date" />
          <button className="payment-btn">Send us your money</button>
        </form>
      </div>

      <div className="payWithSwish form-container">
        <form onSubmit={handlePaymentSwishForm} className="user-form user-form-swish">
          <input type="number" placeholder="phone number"/>
          <button className="payment-btn">Send us your money</button>
        </form>
      </div>

      <form onSubmit={handleSubmitForm} className="form-container">
        <div className="user-form">
          <input
            type="text"
            placeholder="first name"
            value={user.firstName}
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="last name"
            value={user.lastname}
            onChange={handleLastNameChange}
          />
          <input
            type="text"
            placeholder="street name and number"
            value={user.address}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            placeholder="city"
            value={user.city}
            onChange={handleCityChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Payment;
