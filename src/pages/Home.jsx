import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div>
        <div className="home-wrapper">
          <div className="home-text-and-logo">
            <div classname="home-text">
              <h1 className="welcome">Welcome to Bun drop!</h1>
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
            <Link className="home-order-now order-link" to="/menu">Order now</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
