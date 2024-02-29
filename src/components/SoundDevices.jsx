import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './SoundDevices.css';
import Review from './Review';
import Stars from './Stars';
import Search from './Search';

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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDeviceToUpdate, setSelectedDeviceToUpdate] = useState(null);
  const [updatingDevice, setUpdatingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSoundDevices, setFilteredSoundDevices] = useState([]);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    fetchSoundDevices();
  }, []);

  const fetchSoundDevices = () => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => setSoundDevices(data.sound_devices))
      .catch(error => console.error('Error fetching sound devices:', error));
  };

  useEffect(() => {
    const newFilteredSoundDevices = soundDevices.filter(device =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSoundDevices(newFilteredSoundDevices);
    if (newFilteredSoundDevices.length === 0) {
      setShowNotFoundAlert(true);
    } else {
      setShowNotFoundAlert(false);
    }
  }, [searchTerm, soundDevices]);

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
    const updatedDevices = soundDevices.filter(device => device !== deviceToDelete);
    setSoundDevices(updatedDevices);
    setShowDeleteConfirmationModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedDeviceToUpdate) {
      setUpdatingDevice({
        ...updatingDevice,
        [name]: value
      });
    } else {
      setNewDevice({
        ...newDevice,
        [name]: value
      });
    }
  };

  const handleAddDevice = () => {
    setSoundDevices([...soundDevices, newDevice]);
    setShowAddModal(false);
    setNewDevice({
      name: '',
      price: '',
      description: '',
      image: ''
    });
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

  const handleShowUpdateModal = (device) => {
    setSelectedDeviceToUpdate(device);
    setUpdatingDevice(device); 
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatingDevice(null); 
  };

  const handleUpdateDevice = () => {
    const updatedDevices = soundDevices.map(device =>
      device === selectedDeviceToUpdate ? updatingDevice : device
    );
    setSoundDevices(updatedDevices);
    setShowUpdateModal(false);
    setUpdatingDevice(null); 
  };

  return (
    <div>
      <Search onSearch={handleSearch}/>
      {showNotFoundAlert && (
        <div className="container alert alert-danger" role="alert">
          Product not found.
        </div>
      )}
    <div className="container">
      <h1 className="text-center my-4">Sound Devices</h1>
      <Button onClick={handleShowAddModal} className="mb-3">Add New Device</Button>
      <div className='sound-container'>
        {filteredSoundDevices.map(device => (
              <Card key={device.id} className="sound-card">
                <Card.Img src={device.image} alt={device.name} className="sound-image" />
                <Card.Body className='sound-body'>
                  <Card.Title>{device.name}</Card.Title>
                  <Card.Text>Price:Kshs {device.price}</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={device.id} className="card-rating"/>
                  <div className='sound-buttons'>
                    <Button onClick={() => addToCart(device)}>Add to Cart</Button>
                    <Button onClick={() => handleShowDetails(device)} >Details</Button>
                    <Button onClick={() => handleDeleteConfirmation(device)} >Delete</Button>
                    <Button onClick={() => handleShowUpdateModal(device)}>Update</Button>
                    <Button onClick={handleShowReviewModal}>Reviews</Button>
                  </div>                
                </Card.Body>
              </Card>
          ))}
      </div>
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
          <Button variant="danger" onClick={handleDeleteDevice}>Delete</Button>
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
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="deviceName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter device name" name="name" value={updatingDevice ? updatingDevice.name : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="devicePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter device price" name="price" value={updatingDevice ? updatingDevice.price : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter device description" name="description" value={updatingDevice ? updatingDevice.description : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={updatingDevice ? updatingDevice.image : ''} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateDevice}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default SoundDevices;
