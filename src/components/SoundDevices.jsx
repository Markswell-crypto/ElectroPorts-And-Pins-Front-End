import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './SoundDevices.css';
import Review from './Review';
import Stars from './Stars';


function SoundDevices({ addToCart }) {
  const [soundDevices, setSoundDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [showReviewModal, setShowReviewModal] = useState(false);


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

  const handleDeleteDevice = (id) => {
    fetch(`https://electroports-db.onrender.com/sounddevices/${id}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddDevice = () => {
    fetch('https://electroports-db.onrender.com/sounddevices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDevice)
    })
      .then(response => {
        if (response.ok) {
          fetchSoundDevices();
          setShowAddModal(false);
          setNewDevice({
            name: '',
            price: '',
            description: '',
            image: ''
          });
        } else {
          console.error('Failed to add sound device:', response.status);
        }
      })
      .catch(error => console.error('Error adding sound device:', error));
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
                <Card.Text>Price: {device.price} Kshs</Card.Text>
                <Stars setStar={handleSetStar} deviceId={device.id} />
                <Button onClick={() => addToCart(device)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(device)} className="ms-2">Details</Button>
                <Button onClick={() => handleDeleteConfirmation(device)} className="ms-2">Delete</Button>
                <br />
                <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
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
              <p><strong>Price:</strong> {selectedDevice.price} Kshs</p>
              <p><strong>Description:</strong> {selectedDevice.description}</p>
            </div>
          )}
          <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this device?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDeleteDevice(deviceToDelete.id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="deviceName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter device name" name="name" value={newDevice.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="devicePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter device price" name="price" value={newDevice.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter device description" name="description" value={newDevice.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={newDevice.image} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddDevice}>Add</Button>
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
    </div>
  );
}

export default SoundDevices;
