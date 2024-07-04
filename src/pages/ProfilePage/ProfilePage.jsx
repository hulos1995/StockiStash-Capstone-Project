import { useState, useEffect } from "react";
import axios from "axios";
import InventoryPage from "../InventoryPage/InventoryPage";
const ProfilePage = ({ isDarkMode, userRole }) => {
  const [userData, setUserData] = useState(null);
  const base_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(`${base_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getUserData();
  }, [base_URL]);

  return (
    <div>
      {userData ? (
        <h1>
          Welcome,{" "}
          {userData.first_name ? userData.first_name : userData.user_name}!
        </h1>
      ) : (
        <p>Loading user data...</p>
      )}
      <InventoryPage isDarkMode={isDarkMode} userRole={userRole} />
    </div>
  );
};

export default ProfilePage;
