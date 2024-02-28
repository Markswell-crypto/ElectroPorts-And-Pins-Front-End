import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './Phones.css'; 
import Review from './Review';
import Stars from './Stars'; 
import NavBar from './NavBar';
import Search from './Search';

function Phones({ addToCart }) {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newPhone, setNewPhone] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [editPhone, setEditPhone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  useEffect(() => {
    fetchPhones();
  }, []);

  useEffect(() => {
    const newFilteredPhones = phones.filter(accessory =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(newFilteredPhones);
    if (newFilteredPhones.length === 0) {
      setShowNotFoundAlert(true);
    } else {
      setShowNotFoundAlert(false);
    }
  }, [searchTerm, phones]);

  const fetchPhones = () => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => setPhones(data.phones))
      .catch(error => console.error('Error fetching phones:', error));
  };

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

  const handleDeletePhone = (id) => {
    fetch(`https://electroports-db.onrender.com/phones/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchPhones();
          setShowDeleteConfirmationModal(false);
        } else {
          console.error('Failed to delete phone:', response.status);
        }
      })
      .catch(error => console.error('Error deleting phone:', error));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditPhone(null); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPhone(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddPhone = () => {
    fetch('https://electroports-db.onrender.com/phones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPhone)
    })
      .then(response => response.json())
      .then(data => {
        fetchPhones();
        setShowAddModal(false);
        setNewPhone({
          name: '',
          price: '',
          description: '',
          image: ''
        });
      })
      .catch(error => console.error('Error adding phone:', error));
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

  const handleEditPhone = (phone) => {
    setEditPhone(phone);
    setNewPhone(phone);
    setShowAddModal(true);
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
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredPhones.map(phone => (
            <Col key={phone.id}>
              <Card className="h-100 custom-card">
                <Card.Img variant="top" src={phone.image_url} alt={phone.name} className="custom-img" />
                <Card.Body>
                  <Card.Title>{phone.name}</Card.Title>
                  <Card.Text>Price: {phone.price}</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={phone.id} />
                  <Button onClick={() => addToCart(phone)}>Add to Cart</Button>
                  <Button onClick={() => handleShowDetails(phone)} className="ms-2">Details</Button>
                  <Button onClick={() => handleDeleteConfirmation(phone)} className="ms-2">Delete</Button>
                  <Button className='update-button' onClick={() => handleEditPhone(phone)}>Update</Button>
                  <br />
                  <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Review Modal */}
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
        
        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editPhone ? 'Update Phone' : 'Add New Phone'}</Modal.Title>
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
            <Button variant="primary" onClick={handleAddPhone}>{editPhone ? 'Update' : 'Add'}</Button>
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
            <Button variant="danger" onClick={() => handleDeletePhone(phoneToDelete.id)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        
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
      </div>
    </div>
  );
}

export default Phones;
