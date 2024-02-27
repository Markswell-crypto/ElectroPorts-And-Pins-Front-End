import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

function Menu() {
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
      <h3><Link to="/">ElectroPorts&<span>Pins</span></Link></h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li onMouseEnter={toggleCategories} onMouseLeave={toggleCategories}>

          <Link to="/signup">Categories</Link>

          {showCategories && (
            <ul className="dropdown">
              <li><Link to="/signup">Phones</Link></li>
              <li><Link to="/signup">Laptops</Link></li>
              <li><Link to="/signup">SoundDevices</Link></li>
              <li><Link to="/signup">Accessories</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
        <li onMouseEnter={toggleAccount} onMouseLeave={toggleAccount}>

          <Link>Account</Link>

          {showAccount && (
            <ul className="dropdown">
                  <li><Link to="/login">LogIn</Link></li>
                  <li><Link to="/signup">SignUp</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
        
      </ul>
    </nav>
  );
}

export default Menu;
