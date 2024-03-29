import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

function NavBar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Function to update login status and user role based on localStorage
  const updateLoginStatus = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedRole = localStorage.getItem('userRole');

    setIsLoggedIn(!!storedAccessToken && !!storedRefreshToken && !!storedRole);
    setUserRole(storedRole || '');
  };

  // Initial check for login status and user role
  useEffect(() => {
    updateLoginStatus();
  }, []);

  // Listen for changes to localStorage to update login status and user role
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' || event.key === 'refreshToken' || event.key === 'userRole') {
        updateLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Listen for changes to accessToken, refreshToken, and userRole in localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('userRole');

    setIsLoggedIn(!!accessToken && !!refreshToken && !!role);
  }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'), localStorage.getItem('userRole')]);

  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    navigate('/login');
    updateLoginStatus(); // Update login status after logout
    alert('User Logged out successfully');
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  return (
    <nav>
      <h3><Link to="/">ElectroPorts&<span>Pins</span></Link></h3>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li onMouseEnter={toggleCategories} onMouseLeave={toggleCategories}>
          <Link>Categories</Link>
          {showCategories && (
            <ul className="dropdown">
              {userRole === 'admin' ? (
                <>
                  <li><Link to="/phones">Phones</Link></li>
                  <li><Link to="/laptops">Laptops</Link></li>
                  <li><Link to="/audio">SoundDevices</Link></li>
                  <li><Link to="/accessories">Accessories</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/user/phones">Phones</Link></li>
                  <li><Link to="/user/laptops">Laptops</Link></li>
                  <li><Link to="/user/audio">SoundDevices</Link></li>
                  <li><Link to="/user/accessories">Accessories</Link></li>
                </>
              )}
            </ul>
          )}
        </li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li onMouseEnter={toggleAccount} onMouseLeave={toggleAccount}>
          {isLoggedIn ? (
            <Link><FontAwesomeIcon icon={faUserCircle} /></Link>
          ) : (
            <Link>Account</Link>
          )}
          {showAccount && (
            <ul className="dropdown">
              {isLoggedIn ? (
                <li><Link to="/profile">My Profile</Link></li>
              ) : (
                <>
                  <li><Link to="/login">LogIn</Link></li>
                  <li><Link to="/signup">SignUp</Link></li>
                </>
              )}
            </ul>
          )}
        </li>
        <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
        {isLoggedIn ? (
          <li><Link onClick={handleLogout}>Logout</Link></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;