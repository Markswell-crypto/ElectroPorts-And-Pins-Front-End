import { useEffect, useState } from 'react';
import { Col, Row, Button, Modal, Form, Card } from 'react-bootstrap';
import './SoundDevices.css';
import Review from './Review';
import Stars from './Stars';

function Laptops({ addToCart }) {
  const [laptops, setLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = () => {
    fetch('https://electroports-db.onrender.com/laptops')
      .then(response => response.json())
      .then(data => setLaptops(data.laptops))
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

  const handleOrder = (laptop) => {
    console.log(`Ordering ${laptop.name}`);
    // Implement order handling logic here
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Laptops</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {laptops.map(laptop => (
          <Col key={laptop.id}>
            <Card className="h-100 custom-card">
              <Card.Img variant="top" src={laptop.image} alt={laptop.name} className="custom-img" />
              <Card.Body>
                <Card.Title>{laptop.name}</Card.Title>
                <Card.Text>Price: {laptop.price} Kshs</Card.Text>
                <Stars setStar={handleSetStar} deviceId={laptop.id} />
                <Button onClick={() => addToCart(laptop)}>Add to Cart</Button>
                <Button onClick={() => handleShowDetails(laptop)} className="ms-2">Details</Button>
                <Button onClick={handleOrder} className="ms-2">Order</Button>
                <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Laptop Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLaptop && (
            <div>
              <Card.Img variant="top" src={selectedLaptop.image} alt={selectedLaptop.name} className="details-image" />
              <p><strong>Name:</strong> {selectedLaptop.name}</p>
              <p><strong>Price:</strong> {selectedLaptop.price} Kshs</p>
              <p><strong>Description:</strong> {selectedLaptop.description}</p>
            </div>
          )}
          <Button className='btn-center mt-2 ml-5 bg-transparent text-primary' onClick={handleShowReviewModal}>Reviews</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
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

export default Laptops;
