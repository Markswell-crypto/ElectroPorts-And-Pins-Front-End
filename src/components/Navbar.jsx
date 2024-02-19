import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css"

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  return (
    <nav>
      <h3><Link to="/home">ElectroPorts&<span>Pins</span></Link></h3>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li onMouseEnter={toggleCategories} onMouseLeave={toggleCategories}>
          <Link to="">Categories</Link>
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
          <Link to="">Account</Link>
          {showAccount && (
            <ul className="dropdown">
              <li><Link to="/signup">SignUp</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
