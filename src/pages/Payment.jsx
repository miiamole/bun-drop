import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Payment() {
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(""); //borde kanske ha null??
  const [warning, setWarning] = useState("");
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const { getLocalStorage, removeLocalStorage, clearLocalStorage } =
    useLocalStorage();

  const navigate = useNavigate();

  //hämtar allt i carten från local storage
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  // Ta alla saker från cart i local storage till och lägger till det som ett order objekt på db.json

  function placeOrder() {
    // Generera ett random id, tiden just nu

    const orderId = Date.now().toString();
    // Använd det id:t när du skapar din order
    // Skicka det id:t till nästa sida (confirmation)
    // Hämta korrekt order med det skickade id:t på nästa sida (confirmation)

    const order = {
      id: orderId,
      items: cart.map((item) => ({
        // id: item.id,
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      customer: `${user.firstName} ${user.lastName}`,
    };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };

    fetch("http://localhost:3000/orders", postOptions);

    // // Ta bort allt från cart efter att de har lagts till i order
    clearLocalStorage("cart");
    setOrder([]); // kanske inte ska ha detta,

    //navigate("/confirmation");
    navigate(`/confirmation/${orderId}`);
    //här lägger jag till en order, måste också skicka just denna order till nästa sida, för att där displaya just denna order
  }

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
    // const postOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user }),
    // };
    // fetch("http://localhost:3001/users", postOptions);
  }

  function handlePaymentCardForm(e) {
    e.preventDefault();
  }

  function handlePaymentSwishForm(e) {
    e.preventDefault();
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

            <button
              //  to={`/confirmation/${order.Id}`}
              className="payment-btn place-order-btn"
              onClick={placeOrder}
            >
              Place order
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Payment;
