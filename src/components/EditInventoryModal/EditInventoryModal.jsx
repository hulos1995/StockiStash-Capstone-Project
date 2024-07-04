import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditInventoryModal = ({ show, handleClose, itemId, updateInventory }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    quantity: "",
    status: "In Stock",
    image: "",
  });
  const base_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (itemId) {
      fetchItemData(itemId);
    }
  }, [itemId, base_URL]);

  const fetchItemData = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${base_URL}/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        itemName: response.data.item_name,
        description: response.data.description,
        quantity: response.data.quantity,
        status: response.data.status,
        image: response.data.image,
      });
    } catch (error) {
      console.error("Error fetching item data", error);
      toast.error("Failed to fetch item data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${base_URL}/inventory/${itemId}`,
        {
          item_name: formData.itemName,
          description: formData.description,
          quantity: formData.quantity,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item updated successfully");
      updateInventory();
      handleClose();
    } catch (error) {
      console.error("Error updating item", error);
      toast.error("Failed to update item");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-[#fffff0] p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Edit Item</h1>
        {formData.image && (
          <div className="flex justify-center mb-4">
            <img
              src={formData.image}
              alt="Item"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" htmlFor="itemName">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900"
              required
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium mb-2">Status</span>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={formData.status === "In Stock"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 text-lg">In Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-red-500 focus:ring-red-500"
                />
                <span className="ml-2 text-lg">Out of Stock</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryModal;
