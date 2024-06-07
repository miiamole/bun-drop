import { useState, useEffect } from "react";
import Message from "../components/Message";

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
      favorites: [],
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:3000/users", postOptions)
      .then((response) => {
        if (response.ok) {
          // console.log("User added successfully!");
          setUser(initialValues);
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
      <div className="cart-text">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="empty-fav-text">
            <Message message="Your registration was successfull!"
            linkText="Sign in here"
            linkTo="/login" />
          </div>
        ) : (
          <>
            <div className="clock-container">
              <div className="register-container">
                <form onSubmit={handleSubmit} className="form-container">
                  <h2 className="center-text">Register</h2>
                  <div className="user-form">
                    <label>Username:</label>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={user.userName}
                      onChange={handleChange}
                    />
                    <p>{formErrors.userName}</p>

                    <label>Password:</label>
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;

