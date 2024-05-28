import React, { Component } from "react";
import { Link } from "react-router-dom";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCartShopping, faHouse, faBurger, faUser, faHeart} from "@fortawesome/free-solid-svg-icons";
function Header() {
  return (
    <>
      <div className="header-wrapper">
        <img className="logo-image" src="/images/logo color.png" alt="Logo" />
        <div className="nav-links-wrapper">
          <Link className="header-links" to="/login">
            <FontAwesomeIcon icon={faUser} />
            Log in
          </Link>
          <Link className="header-links" to="/">
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>
          <Link className="header-links" to="/menu">
            <FontAwesomeIcon icon={faBurger} />
            Menu
          </Link>
          <Link className="header-links" to="/favourites">
            <FontAwesomeIcon icon={faHeart} />
            Favourites{" "}
          </Link>
        </div>
        <Link className="cart-link" to="/cart/:menuId">
          <FontAwesomeIcon icon={faCartShopping} />
          Cart
        </Link>
      </div>
    </>
  );
}

export default Header;
