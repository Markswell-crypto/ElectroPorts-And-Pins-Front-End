import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviewFormData, setReviewFormData] = useState({ component_id: null, rating: 0, comment: '' });
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Fetch user data or check user session here
        // Set user state and isLoggedIn state accordingly
        // For demo purposes, assuming user is already logged in
        setUser({ id: 1, name: 'John Doe' });
        setIsLoggedIn(true);

        // Fetch reviews
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('https://electroports-db.onrender.com/reviews');
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleReviewSubmit = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            // Add user_id to reviewFormData
            setReviewFormData({ ...reviewFormData, user_id: user.id });

            // Submit review
            await axios.post('https://electroports-db.onrender.com/reviews', reviewFormData);
            fetchReviews();
            setReviewFormData({ component_id: null, rating: 0, comment: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        // Implement logic to delete review if user owns it
        try {
            await axios.delete(`https://electroports-db.onrender.com/reviews/${reviewId}`);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };
    

    return (
        <Container>
            {/* Display reviews for each item */}
            {items.map(item => (
                <Row key={item.id}>
                    <Col>
                        <h1 className="text-navy">{item.name}</h1>
                        <Card>
                            <Card.Body>
                                {reviews.filter(review => review.component_id === item.id).map(review => (
                                    <div key={review.id}>
                                        <p>User: {review.user_id}</p>
                                        <p>Rating: {review.rating}</p>
                                        <p>Comment: {review.comment}</p>
                                        {user && user.id === review.user_id && (
                                            <div>
                                                <Button variant="danger" onClick={() => handleReviewDelete(review.id)}>Delete</Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
            {/* Add review form */}
            {isLoggedIn && (
                <Row>
                    <Col>
                        <h2 className="text-navy">Add Review</h2>
                        <Form>
                            <Form.Group controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type="number" value={reviewFormData.rating} onChange={(e) => setReviewFormData({ ...reviewFormData, rating: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} value={reviewFormData.comment} onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" onClick={handleReviewSubmit}>Submit Review</Button>
                        </Form>
                    </Col>
                </Row>
            )}
            {/* Login modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Login form component */}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Review;