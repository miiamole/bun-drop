import React from 'react';
import { Link } from "react-router-dom";
function SuccessReg() {
    return (
      <>
        <div className="color-wrapper">
          
            <h3 className='succ-reg-text'>Your registration was successfull!</h3>
            <Link to="/login" className="payment-btn succ-reg-btn">
              Sign in here
            </Link>
          
        </div>
      </>
    );
}

export default SuccessReg;