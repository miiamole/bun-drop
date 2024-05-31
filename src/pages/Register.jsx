import { useState, useEffect } from "react";   //PROBLEM---- "REGISTER" BORDE INTE SYNAS NÄR MAN REGISTRERAT OCH LOGGA IN KNAPPEN SYNS
import SuccessReg from "../components/SuccessReg";

function Register() {
  const initialValues = { userName: "", password: "" };
  const [user, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(user);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

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
      errors.password = "Password must be at least 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      checkUserNameExists(user.userName);
    }
  }, [formErrors, isSubmit]);

  const checkUserNameExists = (userName) => {
    fetch(`http://localhost:3000/users?userName=${userName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setFormErrors({ userName: "Username already exists!" });
          setIsSubmit(false);
        } else {
          addingUser();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addingUser = () => {
    const newUser = {
      userName: user.userName,
      password: user.password,
      favorites: [], // Lägg till en tom array för favoriter
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:3000/users", postOptions)
      .then((response) => {
        if (response.ok) {
          console.log("User added successfully!");
          setUser(initialValues); // Återställ formuläret
        } else {
          console.error("Failed to add user.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="payment-container color-wrapper">
      <h1>Register here</h1>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="reg-success">
          <SuccessReg />
        </div>
      ) : (
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

            <button className="payment-btn">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;

// import { useState, useEffect } from "react";   //PROBLEM------flera kan ha samma username (antar jag)
// import SuccessReg from "../components/SuccessReg";

// function Register() {
//   const initialValues = { userName: "", password: "" };
//   const [user, setUser] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validate(user);
//     setFormErrors(errors);
//     if (Object.keys(errors).length === 0) {
//       setIsSubmit(true);
//     }
//   };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.userName) {
//       errors.userName = "Username is required!";
//     } else if (values.userName.length < 4) {
//       errors.userName = "Username must be at least 4 characters!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required";
//     } else if (values.password.length < 4) {
//       errors.password = "Password must be at least 4 characters";
//     } else if (values.password.length > 10) {
//       errors.password = "Password cannot exceed more than 10 characters";
//     }
//     return errors;
//   };

//   useEffect(() => {
//     if (isSubmit && Object.keys(formErrors).length === 0) {
//       addingUser();
//     }
//   }, [formErrors, isSubmit]);

//   const addingUser = () => {
//     const newUser = {
//       userName: user.userName,
//       password: user.password,
//       favorites:[]
//     };
//     const postOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     };
//     fetch("http://localhost:3000/users", postOptions)
//       .then((response) => {
//         if (response.ok) {
//           console.log("User added successfully!");
//           setUser(initialValues); // rensar formuläret
//         } else {
//           console.error("Failed to add user.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div className="payment-container">
//       <h1>Register here</h1>
//       {Object.keys(formErrors).length === 0 && isSubmit ? (
//         <div className="reg-success">
//           <SuccessReg />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="form-container">
//           <div className="user-form">
//             <h2>Username:</h2>
//             <input
//               type="text"
//               name="userName"
//               placeholder="Username"
//               value={user.userName}
//               onChange={handleChange}
//             />
//             <p>{formErrors.userName}</p>

//             <h2>Password:</h2>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={user.password}
//               onChange={handleChange}
//             />
//             <p>{formErrors.password}</p>

//             <button className="payment-btn">Submit</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Register;
