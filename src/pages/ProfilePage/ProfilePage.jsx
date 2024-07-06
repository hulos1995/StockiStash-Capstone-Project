import { useState, useEffect } from "react";
import axios from "axios";
import InventoryPage from "../InventoryPage/InventoryPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProfilePage = ({ isDarkMode }) => {
  const [userData, setUserData] = useState(null);
  const base_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`${base_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data");
      }
    };
    getUserData();
  }, [base_URL]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } p-4`}
    >
      <div className="max-w-full sm:max-w-4xl mx-auto">
        {userData ? (
          <div className="bg-white dark:bg-gray-300 shadow-lg rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-gray-400 flex items-center justify-center text-xl sm:text-2xl text-white font-bold mb-4 sm:mb-0">
                {userData.first_name
                  ? userData.first_name[0]
                  : userData.user_name[0]}
              </div>
              <div className="text-center sm:text-left sm:ml-4">
                <h1 className="text-xl sm:text-3xl font-bold">
                  Welcome, {userData.first_name || userData.user_name}!
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Role: {userData.user_role}
                </p>
              </div>
              <button
                className="mt-4 sm:mt-0 sm:ml-auto bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}
        <div className="mt-7 rounded-2xl">
          {userData && (
            <InventoryPage
              isDarkMode={isDarkMode}
              userRole={userData.user_role}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
