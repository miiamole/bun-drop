import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PayForm from "../components/PayForm";

function Payment() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const { getLocalStorage, clearLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

  //hämtar allt i carten från local storage
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  // Ta alla saker från cart i local storage till och lägger till det som ett order objekt på db.json
  function placeOrder(user) {  //ÄNDRAT SÅ ATT DEN TAR EMOT EN USER
   
    setIsSubmit(true);

    const orderId = Date.now().toString(); // Generera ett random id baserat på tiden just nu

    // Använder det id:t när ordern skapas
    const order = {
      id: orderId,
      items: cart.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        paymentMethod: user.cardNumber
          ? {
              cardNumber: user.cardNumber,
              expirationDate: user.expirationDate,
              cvv: user.cvv,
            }
          : {
              phoneNumber: user.phoneNumber,
            },
      },
    };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };

    fetch("http://localhost:3000/orders", postOptions);
// console.log("det som skickats: ",postOptions)
    // // Ta bort allt från cart efter att de har lagts till i order
    clearLocalStorage("cart");
    setOrder([]);

    // Skicka det id:t till nästa sida (confirmation)
    navigate(`/confirmation/${orderId}`);
  }

  return (
    <>
      <div className="color-wrapper">
        <div className="payment-wrapper">
          <PayForm placeOrder={placeOrder} />
        </div>
      </div>
    </>
  );
}
export default Payment;
