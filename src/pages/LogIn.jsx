import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function LogIn() {
const [user, setUser] = useState({})
function handleSubmitForm(e){
      e.preventDefault();
      loggingInUser();
}
function loggingInUser(){
    console.log("logging in")

   // kanske att man skriver så för att tömma inputfälten setUser({})

}
function handleUserNameChange(e){
     setUser((prev) => ({ ...prev, userName: e.target.value }));
}
function handlePasswordChange(e){
 setUser((prev) => ({ ...prev, password: e.target.value }));
}

  return (
    <>
      <div className="register">
        <h3>Not registered yet? </h3>
        <Link to="/register" className="payment-btn place-order-btn">
          Click here
        </Link>
      </div>
      <div className="payment-container ">
        <h2>Log in</h2>

        <form onSubmit={handleSubmitForm} className="form-container">
          <div className="user-form">
            
            <input
            
              type="text"
              placeholder="User name"
              onChange={handleUserNameChange}
              value={user.userName}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={user.password}
            />
            <button
              className="payment-btn"
              type="submit"
              // onClick={loggingInUser}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;