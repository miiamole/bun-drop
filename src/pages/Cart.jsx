import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function Cart() {
const [menu, setMenu] = useState({});
const [totalPrice, setTotalPrice] = useState(0);
const [order, setOrder] = useState([]);
const { menuId } = useParams();

useEffect(() => {
  fetch(`http://localhost:3000/menu/${menuId}`)
    .then((res) => res.json())
    .then((data) => {
      setMenu(data);
    });
}, [menuId]);

useEffect(() => {
  fetch(`http://localhost:3001/order`)
    .then((res) => res.json())
    .then((data) => {setOrder(data) });
    
}, []);


function addToOrder(){

    setOrder([...order, menu]);
setTotalPrice(totalPrice + menu.price);
//total price fungerar inte, dock står det rätt i dbOrder.json


const postOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(menu),
};
fetch("http://localhost:3001/order", postOptions);

}

    return (
      <>
        <h3>Your order:</h3>
        {Array.isArray(order) &&
          order.map((item) => (
            <div key={item.id}>
              <img src={item.image} />
              <h3>{item.title}</h3>
              <input type="number" placeholder="amount" value={item.quantity} />
              <h3>{item.price}</h3>
            </div>
          ))}
        <h3>Total price: {order.totalPrice}</h3>
      </>
    );
}

export default Cart;