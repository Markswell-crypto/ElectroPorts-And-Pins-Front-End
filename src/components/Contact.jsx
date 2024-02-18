import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { library } from '@fortawesome/fontawesome-svg-core'; // Import fontawesome library

library.add(faMapMarkerAlt, faPhone, faEnvelope, faFacebook, faTwitter, faInstagram);

const Contact = () => {
  return (
    <div className="contact mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <h2>Contact Information</h2>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Street, Nairobi, Kenya</li>
              <li><FontAwesomeIcon icon={faPhone} /> +254 798 840 098</li>
              <li><FontAwesomeIcon icon={faEnvelope} /> info@electroportsandpins.com</li>
            </ul>
            <div className="social-links">
              <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </Col>
          <Col md={6}>
            <h2>Contact Form</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
              </Form.Group>

              <Button variant="primary" type="submit">
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
