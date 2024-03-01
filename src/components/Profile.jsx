import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    imageUrl: ""
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    fetch("https://electroports-db.onrender.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          imageUrl: data.imageUrl || ""
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handlePaymentMethod = (method) => {
    console.log(`Payment method selected: ${method}`);
  };


  const handleCloseModal = () => setShowModal(false); // Function to close the modal

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center mb-4" style={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        height: '200px',
        width: '200px'
      }}>
        User Profile
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <label>Name:</label>
          <p>{formData.name}</p>
          <label>Email:</label>
          <p>{formData.email}</p>
          <label>Role:</label>
          <p>{formData.role}</p>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg btn-block" onClick={() => handlePaymentMethod('Mpesa')}>
            <i className="fas fa-money-bill-wave"></i> Mpesa
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-success btn-lg btn-block" onClick={() => handlePaymentMethod('PayPal')}>
            <i className="fab fa-paypal"></i> PayPal
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-danger btn-lg btn-block" onClick={() => handlePaymentMethod('Debit Card')}>
            <i className="fas fa-credit-card"></i> Debit Card
          </button>
        </div>
      </div>
      
      {/* Modal component */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your transaction was successful.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
