import React from 'react';
import backgroundImage from '../assets/laptop-desktop.jpg';

const About = () => {
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
      <div className="container text-center">
        <h2 className="mb-4">About ElectroPorts & Pins</h2>
        <p>
          Welcome to ElectroPorts & Pins, your go-to destination for all things electronics! 
          We are passionate about providing high-quality electronic components and accessories, 
          catering to electronics enthusiasts, hobbyists, and professionals alike.
        </p>
        <p>
          At ElectroPorts & Pins, we strive to offer a wide range of products, including 
          various brands of laptops, different recognized phone brands, and much more. Our goal 
          is to empower you to bring your electronics projects to life with ease and efficiency.
        </p>
        <p>
          Whether you're a beginner looking to start your journey in electronics or an 
          experienced maker seeking advanced components, ElectroPorts & Pins has you covered. 
          Explore our extensive catalog, discover new tools and technologies, and embark 
          on exciting projects with confidence.
        </p>
        <p>
          Thank you for choosing ElectroPorts & Pins as your trusted partner in electronics. 
          We look forward to serving you and supporting your creative endeavors!
        </p>
      </div>
    </div>
  );
};

export default About;
