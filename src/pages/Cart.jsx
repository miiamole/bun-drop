import React, { useState, useEffect } from "react"; //PROBLEM--- MAN KAN GÅ TILL CHECKOUT ÄVEN OM TOTAL PRISET ÄR NAN
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import EmptyCart from "../components/EmptyCart";

function Cart() {
  const [menu, setMenu] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [formError, setFormError] = useState("");
  const { menuId } = useParams();
  const { getLocalStorage, removeLocalStorage, updateQuantityInLocalStorage } =
    useLocalStorage();
  const itemsInCart = [];
   const navigate = useNavigate();

  //HÄMTAR ALLT JAG HAR I MIN CART
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

//   function priceOfOrder() {
//     let totalPrice = 0;
//     cart.forEach((item) => {
//       totalPrice += item.price * item.quantity;
//     });

//     return totalPrice.toFixed(2);
//   }


function priceOfOrder() { // försöker undvika NAN
  let totalPrice = 0;
  cart.forEach((item) => {
    if (item.quantity && !isNaN(item.price)) {
      totalPrice += item.price * item.quantity;
    }
  });

  return totalPrice.toFixed(2);
}



  function handleQuantityChange(e, itemId) {
    let newQuantity = parseInt(e.target.value, 10);

   

    updateQuantityInLocalStorage("cart", itemId, newQuantity);

    // Update total price after quantity change// DETTA ÄER NYTT FÖR ATT FIXA PROB.
    const updatedTotalPrice = priceOfOrder(); // Calculate new total price
    setTotalPrice(updatedTotalPrice);

    // Uppdatera för carten med ny quantity
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    setFormError("");
  }

  function handleChangeForm(e) {
    e.preventDefault();
  }

  function deleteItem(itemToDelete) {
    removeLocalStorage("cart", itemToDelete);
    setCart(cart.filter((item) => item.id !== itemToDelete.id));

    // Update total price after deleting item---DETTA ÄR NYTT FÖR ATT FIXA PROB.
    const updatedTotalPrice = priceOfOrder(); // Calculate new total price
    setTotalPrice(updatedTotalPrice);
  }
const handleCheckout = () => {     //CHAT GPT
  let invalidItem = null;

  for (const item of cart) {
    if (item.quantity < 1 || item.quantity > 40) {
      invalidItem = { ...item, error: "Quantity must be at least 1 but not more then 40" };
      break;
    }
  }
   priceOfOrder();
  if (totalPrice <= 0) {
    setFormError("Total price must be greater than 0 to proceed.");
    return;
  }
 
  if (invalidItem) {
    setFormError(invalidItem.error);
    return;
  }
  navigate("/payment");
};




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
            {formError && <p className="form-error">{formError}</p>}
            <h3 className="total-price">Total price: ${priceOfOrder()}</h3>

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
    </>
  );
}

export default Cart;

// import React, { useState, useEffect } from "react"; //PROBLEM--- MAN KAN GÅ TILL CHECKOUT ÄVEN OM TOTAL PRISET ÄR 0
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import useLocalStorage from "../hooks/useLocalStorage";
// import EmptyCart from "../components/EmptyCart";

// function Cart() {

//   const [menu, setMenu] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [formError, setFormError] = useState("");
//   const { menuId } = useParams();
//   const { getLocalStorage, removeLocalStorage, updateQuantityInLocalStorage } =
//     useLocalStorage();
//   const itemsInCart = [];

//   //HÄMTAR ALLT JAG HAR I MIN CART
//   useEffect(() => {
//     const itemsInCart = getLocalStorage("cart");
//     if (itemsInCart) {
//       setCart(itemsInCart);

//     }
//   }, []);

//   function priceOfOrder() {
//     let totalPrice = 0;
//     cart.forEach((item) => {
//       totalPrice += item.price * item.quantity;
//     });

//     return totalPrice.toFixed(2);
//   }

//   function handleQuantityChange(e, itemId) {
//     let newQuantity = parseInt(e.target.value, 10);

//     // kolla om det är under 1 eller över 40
//     if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 40) {
//       setFormError("Please enter a valid quantity (1-40).");
//       return;
//     }

//     updateQuantityInLocalStorage("cart", itemId, newQuantity);

//     // Update total price after quantity change// DETTA ÄER NYTT FÖR ATT FIXA PROB.
//     const updatedTotalPrice = priceOfOrder(); // Calculate new total price
//     setTotalPrice(updatedTotalPrice);

//     // Uppdatera för carten med ny quantity
//     setCart((prevCart) =>
//       prevCart.map((item) => {
//         if (item.id === itemId) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       })

//     );
//      setFormError("");
//   }

//   function handleChangeForm(e) {
//     e.preventDefault();
//   }

//   function deleteItem(itemToDelete) {
//     removeLocalStorage("cart", itemToDelete);
//     setCart(cart.filter((item) => item.id !== itemToDelete.id));

//     // Update total price after deleting item---DETTA ÄR NYTT FÖR ATT FIXA PROB.
//     const updatedTotalPrice = priceOfOrder(); // Calculate new total price
//     setTotalPrice(updatedTotalPrice);
//   }

//   return (
//     <>
//       <div className="color-wrapper">
//         {cart.length === 0 ? (
//           <EmptyCart />
//         ) : (
//           <div>
//             <h3 className="cart-text">Your order:</h3>
//             <div className="menu-container">
//               {Array.isArray(cart) &&
//                 cart.map((item) => (
//                   <div key={item.id} className="menu-card">
//                     <img src={`${item.image}`} className="menu-image" />
//                     <h3>{item.title}</h3>
//                     <form onChange={handleChangeForm}>
//                       <input
//                         type="number"
//                         placeholder={item.quantity}
//                         value={item.quantity || ""}
//                         className="cart-input-amount"
//                         min="1"
//                         max="40"
//                         onChange={(e) => handleQuantityChange(e, item.id)}
//                       />
//                       {formError && <p>{formError}</p>}

//                     </form>
//                     <h3>${item.price}</h3>

//                     <button
//                       onClick={() => deleteItem(item)}
//                       className="delete-btn"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//             </div>

//             <h3 className="total-price">Total price: ${priceOfOrder()}</h3>
//             <div className="cart-links-wrapper">
//               <Link to="/menu" className="payment-btn">
//                 Add more items
//               </Link>

//                 <Link
//                   to="/payment"
//                   className="payment-btn place-order-btn"

//                 >
//                   Proceed to checkout
//                 </Link>

//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );

// }

// export default Cart;
