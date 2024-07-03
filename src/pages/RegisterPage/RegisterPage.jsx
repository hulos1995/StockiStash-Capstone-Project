import { useState } from "react";
import "./RegisterPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
const RegisterPage = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const base_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${base_URL}/signup`, {
        first_name: formData.firstname,
        last_name: formData.lastname,
        user_name: formData.username,
        password: formData.password,
        user_role: formData.role,
      });
      toast.success("User registered successfully");
    } catch (error) {
      toast.error(error.response?.data || "Error registering user");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`register ${
        isDarkMode ? "register--dark" : "register--light"
      }`}
    >
      <div className="register__form">
        <div className="register__title-container">
          <h2 className="register__title-container-text">Register</h2>
        </div>
        <form>
          <div className="register__field">
            <label className="register__field-label" htmlFor="firstname">
              First Name
            </label>
            <input
              className="register__field-input"
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-label" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="register__field-input"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-label" htmlFor="username">
              Username
            </label>
            <input
              className="register__field-input"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-label" htmlFor="password">
              Password
            </label>
            <input
              className="register__field-input"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="register__field-input"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <label className="register__show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
          </div>
          <div className="register__field">
            <label className="register__field-label" htmlFor="role">
              Role
            </label>
            <select
              className="register__field-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="polisher">Mold Polisher</option>
              <option value="spotter">Spotter</option>
            </select>
          </div>
          <button
            className="register__field-btn"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
