import React, { useEffect, useState } from "react"; //Borde fixa---- har två likadana useEffect för att hämta användar från Local S

import { Link, useParams } from "react-router-dom"; //Borde fixa----upprepar kod från Navbar
import useLocalStorage from "../hooks/useLocalStorage"; //Borde anv. min local S hook
import EmptyFavo from "../components/EmptyFavo";

function Favourites() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const { userId } = useParams();
  const [listOfFavorites, setListOfFavourites] = useState([]);
  const {
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage,
    setLocalStorage,
  } = useLocalStorage();

  useEffect(() => {
    const lsUserId = localStorage.getItem("loggedInUserId");
    if (lsUserId) {
      setIsLoggedIn(true);
      console.log("is logged in ", true);
    } else {
      setIsLoggedIn(false);
      console.log("is logged in ", false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Hämta inloggad user från localStorage
    const lsUserId = localStorage.getItem("loggedInUserId");
    if (lsUserId) {
      console.log("user in local storage: ", lsUserId);
      fetchUserFavorites(lsUserId);
      //  setLoggedInUser(JSON.parse(lsUserId));
    }
  }, []);

  const fetchUserFavorites = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setListOfFavourites(data.favorites || []);
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  };

  const handleRemoveFavorite = (favoriteToDelete) => {
    const userId = localStorage.getItem("loggedInUserId");

    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        const updatedFavorites = userData.favorites.filter(
          (f) => f.id !== favoriteToDelete.id
        );

        const patchOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorites: updatedFavorites }),
        };

        return fetch(`http://localhost:3000/users/${userId}`, patchOptions);
      })
      .then((response) => {
        if (response.ok) {
          setListOfFavourites((prevFavorites) =>
            prevFavorites.filter((f) => f.id !== favoriteToDelete.id)
          );
        } else {
          console.error("Failed to remove favorite.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // LÄGG TILL I LOCAL STORAGE
  const addToCart = (menuItem) => {
    setLocalStorage("cart", menuItem);
    console.log("adding ", menuItem);
  };

  return (
    <>
      <div className="color-wrapper">
        {isLoggedIn ? (
          <>
            <h1 className="cart-text">
              {listOfFavorites.length > 0
                ? "Your favourites"
                : <EmptyFavo/>}
            </h1>
            <div className="menu-container">
              {listOfFavorites.map((f) => (
                <div key={f.id} className="menu-card">
                  <img className="menu-image" src={`${f.image}`} />
                  <h3>{f.title}</h3>
                  <h3>${f.price}</h3>
                  <h3>{f.description}</h3>
                  <div className="add-to-cart-link-and-btn">
                    <Link
                      onClick={() => addToCart(f)}
                      className="payment-btn"
                      to={`/cart/${f.id}`}
                    >
                      Add to cart
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(f)}
                      className="remove-favorite"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h3>You need to be logged in to save and view your favorite items.</h3>
        )}
      </div>
    </>
  );
}

export default Favourites;
