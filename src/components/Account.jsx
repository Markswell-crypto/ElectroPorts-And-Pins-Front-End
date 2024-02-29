import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Account() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/stk-push', {
        phoneNumber,
        amount
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error making STK push request:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formAmount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="text" value={amount} onChange={e => setAmount(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Initiate STK Push
        </Button>
      </Form>
    </Container>
  );
}

export default Account;