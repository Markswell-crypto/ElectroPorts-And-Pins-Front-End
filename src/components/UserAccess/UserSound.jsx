import { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import '../SoundDevices.css';
import Review from '../Review';
import Stars from '../Stars';
import Search from '../Search';

function UserSound({ addToCart }) {
  const [soundDevices, setSoundDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSoundDevices();
  }, []);

  useEffect(() => {
    setFilteredDevices(
      soundDevices.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, soundDevices]);

  const fetchSoundDevices = () => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => {
        setSoundDevices(data.sound_devices);
        setFilteredDevices(data.sound_devices);
      })
      .catch(error => console.error('Error fetching sound devices:', error));
  };

  const handleShowDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleSetStar = (rating) => {
    setSelectedDevice(prevDevice => ({
      ...prevDevice,
      rating: rating
    }));
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="container">
        <h1 className="text-center my-4">Sound Devices</h1>
        {filteredDevices.length === 0 ? (
          <p className="text-center">No laptops found.</p>
        ) : ( <Row xs={1} md={2} lg={4} className="g-4">
          {filteredDevices.map(device => (
            <Col key={device.id}>
              <Card className="h-100 custom-card">
                <Card.Img variant="top" src={device.image} alt={device.name} className="custom-img" />
                <Card.Body>
                  <Card.Title>{device.name}</Card.Title>
                  <Card.Text>Price: {device.price} Kshs</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={device.id} />
                  <Button onClick={() => addToCart(device)}>Add to Cart</Button>
                  <Button onClick={() => handleShowDetails(device)} className="ms-2">Details</Button>
                  <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        )}
        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Device Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDevice && (
              <div>
                <Card.Img variant="top" src={selectedDevice.image} alt={selectedDevice.name} className="details-image" />
                <p><strong>Name:</strong> {selectedDevice.name}</p>
                <p><strong>Price:</strong> {selectedDevice.price} Kshs</p>
                <p><strong>Description:</strong> {selectedDevice.description}</p>
              </div>
            )}
            <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
          </Modal.Body>
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
        </Modal>      </div>
    </div>
  );
}

export default UserSound;