import React, { useState, useEffect } from "react";

function Confirmation() {
  const [order, setOrder] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/order`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });

//ville ha ett heltal mellan 10 och 45.
const randomTime = Math.floor(Math.random() * (45-10 +1)) +10;
setDeliveryTime(randomTime);

  }, []);

  

  return (
    <>
      <h3>Thank you for your order</h3>
      <p>it is now beeing prepared</p>
      <p>Estimated time to delivery: {deliveryTime} minutes</p>

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
