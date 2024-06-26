import React, { useEffect, useState } from "react";   
import { Link, useNavigate } from "react-router-dom";     
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCartShopping, faHouse, faBurger, faUser, faHeart} from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const lsUserId = localStorage.getItem("loggedInUserId");
    if (lsUserId) {
      setIsLoggedIn(true);
      // console.log("is logged in ", true);
    } else {
      setIsLoggedIn(false);
      // console.log("is logged in ", false);
    }
    
  }, [isLoggedIn, localStorage.getItem("loggedInUserId")]); 

  const logOut = () => {
    setIsLoggedIn(false);
    // console.log("User logged out");
    setUser({ userName: "", password: "" });
    localStorage.clear();
    navigate("/"); 
     window.location.reload(); // tips från David för att lösa problemet med att 
     //personens namn står kvar på sidan trots att de loggat ut.
  };

  return (
    <>
      <div className="header-wrapper">
        <img className="logo-image" src="/images/logo color.png" alt="Logo" />

        {isLoggedIn ? (
          <button className="header-links log-out-btn" onClick={logOut}>
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
