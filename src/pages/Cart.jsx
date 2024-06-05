import React, { useState, useEffect } from "react";    //PROBLEM--- KAN GÅ TILL PAYMENT TROTS ATT EN AV FLERA PRODUKTER STÅR PÅ 0 i quantity;
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import EmptyCart from "../components/EmptyCart";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [formError, setFormError] = useState("");
  const { getLocalStorage, removeLocalStorage, updateQuantityInLocalStorage } =
    useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
      updateTotalPrice(itemsInCart); 
    }
  }, [cart]);

  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      if (item.quantity && !isNaN(item.price)) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);

//MED DETTA KAN MAN EJ TA BORT 1, KAN EJ SKRIVA 0 MEN HELLER EJ 22, MÅSTE SCROLLA TILL HÖGRE SIFFROR
// if (isNaN(newQuantity) || newQuantity <= 0) {
//     // om det är tomt, parsa ej
//     setFormError("Quantity must be at least 1.");
//     return;
    
// }



    updateQuantityInLocalStorage("cart", itemId, newQuantity);

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
    setFormError("");
  };

  const deleteItem = (itemToDelete) => {
    removeLocalStorage("cart", itemToDelete);
    const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const handleCheckout = () => {
    let invalidItem = null;

    for (const item of cart) {
      if (item.quantity < 1 || item.quantity > 40) {
        invalidItem = {
          ...item,
          error: "Quantity must be at least 1 but not more than 40",
        };
        break;
      }
    }

    const totalPriceValue = parseFloat(totalPrice);

    if (invalidItem) {
      setFormError(invalidItem.error);
      return;
    }

    if (totalPriceValue <= 0) {
      setFormError("Total price must be greater than zero to proceed.");
      return;
    }

    navigate("/payment");
  };

  return (
    <div className="color-wrapper">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          <h3 className="cart-text">Your order:</h3>
          <div className="menu-container">
            {cart.map((item) => (
              <div key={item.id} className="menu-card">
                <img src={`${item.image}`} className="menu-image" />
                <h3>{item.title}</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="number"
                    value={item.quantity || ""}
                    className="cart-input-amount"
                
                    min="1"
                    max="40"
                    onChange={(e) => handleQuantityChange(e, item.id)}
                  />
                </form>
                <h3>${item.price}</h3>
                <button onClick={() => deleteItem(item)} className="delete-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          {formError && <p className="form-error">{formError}</p>}
          <h3 className="total-price">Total price: ${totalPrice}</h3>
          <div className="cart-links-wrapper">
            <Link to="/menu" className="payment-btn">
              Add more items
            </Link>
            <button
              className="payment-btn place-order-btn"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;


