import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Confirmation() {
  const [order, setOrder] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState(null);
//   const { orderId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });

//ville ha ett heltal mellan 10 och 45.
const randomTime = Math.floor(Math.random() * (45-10 +1)) +10;
setDeliveryTime(randomTime);

  }, []);

  
console.log("the current order is: ", order.slice(-1))
  return (
    <>
      <h3>Thank you for your order</h3>
      <p>it is now beeing prepared</p>
      <p>Estimated time to delivery: {deliveryTime} minutes</p>

      
      <h4>
        You can look forward to devouring{" "}
        {order.length === 1
          ? "this delicious item"
          : "these delicious items"}
        :
      </h4>
     
      <div className="menu-container">
        {Array.isArray(order) &&
        //   order.map((item) => (
             order.slice(-1).map((item) => (
            
            <div key={item.id} className="menu-card">
              <img src={item.image} className="menu-image" />
              <h3>{item.title}</h3>
            </div>
          ))}
      </div>
    </>
  );
}

export default Confirmation;
