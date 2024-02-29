import { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import './User.css'
import Review from '../Review';
import Stars from '../Stars';
import Search from '../Search';

function UserPhones({ addToCart }) {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPhones();
  }, []);

  useEffect(() => {
    setFilteredPhones(
      phones.filter(phone =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, phones]);

  const fetchPhones = () => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => {
        setPhones(data.phones);
        setFilteredPhones(data.phones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  };

  const handleShowDetails = (phone) => {
    setSelectedPhone(phone);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="container">
        <h1 className="text-center my-4">Phones</h1>
        {filteredPhones.length === 0 ? (
          <p className="text-center">No phones found.</p>
        ) : (
          <div className='phones-container'>
            {filteredPhones.map(phone => (
                  <Card key={phone.id} className="phones-card">
                    <Card.Img src={phone.image_url} alt={phone.name} className="phones-image" />
                    <Card.Body className='phones-body'>
                      <Card.Title className='phones-title'>{phone.name}</Card.Title>
                      <Card.Text>Price:Kshs {phone.price}</Card.Text>
                      <Stars setStar={handleSetStar} deviceId={phone.id} className="card-rating"/>
                      <div className='phones-buttons'>
                        <Button onClick={() => addToCart(phone)}>Add to Cart</Button>
                        <Button onClick={() => handleShowDetails(phone)} >Details</Button>
                        <Button onClick={handleShowReviewModal}>Reviews</Button>
                      </div>                
                    </Card.Body>
                  </Card>
            ))}
        </div>
        )}
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

        {/* Details Modal */}
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
        </Modal>      </div>
    </div>
  );
}

export default UserPhones;