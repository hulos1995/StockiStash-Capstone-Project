import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemModal.scss";

const ItemModal = ({ show, handleClose, selectedItem }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [selectedGrit, setSelectedGrit] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedItem && selectedItem.grits && selectedItem.grits.length > 0) {
      setSelectedGrit(selectedItem.grits[0]);
    } else {
      setSelectedGrit(null);
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAndNavigate();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const handleGritClick = (grit) => {
    setSelectedGrit(grit);
  };
  const closeAndNavigate = () => {
    handleClose();
    navigate("/inventory");
  };
  const handleBackdropClick = (e) => {
    if (e.target.className.includes("modal")) {
      closeAndNavigate();
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
    updateQuantity(1);
  };
  const decrementCount = () => {
    setCount(count - 1);
    updateQuantity(-1);
  };
  const handleInputChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    const diff = newCount - count;
    setCount(newCount);
    updateQuantity(diff);
  };
  const updateQuantity = (diff) => {
    if (selectedGrit) {
      setSelectedGrit({
        ...selectedGrit,
        quantity: selectedGrit.quantity + diff,
      });
    } else if (selectedItem) {
      selectedItem.quantity += diff;
    }
  };
  return (
    <div className={showHideClassName} onClick={handleBackdropClick}>
      {selectedItem && (
        <section className="modal-main" onClick={(e) => e.stopPropagation()}>
          <div className="modal-image">
            <img
              src={selectedGrit ? selectedGrit.image : selectedItem.image}
              alt={`${
                selectedGrit ? selectedGrit.grit : selectedItem.name
              } picture`}
            />
          </div>
          <div className="modal-details">
            <div className="modal-details__info">
              <p>
                Status:{" "}
                {selectedItem.quantity <= 0
                  ? "Out of Stock"
                  : selectedItem.status}
              </p>
              <p>Description: {selectedItem.description}</p>
              <p>Quantity: {selectedItem.quantity}</p>
            </div>
            {selectedGrit && (
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
            )}
            {selectedGrit && (
              <div className="modal-grit-details">
                <p>Grit: {selectedGrit.grit}</p>
                <p>Description: {selectedGrit.description}</p>
                <p>Quantity: {selectedGrit.quantity}</p>
              </div>
            )}
            <div className="modal-counter">
              <button onClick={decrementCount}>-</button>
              <input
                type="number"
                value={count}
                onChange={handleInputChange}
                placeholder={count}
              />
              <button onClick={incrementCount}>+</button>
            </div>
          </div>
          <button onClick={closeAndNavigate}>Close</button>
        </section>
      )}
    </div>
  );
};

export default ItemModal;
