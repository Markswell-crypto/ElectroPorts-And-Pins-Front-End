import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    
    fetchUserInfo();
    fetchOrderHistory();
    fetchReviews();
  }, []);

  const fetchUserInfo = () => {
    fetch('https://electroports-db.onrender.com/user/profile')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user information:', error));
  };

  const fetchOrderHistory = () => {
    fetch('https://electroports-db.onrender.com/user/orders')
      .then(response => response.json())
      .then(data => setPurchases(data))
      .catch(error => console.error('Error fetching purchase history:', error));
  };

  const fetchReviews = () => {
    fetch('https://electroports-db.onrender.com/user/reviews')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching reviews:', error));
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <img src={user.picture} alt="User" />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      <h2>Order History</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order}</li>
        ))}
      </ul>
      <h2>Comments/Reviews</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
