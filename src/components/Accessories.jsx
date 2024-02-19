import { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

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
            <div className="text-center p-3 border">
              <img src={accessory.image_url} alt={accessory.name} className="img-fluid mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
              <div className="mb-2">Name: {accessory.name}</div>
              <div className="mb-2">Price: {accessory.price}</div>
              <Button onClick={() => handleOrder(accessory)}>Order</Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Accessories;
