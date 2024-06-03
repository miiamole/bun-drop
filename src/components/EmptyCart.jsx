import React from 'react';
import { Link } from "react-router-dom";
function EmptyCart() {
    return (
      <>
        <div className="color-wrapper cart-text">
          <div className="empty-cart-text">
            <h2>
              Unlock the menu's treasures and add some sparkle to your
              cart!
            </h2>
            
            <Link to="/menu" className="payment-btn">
              Menu
            </Link>
          </div>
        </div>
      </>
    );
}

export default EmptyCart;
