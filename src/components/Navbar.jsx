import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
      
    </nav>
  );
}

export default Navbar;
