import React, { useEffect, useState } from "react";  
import { Link, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";


function Favourites() {
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
    console.log("funkar useEffect?");
    // Hämta inloggad user från localStorage --DETTA FUNGERAR
    const lsUserId = localStorage.getItem("loggedInUserId");
    if (lsUserId) {
      console.log("user in local storage: ", lsUserId);
      fetchUserFavorites(lsUserId);
      //  setLoggedInUser(JSON.parse(lsUserId));
    }
  }, []);

  const fetchUserFavorites = (userId) => {
    console.log("funkar hämtning av userId? ", userId);
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("hämtat från db.json", data);
        setListOfFavourites(data.favorites || []);
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  };

  const handleRemoveFavorite = (favoriteId) => {
    // Ta bort en favorit från användarens favoriter
    // Använd favoriteId för att identifiera vilken favorit som ska tas bort
    
    // Uppdatera state för att reflektera borttagningen av favoriten
    setUserFavorites(
      userFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  };

//   const handleClearFavorites = () => {
//     // Ta bort alla favoriter från db.json
   
//     // Uppdatera state för att reflektera borttagningen av alla favoriter
//     setUserFavorites([]);
//   };
  // LÄGG TILL I LOCAL STORAGE
  const addToCart = (menuItem) => {
    setLocalStorage("cart", menuItem);
    console.log("adding ", menuItem);
  };
  return (
    <>
      <div className="color-wrapper">
        <h1 className="cart-text">Your favourites</h1>
        {/* Visa en varning om ingen användare är inloggad */}
        {/* {!loggedInUser.id && (
        <h3>
          You need to be logged in order to save and see your favourite items
        </h3>
      )} */}

        {/* Visa användarens favoriter om användaren är inloggad */}
        {/* {loggedInUser.id && ( */}

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
                <button onClick={() => handleRemoveFavorite(f)}>
                  Remove from favourites
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* ) } */}
      </div>
    </>
  );
}

export default Favourites;







// import React, {useState, UseEffect}from 'react';
// function Favourites() {

//     const[loggedInUser, setLoggedInUser] = useState({});
// //hämta inloggade användaren från local storage
// localStorage.getItem(loggedInUser)
// //hämta samma användarnamn från db.json

// // loopa över de sparade favoriterna som den personen har

// // visa dem

// // kanske en knapp för att ta bort en favorit

// // kanske en knapp för att ta bort alla favoriter

// // knapp för att komma till menyn för att kunna lägga till fler favortier

//     return (

//         <>
//         {/* varningen ska synas endast om ingen är inloggad */}
//         <h3>You need to be logged in order to save and see your favourite items</h3>

//         </>
//       );
// }

// export default Favourites;
