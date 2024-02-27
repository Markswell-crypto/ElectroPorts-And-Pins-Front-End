import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './Accessories.css';
import Review from './Review';
import NavBar from './NavBar';
import Search from './Search';

function UserAccessories({ addToCart }) {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleAddToCart = (accessory) => {
    addToCart(accessory); 
    alert(`Added ${accessory.name} to cart`);
  };

  const handleShowDetails = (accessory) => {
    setSelectedAccessory(accessory);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleSetStar = (rating) => {
    setSelectedAccessory(prevAccessory => ({
      ...prevAccessory,
      rating: rating
    }));
  };

  return (
    <div>
      <NavBar />
      <Search />
      <div className="container">
        <h1 className="text-center my-4">Accessories</h1>
        <Row xs={1} md={2} lg={4} className="g-4">
          {accessories.map(accessory => (
            <Col key={accessory.id}>
              <Card className="h-100 custom-card">
                <Card.Img variant="top" src={accessory.image} alt={accessory.name} className="custom-img" />
                <Card.Body>
                  <Card.Title>{accessory.name}</Card.Title>
                  <Card.Text>Price: {accessory.price}</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={accessory.id} />
                  <Button onClick={() => handleAddToCart(accessory)}>Add to Cart</Button>
                  <Button onClick={() => handleShowDetails(accessory)} className="ms-2">Details</Button>
                  <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

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

        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Accessory Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedAccessory && (
              <div>
                <Card.Img variant="top" src={selectedAccessory.image} alt={selectedAccessory.name} className="details-image" />
                <p><strong>Name:</strong> {selectedAccessory.name}</p>
                <p><strong>Price:</strong> {selectedAccessory.price}</p>
                <p><strong>Description:</strong> {selectedAccessory.description}</p>
              </div>
            )}
            <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserAccessories;
