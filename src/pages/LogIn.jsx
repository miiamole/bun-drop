import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [users, setUsers] = useState([]);
  const [loginError, setLogInError] = useState(false);
  const navigate = useNavigate();

  // Hämta alla användare från databasen vid komponentens montering
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // Funktion för att logga in användaren och spara användar-ID till local storage
  const handleLogin = () => {
    const findUser = users.find(
      (u) => u.userName === user.userName && u.password === user.password
    );

    if (findUser) {
      localStorage.setItem("loggedInUserId", findUser.id);
      localStorage.setItem("loggedInUserName", findUser.userName)
      navigate("/"); // Navigera till startsidan efter inloggning
    } else {
      setLogInError(true); // Visa felmeddelande om användaren inte hittades
    }
  };

  // Hantera ändringar i användarnamnsfältet
  const handleUserNameChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, userName: e.target.value }));
  };

  // Hantera ändringar i lösenordsfältet
  const handlePasswordChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, password: e.target.value }));
  };

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
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
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
            <button className="payment-btn" onClick={handleLogin}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function LogIn() {
//   const [user, setUser] = useState({ userName: "", password: "" });

//   const [users, setUsers] = useState([]);
//   const [loginError, setLogInError] = useState(false);
//   const navigate = useNavigate();

//   //hämta alla users
//   useEffect(() => {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//       });
//   }, []);

//  const saveUserToLocalStorage = (loggedInUser) => {
//     console.log("id är: ",loggedInUser.id)
//    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser.userName));
//    // localStorage.setItem( "loggedInUserId",JSON.stringify(loggedInUser.id));
//  };

//   function handleSubmitForm(e) {
//     e.preventDefault();
// const currentUser = user;
//     //jämföra det inskrivna med det som dinns i db.json
//     const findUser = users.find(
//       (u) => u.userName === user.userName && u.password === user.password
//     );
//     if (findUser) {
//       console.log("found a user to log in");
//       // Spara den inloggade användaren i localStorage
//       saveUserToLocalStorage(currentUser);
//       setLogInError(false);
//       navigate("/");
//     } else {
//       console.log("did not find a user");
//       setLogInError(true);
//     }
//     loggingInUser();
//   }
//   function loggingInUser() {

//     // kanske att man skriver så för att tömma inputfälten setUser({})
//   }
//   function handleUserNameChange(e) {
//     setUser((prev) => ({ ...prev, userName: e.target.value }));
//   }
//   function handlePasswordChange(e) {
//     setUser((prev) => ({ ...prev, password: e.target.value }));
//   }

//   return (
//     <>
//       <div className="register">
//         <h3>Not registered yet? </h3>
//         <Link to="/register" className="payment-btn place-order-btn">
//           Click here
//         </Link>
//       </div>
//       <div className="payment-container ">
//         <h2>Log in</h2>

//         <form onSubmit={handleSubmitForm} className="form-container">
//           <div className="user-form">
//             <label>Username:</label>
//             <input
//               type="text"
//               placeholder="Username"
//               onChange={handleUserNameChange}
//               value={user.userName}
//             />
//             <label>Password:</label>
//             <input
//               type="password"
//               placeholder="Password"
//               onChange={handlePasswordChange}
//               value={user.password}
//             />
//             <p>text som visas om ngn info är fel</p>
//             <button
//               className="payment-btn"
//               type="submit"
//               // onClick={loggingInUser}
//             >
//               Log in
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default LogIn;
