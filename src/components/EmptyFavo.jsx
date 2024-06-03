import React from 'react';
import { Link } from "react-router-dom";
function EmptyFavo() {
    return (
      <>
        <div className="color-wrapper cart-text">
          <div className="empty-fav-text">
            <h2>
              Unlock the menu's treasures and add some sparkle to your
              favorites!
            </h2>
           
            <Link to="/menu" className="payment-btn">
              Menu
            </Link>
          </div>
        </div>
      </>
    );
}

export default EmptyFavo;