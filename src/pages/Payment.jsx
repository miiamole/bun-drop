import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PayForm from "../components/PayForm";

function Payment() {
  // const initialValues = {
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   city: "",
  //   phoneNumber: "",
  //   cardNumber: "",
  //   expirationDate: "",
  //   cvv: "",
  // };

 // const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({});
  //const [paymentMethod, setPaymentMethod] = useState(""); //borde kanske ha null??
  //const [warning, setWarning] = useState(false);
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target; //minns ej vad detta  var bra för
  //   setUser({ ...user, [name]: value }); // samma med detta
    
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // useEffect(() => {
  //   // console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     //   console.log(user);
  //   }
  // }, [formErrors]);

  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.firstName) {
  //     errors.firstName = "Firstname is required!";
  //   } else if (values.firstName.length < 2) {
  //     errors.firstName = "Firstname must be at least 2 characters!";
  //   }
  //   if (!values.lastName) {
  //     errors.lastName = "Lastname is required!";
  //   } else if (values.lastName.length < 2) {
  //     errors.lastName = "Lastname must be at least 2 characters!";
  //   }
  //   if (!values.address) {
  //     errors.address = "Address is required!";
  //   } else if (values.address.length < 5) {
  //     errors.address = "Address must be at least 5 characters!";
  //   }
  //   if (!values.city) {
  //     errors.city = "City is required!";
  //   } else if (values.city.length < 2) {
  //     errors.city = "City must be at least 2 characters!";
  //   }
  //   if (!values.cardNumber) {
  //     errors.cardNumber = "Card number is required!";
  //   } else if (values.cardNumber.length < 15) {
  //     errors.cardNumber = "Card number must be at least 15 characters!";
  //   }
  //   if (!values.expirationDate) {
  //     errors.expirationDate = "Expiration date is required!";
  //   } else if (values.expirationDate.length < 4) {
  //     errors.expirationDate = "Expiration date must be at least 4 characters!";
  //   }
  //   if (!values.cvv) {
  //     errors.cvv = "CVV is required!";
  //   } else if (values.cvv.length < 3) {
  //     errors.cvv = "CVV must be at least 3 characters!";
  //   }
  //   if (!values.phoneNumber) {
  //     errors.phoneNumber = "Phone number is required!";
  //   } else if (values.phoneNumber.length < 10) {
  //     errors.phoneNumber = "Phone number must be at least 10 characters!";
  //   }

  //   return errors;
  // };

  function addingCustomer() {
    const newCustomer = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      cardNumber: user.cardNumber,
      expirationDate: user.expirationDate,
      cvv: user.cvv,
      phoneNumber: user.phoneNumber,
    };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newCustomer }),
    };
    fetch("http://localhost:3000/users", postOptions);
    // inte så jag vill göra för jag vill lägga detta till ordern
  }

  // Ta alla saker från cart i local storage till och lägger till det som ett order objekt på db.json
  function placeOrder() {
    // Validate- här ska jag göra det
  //  setFormErrors(validate(user));

    setIsSubmit(true);

    addingCustomer();
    // Generera ett random id baserat på tiden just nu
    const orderId = Date.now().toString();

    // Använd det id:t när du skapar din order
    const order = {
      id: orderId,
      items: cart.map((item) => ({
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

    // Skicka det id:t till nästa sida (confirmation)
    navigate(`/confirmation/${orderId}`);
  }

  // function chooseCard() {
  //   setPaymentMethod("card");
  // }

  // function chooseSwish() {
  //   setPaymentMethod("swish");
  // }
  return (
    <>
    <PayForm placeOrder={placeOrder}/>
      {/* <div className="payment-container">
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
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div>
              <h5>Det gick bra</h5>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form user-form-swish">
              <label>Card number:</label>
              <input
                type="number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={user.cardNumber}
                onChange={handleChange}
              />
              <p>{formErrors.cardNumber}</p>

              <label>Security code:</label>
              <input
                type="number"
                name="cvv"
                placeholder="CVV"
                value={user.cvv}
                onChange={handleChange}
              />
              <p>{formErrors.cvv}</p>

              <label>Expiration date:</label>
              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={user.expirationDate}
                onChange={handleChange}
              />
              <p>{formErrors.expirationDate}</p>
            </form>
          )}
        </div>
      )}
      {paymentMethod === "swish" && (
        <div className="payWithSwish form-container">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="reg-success">
              <h3>Det gick bra</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form user-form-swish">
              <label>Phone number:</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="555-34578"
                value={user.phoneNumber}
                onChange={handleChange}
              />
              <p>{formErrors.phoneNumber}</p>
            </form>
          )}
        </div>
      )}
      {paymentMethod && Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="reg-success">
          <h3>Det gick bra</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="user-form">
            <h2>Customer information:</h2>
            <label>First name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              value={user.firstName}
              onChange={handleChange}
            />
            <p>{formErrors.firstName}</p>
            <label>Last name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="last name"
              value={user.lastName}
              onChange={handleChange}
            />
            <p>{formErrors.lastName}</p>
            <label>Street name and number:</label>
            <input
              type="text"
              name="address"
              placeholder="street name and number"
              value={user.address}
              onChange={handleChange}
            />
            <p>{formErrors.address}</p>
            <label>City:</label>
            <input
              type="text"
              name="city"
              placeholder="city"
              value={user.city}
              onChange={handleChange}
            />
            <p>{formErrors.city}</p>
            <button
              className="payment-btn place-order-btn"
              onClick={placeOrder}
            >
              Place order
            </button>
          </div>
        </form>
      )} */}
    </>
  );
}
export default Payment;
