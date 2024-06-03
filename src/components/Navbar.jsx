import React, { useEffect, useState } from "react";   //PROBLEM----Log out knappen ses endast om man uppdaterar sidan manuellt
import { Link } from "react-router-dom";     
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   //PROBLEM----- favoriter ska endast ses om man är inloggad
 import { faCartShopping, faHouse, faBurger, faUser, faHeart} from "@fortawesome/free-solid-svg-icons";
function Navbar() {     //PROBLEM-----borde register knapp finnas?

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState({ userName: "", password: "" });

useEffect(() => {
  const lsUserId = localStorage.getItem("loggedInUserId");
  if (lsUserId) {
    setIsLoggedIn(true);
    console.log("is logged in ", true)
  } else {
    setIsLoggedIn(false);
     console.log("is logged in ", false);
  }
}, [isLoggedIn]);

const logOut = () => {
  setIsLoggedIn(false);
  console.log("User logged out")
  setUser({userName: "", password: ""});
  // setUserName("");
  // setPassword("");
  localStorage.clear();
};


  return (
    <>
      <div className="header-wrapper">
        <img className="logo-image" src="/images/logo color.png" alt="Logo" />
        {isLoggedIn ? (
          <button className="header-links" onClick={logOut}>
            <FontAwesomeIcon icon={faUser} className="header-icon" />
            Log out
          </button>
        ) : (
          <Link className="header-links" to="/login">
            <FontAwesomeIcon icon={faUser} className="header-icon" />
            Sign in
          </Link>
        )}
        <div className="nav-links-wrapper">
          <Link className="header-links" to="/">
            <FontAwesomeIcon icon={faHouse} className="header-icon" />
            Home
          </Link>
          <Link className="header-links" to="/menu">
            <FontAwesomeIcon icon={faBurger} className="header-icon" />
            Menu
          </Link>
          <Link className="header-links" to="/favourites/:userId">
            <FontAwesomeIcon icon={faHeart} className="header-icon" />
            Favourites
          </Link>
          {/* <button onClick={logOut}>Log out</button> */}
        </div>
        <Link className="cart-link" to="/cart/:menuId">
          <FontAwesomeIcon icon={faCartShopping} className="header-icon" />
          Cart
        </Link>
      </div>
    </>
  );
}

export default Navbar;
