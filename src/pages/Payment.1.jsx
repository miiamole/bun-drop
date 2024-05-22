import React, { useState } from "react";

export function Payment() {
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

  return (
    <>
      <form onSubmit={handleSubmitForm}>
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
          onChange={handlecityChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Chhose payment method:</h2>
      <button>Card</button>
      <button>Swish</button>
    </>
  );
}
