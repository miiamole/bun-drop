import React, { useState, useEffect } from "react";   
import { Link, useNavigate } from "react-router-dom";   
import useLocalStorage from "../hooks/useLocalStorage";

function LogIn() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [users, setUsers] = useState([]);
  const [loginError, setLogInError] = useState(false);
  const navigate = useNavigate();
   const {clearLocalStorage } =
     useLocalStorage();

  // Hämta alla användare från db.json
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // logga in användaren och spara id till local storage
  const handleLogIn = (e) => {
    e.preventDefault();

    const findUser = users.find(
      (u) => u.userName === user.userName && u.password === user.password
    );

    if (findUser) {
      localStorage.setItem("loggedInUserId", findUser.id);
    //   console.log("id på logged in: ", findUser.id)
      localStorage.setItem("loggedInUserName", findUser.userName)
      // tömmer cart:en när man loggas in så att man ej ärver den förra inloggade personens cart
      clearLocalStorage("cart") 
      navigate("/"); 
    } else {
      setLogInError(true); // Visa felmeddelande om användaren inte hittades
    }
  };

  
  const handleUserNameChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, userName: e.target.value }));
  };

  
  const handlePasswordChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, password: e.target.value }));
  };

  return (
    <>
      <div className="color-wrapper">
        <div className="clock-container">
          <div className="sign-in-container">
            <form onSubmit={handleLogIn} className="form-container">
              <h2 className="center-text">Sign in</h2>
              <div className="user-form">
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={user.userName}
                  onChange={handleUserNameChange}
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handlePasswordChange}
                />
                {loginError && <p>Incorrect username or password.</p>}
                <button className="payment-btn" onClick={handleLogIn}>
                  Sign in
                </button>
                <div className="reg-link-container">
                  <h5>Not registerd yet?</h5>
                  <Link className="reg-link" link to="/register">Click here</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;

