import { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './User.css';
import Review from '../Review';
import Search from '../Search';
import Stars from '../Stars';

function UserAccessories({ addToCart }) {
  const [accessories, setAccessories] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() => {
    setFilteredAccessories(
      accessories.filter(accessory =>
        accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, accessories]);

  const fetchAccessories = () => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => {
        setAccessories(data.accessories);
        setFilteredAccessories(data.accessories);
      })
      .catch(error => console.error('Error fetching accessories:', error));
  };

  const handleShowDetails = (accessory) => {
    setSelectedAccessory(accessory);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleAddToCart = (device) => {
    addToCart(device);
  };
  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="container">
        <h1 className="text-center my-4">Accessories</h1>
        {filteredAccessories.length === 0 ? (
          <p className="text-center">No accessories found.</p>
        ) : (
          <div className='accessory-container'>
            {filteredAccessories.map(accessory => (
                <Card key={accessory.id} className="accessory-card">
                  <Card.Img src={accessory.image} alt={accessory.name} className="accessory-image" />
                  <Card.Body className='accessory-body'>
                    <Card.Title className="accessory-title">{accessory.name}</Card.Title>
                    <Card.Text>Price:Kshs {accessory.price}</Card.Text>
                    <Stars setStar={handleSetStar} deviceId={accessory.id} className="card-rating"/>
                    <div className='accessory-buttons'>
                      <Button onClick={() => handleAddToCart(accessory)}>Add to Cart</Button>
                      <Button onClick={() => handleShowDetails(accessory)} >Details</Button>
                      <Button onClick={handleShowReviewModal}>Reviews</Button>
                    </div>                
                  </Card.Body>
                </Card>
            ))}
      </div>
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
        </Modal>      </div>
    </div>
  );
}

export default UserAccessories;