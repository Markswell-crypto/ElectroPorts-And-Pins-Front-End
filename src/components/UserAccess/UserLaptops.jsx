import { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import '../Laptops.css';
import Review from '../Review';
import Search from '../Search';
import Stars from '../Stars';

function UserLaptops({ addToCart }) {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLaptops();
  }, []);

  useEffect(() => {
    setFilteredLaptops(
      laptops.filter(laptop =>
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, laptops]);

  const fetchLaptops = () => {
    fetch('https://electroports-db.onrender.com/laptops')
      .then(response => response.json())
      .then(data => {
        setLaptops(data.laptops);
        setFilteredLaptops(data.laptops);
      })
      .catch(error => console.error('Error fetching laptops:', error));
  };

  const handleShowDetails = (laptop) => {
    setSelectedLaptop(laptop);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="container">
        <h1 className="text-center my-4">Laptops</h1>
        {filteredLaptops.length === 0 ? (
          <p className="text-center">No laptops found.</p>
        ) : ( <Row xs={1} md={2} lg={4} className="g-4">
          {filteredLaptops.map(laptop => (
            <Col key={laptop.id}>
              <Card className="h-100 custom-card">
                <Card.Img variant="top" src={laptop.image} alt={laptop.name} className="custom-img" />
                <Card.Body>
                  <Card.Title>{laptop.name}</Card.Title>
                  <Card.Text>Price: {laptop.price} Kshs</Card.Text>
                  <Stars setStar={handleSetStar} deviceId={laptop.id} />
                  <Button onClick={() => addToCart(laptop)}>Add to Cart</Button>
                  <Button onClick={() => handleShowDetails(laptop)} className="ms-2">Details</Button>
                  <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        )}
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

export default UserLaptops;