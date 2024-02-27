import { useState, useEffect } from 'react';
import { Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://electroports-db.onrender.com/reviews');
        setComments(response.data.reviews);
        setLoading(false);
      } catch (error) {
        setError('Error fetching comments. Please try again later.');
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    try {
      const response = await axios.post('https://electroports-db.onrender.com/reviews', {
        comment: newComment
      });
      setComments([...comments, response.data.review]);
      setNewComment('');
    } catch (error) {
      setError('Error adding comment. Please try again.');
    }
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSaveComment = async (commentId, updatedText) => {
    try {
      await axios.patch(`https://electroports-db.onrender.com/reviews/${commentId}`, {
        comment: updatedText,
      });

      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, comment: updatedText } : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
    } catch (error) {
      setError('Error saving comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://electroports-db.onrender.com/reviews/${commentId}`);
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      setError('Error deleting comment. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-secondary">Reviews Section</h1>
      <div className="container" style={{ width: '100%' }}>
        <Form className="mb-3">
          <Form.Group controlId="newComment">
            <Form.Control
              type="text"
              placeholder="Add a new Review"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <br />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            Add Review
          </Button>
        </Form>

        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} className="d-flex justify-content-between">
                <div>
                  {editingCommentId === comment.id ? (
                    <>
                      <input
                        type="text"
                        value={comment.comment}
                        onChange={(e) => handleSaveComment(comment.id, e.target.value)}
                      />
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleSaveComment(comment.id, comment.comment)}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      {comment.comment}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleEditComment(comment.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
