import React from 'react';
import { Link } from "react-router-dom";
function EmptyCart() {
    return (
      <>
        <div className="color-wrapper cart-text">
          <div className='empty-cart-text'>
            
            <h2>Your cart is empty at the moment</h2>
            <h3>Check out our wonderful menu</h3>
            <Link to="/menu" className="payment-btn">
              Menu
            </Link>
          </div>
        </div>
      </>
    );
}

export default EmptyCart;
