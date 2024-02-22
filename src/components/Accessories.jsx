import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './Accessories.css';

function Accessories({ addToCart }) {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [accessoryToDelete, setAccessoryToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => setAccessories(data.accessories))
      .catch(error => console.error('Error fetching accessories:', error));
  };

  const handleShowDetails = (accessory) => {
    setSelectedAccessory(accessory);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleDeleteConfirmation = (accessory) => {
    setAccessoryToDelete(accessory);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteAccessory = () => {
    fetch(`https://electroports-db.onrender.com/accessories/${accessoryToDelete.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchAccessories();
          setShowDeleteConfirmationModal(false);
        } else {
          console.error('Failed to delete accessory:', response.status);
        }
      })
      .catch(error => console.error('Error deleting accessory:', error));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Accessories</h1>
      <Button onClick={handleShowAddModal} className="mb-3">Add New Accessory</Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {accessories.map(accessory => (
          <Col key={accessory.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={accessory.image} alt={accessory.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{accessory.name}</Card.Title>
                <Card.Text>Price: {accessory.price}</Card.Text>
                <Button onClick={() => addToCart(accessory)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(accessory)} className="ms-2">Details</Button>
                <Button onClick={() => handleDeleteConfirmation(accessory)} className="ms-2">Delete</Button>
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
            <div>
              <Card.Img variant="top" src={selectedAccessory.image} alt={selectedAccessory.name} className="details-image" />
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
      <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
        {/* Delete confirmation modal content */}
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        {/* Add new accessory modal content */}
      </Modal>
    </div>
  );
}

export default Accessories;
