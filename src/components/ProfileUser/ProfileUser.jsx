import { useState } from 'react';
import remove from '../../assets/images/remove.png';

const ProfileUser = ({
  userData,
  handleLogout,
  toggleCart,
  showCart,
  cartItems,
  handleDecrese,
  handleIncrease,
  handleRemove,
  notifications
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
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
                      <div className='flex items-center justify-between'>
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
                        <div className='flex items-center'>
                          <button
                            className='px-2 py-1 bg-gray-300 rounded'
                            onClick={() => handleDecrese(item.inventory_id, item.quantity)}
                          >
                            -
                          </button>
                          <button
                            className='px-2 py-1 bg-gray-300 rounded ml-2'
                            onClick={() => handleIncrease(item.inventory_id)}
                          >
                            +
                          </button>
                          <button
                            className='ml-2'
                            onClick={() => handleRemove(item.inventory_id)}
                          >
                            <img
                              src={remove}
                              alt='remove'
                              className='w-6 h-6'
                            />
                          </button>
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
          {userData.user_role === 'Admin' && (
            <div className='mt-4'>
              <button
                className='bg-blue-500 text-white py-2 px-4 rounded'
                onClick={toggleNotifications}
              >
                {showNotifications ? 'Hide' : 'Show'} Notifications
              </button>
              {showNotifications && (
                <div className='bg-white dark:bg-gray-300 shadow-lg rounded-lg p-4 sm:p-6 mt-4'>
                  <h2 className='text-xl sm:text-2xl font-bold mb-4'>Notifications</h2>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => (
                        <li key={notification.id} className='mb-2'>
                          <div className='flex items-center'>
                            <img 
                              src={notification.image} 
                              alt={notification.item_name} 
                              className='w-10 h-10 mr-2' 
                            />
                            <div className='flex flex-col'>
                              <p>{notification.item_name}</p>
                              <h3 className='text-gray-500 text-sm'>{new Date(notification.created_at).toLocaleString()}</h3>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className='text-center'>Loading user data...</p>
      )}
    </>
  );
};

export default ProfileUser;
