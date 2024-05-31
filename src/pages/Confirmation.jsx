import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Confirmation() {
  const [order, setOrder] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const { orderId } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data.items);
        setCustomer(data.customer);
      });

    //ville ha ett heltal mellan 10 och 45.
    const randomTime = Math.floor(Math.random() * (45 - 10 + 1)) + 10;
    setDeliveryTime(randomTime);
  }, [orderId]);

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


  return (
    <>
      <div className="color-wrapper">
        <div className="confirm-text">
          <h2 className="confirm-thanks">
            Thank you for your order {capitalizeFirstLetter(customer.firstName)}
          </h2>

          <h3 className="confirm-time">
            Estimated time to delivery: {deliveryTime} minutes
          </h3>

          <h4 className="confirm-items">
            You can look forward to devouring{" "}
            {order.length === 1
              ? "this delicious item"
              : "these delicious items"}
            :
          </h4>
        </div>
        <div className="menu-container">
          {Array.isArray(order) &&
            order.map((item) => (
              <div key={item.id} className="menu-card">
                <img src={item.image} className="menu-image" />
                <h3>{item.name}</h3>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Confirmation;
