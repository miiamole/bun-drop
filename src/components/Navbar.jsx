import React, { Component } from "react";   //PROBLEM----om någon är inloggad så ska knappen logga in bytas ut mot log out
import { Link } from "react-router-dom";     //PROBLEM----fixa med localstorage för att kunna logga ut
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   //PROBLEM----- favoriter ska endast ses om man är inloggad
 import { faCartShopping, faHouse, faBurger, faUser, faHeart} from "@fortawesome/free-solid-svg-icons";
function Navbar() {     //PROBLEM-----borde register knapp finnas?

// const logOut = () => {
//   setUser({});
//   setUserName("");
//   setPassword("");
//   localStorage.clear();
// };


  return (
    <>
      <div className="header-wrapper">
        <img className="logo-image" src="/images/logo color.png" alt="Logo" />

        <Link className="header-links" to="/login">
          <FontAwesomeIcon icon={faUser} className="header-icon"/>
          Sign in
        </Link>
        <div className="nav-links-wrapper">
          <Link className="header-links" to="/">
            <FontAwesomeIcon icon={faHouse} className="header-icon"/>
            Home
          </Link>
          <Link className="header-links" to="/menu">
            <FontAwesomeIcon icon={faBurger} className="header-icon" />
            Menu
          </Link>
          <Link className="header-links" to="/favourites/:userId">
            <FontAwesomeIcon icon={faHeart} className="header-icon"/>
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
