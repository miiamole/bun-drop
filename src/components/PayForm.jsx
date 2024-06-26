import React, { useState, useEffect } from "react";

function PayForm(props) {
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerErrors = validateCustomerInfo(user);
    const paymentErrors = validatePaymentInfo(user);

    const errors = { ...customerErrors, ...paymentErrors };
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      processOrder();

    }
  };

  function chooseCard() {
    setPaymentMethod("card");
    setFormErrors({});
    setIsSubmit(false);
  }

  function chooseSwish() {
    setPaymentMethod("swish");
    setFormErrors({});
    setIsSubmit(false);
  }

  function processOrder() {
    props.placeOrder(user);
    // console.log("the user is:", user) // här får jag fram infor om användaren från formuläret

  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(user);
    }
  }, [formErrors]);

  const validateCustomerInfo = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    } else if (values.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    } else if (values.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    } else if (values.address.length < 5) {
      errors.address = "Address must be at least 5 characters!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    } else if (values.city.length < 2) {
      errors.city = "City must be at least 2 characters!";
    }

    return errors;
  };


const validatePaymentInfo = (values) => {
  const errors = {};

  if (paymentMethod === "card") {
    if (!values.cardNumber) {
      errors.cardNumber = "Card number is required!";
    } else if (values.cardNumber.length < 15) {
      errors.cardNumber = "Card number must be at least 15 characters!";
    }
    if (!values.expirationDate) {             //VALIDERINGEN AV DATUM FIXADE CHAT GPT
      errors.expirationDate = "Expiration date is required!";
    } else {
      const [month, year] = values.expirationDate.split("/");

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        errors.expirationDate = "Expiration date must be in MM/YY format!";
      } else {
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (
          isNaN(monthNum) ||
          isNaN(yearNum) ||
          monthNum < 1 ||
          monthNum > 12
        ) {
          errors.expirationDate = "Expiration date is invalid!";
        } else {
          const currentYear = new Date().getFullYear() % 100; // ger de sista två siffrorna av detta året
          const currentMonth = new Date().getMonth() + 1; // Månaderna får 0 innan???

          if (
            yearNum < currentYear ||
            (yearNum === currentYear && monthNum < currentMonth)
          ) {
            errors.expirationDate = "Expiration date cannot be in the past!";
          }
        }
      }
    }
    if (!values.cvv) {
      errors.cvv = "CVV is required!";
    } else if (values.cvv.length < 3) {
      errors.cvv = "CVV must be at least 3 characters!";
    }
  } else if (paymentMethod === "swish") {
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required!";
    } else if (values.phoneNumber.length < 10) {
      errors.phoneNumber = "Phone number must be at least 10 characters!";
    }
  }

  return errors;
};

  return (
    <>
      <div className="color-wrapper">
        <div className="payment-page-wrapper">
          <div className="payment-text">
            <h2>Choose payment method</h2>
          </div>
          <div className="pay-wrapper">
            <div className="payment-container payment-form">
              <button className="payment-btn" onClick={chooseCard}>
                Card
              </button>
              <button className="payment-btn" onClick={chooseSwish}>
                Swish
              </button>
            </div>
            <div className="payment-container payment-form">
              {paymentMethod && (
                <form onSubmit={handleSubmit} className="form-container">
                  {paymentMethod === "card" && (
                    <div className="payWithCard user-form">
                      <label>Card number:</label>
                      <input
                        type="number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={user.cardNumber}
                        onChange={handleChange}
                      />
                      <p>{formErrors.cardNumber}</p>

                      <label>Security code:</label>
                      <input
                        type="number"
                        name="cvv"
                        placeholder="CVV"
                        value={user.cvv}
                        onChange={handleChange}
                      />
                      <p>{formErrors.cvv}</p>

                      <label>Expiration date:</label>
                      <input
                        type="text"
                        name="expirationDate"
                        placeholder="MM/YY"
                        value={user.expirationDate}
                        onChange={handleChange}
                      />
                      <p>{formErrors.expirationDate}</p>
                    </div>
                  )}

                  {paymentMethod === "swish" && (
                    <div className="payWithSwish user-form">
                      <label>Phone number:</label>
                      <input
                        type="number"
                        name="phoneNumber"
                        placeholder="555-3457821"
                        value={user.phoneNumber}
                        onChange={handleChange}
                      />
                      <p>{formErrors.phoneNumber}</p>
                    </div>
                  )}

                  <div className="user-form">
                    <h2>Delivery information</h2>
                    <label>First name:</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                    <p>{formErrors.firstName}</p>
                    <label>Last name:</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                    <p>{formErrors.lastName}</p>
                    <label>Street name and number:</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street name and number"
                      value={user.address}
                      onChange={handleChange}
                    />
                    <p>{formErrors.address}</p>
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={user.city}
                      onChange={handleChange}
                    />
                    <p>{formErrors.city}</p>
                  </div>

                  <button className="payment-btn place-order-btn" type="submit">
                    Place order
                  </button>
                </form>
              )}
            </div>
            {paymentMethod &&
              Object.keys(formErrors).length === 0 &&
              isSubmit && (
                <div className="reg-success">
                  <h3>Det gick bra</h3>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PayForm;
