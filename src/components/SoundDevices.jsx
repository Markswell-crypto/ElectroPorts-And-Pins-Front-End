import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './SoundDevices.css';

function SoundDevices({ addToCart }) {
  const [soundDevices, setSoundDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchSoundDevices();
  }, []);

  const fetchSoundDevices = () => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => setSoundDevices(data.sound_devices))
      .catch(error => console.error('Error fetching sound devices:', error));
  };

  const handleShowDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleDeleteConfirmation = (device) => {
    setDeviceToDelete(device);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteDevice = () => {
    fetch(`https://electroports-db.onrender.com/sounddevices/${deviceToDelete.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchSoundDevices();
          setShowDeleteConfirmationModal(false);
        } else {
          console.error('Failed to delete sound device:', response.status);
        }
      })
      .catch(error => console.error('Error deleting sound device:', error));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Sound Devices</h1>
      <Button onClick={handleShowAddModal} className="mb-3">Add New Device</Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {soundDevices.map(device => (
          <Col key={device.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={device.image} alt={device.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>Price: {device.price}</Card.Text>
                <Button onClick={() => addToCart(device)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(device)} className="ms-2">Details</Button>
                <Button onClick={() => handleDeleteConfirmation(device)} className="ms-2">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Device Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDevice && (
            <div>
              <Card.Img variant="top" src={selectedDevice.image} alt={selectedDevice.name} className="details-image" />
              <p><strong>Name:</strong> {selectedDevice.name}</p>
              <p><strong>Price:</strong> {selectedDevice.price}</p>
              <p><strong>Description:</strong> {selectedDevice.description}</p>
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
        {/* Add new device modal content */}
      </Modal>
    </div>
  );
}

export default SoundDevices;
