import React, { useState, useEffect } from "react";

function Confirmation() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/order`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, []);

  const deliveryTime = Math.random(10 - 45);

  return (
    <>
      <h3>Thank you for your order</h3>
      <p>it is now beeing prepared</p>
      <p>estimated time to delivery: {deliveryTime} minutes</p>

      <h4>You can look forward to devouring these delicious items:</h4>
      {Array.isArray(order) &&
        order.map((item) => (
          <div key={item.id}>
            <img src={item.image} />
            <h3>{item.title}</h3>
          </div>
        ))}
    </>
  );
}

export default Confirmation;
