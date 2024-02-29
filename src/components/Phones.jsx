import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './Phones.css';
import Review from './Review';
import Stars from './Stars';
import Search from './Search';

function Phones({ addToCart }) {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhone, setNewPhone] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPhoneToUpdate, setSelectedPhoneToUpdate] = useState(null);
  const [updatingPhone, setUpdatingPhone] = useState(null); // New state to track the phone being updated
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = () => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => setPhones(data.phones))
      .catch(error => console.error('Error fetching phones:', error));
  };

  useEffect(() => {
    const newFilteredPhones = phones.filter(phone =>
      phone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(newFilteredPhones);
    if (newFilteredPhones.length === 0) {
      setShowNotFoundAlert(true);
    } else {
      setShowNotFoundAlert(false);
    }
  }, [searchTerm, phones]);

  const handleShowDetails = (phone) => {
    setSelectedPhone(phone);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleDeleteConfirmation = (phone) => {
    setPhoneToDelete(phone);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeletePhone = () => {
    const updatedPhones = phones.filter(phone => phone !== phoneToDelete);
    setPhones(updatedPhones);
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
    if (selectedPhoneToUpdate) {
      setUpdatingPhone({
        ...updatingPhone,
        [name]: value
      });
    } else {
      setNewPhone({
        ...newPhone,
        [name]: value
      });
    }
  };

  const handleAddPhone = () => {
    setPhones([...phones, newPhone]);
    setShowAddModal(false);
    setNewPhone({
      name: '',
      price: '',
      description: '',
      image: ''
    });
  };

  const handleSetStar = (rating) => {
    setSelectedPhone(prevPhone => ({
      ...prevPhone,
      rating: rating
    }));
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleShowUpdateModal = (phone) => {
    setSelectedPhoneToUpdate(phone);
    setUpdatingPhone(phone); 
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatingPhone(null); 
  };

  const handleUpdatePhone = () => {
    const updatedPhones = phones.map(phone =>
      phone === selectedPhoneToUpdate ? updatingPhone : phone
    );
    setPhones(updatedPhones);
    setShowUpdateModal(false);
    setUpdatingPhone(null); 
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
      <h1 className="text-center my-4">Phones</h1>
      <Button onClick={handleShowAddModal} className="mb-3">Add New Phone</Button>
      <div className='phones-container'>
        {filteredPhones.map(phone => (
              <Card key={phone.id} className="phones-card">
                <Card.Img src={phone.image_url} alt={phone.name} className="phones-image" />
                <Card.Body className='phones-body'>
                  <Card.Title>{phone.name}</Card.Title>
                  <Card.Text>Price:Kshs {phone.price}</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={phone.id} className="card-rating"/>
                  <div className='phones-buttons'>
                    <Button onClick={() => addToCart(phone)}>Add to Cart</Button>
                    <Button onClick={() => handleShowDetails(phone)} >Details</Button>
                    <Button onClick={() => handleDeleteConfirmation(phone)} >Delete</Button>
                    <Button onClick={() => handleShowUpdateModal(phone)}>Update</Button>
                    <Button onClick={handleShowReviewModal}>Reviews</Button>
                  </div>                
                </Card.Body>
              </Card>
          ))}
      </div>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhone && (
            <div>
              <Card.Img variant="top" src={selectedPhone.image_url} alt={selectedPhone.name} className="details-image" />
              <p><strong>Name:</strong> {selectedPhone.name}</p>
              <p><strong>Price:</strong> {selectedPhone.price}</p>
              <p><strong>Description:</strong> {selectedPhone.description}</p>
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
          <p>Are you sure you want to delete this phone?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeletePhone}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="phoneName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter phone name" name="name" value={newPhone.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phonePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter phone price" name="price" value={newPhone.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter phone description" name="description" value={newPhone.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={newPhone.image_url} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddPhone}>Add</Button>
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
          <Modal.Title>Update Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="phoneName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter phone name" name="name" value={updatingPhone ? updatingPhone.name : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phonePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter phone price" name="price" value={updatingPhone ? updatingPhone.price : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter phone description" name="description" value={updatingPhone ? updatingPhone.description : ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" name="image" value={updatingPhone ? updatingPhone.image_url : ''} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdatePhone}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default Phones;
