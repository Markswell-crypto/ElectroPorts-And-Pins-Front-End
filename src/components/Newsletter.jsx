import React, { useState } from 'react';
import './Newsletter.css'

const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Add  logic to submit the email to the backend or handle it as needed here
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <>
      <div className='newsletter-align'> 
        <h3>NEW TO ELECTROPORTS&PINS?</h3>
        <p>Subscribe to our Newsletter to get updates on our latest offers!</p>
        <form onSubmit={handleSubmit}>            
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div> 
    </>
  );
};

export default NewsletterForm;
