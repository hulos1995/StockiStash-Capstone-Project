import "./PageBody.scss";
import clock from "../../assets/images/clockin.png";
import inventory from "../../assets/images/carton.png";
import signup from "../../assets/images/signup.png";
import login from "../../assets/images/login.png";
import Slider from "../Slider/Slider";
const PageBody = () => {
  return (
    <section className="home">
      <div className="home-containers">
        <div className="home-container">
          <div className="home-container-clockin">
            <h4 className="home-container-clockin-title">Clock In</h4>

            <button className="home-container-clockin-btn">
              <img
                className="home-container-clockin-img"
                src={clock}
                alt={`${clock} logo`}
              />
              Check-in
            </button>
          </div>
          <div className="home-container-inventory">
            <h4 className="home-container-inventory-title">Inventory</h4>
            <button className="home-container-inventory-btn">
              <img
                className="home-container-inventory-img"
                src={inventory}
                alt={`${inventory} logo`}
              />
              Inventory
            </button>
          </div>
        </div>
        <div className="home-wrapper">
          <div className="home-wrapper-signup">
            <h4 className="home-wrapper-signup-title">Register</h4>
            <button className="home-wrapper-signup-btn">
              <img
                className="home-wrapper-signup-img"
                src={signup}
                alt={`${signup} logo}`}
              />
              Signup
            </button>
          </div>
          <div className="home-wrapper-login">
            <h4 className="home-wrapper-login-title">Login</h4>
            <button className="home-wrapper-login-btn">
              <img
                className="home-wrapper-login-img"
                src={login}
                alt={`${login} logo}`}
              />
              Login
            </button>
          </div>
        </div>
      </div>
      <Slider />
    </section>
  );
};

export default PageBody;
