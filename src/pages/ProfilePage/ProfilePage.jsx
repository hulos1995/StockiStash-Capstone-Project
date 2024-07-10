import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryPage from '../InventoryPage/InventoryPage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileUser from '../../components/ProfileUser/ProfileUser';

const ProfilePage = ({ isDarkMode, authToken }) => {
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const base_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`${base_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        getCartItems();
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    const getCartItems = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await axios.get(`${base_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchUserData();
  }, [base_URL, authToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const updateCartItems = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(`${base_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (error) {
      console.error('Error updating cart items:', error);
    }
  };

  const handleIncrease = async (inventory_id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`${base_URL}/cart/increment`, { inventory_id }, { headers: { Authorization: `Bearer ${token}` } });
      updateCartItems();
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };

  const handleDecrese = async (inventory_id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`${base_URL}/cart/decrement`, { inventory_id }, { headers: { Authorization: `Bearer ${token}` } });
      updateCartItems();
    } catch (error) {
      console.error('Error decrementing item quantity:', error);
    }
  };

  const handleRemove = async (inventory_id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`${base_URL}/cart/${inventory_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4`}>
      <div className='max-w-full sm:max-w-4xl mx-auto'>
        <ProfileUser userData={userData}
          cartItems={cartItems}
          showCart={showCart}
          handleLogout={handleLogout}
          toggleCart={toggleCart}
          handleIncrease={handleIncrease}
          handleDecrese={handleDecrese}
          handleRemove={handleRemove}/>
        <div className='mt-7 rounded-2xl'>
          {userData && (
            <InventoryPage
              isDarkMode={isDarkMode}
              userRole={userData.user_role}
              authToken={authToken}
              updateCartItems={updateCartItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
