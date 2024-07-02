import { useState, useEffect } from "react";
import "./InventoryPage.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ItemModal from "../../components/ItemModal/ItemModal";

const InventoryPage = ({ isDarkMode }) => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);
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

    const getInventoryDetails = async () => {
      try {
        const res = await axios.get(`${base_URL}/inventory/${id}`);
        setSelectedItem(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      getInventoryDetails();
    }
    getInventory();
  }, [base_URL, id]);

  const showModal = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
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
        <ItemModal
          selectedItem={selectedItem}
          show={show}
          handleClose={hideModal}
        />
        {inventoryData.map((item) => (
          <div key={item.id} className="inventory__item-wrapper">
            <Link to={`/inventory/${item.id}`} onClick={() => showModal(item)}>
              <div className="inventory__item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="inventory__item-image"
                />
                <div className="inventory__item-details">
                  <h3 className="inventory__item-name">{item.item_name}</h3>
                  <p className="inventory__item-description">
                    {item.description}
                  </p>
                  <p className="inventory__item-description">
                    Quantity: {item.quantity}
                  </p>
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
                  <a href={item.link} className="inventory__item-link">
                    Click here to buy
                  </a>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
