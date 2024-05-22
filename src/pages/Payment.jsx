import React, { useState} from "react";
function Payment() {
const [firstName, setFirstName] = (useState = "");
const [lastName, setLastName] = (useState = "");
const [adress, setAdress] = (useState = "");
const [city, setCity] = (useState = "");

function handleFirstNameChange(e) {
  setFirstName(e.target.value);
}
function handleLastNameChange(e) {
  setLastName(e.target.value);
}
function handleAdressChange(e) {
  setAdress(e.target.value);
}
function handleCityChange(e) {
  setCity(e.target.value);
}
function handleSubmitForm(e) {
    
    e.preventDefault();
 const postOptions = {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ firstName: firstName, lastName: lastName, adress: adress, city: city }),
 };
 fetch("http://localhost:3001/users", postOptions);

}

  return (
    <>
      <form onSubmit={handleSubmitForm} className="form-container">
        <div className="user-form">
          <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <input
            type="text"
            placeholder="street name and number"
            value={adress}
            onChange={handleAdressChange}
          />
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      <h2>Choose payment method:</h2>
      <button>Card</button>
      <button>Swish</button>
    </>
  );
}

export default Payment;
