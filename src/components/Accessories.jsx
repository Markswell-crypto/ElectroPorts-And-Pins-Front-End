import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import './Accessories.css'; // Import CSS file for custom styling

function Accessories() {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/accessories')
      .then(response => response.json())
      .then(data => setAccessories(data.accessories))
      .catch(error => console.error('Error fetching accessories:', error));
  }, []);

  const handleOrder = (accessory) => {
    // Implement order handling logic here
    console.log(`Ordering ${accessory.name}`);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Accessories</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {accessories.map(accessory => (
          <Col key={accessory.id}>
            <Card className="h-100 custom-card"> {/* Apply custom card class */}
              <Card.Img variant="top" src={accessory.image_url} alt={accessory.name} className="custom-img" /> {/* Apply custom image class */}
              <Card.Body>
                <Card.Title>{accessory.name}</Card.Title>
                <Card.Text>Price: {accessory.price}</Card.Text>
                <Button onClick={() => handleOrder(accessory)}>Order</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Accessories;
