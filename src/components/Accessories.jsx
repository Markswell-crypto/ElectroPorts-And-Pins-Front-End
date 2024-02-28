import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './Accessories.css';
import Review from './Review';
import Stars from './Stars';
import Search from './Search';

function Accessories({ addToCart }) {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [accessoryToDelete, setAccessoryToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAccessoryToUpdate, setSelectedAccessoryToUpdate] = useState(null);
  const [updatingAccessory, setUpdatingAccessory] = useState(null); // New state to track the accessory being updated
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => setAccessories(data.accessories))
      .catch(error => console.error('Error fetching accessories:', error));
  };

  useEffect(() => {
    const newFilteredAccessories = accessories.filter(accessory =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccessories(newFilteredAccessories);
    if (newFilteredAccessories.length === 0) {
      setShowNotFoundAlert(true);
    } else {
      setShowNotFoundAlert(false);
    }
  }, [searchTerm, accessories]);

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
    const updatedAccessories = accessories.filter(accessory => accessory !== accessoryToDelete);
    setAccessories(updatedAccessories);
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
    if (selectedAccessoryToUpdate) {
      setUpdatingAccessory({
        ...updatingAccessory,
        [name]: value
      });
    } else {
      setNewAccessory({
        ...newAccessory,
        [name]: value
      });
    }
  };

  const handleAddAccessory = () => {
    setAccessories([...accessories, newAccessory]);
    setShowAddModal(false);
    setNewAccessory({
      name: '',
      price: '',
      description: '',
      image: ''
    });
  };

  const handleSetStar = (rating) => {
    setSelectedAccessory(prevAccessory => ({
      ...prevAccessory,
      rating: rating
    }));
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleShowUpdateModal = (accessory) => {
    setSelectedAccessoryToUpdate(accessory);
    setUpdatingAccessory(accessory); 
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatingAccessory(null); 
  };

  const handleUpdateAccessory = () => {
    const updatedAccessories = accessories.map(accessory =>
      accessory === selectedAccessoryToUpdate ? updatingAccessory : accessory
    );
    setAccessories(updatedAccessories);
    setShowUpdateModal(false);
    setUpdatingAccessory(null); 
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
      <h1 className="text-center my-4">Accessories</h1>
      <Button onClick={handleShowAddModal} className="mb-3">Add New Accessory</Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredAccessories.map(accessory => (
          <Col key={accessory.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={accessory.image} alt={accessory.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{accessory.name}</Card.Title>
                <Card.Text>Price: {accessory.price}</Card.Text>
                <Stars setStar={handleSetStar} deviceId={accessory.id} />
                <Button onClick={() => addToCart(accessory)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(accessory)} className="ms-2">Details</Button>
                <Button onClick={() => handleDeleteConfirmation(accessory)} className="ms-2">Delete</Button>
                <Button className='update-button' onClick={() => handleShowUpdateModal(accessory)}>Update</Button>
                <br />
                <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
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
          <p>Are you sure you want to delete this accessory?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteAccessory}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Accessory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="accessoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter accessory name" name="name" value={newAccessory.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter accessory price" name="price" value={newAccessory.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter accessory description" name="description" value={newAccessory.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={newAccessory.image} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddAccessory}>Add</Button>
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
          <Modal.Title>Update Accessory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="accessoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter accessory name" name="name" value={updatingAccessory ? updatingAccessory.name : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter accessory price" name="price" value={updatingAccessory ? updatingAccessory.price : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter accessory description" name="description" value={updatingAccessory ? updatingAccessory.description : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessoryImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={updatingAccessory ? updatingAccessory.image : ''} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateAccessory}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default Accessories;
