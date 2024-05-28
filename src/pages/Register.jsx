import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
function Register() {


const [user, setUser] = useState({});


useEffect(() => {
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => setUser(data));
  //ha ngn error grej??
}, []);




function handleSubmitForm(e) {
  e.preventDefault();
}
function addingUser() {
const newUser = {
    username: user.userName,
    password: user.password
}
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({newUser}),
  };
  fetch("http://localhost:3000/users", postOptions);
}


 



function handleUserNameChange(e) {
  setUser((prev) => ({ ...prev, userName: e.target.value }));
}
function handlePasswordChange(e) {
  setUser((prev) => ({ ...prev, password: e.target.value }));
}


    return (
      <>
        <div className="payment-container ">
          <h2>Register</h2>

          <form onSubmit={handleSubmitForm} className="form-container">
            <div className="user-form">
              <input
                type="text"
                placeholder="User name"
                onChange={handleUserNameChange}
                value={user.userName}
              />
              <input
                type="text"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={user.password}
              />
              <Link to="/login">
                <button className="payment-btn" onClick={addingUser}>
                  Create an account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
}

export default Register;