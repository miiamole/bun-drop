import React from 'react';
import { Link } from "react-router-dom";
function SuccessReg() {
    return (
      <>
        <div>
          <h3>Your registration was successfull</h3>
          <Link to="/login">Log in here</Link>
        </div>
      </>
    );
}

export default SuccessReg;