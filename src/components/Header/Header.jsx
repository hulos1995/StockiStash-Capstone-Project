import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/images/logos.png';
import logoDark from '../../assets/images/logos-dark.png';
import profile from '../../assets/images/profile.png';

const Header = ({ isDarkMode, toggleDarkMode, isLoggedIn }) => {
  const [content, setContent] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const toggleContentVisibility = () => {
    setContent((prevState) => !prevState);
  };
  const closedOnClick = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setContent(false);
    }
  };
  useEffect(() => {
    if (content) {
      document.addEventListener('mousedown', closedOnClick);
    } else {
      document.removeEventListener('mousedown', closedOnClick);
    }
    return () => {
      document.removeEventListener('mousedown', closedOnClick);
    };
  }, [content]);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);
  const handleProfileClick = () => {
    if (isLoggedIn) {
      setActiveLink('/profile');
      navigate('/profile');
    } else {
      setActiveLink('/login');
      navigate('/login');
    }
  };
  return (
    <header
      ref={headerRef}
      className={`header ${isDarkMode ? 'header--dark' : 'header--light'}`}
    >
      <div className='header__container'>
        <div className='header__logo'>
          <Link to='/'>
            <img
              className='header__logo-img'
              src={isDarkMode ? logoDark : logo}
              alt={`${logo} logo`}
            />
          </Link>
        </div>
        <button
          className='header__sidebar-toggle'
          onClick={toggleContentVisibility}
        >
          ☰
        </button>
      </div>
      <div className={`header__content ${content ? 'header__content--visible' : ''}`}>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li
              className={`header__nav-item ${activeLink === '/' ? 'header__nav-item--active' : ''}`}
              onClick={() => setActiveLink('/')}
            >
              <Link
                to='/'
                className='header__nav-link'
              >
                Home
              </Link>
            </li>
            <li
              className={`header__nav-item ${activeLink === '/inventory' ? 'header__nav-item--active' : ''}`}
              onClick={() => setActiveLink('/inventory')}
            >
              <Link
                to='/inventory'
                className='header__nav-link'
              >
                Inventory
              </Link>
            </li>
            <li
              className={`header__nav-item ${activeLink === '/signup' ? 'header__nav-item--active' : ''}`}
              onClick={() => setActiveLink('/signup')}
            >
              <Link
                to='/signup'
                className='header__nav-link'
              >
                Register
              </Link>
            </li>
            <li
              className={`header__nav-item ${activeLink === '/login' ? 'header__nav-item--active' : ''}`}
              onClick={() => setActiveLink('/login')}
            >
              <Link
                to='/login'
                className='header__nav-link'
              >
                Login
              </Link>
            </li>
          </ul>
          <div className='header__profile'>
            <img
              className='header__profile-img'
              src={profile}
              alt={`${profile} logo}`}
              onClick={handleProfileClick}
            />
            <div className='header__dark-mode-toggle'>
              <input
                className='header__dark-mode-toggle-input'
                type='checkbox'
                id='dark-mode-toggle'
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label
                className='header__dark-mode-toggle-input'
                htmlFor='dark-mode-toggle'
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </label>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
