import React, { useState, useEffect } from 'react';

const SoundDevices = () => {
  const [cart, setCart] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [devices, setDevices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(userRole !== null);
    setIsAdmin(userRole === 'admin');
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => Array.isArray(data) ? setDevices(data) : [])
      .catch(error => {
        console.error('Error fetching devices:', error);
        setDevices([]);
      });
  };

  const addToCart = (device) => {
    setCart([...cart, { ...device, quantity }]);
    setShowPrompt(true);
    setSelectedDevice(device);
  };

  const confirmPurchase = () => {
    const totalPrice = selectedDevice.price * quantity;
    alert(`You have purchased ${quantity} ${selectedDevice.name}(s) for a total of $${totalPrice}. Thank you for your purchase!`);
    setCart([]);
    setShowPrompt(false);
  };

  const handleDeleteDevice = (deviceId) => {
    if (isAdmin) {
      fetch(`https://electroports-db.onrender.com/sounddevices/${deviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.ok) {
            fetchDevices();
          } else {
            alert('Failed to delete device.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting the device.');
        });
    } else {
      alert('You do not have permission to perform this action.');
    }
  };

  return (
    <div style={{ backgroundColor: '#eaf6ff', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sound Devices</h1>
      {isLoggedIn && isAdmin && (
        <button onClick={() => console.log('Navigate to add device page')}>Add New Device</button>
      )}
      <div className="devices-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {devices.map(device => (
          <div key={device.id} className="device-item" style={{ width: '200px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
            <img src={device.image_url} alt={device.name} style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{device.name}</h2>
            <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>${device.price}</p>
            {isAdmin && (
              <button onClick={() => handleDeleteDevice(device.id)} style={{ backgroundColor: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
            )}
            <button onClick={() => addToCart(device)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginLeft: '5px' }}>Buy Now</button>
          </div>
        ))}
      </div>

      {showPrompt && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Confirm Purchase</h2>
          <p>{selectedDevice && `You are purchasing ${quantity} ${selectedDevice.name}(s) for a total of $${selectedDevice.price * quantity}.`}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={confirmPurchase} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginTop: '10px' }}>Confirm</button>
          <button onClick={() => setShowPrompt(false)} style={{ backgroundColor: '#ccc', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SoundDevices;
