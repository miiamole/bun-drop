import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <Link className="header-links" to="/cart">
          Cart
        </Link>
      </div>
    </>
  );
}

export default Header;
