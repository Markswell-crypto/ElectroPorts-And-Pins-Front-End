import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './Accessories.css'; 

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => setAccessories(data.accessories))
      .catch(error => console.error('Error fetching accessories:', error));
  }, []);

  const handleAddToCart = (accessory) => {
    setCart(prevCart => [...prevCart, accessory]);
  };

  const handleShowDetails = (accessory) => {
    setSelectedAccessory(accessory);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Accessories</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {accessories.map(accessory => (
          <Col key={accessory.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={accessory.image_url} alt={accessory.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{accessory.name}</Card.Title>
                <Card.Text>Price: {accessory.price}</Card.Text>
                <Button onClick={() => handleAddToCart(accessory)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(accessory)} className="ms-2">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Accessory Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccessory && (
            <div className='details-container'>
              <img src={selectedAccessory.image_url} alt={selectedAccessory.name} className="details-image" />
              <p><strong>Name:</strong> {selectedAccessory.name}</p>
              <p><strong>Price:</strong> {selectedAccessory.price}</p>
              <p><strong>Description:</strong> {selectedAccessory.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Accessories;
