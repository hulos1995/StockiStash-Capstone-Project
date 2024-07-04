import { useState, useEffect } from "react";
import "./InventoryPage.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ItemModal from "../../components/ItemModal/ItemModal";
import EditInventoryModal from "../../components/EditInventoryModal/EditInventoryModal";
import search from "../../assets/images/search-24px.svg";
import edit from "../../assets/images/edit-24px.svg";
import del from "../../assets/images/delete_outline-24px.svg";

const InventoryPage = ({ isDarkMode }) => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const base_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    getItemData();
    if (id) {
      getInventoryDetails(id);
    }
  }, [base_URL, id]);
  const getItemData = async () => {
    try {
      const res = await axios.get(`${base_URL}/inventory`);
      setInventoryData(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const getInventoryDetails = async (inventoryId) => {
    try {
      const res = await axios.get(`${base_URL}/inventory/${inventoryId}`);
      setSelectedItem(res.data);
    } catch (error) {
      console.error("Error fetching inventory details", error);
    }
  };
  const handleShowItemModal = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
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

  const filteredInventoryData = inventoryData.filter((item) =>
    item.item_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div
      className={`inventory ${
        isDarkMode ? "inventory--dark" : "inventory--light"
      }`}
    >
      <div className="inventory__search-bar">
        <input
          type="text"
          placeholder="Search inventory..."
          className="inventory__input"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <img
          className="inventory__search-img"
          src={search}
          alt={`${search} logo`}
        />
        <button className="inventory__button">Search</button>
      </div>
      <div className="inventory__items">
        <ItemModal
          selectedItem={selectedItem}
          show={showItemModal}
          handleClose={handleCloseItemModal}
        />
        <EditInventoryModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          itemId={selectedItem?.id}
          updateInventory={getItemData}
        />
        {filteredInventoryData.map((item) => (
          <div key={item.id} className="inventory__item-wrapper">
            <div className="inventory__item">
              <Link
                to={`/inventory/${item.id}`}
                onClick={() => handleShowItemModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="inventory__item-image"
                />
              </Link>
              <div className="inventory__item-details">
                <h3 className="inventory__item-name">{item.item_name}</h3>
                <p className="inventory__item-description">
                  {item.description}
                </p>
                <p className="inventory__item-description">
                  Quantity: {item.quantity}
                </p>
                <div className="inventory__item-container">
                  <p className="inventory__item-description">
                    Status:{" "}
                    <span
                      className={`inventory__item-status ${
                        item.status === "Out of Stock"
                          ? "inventory__item-status--outstock"
                          : "inventory__item-status--instock"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
                <div className="inventory__item-links">
                  <div className="inventory__item-link">
                    <a href={item.link} className="inventory__item-link-hyper">
                      Click here to buy
                    </a>
                  </div>
                  <div className="inventory__item-links-logo">
                    <img
                      src={edit}
                      alt={`${edit} logo`}
                      onClick={() => handleShowEditModal(item)}
                    />
                    <img src={del} alt={`${del} logo`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
