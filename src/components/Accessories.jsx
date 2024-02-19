import React, { useState, useEffect } from 'react';

const Accessories = () => {
  const [cart, setCart] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [accessories, setAccessories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(userRole !== null);
    setIsAdmin(userRole === 'admin');

    fetchAccessories();
  }, []);

  const fetchAccessories = () => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => Array.isArray(data) ? setAccessories(data) : [])
      .catch(error => {
        console.error('Error fetching accessories:', error);
        setAccessories([]);
      });
  };

  const addToCart = (accessory) => {
    setCart([...cart, { ...accessory, quantity }]);
    setShowPrompt(true);
    setSelectedAccessory(accessory);
  };

  const confirmPurchase = () => {
    const totalPrice = selectedAccessory.price * quantity;
    alert(`You have purchased ${quantity} ${selectedAccessory.name}(s) for a total of $${totalPrice}. Thank you for your purchase!`);
    setCart([]);
    setShowPrompt(false);
  };

  const handleDeleteAccessory = (accessoryId) => {
    if (isAdmin) {
      fetch(`https://electroports-db.onrender.com/accessories/${accessoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.ok) {
            fetchAccessories();
          } else {
            alert('Failed to delete accessory.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting the accessory.');
        });
    } else {
      alert('You do not have permission to perform this action.');
    }
  };

  return (
    <div style={{ backgroundColor: '#eaf6ff', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Accessories</h1>
      {isLoggedIn && isAdmin && (
        <button onClick={() => console.log('Navigate to add accessory page')}>Add New Accessory</button>
      )}
      <div className="accessories-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {accessories.map(accessory => (
          <div key={accessory.id} className="accessory-item" style={{ width: '200px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
            <img src={accessory.image_url} alt={accessory.name} style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{accessory.name}</h2>
            <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>${accessory.price}</p>
            {isAdmin && (
              <button onClick={() => handleDeleteAccessory(accessory.id)} style={{ backgroundColor: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
            )}
            <button onClick={() => addToCart(accessory)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginLeft: '5px' }}>Buy Now</button>
          </div>
        ))}
      </div>

      {showPrompt && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Confirm Purchase</h2>
          <p>{selectedAccessory && `You are purchasing ${quantity} ${selectedAccessory.name}(s) for a total of $${selectedAccessory.price * quantity}.`}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={confirmPurchase} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginTop: '10px' }}>Confirm</button>
          <button onClick={() => setShowPrompt(false)} style={{ backgroundColor: '#ccc', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Accessories;
