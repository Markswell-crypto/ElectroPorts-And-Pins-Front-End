import { useEffect, useState } from 'react';
import { Col, Row, Button, Modal, Card, Form } from 'react-bootstrap';

import './SoundDevices.css'; 
import Review from './Review';
import Stars from './Stars';

function Phones({ addToCart }) {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatingPhone, setUpdatingPhone] = useState(null); 

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = () => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => setPhones(data.phones))
      .catch(error => console.error('Error fetching phones:', error));
  };

  const handleShowDetails = (phone) => {
    setSelectedPhone(phone);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleSetStar = (rating) => {
    setSelectedPhone(prevPhone => ({
      ...prevPhone,
      rating: rating
    }));
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleOrder = (phone) => {
    console.log(`Ordering ${phone.name}`);
    
  };

  const handleShowUpdateModal = (phone) => {
    setSelectedPhone(phone);
    setUpdatingPhone(phone); 
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatingPhone(null); 
  };

  const handleUpdatePhone = () => {
    
    console.log('Updated phone:', updatingPhone);
    setShowUpdateModal(false);
    setUpdatingPhone(null); 
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Phones</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {phones.map(phone => (
          <Col key={phone.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={phone.image_url} alt={phone.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{phone.name}</Card.Title>
                <Card.Text>Price: {phone.price} Kshs</Card.Text>
                <Stars setStar={handleSetStar} deviceId={phone.id} />
                <Button onClick={() => addToCart(phone)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(phone)} className="ms-2">Details</Button>
                <Button onClick={handleOrder} className="ms-2">Order</Button>
                <Button className='update-button' onClick={() => handleShowUpdateModal(phone)}>Update</Button> 
                <br />
                <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhone && (
            <div>
              <Card.Img variant="top" src={selectedPhone.image_url} alt={selectedPhone.name} className="details-image" />
              <p><strong>Name:</strong> {selectedPhone.name}</p>
              <p><strong>Price:</strong> {selectedPhone.price} Kshs</p>
              <p><strong>Description:</strong> {selectedPhone.description}</p>
            </div>
          )}
          <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Review />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {updatingPhone && (
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="phoneName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter phone name" name="name" value={updatingPhone.name} onChange={(e) => setUpdatingPhone({ ...updatingPhone, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phonePrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter phone price" name="price" value={updatingPhone.price} onChange={(e) => setUpdatingPhone({ ...updatingPhone, price: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter phone description" name="description" value={updatingPhone.description} onChange={(e) => setUpdatingPhone({ ...updatingPhone, description: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneImageUrl">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" placeholder="Enter image URL" name="image_url" value={updatingPhone.image_url} onChange={(e) => setUpdatingPhone({ ...updatingPhone, image_url: e.target.value })} />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdatePhone}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Phones;
