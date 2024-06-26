import { useState } from "react";
import "./LoginPage.scss";

const LoginPage = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = () => {
    console.log("Logging in user:", formData);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`login ${isDarkMode ? "login--dark" : "login--light"}`}>
      <div className="login__form">
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
            <label className="login__show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
          </div>
          <button
            className="login__field-btn"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <h5 className="login__field-register">Don't have an account?</h5>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
