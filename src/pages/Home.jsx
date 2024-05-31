import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {


const [loggedInUser, setLoggedInUser] = useState("");

useEffect(() => {
  // Hämta loggedInUser från localStorage
  const storedUser = localStorage.getItem("loggedInUserName");
  if (storedUser) {
    //tar bort citat tecken som annars är runt namnet
    const name = storedUser.replace(/['"]+/g, "");
    // Göra första bokstaven stor
    const userName =
      name.charAt(0).toUpperCase() + name.slice(1);
    setLoggedInUser(userName);
  }
}, []);


  return (
    <>
      <div>
        <div className="color-wrapper">
          <div className="home-text-and-logo">
            <div className="home-text">
              <h1 className="welcome">Welcome to Bun drop {loggedInUser}!</h1>
              <p className="welcome-text">
                At Bun Drop, we're dedicated to delivering the hottest and most
                delicious taste experiences right to your doorstep. With our
                passionate team of chefs, we craft each bite with love and care.
              </p>
            </div>
            <img
              className="logo-img-home"
              src="/images/logo color.png"
              alt="Logo"
            />
          </div>
          <h2 className="home-page-text">Check out our most popular items</h2>

          <div className="img-collage">
            <img className="home-page-img" src="/images/burger 1.png" />
            <img className="home-page-img" src="/images/drink 2.png" />
            <img className="home-page-img" src="/images/sides 1.png" />
            <img className="home-page-img" src="/images/dressing 4.png" />
            <img className="home-page-img" src="/images/dessert 4.png" />
          </div>
          <div>
            <Link className="payment-btn" to="/menu">Order now</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
