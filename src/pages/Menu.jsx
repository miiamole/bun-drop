import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
    //ha ngn error grej??
  }, []);

  function filterList(category) {
    setFilter(category);
  }
  const filteredMenu = filter
    ? menu.filter((item) => item.category === filter)
    : menu;


const addToOrder = (menuItem) => {
  // Kontrollera om artikeln redan finns i varukorgen
  const existingItem = order.findIndex((item) => item.id === menuItem.id);

  if (existingItem !== -1) {
    // Om artikeln redan finns i varukorgen, öka kvantiteten med 1
    const updatedOrder = [...order];
    updatedOrder[existingItem].quantity += 1;
    setOrder(updatedOrder);
  } else {
    // Om artikeln inte finns i varukorgen, lägg till den med kvantiteten 1
    const newOrderItem = { ...menuItem, quantity: 1 };
    setOrder([...order, newOrderItem]);
  }

  // Lägg till artikeln i databasen
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menuItem),
  };
  fetch("http://localhost:3000/orders", postOptions);
};


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
            <div className="add-to-cart-input-and-button">
             
              <button onClick={() => addToOrder(m)}>
                {" "}
                <Link className="order-link" to={`/cart/${m.id}`}>
                  Add to cart
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu;
