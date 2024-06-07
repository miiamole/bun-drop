import React from 'react';
import { Link } from "react-router-dom";

function Message({message, linkText, linkTo}) {
    return (
      <>
        {/* <div className="color-wrapper cart-text">
          
            <div className="empty-cart-text"> */}
              <h2>{message}</h2>
              <Link to={linkTo} className="payment-btn">
                {linkText}
              </Link>
            {/* </div>
          
        </div> */}
      </>
    );
}

export default Message;