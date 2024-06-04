import React from "react";  //FIXA så modalen stänger sig självt, alt. att man kan klicka utanför den.


export default function Modal({ isOpen, toggleModal }) {
  
    if (!isOpen) return null;
    console.log("closing modal");
   

  return (
    <>
      {/* {modal && ( */}
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>Added to favourite</h2>
          <button className="close-modal" onClick={toggleModal}>
            X
          </button>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
