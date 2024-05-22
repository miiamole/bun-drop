import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
function Header() {
  return (
    <>
      <div className="header-wrapper">
        <Link className="header-links" to="/">
          Home
        </Link>
        <Link className="header-links" to="/menu">
          Menu
        </Link>
        <Link className="header-links" to="/cart/:menuId">
          {" "}
          Cart
          {/* <FontAwesomeIcon icon={faCartShopping} /> */}
        </Link>
      </div>
    </>
  );
}

export default Header;
