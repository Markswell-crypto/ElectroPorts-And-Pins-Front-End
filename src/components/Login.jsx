import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/skyblue-background.jpg';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://electroports-db.onrender.com/login', formData);
  
      if (response.status === 200) {
        //redirect to HomePage after successful login
        navigate('/HomePage');
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('An error occurred while logging in. Please try again later.');
  
      console.log('Full error:', error);
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password) => {
    if (password.length <= 4) return 'Weak';
    if (password.length <= 8) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = (password) => {
    if (password.length <= 4) return 'bg-danger';
    if (password.length <= 8) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <h2>Login</h2>
        {loginError && <p className="text-danger">{loginError}</p>}
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-3">
            <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <small className={`text-muted ${getPasswordStrengthColor(formData.password)}`}>
                {getPasswordStrength(formData.password)}
              </small>
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p className="mt-3">Don't have an account? <Link to="/signup">Signup</Link>.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
