import React, { useState, useEffect } from "react"; 
import { Link, json } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faHeart} from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState("");
  //   const [order, setOrder] = useState([]);
  const { setLocalStorage, getLocalStorage, removeLocalStorage } =
    useLocalStorage();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
    //ha ngn error grej??
  }, []);

  //HÄMTAR ALLT JAG HAR I MIN CART/// KAN JAG HA DETTA HÄR FÖR ATT SE VAD SOM REDAN FINNS I MIN CART NÄR JAG VILL LÄGGA TILL NGT
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  function filterList(category) {
    setFilter(category);
  }
  const filteredMenu = filter
    ? menu.filter((item) => item.category === filter)
    : menu;

 // LÄGG TILL I LOCAL STORAGE
    const addToCart = (menuItem) => {
      setLocalStorage("cart", menuItem);
      console.log("adding ",menuItem)
    };

  

  function addToFavoutite() {
    console.log();
  }

  return (
    <>
      <h1 className="menu-text">Our menu</h1>
      <div className="menu-btn-container">
        <button className="menu-btn" onClick={() => filterList("")}>
          All
        </button>
        <button className="menu-btn" onClick={() => filterList("burgers")}>
          Burgers
        </button>
        <button className="menu-btn" onClick={() => filterList("sides")}>
          Sides
        </button>
        <button className="menu-btn" onClick={() => filterList("drinks")}>
          Drinks
        </button>
        <button className="menu-btn" onClick={() => filterList("desserts")}>
          Desserts
        </button>
      </div>
      <div className="menu-container">
        {filteredMenu.map((m) => (
          <div key={m.id} className="menu-card">
            <img className="menu-image" src={`${m.image}`} />
            <h3>{m.title}</h3>
            <h3>${m.price}</h3>
            <h3>{m.description}</h3>
            <div className="add-to-cart-link-and-btn">
              {/* <button onClick={() => addToCart(m)} className="Add-to-cart-btn">
                {" "}
                <Link className="order-link" to={`/cart/${m.id}`}>
                  Add to cart
                </Link>
              </button> */}
              <Link
                onClick={() => addToCart(m)}
                className="order-link"
                to={`/cart/${m.id}`}
              >
                Add to cart
              </Link>

              <button onClick={addToFavoutite} className="heart-btn">
                <FontAwesomeIcon icon={faHeart} className="heart-shape" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu;
