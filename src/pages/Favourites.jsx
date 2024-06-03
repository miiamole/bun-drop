import React, { useEffect, useState } from "react";   //PROBLEM---- GÅR EJ ATT RADERA FRÅN DATABASEN
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
    // console.log("funkar hämtning av userId? ", userId);
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("hämtat från db.json", data);
        setListOfFavourites(data.favorites || []);
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  };

//   const handleRemoveFavorite = (favoriteToDelete) => {
//    let tempFavorites = [...listOfFavorites];
//    tempFavorites = tempFavorites.filter((f) => f.id !== favoriteToDelete.id);
//    setListOfFavourites(tempFavorites);

//    const updatedUser = {
//     favorites: tempFavorites,
//    }

//     fetch(`http://localhost:3000/users/${userId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     })
//       .then((res) => res.json())
//       .then((data) => {
       
//         console.log("Favorite removed from user data", data);
//       })
//       .catch((error) => console.error("Error removing favorite:", error));
//   };


 const handleRemoveFavorite = (favoriteToDelete) => {
let tempFavorites = [...listOfFavorites];

tempFavorites = tempFavorites.filter((f) => f.id !== favoriteToDelete.id);
setListOfFavourites(tempFavorites);

const deleteOptions = {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
};
fetch(`http://localhost:3000/users/${userId}/favorites/${favoriteToDelete.id}`, deleteOptions);

 }







  
  // LÄGG TILL I LOCAL STORAGE
  const addToCart = (menuItem) => {
    setLocalStorage("cart", menuItem);
    console.log("adding ", menuItem);
  };
  return (
    <>
      <div className="color-wrapper">
        <h1 className="cart-text">Your favourites</h1>
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
