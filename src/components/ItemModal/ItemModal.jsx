import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ItemModal.scss';
import close from '../../assets/images/close-24px.svg';

const ItemModal = ({ show, handleClose, selectedItem, updateCartItems }) => {
  const [selectedGrit, setSelectedGrit] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const keyPressRef = useRef(null);
  const base_URL = import.meta.env.VITE_API_URL;

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
      if (e.key === 'Escape') {
        closeAndNavigate();
      }
    };
    document.addEventListener('keydown', keyPressRef.current);
    return () => {
      document.removeEventListener('keydown', keyPressRef.current);
    };
  }, []);

  // Close the modal and navigate to the inventory page
  const closeAndNavigate = () => {
    handleClose();
    navigate('/profile');
  };

  // Handle backdrop clicks to close the modal
  const handleBackdropClick = (e) => {
    if (e.target.className.includes('modal')) {
      closeAndNavigate();
    }
  };

  // Increment the count and update the quantity
  const incrementCount = () => {
    if (count < (selectedGrit ? selectedGrit.quantity : selectedItem.quantity)) {
      setCount(count + 1);
      if (selectedGrit) {
        setSelectedGrit((prevGrit) => ({
          ...prevGrit,
          quantity: prevGrit.quantity - 1,
        }));
      }
      selectedItem.quantity -= 1;
    }
  };

  // Decrement the count and update the quantity
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      if (selectedGrit) {
        setSelectedGrit((prevGrit) => ({
          ...prevGrit,
          quantity: prevGrit.quantity + 1,
        }));
      }
      selectedItem.quantity += 1;
    }
  };

  // Handle changes to the input field
  const handleInputChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    const diff = newCount - count;
    if (newCount >= 0 && newCount <= (selectedGrit ? selectedGrit.quantity + count : selectedItem.quantity + count)) {
      setCount(newCount);
      if (selectedGrit) {
        setSelectedGrit((prevGrit) => ({
          ...prevGrit,
          quantity: prevGrit.quantity - diff,
        }));
      }
      selectedItem.quantity -= diff;
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.post(
        `${base_URL}/cart`,
        {
          inventory_id: selectedItem.id,
          quantity: count,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Decrease the inventory quantity
      updateCartItems(); // Update the cart items
      toast.success('Item added to cart successfully!');
      handleClose();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  if (!selectedItem) return null;

  return (
    <div
      className={`modal ${show ? 'modal-block' : 'modal-none'}`}
      onClick={handleBackdropClick}
    >
      <section
        className='modal-main'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-images'>
          <img
            className='modal-image'
            src={selectedGrit ? selectedGrit.image : selectedItem.image}
            alt={`${selectedGrit ? selectedGrit.grit : selectedItem.name} picture`}
          />
        </div>
        <div className='modal-details'>
          <div className='modal-details__info'>
            <p>Status: {selectedItem.quantity <= 0 ? 'Out of Stock' : selectedItem.status}</p>
            <p>Description: {selectedItem.description}</p>
            <p>Quantity: {selectedItem.quantity}</p>
          </div>
          {selectedGrit && (
            <>
              <div className='modal-grits'>
                {selectedItem.grits.map((grit) => (
                  <div
                    key={grit.id}
                    className={`modal-grit ${selectedGrit.id === grit.id ? 'modal-grit-active' : ''}`}
                    onClick={() => setSelectedGrit(grit)}
                  >
                    <p>{grit.grit}</p>
                  </div>
                ))}
              </div>
              <div className='modal-grit-details'>
                <p>Grit: {selectedGrit.grit}</p>
                <p>Description: {selectedGrit.description}</p>
                <p>Quantity: {selectedGrit.quantity}</p>
              </div>
            </>
          )}
          {selectedItem.quantity > 0 && (
            <div className='modal-counter'>
              <button
                className='modal__btn-dec'
                onClick={decrementCount}
              >
                -
              </button>
              <input
                className='modal-counter-input'
                type='number'
                value={count}
                onChange={handleInputChange}
                placeholder={count}
              />
              <button
                className='modal__btn-incre'
                onClick={incrementCount}
              >
                +
              </button>
            </div>
          )}
          <div className='modal-container'>
            {selectedItem.quantity > 0 && (
              <button
                className='modal__btn-add'
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}{' '}
            <button
              className='modal__btn-close'
              onClick={closeAndNavigate}
            >
              <img
                className='modal-container-img'
                src={close}
                alt='close logo'
              />
              Close
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemModal;
