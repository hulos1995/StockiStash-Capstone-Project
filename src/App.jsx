import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import AuthPage from "./pages/AuthPage/AuthPage";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  return (
    <>
      <BrowserRouter>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
          <Route
            path="/inventory"
            element={<InventoryPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/inventory/:id"
            element={<InventoryPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/signup"
            element={<AuthPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/login"
            element={
              <LoginPage isDarkMode={isDarkMode} setAuthToken={setAuthToken} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage isDarkMode={isDarkMode} authToken={authToken} />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        style={{ width: "300px" }}
      />
    </>
  );
}

export default App;
