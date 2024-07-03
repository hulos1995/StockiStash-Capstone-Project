import { useState, useEffect } from "react";
import axios from "axios";
import InventoryPage from "../InventoryPage/InventoryPage";

const ProfilePage = ({ isDarkMode, userRole }) => {
  const [userData, setUserData] = useState(null);
  const base_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${base_URL}/profile`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <h1> {userData && <p>Welcome, {userData.user_name}!</p>}</h1>
      <InventoryPage isDarkMode={isDarkMode} userRole={userRole} />
    </div>
  );
};

export default ProfilePage;
