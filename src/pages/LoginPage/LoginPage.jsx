import { useState } from "react";
import "./LoginPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/login-logo.jpg";
const LoginPage = ({ isDarkMode, setAuthToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const base_URL = import.meta.env.VITE_API_URL;
  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle login process
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${base_URL}/login`, {
        user_name: formData.username,
        password: formData.password,
      });
      if (response.status === 200) {
        toast.success("User logged in successfully");
        const { token } = response.data;
        setAuthToken(token);
        localStorage.setItem("authToken", token);
        navigate("/profile"); // Navigate to the profile page
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error(error.response?.data || "Error logging in user");
    }
  };
  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`login ${isDarkMode ? "login--dark" : "login--light"}`}>
      <div className="login__form">
        <img className="login__logo" src={logo} alt="Login Logo" />
        <div className="login__title-container">
          <h2 className="login__title-container-text">Login</h2>
        </div>
        <form>
          <div className="login__field">
            <label className="login__field-label" htmlFor="username">
              Username
            </label>
            <input
              className="login__field-input"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="login__field">
            <label className="login__field-label" htmlFor="password">
              Password
            </label>
            <input
              className="login__field-input"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <label className="login__show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            Show Password
          </label>
          <button
            className="login__field-btn"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <h5 className="login__field-register">Don&apos;t have an account?</h5>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
