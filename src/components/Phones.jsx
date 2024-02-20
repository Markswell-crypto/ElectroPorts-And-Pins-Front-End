import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

function Phones() {
  const [phones, setPhones] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/phones')
      .then(response => response.json())
      .then(data => setPhones(data.phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  const handleOrder = (phone) => {
    // Adding the selected phone to the cart
    setCart([...cart, phone]);
    console.log(`Added ${phone.name} to cart`);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Phones</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {phones.map(phone => (
          <Col key={phone.id}>
            <div className="text-center p-3 border">
              <img src={phone.image_url} alt={phone.name} className="img-fluid mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
              <div className="mb-2">Name: {phone.name}</div>
              <div className="mb-2">Price: {phone.price}</div>
              <Button onClick={() => handleOrder(phone)}>Add to Cart</Button>
              <div>Status: {phone.status}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Phones;
