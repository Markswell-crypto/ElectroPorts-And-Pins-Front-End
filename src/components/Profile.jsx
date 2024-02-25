import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    fetch('https://electroports-db.onrender.com/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setPreviewImage(data.image_url ? `https://electroports-db.onrender.com/images/${data.image_url}` : null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }

    fetch('https://electroports-db.onrender.com/profile', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update profile information');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setPreviewImage(data.image_url ? `https://electroports-db.onrender.com/images/${data.image_url}` : null);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Profile</h1>
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={previewImage} alt="User" className="img-thumbnail rounded-circle mb-3" style={{ width: '150px' }} />
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />
              <input type="text" value={username} onChange={handleUsernameChange} className="form-control mb-3" />
              <input type="email" value={email} onChange={handleEmailChange} className="form-control mb-3" />
              <button type="submit" className="btn btn-primary">Save Changes</button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
