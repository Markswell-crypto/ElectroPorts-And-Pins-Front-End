import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../contact.css'; 

library.add(faMapMarkerAlt, faPhone, faEnvelope, faFacebook, faTwitter, faInstagram);

const Contact = () => {
    useEffect(() => {
        emailjs.init('HxDcaC4Cx86JLPUPx'); 
      }, []);
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_i12pgxp', 'template_ls365cr', e.target, 'YOUR_USER_ID')
          .then((result) => {
            console.log('Email sent successfully:', result.text);
            alert('Email sent successfully!');
          }, (error) => {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
          });
            e.target.reset();
      };
    

  return (
    <div className="contact mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <h2 className="text-center text-navy">Contact Information</h2>
            <ul className="list-unstyled text-center">
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Street, Nairobi, Kenya</li>
              <li><FontAwesomeIcon icon={faPhone} /> +254 798 840 098</li>
              <li><FontAwesomeIcon icon={faEnvelope} /> info@electroportsandpins.com</li>
            </ul>
            <div className="social-links text-center mt-4">
              <a href="https://www.facebook.com" className="social-link"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
              <a href="https://www.twitter.com" className="social-link"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
              <a href="https://www.instagram.com" className="social-link"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
            </div>
            <Row className="justify-content-center mt-4">
              <h2 className="text-center text-navy">Location</h2>
              {/* Embed Google Map using Google Maps Embed API */}
              <iframe 
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.79061004006!2d36.7846067!3d-1.3004862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x940b62a3c8efde4c!2sMoringa%20School!5e0!3m2!1sen!2ske!4v1708249831100!5m2!1sen!2ske" 
                width="300" 
                height="300" 
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy">
              </iframe>
            </Row>
          </Col>
          <Col md={6}>
            <h2 className="text-center text-navy">Contact Form</h2>
            <Form className="contact-form mt-3" style={{ width: '80%', margin: '0 auto' }} onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="navy-label mt-2">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="navy-label mt-2">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label className="navy-label mt-2">Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
              </Form.Group>

              <Button variant="primary" type="submit" className="custom-button mx-auto d-block mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
