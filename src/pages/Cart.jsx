import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Cart() {
  const [menu, setMenu] = useState({});
   const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { menuId } = useParams();
  const { setLocalStorage, getLocalStorage, removeLocalStorage, updateQuantityInLocalStorage} =
    useLocalStorage();
  const itemsInCart = [];


  //HÄMTAR ALLT JAG HAR I MIN CART
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
   
  }, []);

  
  //PROBLEM 1 ------varför syns inte alla bilder, ex första burgaren?

  //PROBLEM 2 ----QUANTITY ÄNDRAS, MEN REFLEKTERAS EJ I TOTAL PRICE

  //PROBLRM 3 ---- MAN KAN KLICKA PÅ GÅ TO PAYMENT TROTS ATT CART:EN ÄR TOM

  
function priceOfOrder() {
  let totalPrice = 0;  
  cart.forEach((item) => {
    
    totalPrice += item.price * item.quantity;
  });

  return totalPrice.toFixed(2);
}
  

//   function handleQuantityChange(e) {
//     setQuantity(e.target.value);
//   }

function handleQuantityChange(e, itemId) {
  const newQuantity = e.target.value;
  console.log("New quantity:", newQuantity);
  updateQuantityInLocalStorage("cart", itemId, newQuantity);

  // Uppdatera state för carten med den nya kvantiteten
  setCart((prevCart) =>
    prevCart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  );
}





  function handleChangeForm(e) {
    e.preventDefault();
  }

  function deleteItem(itemToDelete) {
    removeLocalStorage("cart", itemToDelete);
   
    console.log("deleting??", itemToDelete);

    setCart(cart.filter((item) => item.id !== itemToDelete.id));
  }

  
  //   function goToPayment() {

  //   }

  return (
    <>
      <h3 className="cart-text">Your order:</h3>
      <div className="menu-container">
        {Array.isArray(cart) &&
          cart.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={`${item.image}`} className="menu-image" />
              <h3>{item.title}</h3>
              <form onChange={handleChangeForm}>
                <input
                  type="number"
                  placeholder={item.quantity}
                  value={item.quantity || ""}
                  className="cart-input-amount"
                  min="1"
                  max="40"
                  //   onChange={handleQuantityChange}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                />
              </form>
              <h3>${item.price}</h3>

              <button onClick={() => deleteItem(item)} className="delete-btn">
                Remove item
              </button>
            </div>
          ))}
      </div>
      <h3>Total price: ${priceOfOrder()}</h3>

      <div className="cart-links-wrapper">
        <Link
          to="/payment"
          //   onClick={goToPayment}
          className="payment-btn place-order-btn"
        >
          Go to payment
        </Link>
        <Link to="/menu" className="header-links cart-add-more-items">
          Add more items
        </Link>
      </div>
    </>
  );
}

export default Cart;
