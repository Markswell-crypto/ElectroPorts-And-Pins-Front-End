import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faInstagram, faApple } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css"
import NewsletterForm from './Newsletter';
import logo1 from '../assets/logo11-1.png';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <>
      <footer>
        <div className='newsletter'>
          <div className='newsletter-logo'>
            <div className='logo'>
              <img src={logo1} alt="Logo"  />
              <h3>ElectroPorts&<span>Pins</span></h3>
            </div>
            <ul className='socio-icons'>
              <li><Link to="https://twitter.com/mulindijr"><FontAwesomeIcon icon={faXTwitter} /></Link></li>
              <li><Link to="https://instagram.com/mulindijr"><FontAwesomeIcon icon={faInstagram} /></Link></li>
              <li><Link to="https://facebook.com/mulindijr"><FontAwesomeIcon icon={faFacebook} /></Link></li>           
            </ul>
          </div>
          <NewsletterForm />
          <div className='download'>
            <img src={logo1} alt="Logo" />
            <div className='download-div'>
              <h3>DOWNLOAD ELECTROPORTS&PINS FREE APP</h3>
              <p>Get exclusive offers!</p>
              <div className='download-btns'>
                <div className='playstore-btn'>
                  <FontAwesomeIcon icon={faApple} className='apple-icon'/>
                  <div className='playstore-font'>
                    <p>Download on the</p>
                    <h3>APPSTORE</h3>
                  </div>
                </div>
                <div className='googleplay-btn'>
                  <FontAwesomeIcon icon={faPlay}  className='google-icon'/>
                  <div className='google-font'>
                    <p>Download on the</p>
                    <h3>GOOGLE PLAY</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  className='footer'>
          <div className='our-products'>
            <h3>OUR PRODUCTS</h3>
            <ul>
              <li><Link to="/phones">Phones</Link></li>
              <li><Link to="/laptops">Laptops</Link></li>
              <li><Link to="/audio">Sound devices</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>            
            </ul>
          </div>
          <div className='about-us'>
            <h3>ABOUT ELECTROPORTS&PINS</h3>
            <ul>
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/termsandconditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Notice</Link></li>
              <li><Link to="/cookies-notice">Cookies Notice</Link></li>            
            </ul>
          </div>
          <div className='need-help'>
            <h3>NEED HELP?</h3>
            <ul>
              <li><Link to="/chat-with-us">Chat with us</Link></li>
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/contactus">Contact Us</Link></li>           
            </ul>
          </div>
          <div className='payment-option'>
            <h3>PAYMENT OPTIONS</h3>
            <p>To be Updated soon</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer