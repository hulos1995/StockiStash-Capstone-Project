// PageBody.jsx
import { useState } from "react";
import "./PageBody.scss";
import linkedin from "../../assets/images/linkedin.png";
import github from "../../assets/images/github.png";
import facebook from "../../assets/images/facebook.png";
import { Link } from "react-router-dom";
import GallarySlider from "../GallarySlider/GallarySlider";
const PageBody = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="page-body page-body--tabbed-layout">
      <div className="page-body__hero">
        <div className="page-body__hero-content">
          <h1 className="page-body__hero-title">
            Inventory Management Made Easy
          </h1>
          <p className="page-body__hero-description">
            Efficient solutions for your business
          </p>
          <Link to="/signup">
            <button className="page-body__cta-button">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="page-body__tabs">
        <button
          className={`page-body__tab ${
            activeTab === 1 ? "page-body__tab-active" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          Services
        </button>
        <button
          className={`page-body__tab ${
            activeTab === 2 ? "page-body__tab-active" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          About
        </button>
        <button
          className={`page-body__tab ${
            activeTab === 3 ? "page-body__tab-active" : ""
          }`}
          onClick={() => setActiveTab(3)}
        >
          Contact
        </button>
      </div>
      <div className="page-body__tab-content">
        {activeTab === 1 && (
          <div className="page-body__tab-pane">
            <h2 className="page-body__section-title">Our Services</h2>
            <p className="page-body__section-description">
              Explore the range of services I offer to streamline your inventory
              management.
            </p>
            <ul className="page-body__services-list">
              <li className="page-body__services-item">
                Real-time Inventory Tracking
              </li>
              <li className="page-body__services-item">
                Simple/Effortless Inventory Browsing
              </li>
              <li className="page-body__services-item">
                Personalized Item Visibility
              </li>
              <li className="page-body__services-item">
                Advanced Access Control
              </li>
            </ul>
          </div>
        )}
        {activeTab === 2 && (
          <div className="page-body__tab-about">
            <div className="page-body__section-about">
              <h2 className="page-body__section-title">About</h2>
              <p className="page-body__section-description">
                This website provides effective inventory solutions designed to
                simplify operations for businesses of any size. The platform
                ensures efficient tracking, affordable storage management, and
                easy item identification, helping maintain a steady workflow. It
                also supports employees with clear, detailed information and
                visuals. Besides are jobs that have been polished from strach.
              </p>
            </div>
            <GallarySlider />
          </div>
        )}
        {activeTab === 3 && (
          <div className="page-body__tab-pane">
            <h2 className="page-body__section-title">Contact Information</h2>
            <div className="page-body__section-description">
              <div className="page-body__section-container">
                <a href="https://www.linkedin.com/in/hoang-nguyen-bao/">
                  <img
                    className="page-body__section-container-image"
                    src={linkedin}
                    alt={`${linkedin} logo`}
                  />
                  <p>LinkedIn</p>
                </a>
              </div>
              <div className="page-body__section-container">
                <a href="https://github.com/hulos1995">
                  <img
                    className="page-body__section-container-image"
                    src={github}
                    alt={`${github} logo`}
                  />
                  <p>GitHub</p>
                </a>
              </div>
              <div className="page-body__section-container">
                <a href="https://www.facebook.com/profile.php?id=100009348904627">
                  <img
                    className="page-body__section-container-image"
                    src={facebook}
                    alt={`${facebook} logo`}
                  />
                  <p>Facebook</p>
                </a>
              </div>
            </div>
            <p className="page-body__contact-info">
              Email: bao960045@yahoo.com
            </p>
            <p className="page-body__contact-info">Phone: +1 226-260-8402</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBody;
