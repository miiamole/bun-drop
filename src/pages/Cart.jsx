import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart() {
  const [menu, setMenu] = useState({});
//  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [quantity, setQuantity] = useState(1); 
  const { menuId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/menu/${menuId}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, [menuId]);

  useEffect(() => {
    fetch(`http://localhost:3000/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, []);
//PROBLEM 1 ------varför syns inte alla bilder, ex första burgaren?

//PROBLEM 2 ----setQuantity fungerar ej

//PROBLEM 3 -----KAN EJ BERÄKNA TOTAL PRICE


//  const priceOfOrder = 
  //TÄNKTE ATT MAN KUNDE LOOPA ÖVER ALLA PRISER OCH KVANTITETER OCH GÖRA LITE MATTE
  //(hade förut totalprice i databasen)
//  setTotalPrice(priceOfOrder)

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }
  function handleChangeForm(e) {
    e.preventDefault();
  }

  function deleteItem(itemToDelete) {
    console.log("deleting");
    const deleteOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      `http://localhost:3000/orders/${itemToDelete.id}`,
      deleteOptions
    ).then((res) => {
      setOrder(order.filter((item) => item.id !== itemToDelete.id));
    });
  }

  return (
    <>
      <h3 className="cart-text">Your order:</h3>
      <div className="menu-container">
        {Array.isArray(order) &&
          order.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={`${item.image}`} className="menu-image" />
              <h3>{item.title}</h3>
              <form onChange={handleChangeForm}>
                <input
                  type="number"
                  placeholder={item.quantity}
                  value={quantity}
                  className="cart-input-amount"
                  min="1"
                  max="40"
                  onChange={handleQuantityChange}
                />
              </form>
              <h3>{item.price}</h3>

              <button onClick={() => deleteItem(item)} className="delete-btn">
                Remove item
              </button>
            </div>
          ))}
      </div>
      {/* <h3>Total price: {priceOfOrder}</h3> */}
      
      <div className="cart-links-wrapper">
        <Link to="/payment" className="payment-btn place-order-btn">
          Place your order
        </Link>
        <Link to="/menu" className="header-links cart-add-more-items">
          Add more items
        </Link>
      </div>
    </>
  );
}

export default Cart;
