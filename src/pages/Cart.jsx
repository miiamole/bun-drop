import React, { useState, useEffect } from "react";
//PROBLEM----- 3+1 BLIR 31 I CART:EN (när man redan ändrat kvantitet och sedan går tillbaka till meny och lägger till en)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import EmptyCart from "../components/EmptyCart";

function Cart() {
  const [menu, setMenu] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { menuId } = useParams();
  const { getLocalStorage, removeLocalStorage, updateQuantityInLocalStorage } =
    useLocalStorage();
  const itemsInCart = [];

  //HÄMTAR ALLT JAG HAR I MIN CART
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  function priceOfOrder() {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice.toFixed(2);
  }

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
    setCart(cart.filter((item) => item.id !== itemToDelete.id));
  }

  return (
    <>
      <div className="color-wrapper">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
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
                        onChange={(e) => handleQuantityChange(e, item.id)}
                      />
                    </form>
                    <h3>${item.price}</h3>

                    <button
                      onClick={() => deleteItem(item)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>

            <h3 className="total-price">Total price: ${priceOfOrder()}</h3>
            <div className="cart-links-wrapper">
              <Link to="/menu" className="payment-btn">
                Add more items
              </Link>
              <Link to="/payment" className="payment-btn place-order-btn">
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );

}

export default Cart;
