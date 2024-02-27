import './About.css';
import image1 from '../assets/laptops.jpg';
import image2 from '../assets/Electronics.jpg';
import image3 from '../assets/phones.jpg';
import image4 from '../assets/Sony-soundsystem.jpg';
import NavBar from './NavBar';
import Search from './Search';

const About = () => {
  return (
    <div>
      <NavBar />
      <Search />
    <div className='container mt-5'>
    <div className="about-container mt-2">
      <div className="container">
        <div className="text">
          <h1>About ElectroPorts & Pins</h1>
          <p>
            Welcome to ElectroPorts & Pins, your go-to destination for all things electronics!
            We are passionate about providing high-quality electronic components and accessories,
            catering to electronics enthusiasts, hobbyists, and professionals alike.
          </p>
          <img src={image1} alt="Electronics" className="image" />
          <p>
            At ElectroPorts & Pins, we strive to offer a wide range of products, including
            various brands of laptops, different recognized phone brands, and much more. Our goal
            is to empower you to bring your electronics projects to life with ease and efficiency.
          </p>
        </div>
        <img src={image2} alt="Electronics" className="image" />
      </div>
      <div className="content">
        <div className="text">
          <p>
            Whether youre a beginner looking to start your journey in electronics or an
            experienced maker seeking advanced components, ElectroPorts & Pins has you covered.
            Explore our extensive catalog, discover new tools and technologies, and embark
            on exciting projects with confidence.
          </p>
          <img src={image3} alt="Electronics" className="image" />
          <p>
            Thank you for choosing ElectroPorts & Pins as your trusted partner in electronics.
            We look forward to serving you and supporting your creative endeavors!
          </p>
        </div>
        <img src={image4} alt="Electronics" className="image" />
      </div>
    </div>
    </div>
    </div>
  );
};

export default About;
