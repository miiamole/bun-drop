import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Favourites() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
   const { userId } = useParams();
   const [listOfFavoutites, setListOfFavourites] = useState([]);
  const { getLocalStorage, removeLocalStorage, clearLocalStorage } =
    useLocalStorage();

 useEffect(() => {
   fetch(`http://localhost:3000/userss/${userId}`)
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
    //    setOrder(data.items);
    //    setCustomer(data.customer);
    setListOfFavourites(data.users.Favourites)
     });
 }, [userId]);




  useEffect(() => {
    // Hämta inloggad user från localStorage --DETTA FUNGERAR
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
        console.log("user in local storage: ", storedUser)
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Hämta användarens favoriter från db.json när användarnamnet finns
    if (loggedInUser.username) {
      fetchUserFavorites(loggedInUser.username);
console.log("user in db.json: ",loggedInUser.userName)
    }
  }, [loggedInUser]);

  const fetchUserFavorites = (username) => {
    // hämta favoriter från db.json----PROBLEM------
    // Användarnamnet skickas till DB.JSON för att hämta dess favoriter
    fetch(`http://localhost:3000/users/${username}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
        // setUserFavorites(data))
      
      .catch((error) => console.error("Error fetching favorites:", error));
  };

  const handleRemoveFavorite = (favoriteId) => {
    // Ta bort en favorit från användarens favoriter
    // Använd favoriteId för att identifiera vilken favorit som ska tas bort
    removeLocalStorage("favorites", favoriteId);
    // Uppdatera state för att reflektera borttagningen av favoriten i användargränssnittet
    setUserFavorites(
      userFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  };

  const handleClearFavorites = () => {
    // Ta bort alla favoriter från användarens favoritlista
    clearLocalStorage("favorites");
    // Uppdatera state för att reflektera borttagningen av alla favoriter i användargränssnittet
    setUserFavorites([]);
  };

  return (
    <>
      {/* Visa en varning om ingen användare är inloggad */}
      {!loggedInUser.username && (
        <h3>
          You need to be logged in order to save and see your favourite items
        </h3>
      )}

      {/* Visa användarens favoriter om användaren är inloggad */}
      {loggedInUser.username && (
        <div>
          {/* Loopa över användarens favoriter och visa dem */}
          {userFavorites.map((favorite) => (
            <div key={favorite.id}>
              {/* Visa favoritens titel och eventuellt annan information */}
              <p>{favorite.title}</p>
              {/* Lägg till knappar för att ta bort favoriter */}
              <button onClick={() => handleRemoveFavorite(favorite.id)}>
                Remove
              </button>
            </div>
          ))}
          {/* Lägg till en knapp för att ta bort alla favoriter */}
          <button onClick={handleClearFavorites}>Clear all favorites</button>
          {/* Lägg till en länk för att komma till menyn för att lägga till fler favoriter */}
          <Link to="/menu">Go to menu</Link>
        </div>
      )}
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
