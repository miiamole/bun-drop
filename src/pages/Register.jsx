import { useState, useEffect } from "react";  //PROBLEM----- DET LÄGGS TILL I DATABASEN OAVETT OM MAN SKRIVIT NGT ELLER INTE
//import { Link } from "react-router-dom";
import SuccessReg from "../components/SuccessReg";

function Register() {
  const initialValues = { userName: "", password: "" }; //kollat på youtube om validering (Dipesh Malvia)
  const [user, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }); //minns ej vad detta innebar: [name]: value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  };

  useEffect(() => {
   // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
   //   console.log(user);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Username is required!";
    } else if (values.userName.length < 4) {
      errors.userName = "Username must be at least 4 characters!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must at least 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  function addingUser() {
    const newUser = {
      userName: user.userName,
      password: user.password,
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newUser }),
    };
    fetch("http://localhost:3000/users", postOptions);
  }

  return (
    <div className="payment-container">
      <h1>Register</h1>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="reg-success">
          <SuccessReg/>
        </div>
      ) : (
        // <pre>{JSON.stringify(user, undefined, 2)}</pre>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="user-form">
            <h2>Username:</h2>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={user.userName}
              onChange={handleChange}
            />

            <p>{formErrors.userName}</p>

            <h2>Password:</h2>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />

            <p>{formErrors.password}</p>
            {/* <Link to="/login">
              <button
                className="payment-btn"
                //  onClick={addingUser}
              >
                Create an account
              </button>
            </Link> */}
            <button className="payment-btn" onClick={addingUser}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// function Register() {

//   const [user, setUser] = useState({});

//   const [showWarning, setShowWarning] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((data) => setUser(data));
//     //ha ngn error grej??
//   }, []);

//   function handleSubmitForm(e) {
//     e.preventDefault();
//   }
//   function addingUser() {
//     if (
//       !user.userName ||
//       !user.password ||
//       user.userName.length < 4 ||
//       user.password.length < 4
//     ) {
//       setShowWarning(true);
//       console.log(showWarning);
//       return;
//     }

//     const newUser = {
//       username: user.userName,
//       password: user.password,
//     };
//     const postOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ newUser }),
//     };
//     fetch("http://localhost:3000/users", postOptions);
//   }

//   function handleUserNameChange(e) {
//     // if (e.target.value.length < 4) {
//     //   setShowWarning(true)
//     //   return;
//     // } else {
//     //   setShowWarning(false);
//     //   setUser((prev) => ({ ...prev, userName: e.target.value }));
//     // }
//     setUser((prev) => ({ ...prev, userName: e.target.value }));
//   }
//   function handlePasswordChange(e) {
// //      if (e.target.value.length < 4) {
// //       setShowWarning(true);
// //     } else {
// //       setShowWarning(false);
// //       console.log(showWarning)
// //     setUser((prev) => ({ ...prev, password: e.target.value }));
// //   }
// setUser((prev) => ({ ...prev, password: e.target.value }));
// }

//   return (
//     <>
//       <div className="payment-container ">
//         <h2>Register</h2>

//         <form onSubmit={handleSubmitForm} className="form-container">
//           <div className="user-form">
//             <input
//               type="text"
//               placeholder="User name"
//               onChange={handleUserNameChange}
//               value={user.userName}
//             />
//             {showWarning && (
//               <h3>Choose a username that's at least 4 characters</h3>
//             )}
//             <input
//               type="password"
//               placeholder="Password"
//               onChange={handlePasswordChange}
//               value={user.password}
//             />
//             {/* <Link to="/login"> NÅGOT MED LÄNKEN GÖR ATT VARNINGEN INTE VISAS UTAN JAG BARA SKICKAS VIDARE*/ }
//               <button className="payment-btn" onClick={addingUser}>
//                 Create an account
//               </button>
//             {/* </Link> */}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Register;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// function Register() {
//   const initialValues = { userName: "", password: "" };
//   const [formErrors, setFormErrors] = useState({});
//   const [formValues, setFormValues] = useState(initialValues);
// const [isSubmit, setIsSubmit] = useState(false);

// const handleChange = (e) => {
//     const {name, value} = e.target;
//     setFormValues({...formValues, [name]: value}); //[]sätter namn som key?!?
// }

// useEffect(() => {
//   console.log(formErrors);
//   if (Object.keys(formErrors).length === 0 && isSubmit) {
//     console.log(formValues);
//   }
// }, [formErrors]);

// //   useEffect(() => {
// //     fetch("http://localhost:3000/users")
// //       .then((res) => res.json())
// //       .then((data) => setUser(data));
// //     //ha ngn error grej??
// //   }, []);

//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(formValues)); //resultatet av det som validerats sätts?!?
//     setIsSubmit(true)
//   }

// const validate = (values) => {
// const errors = {};
// if (!values.userName) {
//   errors.userName = "Username is required!";
// }
// if (!values.password) {
//   errors.password = "Password is required";
// } else if (values.password.length < 4) {
//   errors.password = "Password must be more than 4 characters";
// } else if (values.password.length > 10) {
//   errors.password = "Password cannot be longer than 10 characters";
// }
// return errors;
// }

//  // function addingUser() {
// //     if (
// //       !user.userName ||
// //       !user.password ||
// //       user.userName.length < 4 ||
// //       user.password.length < 4
// //     ) {
// //       setShowWarning(true);
// //       console.log(showWarning);
// //       return;
//  //  }

// //     const newUser = {
// //       username: user.userName,
// //       password: user.password,
// //     };
// //     const postOptions = {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ newUser }),
// //     };
// //     fetch("http://localhost:3000/users", postOptions);
// //   }

// //   function handleUserNameChange(e) {

// //     setUser((prev) => ({ ...prev, userName: e.target.value }));
// //   }
// //   function handlePasswordChange(e) {

// //     setUser((prev) => ({ ...prev, password: e.target.value }));
// //   }

//   return (
//     <>
//       <div className="payment-container ">
//         <h2>Register</h2>
//         {Object.keys(formErrors).length === 0 && isSubmit ? (
//           <div className="ui message success">Signed in successfully</div>
//         ) : (
//           <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
//         )}
//         <form onSubmit={handleSubmitForm} className="form-container">
//           <div className="user-form">
//             <div>
//               <label>User name</label>
//               <input
//                 type="text"
//                 placeholder="User name"
//                 value={formValues.userName}
//                 onChange={handleChange}
//               />
//             </div>
//             <p>{formErrors.userName}</p>
//             <div>
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={formValues.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <p>{formErrors.password}</p>
//             <Link to="/login">
//               <button className="payment-btn"
//             //    onClick={addingUser}
//                >
//                 Create an account
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Register;
