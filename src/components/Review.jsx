import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviewFormData, setReviewFormData] = useState({
        user_id: null,
        component_type: '', 
        component_id: null, 
        rating: 0,
        comment: ''
    });
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("https://electroports-db.onrender.com/reviews");
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
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

    const handleLogin = (userData) => {
        // Implement logic to handle user login
        setUser(userData);
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        // Implement logic to handle user logout
        setUser(null);
        setIsLoggedIn(false);
    };

    const handleReviewSubmit = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            await axios.post('https://electroports-db.onrender.com/reviews', reviewFormData);
            fetchReviews();
            setReviewFormData({
                user_id: null,
                component_type: '',
                component_id: null,
                rating: 0,
                comment: ''
            });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleReviewEdit = async (reviewId, updatedReviewData) => {
        // Implement logic to edit a review
    };

    const handleReviewDelete = async (reviewId) => {
        // Implement logic to delete a review
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-navy">Reviews</h1>
                    <Card>
                        <Card.Body>
                            {reviews.map(review => (
                                <div key={review.id}>
                                    <p>User ID: {review.user_id}</p>
                                    <p>Rating: {review.rating}</p>
                                    <p>Comment: {review.comment}</p>
                                    {user && user.id === review.user_id && (
                                        <div>
                                            <Button variant="primary" onClick={() => handleReviewEdit(review.id, updatedReviewData)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleReviewDelete(review.id)}>Delete</Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    {isLoggedIn ? (
                        <div>
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
                        </div>
                    ) : (
                        <p>Please <Button variant="link" onClick={() => setShowLoginModal(true)}>log in</Button> to leave a review.</p>
                    )}
                </Col>
            </Row>
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
