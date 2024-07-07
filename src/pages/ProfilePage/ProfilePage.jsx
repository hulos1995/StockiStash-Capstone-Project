import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryPage from '../InventoryPage/InventoryPage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfilePage = ({ isDarkMode, authToken }) => {
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const base_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
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
        getCartItems(response.data.id);
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Failed to fetch user data');
      }
    };

    const getCartItems = async (userId) => {
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

    getUserData();
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4`}>
      <div className='max-w-full sm:max-w-4xl mx-auto'>
        {userData ? (
          <div className='bg-white dark:bg-gray-300 shadow-lg rounded-lg p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row items-center'>
              <div className='w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-gray-400 flex items-center justify-center text-xl sm:text-2xl text-white font-bold mb-4 sm:mb-0'>
                {userData.first_name ? userData.first_name[0] : userData.user_name[0]}
              </div>
              <div className='text-center sm:text-left sm:ml-4'>
                <h1 className='text-xl sm:text-3xl font-bold'>Welcome, {userData.first_name || userData.user_name}!</h1>
                <p className='mt-2 text-gray-600 dark:text-gray-400'>Role: {userData.user_role}</p>
              </div>
              <button
                className='mt-4 sm:mt-0 sm:ml-auto bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md'
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className='mt-4 sm:mt-0 sm:ml-2 bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md'
                onClick={toggleCart}
              >
                Cart
              </button>
            </div>
            {showCart && (
              <div className='bg-white dark:bg-gray-300 shadow-lg rounded-lg p-4 sm:p-6 mt-4'>
                <h2 className='text-xl sm:text-2xl font-bold mb-4'>Your Cart</h2>
                {cartItems.length > 0 ? (
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className='mb-2'
                      >
                        <div className='flex items-center'>
                          <img
                            src={item.image}
                            alt={item.item_name}
                            className='w-10 h-10 mr-2'
                          />
                          <div>
                            <p className='font-bold'>{item.item_name}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your cart is empty</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className='text-center'>Loading user data...</p>
        )}
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
