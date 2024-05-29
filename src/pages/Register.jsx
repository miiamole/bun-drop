import { useState } from "react";
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
      errors.password = "Password must at least 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const addingUser = () => {
    if (Object.keys(formErrors).length === 0) {
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
  };

  return (
    <div className="payment-container">
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

