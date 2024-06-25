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

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    console.log("Registering user:", formData);
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
            <label className="register__field-user" htmlFor="firstname">
              First Name
            </label>
            <input
              className="register__field-userName"
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-user" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="register__field-userName"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-user" htmlFor="username">
              Username
            </label>
            <input
              className="register__field-userName"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-password" htmlFor="password">
              Password
            </label>
            <input
              className="register__field-passwordField"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label
              className="register__field-passwordConfirm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="register__field-passwordField"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="register__field">
            <label className="register__field-role" htmlFor="role">
              Role
            </label>
            <select
              className="register__field-userRole"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="manager">Manager</option>
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
          <h5 className="register__field-login">Already have an account?</h5>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
