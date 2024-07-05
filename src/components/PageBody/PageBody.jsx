import "./PageBody.scss";
import clock from "../../assets/images/clockin.png";
import inventory from "../../assets/images/carton.png";
import signup from "../../assets/images/signup.png";
import login from "../../assets/images/login.png";
import Slider from "../Slider/Slider";
import { Link } from "react-router-dom";

const PageBody = ({ isDarkMode }) => {
  return (
    <section className={`home ${isDarkMode ? "home--dark" : "home--light"}`}>
      <div className="home-containers">
        <div className="home-container">
          <div className="home-container-clockin">
            <h4 className="home-container-clockin-title">Clock In</h4>

            <button className="home-container-clockin-btn">
              <img
                className="home-container-clockin-img--clock"
                src={clock}
                alt="Clock in logo"
              />
              Check-in
            </button>
          </div>
          <div className="home-container-inventory">
            <h4 className="home-container-inventory-title">Inventory</h4>
            <Link to={"/inventory"}>
              <button className="home-container-inventory-btn">
                <img
                  className="home-container-inventory-img--inventory"
                  src={inventory}
                  alt="Inventory logo"
                />
                Inventory
              </button>
            </Link>
          </div>
        </div>
        <div className="home-wrapper">
          <div className="home-wrapper-signup">
            <h4 className="home-wrapper-signup-title">Register</h4>
            <Link to={"/signup"}>
              <button className="home-wrapper-signup-btn">
                <img
                  className="home-wrapper-signup-img--signup"
                  src={signup}
                  alt="Signup logo"
                />
                Signup
              </button>
            </Link>
          </div>
          <div className="home-wrapper-login">
            <h4 className="home-wrapper-login-title">Login</h4>
            <Link to={"/login"}>
              <button className="home-wrapper-login-btn">
                <img
                  className="home-wrapper-login-img--login"
                  src={login}
                  alt="Login logo"
                />
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Slider />
    </section>
  );
};

export default PageBody;
