import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import './Laptops.css';
import Review from './Review';
import Stars from './Stars';
import Search from './Search';

function Laptops({ addToCart }) {
  const [laptops, setLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [laptopToDelete, setLaptopToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newLaptop, setNewLaptop] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [editLaptop, setEditLaptop] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = () => {
    fetch('https://electroports-db.onrender.com/laptops')
      .then(response => response.json())
      .then(data => setLaptops(data.laptops))
      .catch(error => console.error('Error fetching laptops:', error));
  };

  useEffect(() => {
    const newFilteredLaptops = laptops.filter(accessory =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaptops(newFilteredLaptops);
    if (newFilteredLaptops.length === 0) {
      setShowNotFoundAlert(true);
    } else {
      setShowNotFoundAlert(false);
    }
  }, [searchTerm, laptops]);

  const handleShowDetails = (laptop) => {
    setSelectedLaptop(laptop);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleDeleteConfirmation = (laptop) => {
    setLaptopToDelete(laptop);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteLaptop = (id) => {
    fetch(`https://electroports-db.onrender.com/laptops/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchLaptops();
          setShowDeleteConfirmationModal(false);
        } else {
          console.error('Failed to delete laptop:', response.status);
        }
      })
      .catch(error => console.error('Error deleting laptop:', error));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditLaptop(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLaptop(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddLaptop = () => {
    fetch('https://electroports-db.onrender.com/laptops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLaptop)
    })
      .then(response => response.json())
      .then(data => {
        fetchLaptops();
        setShowAddModal(false);
        setNewLaptop({
          name: '',
          price: '',
          description: '',
          image: ''
        });
      })
      .catch(error => console.error('Error adding laptop:', error));
  };

  const handleSetStar = (rating) => {
    setSelectedLaptop(prevLaptop => ({
      ...prevLaptop,
      rating: rating
    }));
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleEditLaptop = (laptop) => {
    setEditLaptop(laptop);
    setNewLaptop(laptop);
    setShowAddModal(true);
  };

  return (
    <div>
      <Search />
      {showNotFoundAlert && (
        <div className="container alert alert-danger" role="alert">
          Product not found.
        </div>
      )}
      <div className="container">
        <h1 className="text-center my-4">Laptops</h1>
        <Button onClick={handleShowAddModal} className="mb-3">Add New Laptop</Button>
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredLaptops.map(laptop => (
            <Col key={laptop.id}>
              <Card className="h-100 custom-card">
                <Card.Img variant="top" src={laptop.image} alt={laptop.name} className="custom-img" />
                <Card.Body>
                  <Card.Title>{laptop.name}</Card.Title>
                  <Card.Text>Price: {laptop.price}</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={laptop.id} />
                  <Button onClick={() => addToCart(laptop)}>Add to Cart</Button>
                  <Button onClick={() => handleShowDetails(laptop)} className="ms-2">Details</Button>
                  <Button onClick={() => handleDeleteConfirmation(laptop)} className="ms-2">Delete</Button>
                  <Button className='update-button' onClick={() => handleEditLaptop(laptop)}>Update</Button>
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
            <Modal.Title>{editLaptop ? 'Update Laptop' : 'Add New Laptop'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="laptopName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter laptop name" name="name" value={newLaptop.name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="laptopPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter laptop price" name="price" value={newLaptop.price} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="laptopDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter laptop description" name="description" value={newLaptop.description} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="laptopImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" name="image" value={newLaptop.image} onChange={handleInputChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>Cancel</Button>
            <Button variant="primary" onClick={handleAddLaptop}>{editLaptop ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Modal>
        
        <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this laptop?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDeleteLaptop(laptopToDelete.id)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        
        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Laptop Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLaptop && (
              <div>
                <Card.Img variant="top" src={selectedLaptop.image} alt={selectedLaptop.name} className="details-image" />
                <p><strong>Name:</strong> {selectedLaptop.name}</p>
                <p><strong>Price:</strong> {selectedLaptop.price}</p>
                <p><strong>Description:</strong> {selectedLaptop.description}</p>
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

export default Laptops;
