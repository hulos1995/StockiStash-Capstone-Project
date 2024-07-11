import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import InventoryPage from '../InventoryPage/InventoryPage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileUser from '../../components/ProfileUser/ProfileUser';

const ProfilePage = ({ isDarkMode, authToken }) => {
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
        const response = await axiosInstance.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        getCartItems(token);
        fetchNotifications(token);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch cart items 
  const getCartItems = async (token) => {
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      const res = await axiosInstance.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Fetch notifications 
  const fetchNotifications = async (token) => {
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      const res = await axiosInstance.get('/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to fetch notifications');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Toggle the visibility of the cart
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Update cart items after an action is performed
  const updateCartItems = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      const res = await axiosInstance.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (error) {
      console.error('Error updating cart items:', error);
    }
  };

  // Increase the quantity of an item in the cart
  const handleIncrease = async (inventory_id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      await axiosInstance.put('/cart/increment', { inventory_id }, { headers: { Authorization: `Bearer ${token}` } });
      updateCartItems();
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };

  // Decrease the quantity of an item in the cart
  const handleDecrese = async (inventory_id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      await axiosInstance.put('/cart/decrement', { inventory_id }, { headers: { Authorization: `Bearer ${token}` } });
      updateCartItems();
    } catch (error) {
      console.error('Error decrementing item quantity:', error);
    }
  };

  // Remove an item from the cart
  const handleRemove = async (inventory_id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      await axiosInstance.delete(`/cart/${inventory_id}`, {
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
        <ProfileUser
          userData={userData}
          cartItems={cartItems}
          showCart={showCart}
          handleLogout={handleLogout}
          toggleCart={toggleCart}
          handleIncrease={handleIncrease}
          handleDecrese={handleDecrese}
          handleRemove={handleRemove}
          notifications={notifications}
        />
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
