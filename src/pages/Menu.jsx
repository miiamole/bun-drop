import React, { useState, useEffect } from "react"; // PROBLEM----- VARNING SKA SYNAS OM MAN KLICKAR PÅ HJÄRTA MEN EJ ÄR INLOGGAD
import { Link, json } from "react-router-dom";       // ALTERNATIVT ATT DE EJ SKA SYNAS OM MAN EJ ÄR INLOGGAD
import useLocalStorage from "../hooks/useLocalStorage";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faHeart} from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState("");
  const [favourite, setFavourite] =([]);
  //   const [order, setOrder] = useState([]);
  const { setLocalStorage, getLocalStorage, removeLocalStorage } =
    useLocalStorage();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
    //ha ngn error grej??
  }, []);

  //HÄMTAR ALLT JAG HAR I MIN CART
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
// LÄGG TILL favoriter I DB.JSON
  const addToFavoutite = (menuItem) => {
    const userId = localStorage.getItem("loggedInUserId");

    // kolla om ngn är inloggd
    if (!userId) {
      console.log("no one is logged in");
      return;
    }

    console.log("adding this to your list: ");
    const favourite = {
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price,
      description: menuItem.description,
      category: menuItem.category,
      image: menuItem.image,
    };
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        // Hämta användarens befintliga favoritlista
        const favorites = userData.favorites;

        // Lägg till den nya favoriten i favoritlistan
        favorites.push(favourite);

        // Skapa options för fetch-anropet
        const patchOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorites: favorites }),
        };

        // Utför PATCH-anropet för att uppdatera användarens favoritlista
        return fetch(`http://localhost:3000/users/${userId}`, patchOptions);
      })
      .then((response) => {
        if (response.ok) {
          console.log("Favorite added successfully!");
          // Uppdatera gränssnittet eller vidta andra åtgärder vid behov
        } else {
          console.error("Failed to add favorite.");
          // Hantera situationen när det misslyckades att lägga till favoriten
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Hantera eventuella fel som kan uppstå vid anropet
      });
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

              <button onClick={() => addToFavoutite(m.id)} className="heart-btn">
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
