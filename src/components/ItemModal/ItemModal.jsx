import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemModal.scss";
import close from "../../assets/images/close-24px.svg";
const ItemModal = ({ show, handleClose, selectedItem }) => {
  const [selectedGrit, setSelectedGrit] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const keyPressRef = useRef(null);
  // Reset count and select the first grit when a new item is selected or the modal is shown
  useEffect(() => {
    if (selectedItem) {
      setSelectedGrit(selectedItem.grits?.[0] || null);
      if (show) {
        setCount(0);
      }
    }
  }, [show, selectedItem]);
  // Close the modal when the Escape key is pressed
  useEffect(() => {
    keyPressRef.current = (e) => {
      if (e.key === "Escape") {
        closeAndNavigate();
      }
    };
    document.addEventListener("keydown", keyPressRef.current);
    return () => {
      document.removeEventListener("keydown", keyPressRef.current);
    };
  }, []);
  // Close the modal and navigate to the inventory page
  const closeAndNavigate = () => {
    handleClose();
    navigate("/profile");
  };
  // Handle backdrop clicks to close the modal
  const handleBackdropClick = (e) => {
    if (e.target.className.includes("modal")) {
      closeAndNavigate();
    }
  };
  // Increment the count and update the quantity
  const incrementCount = () => {
    setCount(count + 1);
    updateQuantity(1);
  };
  // Decrement the count and update the quantity
  const decrementCount = () => {
    setCount(count - 1);
    updateQuantity(-1);
  };
  // Handle changes to the input field
  const handleInputChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    const diff = newCount - count;
    setCount(newCount);
    updateQuantity(diff);
  };
  // Update the quantity of the selected grit or item
  const updateQuantity = (diff) => {
    if (selectedGrit) {
      setSelectedGrit((prevGrit) => ({
        ...prevGrit,
        quantity: prevGrit.quantity + diff,
      }));
    } else if (selectedItem) {
      selectedItem.quantity += diff;
    }
  };
  if (!selectedItem) return null;
  return (
    <div
      className={`modal ${show ? "modal-block" : "modal-none"}`}
      onClick={handleBackdropClick}
    >
      <section className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="modal-images">
          <img
            className="modal-image"
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
            <>
              <div className="modal-grits">
                {selectedItem.grits.map((grit) => (
                  <div
                    key={grit.id}
                    className={`modal-grit ${
                      selectedGrit.id === grit.id ? "modal-grit-active" : ""
                    }`}
                    onClick={() => setSelectedGrit(grit)}
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
            </>
          )}
          <div className="modal-counter">
            <button className="modal__btn-dec" onClick={decrementCount}>
              -
            </button>
            <input
              className="modal-counter-input"
              type="number"
              value={count}
              onChange={handleInputChange}
              placeholder={count}
            />
            <button className="modal__btn-incre" onClick={incrementCount}>
              +
            </button>
          </div>
        </div>
        <div className="modal-container">
          <button className="modal__btn-close" onClick={closeAndNavigate}>
            <img
              className="modal-container-img"
              src={close}
              alt={`${close} logo`}
            />
            Close
          </button>
        </div>
      </section>
    </div>
  );
};
export default ItemModal;
