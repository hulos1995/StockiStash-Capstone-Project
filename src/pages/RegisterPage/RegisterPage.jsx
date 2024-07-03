import { useState } from "react";
import "./RegisterPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../../assets/images/register-logo.jpg";
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
      await axios.post(`${base_URL}/signup`, {
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
    <section
      className={`register ${
        isDarkMode ? "register--dark" : "register--light"
      }`}
    >
      <div className="register__form">
        <img className="register__logo" src={logo} alt={`${logo} logo`} />
        <div className="register__title">
          <h1 className="register__title-text">Register</h1>
        </div>
        <form className="register__form-content">
          <div className="register__input-boxes">
            <div className="register__input-box">
              <i className="register__input-name">First Name</i>
              <input
                className="register__input-type"
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                required
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-box">
              <i className="register__input-name">Last Name</i>
              <input
                className="register__input-type"
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                required
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-box">
              <i className="register__input-name">User Name</i>
              <input
                className="register__input-type"
                type="text"
                name="username"
                placeholder="Enter your email"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-box">
              <i className="register__input-name">Password</i>
              <input
                className="register__input-type"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-box">
              <i className="register__input-name">Confirm Password</i>
              <input
                className="register__input-type"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <label className="register__input-password">
              Show Password
              <input
                className="register__input-check"
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
            </label>
            <div className="register__input-container">
              <div className="register__input-box">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="register__input-type-select"
                >
                  <option value="admin">Admin</option>
                  <option value="polisher">Mold Polisher</option>
                  <option value="spotter">Spotter</option>
                </select>
              </div>
              <div className="register__btn">
                <input
                  className="register__btn-input"
                  type="button"
                  value="Register"
                  onClick={handleRegister}
                />
              </div>
              <div className="register__text">
                Already have an account?{" "}
                <Link to={`/login`}>
                  <span className="register__text-link">Login now</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
