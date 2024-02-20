import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './SoundDevices.css'; 

function SoundDevices() {
  const [soundDevices, setSoundDevices] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => setSoundDevices(data.sound_devices))
      .catch(error => console.error('Error fetching sound devices:', error));
  }, []);

  const handleAddToCart = (device) => {
    setCart(prevCart => [...prevCart, device]);
  };

  const handleShowDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Sound Devices</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {soundDevices.map(device => (
          <Col key={device.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={device.image_url} alt={device.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>Price: {device.price}</Card.Text>
                <Button onClick={() => handleAddToCart(device)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(device)} className="ms-2">Details</Button>
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
            <div className='details-container'>
              <img src={selectedDevice.image_url} alt={selectedDevice.name} className="details-image" />
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
    </div>
  );
}

export default SoundDevices;
