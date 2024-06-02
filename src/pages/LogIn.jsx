import React, { useState, useEffect } from "react";   //PROBLEM---- NÄR MAN LOGGAR IN ÄRVER MAN DET SOM FINNA I CARTEN.
import { Link, useNavigate } from "react-router-dom";   // BORDE KANSKE TÖMMA CART NÄR MAN KLICKAR PÅ LOGGA IN

function LogIn() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [users, setUsers] = useState([]);
  const [loginError, setLogInError] = useState(false);
  const navigate = useNavigate();

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
      console.log("id på logged in: ", findUser.id)
      localStorage.setItem("loggedInUserName", findUser.userName)
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
        <div className="register">
          <h3>Not registered yet? </h3>
          <Link to="/register" className="payment-btn place-order-btn">
            Click here
          </Link>
        </div>

        <div className="clock-container">
          <div className="payment-container sign-in-container">
            <h2>Sign in</h2>

            <form onSubmit={handleLogIn} className="form-container">
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;

