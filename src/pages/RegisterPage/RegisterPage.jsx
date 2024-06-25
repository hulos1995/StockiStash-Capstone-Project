import { useState } from "react";
import DarkMode from "../../components/DarkMode/DarkMode";
import "./RegisterPage.scss";
const RegisterPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "manager",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegister = () => {
    console.log("Registering user:", formData);
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
      <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
              <option value="Select">Please Select</option>
              <option value="Manager">Manager</option>
              <option value="Polisher">Mold Polisher</option>
              <option value="Spotter">Spotter</option>
            </select>
          </div>
          <button
            className="register__field-btn"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          <h5 className="register__field-login">
            Already have an account?{" "}
            <span className="register__field-login-text">Login</span>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
