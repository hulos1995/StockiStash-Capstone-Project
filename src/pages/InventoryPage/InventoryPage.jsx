import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './InventoryPage.scss';
import { decodeToken } from '../../utils/decodeToken';
import { toast } from "react-toastify";
import InventoryItems from '../../components/InventoryItems/InventoryItems';

const InventoryPage = ({ isDarkMode, updateCartItems }) => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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

  const handleShowDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteItem = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`${base_URL}/inventory/${selectedItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowDeleteModal(false);
      getItemData();
      toast.success("Delete successful!")
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleAddInventoryItem = async (formData) => {
    try {
      const token = localStorage.getItem('authToken'); await axios.post(
        `${base_URL}/inventory`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      toast.success("Inventory item added successfully");
      getItemData(); 
      handleCloseAddModal(); 
    } catch (error) {
      console.error("Error adding inventory item:", error);
      toast.error("Failed to add inventory item");
    }
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
    <>
      <InventoryItems 
        isDarkMode={isDarkMode}
        updateCartItems={updateCartItems}
        getItemData={getItemData}
        selectedItem={selectedItem}
        searchInput={searchInput}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
        handleCloseItemModal={handleCloseItemModal}
        handleCloseEditModal={handleCloseEditModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteItem={handleDeleteItem}
        handleSearchChange={handleSearchChange}
        userRole={userRole}
        showItemModal={showItemModal}
        handleShowItemModal={handleShowItemModal}
        handleShowEditModal={handleShowEditModal}
        handleShowDeleteModal={handleShowDeleteModal}
        filteredInventoryData={filteredInventoryData}
        handleShowAddModal={handleShowAddModal} 
        handleAddInventoryItem={handleAddInventoryItem} 
        showAddModal={showAddModal} 
        handleCloseAddModal={handleCloseAddModal} 
      />
    </>
  );
};

export default InventoryPage;
