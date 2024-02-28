import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to the login page
    navigate('/login');

    alert('You have successfully logged out!');
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

export default Logout;
