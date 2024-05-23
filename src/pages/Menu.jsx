import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");

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
            <Link className="order-link" to={`/cart/${m.id}`}>
              Order
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu;
