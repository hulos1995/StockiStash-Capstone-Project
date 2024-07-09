import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemModal from '../../components/ItemModal/ItemModal';
import EditInventoryModal from '../../components/EditInventoryModal/EditInventoryModal';
import search from '../../assets/images/search-left.jpg';
import edit from '../../assets/images/edit-24px.svg';
import del from '../../assets/images/delete_outline-24px.svg';
import './InventoryPage.scss';
import { decodeToken } from '../../utils/decodeToken';

const InventoryPage = ({ isDarkMode, updateCartItems }) => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [userRole, setUserRole] = useState('guest');
  const base_URL = import.meta.env.VITE_API_URL;

  //source https://stackoverflow.com/questions/65952369/best-way-to-check-if-there-is-already-a-token-in-local-storage-using-use-effect
  //decode token to get user information (user role)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserRole(decoded.role);
      }
    }
    getItemData();
    if (id) {
      getInventoryDetails(id);
    }
  }, [base_URL, id]);

  // get inventory data from backend and verify user information
  const getItemData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${base_URL}/inventory`, { headers });
      setInventoryData(res.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // get inventory details data from backend and verify user information
  const getInventoryDetails = async (inventoryId) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${base_URL}/inventory/${inventoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedItem(res.data);
    } catch (error) {
      console.error('Error fetching inventory details', error);
    }
  };

  const handleShowItemModal = (item) => {
    if (userRole !== 'guest') {
      setSelectedItem(item);
      setShowItemModal(true);
    }
  };

  const handleCloseItemModal = () => {
    setShowItemModal(false);
  };

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  //filter item by name for search bar
  //source https://www.youtube.com/watch?v=xAqCEBFGdYk&t=339s
  const filteredInventoryData = inventoryData.filter((item) => item.item_name.toLowerCase().includes(searchInput.toLowerCase()));

  //Conditioning check for user, logged in roles
  //user can only see certain things, logged in user can see more things and admin can see all inventory
  return (
    <div className={`inventory ${isDarkMode ? 'inventory--dark' : 'inventory--light'}`}>
      <div className='inventory__search-bar'>
        <input
          type='text'
          placeholder='Search'
          className='inventory__input'
          value={searchInput}
          onChange={handleSearchChange}
        />
        <img
          className='inventory__search-img'
          src={search}
          alt={`${search} logo`}
        />
        <button className='inventory__button'>Search</button>
      </div>
      <div className='inventory__items'>
        <ItemModal
          selectedItem={selectedItem}
          show={showItemModal}
          handleClose={handleCloseItemModal}
          updateCartItems={updateCartItems}
        />
        <EditInventoryModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          itemId={selectedItem?.id}
          updateInventory={getItemData}
        />
        {filteredInventoryData.map((item) => (
          <div
            key={item.id}
            className='inventory__item-wrapper'
          >
            <div className='inventory__item'>
              <div
                className={`inventory__item-image-wrapper ${userRole === 'guest' ? 'disabled' : ''}`}
                onClick={userRole !== 'guest' ? () => handleShowItemModal(item) : null}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='inventory__item-image'
                />
              </div>
              <div className='inventory__item-details'>
                <h3 className='inventory__item-name'>{item.item_name}</h3>
                <p className='inventory__item-description'>{item.description}</p>
                {userRole !== 'guest' && <p className='inventory__item-description'>Quantity: {item.quantity}</p>}
                <div className='inventory__item-container'>
                  <p className='inventory__item-description'>
                    Status: <span className={`inventory__item-status ${item.status === 'Out of Stock' ? 'inventory__item-status--outstock' : 'inventory__item-status--instock'}`}>{item.status}</span>
                  </p>
                </div>
                {userRole === 'Admin' && (
                  <div className='inventory__item-links'>
                    <div className='inventory__item-link'>
                      <a
                        href={item.link}
                        target="_blank"
                         rel="noopener noreferrer"
                        className='inventory__item-link-hyper'
                      >
                        Click here to buy
                      </a>
                    </div>
                    <div className='inventory__item-links-logo'>
                      <img
                        src={edit}
                        alt={`${edit} logo`}
                        onClick={() => handleShowEditModal(item)}
                      />
                      <img
                        src={del}
                        alt={`${del} logo`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
