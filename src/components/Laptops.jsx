import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

function Laptops() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/laptops')
      .then(response => response.json())
      .then(data => setLaptops(data.laptops))
      .catch(error => console.error('Error fetching laptops:', error));
  }, []);

  const handleOrder = (laptop) => {
    // Implement order handling logic here
    console.log(`Ordering ${laptop.name}`);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Laptops</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {laptops.map(laptop => (
          <Col key={laptop.id}>
            <div className="text-center p-3 border">
              <img src={laptop.image_url} alt={laptop.name} className="img-fluid mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
              <div className="mb-2">Name: {laptop.name}</div>
              <div className="mb-2">Price: {laptop.price}</div>
              <Button onClick={() => handleOrder(laptop)}>Order</Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Laptops;
