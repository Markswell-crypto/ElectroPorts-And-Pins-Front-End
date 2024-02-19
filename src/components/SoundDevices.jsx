import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function SoundDevices() {
  const [soundDevices, setSoundDevices] = useState([]);

  useEffect(() => {
    fetch('https://electroports-db.onrender.com/sounddevices')
      .then(response => response.json())
      .then(data => setSoundDevices(data.sound_devices))
      .catch(error => console.error('Error fetching sound devices:', error));
  }, []);

  const handleOrder = (device) => {
    // Implement order handling logic here
    console.log(`Ordering ${device.name}`);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Sound Devices</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {soundDevices.map(device => (
          <Col key={device.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={device.image_url} alt={device.name} style={{ objectFit: 'cover', height: 'auto', width: '100%' }} />
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>Price: {device.price}</Card.Text>
                <Button onClick={() => handleOrder(device)}>Order</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SoundDevices;
