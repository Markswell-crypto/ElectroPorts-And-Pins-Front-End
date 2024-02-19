import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/laptop-desktop.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fetch POST request
    try {
      const response = await fetch('https://electroports-db.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle response accordingly
      if (response.ok) {
        setRegistered(true);
        // Clear form data after successful registration
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        console.error('Error registering:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <h2>Sign Up</h2>
        {registered && (
          <div className="alert alert-success" role="alert">
            User registered successfully
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password fields */}

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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <small className={`text-muted ${getPasswordStrengthColor(formData.confirmPassword)}`}>
                {getPasswordStrength(formData.confirmPassword)}
              </small>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
