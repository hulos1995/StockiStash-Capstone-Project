import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage/HomePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Header from './components/Header/Header';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { decodeToken } from './utils/decodeToken';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (authToken) {
      const decoded = decodeToken(authToken);
      if (!decoded) {
        setIsLoggedIn(false);
        setAuthToken(null);
      }
    }
  }, [authToken]);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path='/'
            element={<HomePage isDarkMode={isDarkMode} />}
          />
          <Route
            path='/inventory'
            element={
              <InventoryPage
                isDarkMode={isDarkMode}
                authToken={authToken}
              />
            }
          />
          <Route
            path='/inventory/:id'
            element={
              <InventoryPage
                isDarkMode={isDarkMode}
                authToken={authToken}
              />
            }
          />
          <Route
            path='/signup'
            element={<RegisterPage isDarkMode={isDarkMode} />}
          />
          <Route
            path='/login'
            element={
              <LoginPage
                isDarkMode={isDarkMode}
                setAuthToken={handleLogin}
              />
            }
          />
          <Route
            path='/profile'
            element={
              isLoggedIn ? (
                <ProfilePage
                  isDarkMode={isDarkMode}
                  authToken={authToken}
                  handleLogout={handleLogout}
                />
              ) : (
                <Navigate
                  to='/login'
                  replace
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='light'
        style={{ width: '300px' }}
      />
    </>
  );
}

export default App;
