import React, { useState, useEffect } from "react";
import "./ItemModal.scss";

const ItemModal = ({ show, handleClose, selectedItem }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [selectedGrit, setSelectedGrit] = useState(null);

  useEffect(() => {
    if (selectedItem && selectedItem.grits && selectedItem.grits.length > 0) {
      setSelectedGrit(selectedItem.grits[0]);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, handleClose]);

  const handleGritClick = (grit) => {
    setSelectedGrit(grit);
  };

  const handleBackdropClick = (e) => {
    if (e.target.className.includes("modal")) {
      handleClose();
    }
  };

  return (
    <div className={showHideClassName} onClick={handleBackdropClick}>
      {selectedItem && selectedGrit && (
        <section className="modal-main">
          <div className="modal-image">
            <img
              src={selectedGrit.image}
              alt={`${selectedGrit.grit} grit picture`}
            />
          </div>
          <div className="modal-details">
            <div className="modal-details__info">
              <p>Status: {selectedItem.status}</p>
              <p>Description: {selectedItem.description}</p>
              <p>Quantity: {selectedItem.quantity}</p>
            </div>
            <div className="modal-grits">
              {selectedItem.grits.map((grit) => (
                <div
                  key={grit.id}
                  className={`modal-grit ${
                    selectedGrit.id === grit.id ? "active" : ""
                  }`}
                  onClick={() => handleGritClick(grit)}
                >
                  <p>{grit.grit}</p>
                </div>
              ))}
            </div>
            <div className="modal-grit-details">
              <p>Grit: {selectedGrit.grit}</p>
              <p>Description: {selectedGrit.description}</p>
              <p>Quantity: {selectedGrit.quantity}</p>
            </div>
          </div>
          <button onClick={handleClose}>Close</button>
        </section>
      )}
    </div>
  );
};

export default ItemModal;
