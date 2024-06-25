import { Link } from "react-router-dom";
import "./Header.scss";
const Header = ({ isDarkMode }) => {
  return (
    <header
      className={`header ${isDarkMode ? "header--dark" : "header--light"}`}
    >
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/inventory" className="header__nav-link">
              Inventory
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/signup" className="header__nav-link">
              Register
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/login" className="header__nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
