import React, {useEffect} from "react";  //FIXA så modalen stänger sig självt, alt. att man kan klicka utanför den.


export default function Modal({ isOpen, toggleModal, message }) {
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        toggleModal();
      }, 1000); // Stänger modalen efter 1 sek

      return () => clearTimeout(timer); // Rensa timeout om modalen stängs innan 3 sekunder
    }
  }, [isOpen, toggleModal]);


    if (!isOpen) return null;
    console.log("closing modal");
   

  return (
    <>
      {/* {modal && ( */}
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>{message}</h2>
          {/* <button className="close-modal" onClick={toggleModal}>
            X
          </button> */}
        </div>
      </div>
      {/* )} */}
    </>
  );
}
