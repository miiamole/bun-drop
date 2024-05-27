import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Cart() {
  const [menu, setMenu] = useState({});
  //  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { menuId } = useParams();
  const { setLocalStorage, getLocalStorage, removeLocalStorage } =
    useLocalStorage();
  const itemsInCart = [];

  //   useEffect(() => {
  //     setLocalStorage();
  //     removeLocalStorage();
  //     const itemsInCart = getLocalStorage("cart");
  //     setOrder(itemsInCart);
  //   }, []);

  //HÄMTAR ALLT JAG HAR I MIN CART
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/menu/${menuId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMenu(data);
  //       });
  //   }, [menuId]);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/orders`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCart(data);
  //       });
  //   }, []);
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
   removeLocalStorage("cart", itemToDelete);
   
    console.log("really deleting??");

    setCart(cart.filter((item) => item.id !== itemToDelete.id));
  }

  // function deleteItem(itemToDelete) {
  //   const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
  //   removeLocalStorage("cart", updatedCart); // Skicka med uppdaterad kundvagn
  
  //   setCart(updatedCart);
  // }

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
