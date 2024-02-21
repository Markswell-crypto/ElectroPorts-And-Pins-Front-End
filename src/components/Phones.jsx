import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './Phones.css'; // Importing the Phones.css file

function Phones({ addToCart }) {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => setPhones(data.phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  const handleItemClick = (phone) => {
    setSelectedPhone(phone);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="phones-container container">
      <h1 className="text-center my-4">Phones</h1>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhone && (
            <div className='details-container'>
              <img src={selectedPhone.image_url} alt={selectedPhone.name} className="details-image" />
              <p><strong>Name:</strong> {selectedPhone.name}</p>
              <p><strong>Price:</strong> {selectedPhone.price}</p>
              <p><strong>Description:</strong> {selectedPhone.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Row xs={1} md={2} lg={4} className="g-4">
        {phones.map(phone => (
          <Col key={phone.id}>
            <div className="text-center p-3 border" onClick={() => handleItemClick(phone)}>
              <img src={phone.image_url} alt={phone.name} className="img-fluid mb-3" />
              <div className="mb-2">Name: {phone.name}</div>
              <div className="mb-2">Price: {phone.price}</div>
              <Button onClick={() => addToCart(phone)}>Add to Cart</Button>
              <div>Status: {phone.status}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Phones;
