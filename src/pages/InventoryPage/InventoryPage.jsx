import { useState, useEffect } from "react";
import "./InventoryPage.scss";
import axios from "axios";
const InventoryPage = ({ isDarkMode }) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const base_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getInventory = async () => {
      try {
        const response = await axios.get(`${base_URL}/inventory`);
        setInventoryData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getInventory();
  }, []);
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
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
        />
        <button className="inventory__button">Search</button>
      </div>
      <div className="inventory__items">
        {inventoryData.map((item) => (
          <div
            key={item.id}
            className="inventory__item"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="inventory__item-image"
            />
            <div className="inventory__item-details">
              <h3 className="inventory__item-name">{item.item_name}</h3>
              <p className="inventory__item-description">{item.description}</p>
              <p className="inventory__item-description">
                Quantity: {item.quantity}
              </p>
              <p className="inventory__item-description">
                Status: {item.status}
              </p>
              <a href={item.link} className="inventory__item-link">
                More Info
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
