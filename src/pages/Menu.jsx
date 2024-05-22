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
      <h1>Menu</h1>
      <div className="filter-category">
        <button onClick={() => filterList("")}>All</button>

        <button onClick={() => filterList("burgers")}>Burgers</button>
        <button onClick={() => filterList("sides")}>Sides</button>
        <button onClick={() => filterList("drinks")}>Drinks</button>
        <button onClick={() => filterList("desserts")}>Desserts</button>
      </div>

      {filteredMenu.map((m) => (
        <div key={m.id}>
          <img src={m.image} />
          <h3>{m.title}</h3>
          <h3>{m.price}</h3>
          <h3>{m.description}</h3>
          <Link className="link-style" to={`/cart/${m.id}`}>Order</Link>
        </div>
      ))}
    </>
  );
}

export default Menu;
