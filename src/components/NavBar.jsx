import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

function NavBar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')]);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login'); 
    setIsLoggedIn(false); 
    alert('User Logged out successfully');
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
              <li><Link to="/phones">Phones</Link></li>
              <li><Link to="/laptops">Laptops</Link></li>
              <li><Link to="/audio">SoundDevices</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
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