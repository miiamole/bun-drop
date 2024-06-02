import React, { useEffect, useState } from "react";   //PROBLEM---- EJ ANPASSAD FÖR HALV DESKTOP
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
                <br />
                delicious taste experiences right to your doorstep.
                <br /> With our passionate team of chefs, we craft each bite
                with love and care.
              </p>
            </div>
            <img
              className="logo-img-home"
              src="/images/logo color.png"
              alt="Logo"
            />
          </div>
          <h2 className="home-page-text">
            Fresh Greens or Decadent Dreams? We've got something for everyone!
          </h2>
          <div className="collage-text"></div>
          <div className="img-collage-wrapper">
            <div className="img-collage">
              <h2 className="home-page-text collage-text">Guilty Pleasure Treasure</h2>
              <img className="img1 home-page-img" src="/images/burger 2.png" />
              <img className="img2 home-page-img" src="/images/drink 1.png" />
              <img className="img3 home-page-img" src="/images/sides 1.png" />
              <img
                className="img4 home-page-img"
                src="/images/dressing 4.png"
              />
              <img className="img5 home-page-img" src="/images/dessert 1.png" />
            </div>

            <div className="img-collage">
              <h2 className="home-page-text collage-text">The Green Machine Cuisine</h2>
              <img className="img1 home-page-img" src="/images/burger 7.png" />
              <img className="img2 home-page-img" src="/images/drink 6.png" />
              <img className="img3 home-page-img" src="/images/sides 3.png" />
            </div>
          </div>
          <div className="home-btn">
            <Link className="payment-btn" to="/menu">
              Go to menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
