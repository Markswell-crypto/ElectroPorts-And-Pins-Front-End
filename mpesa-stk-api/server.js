const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post('/stk-push', (req, res) => {
  // This is where you would integrate with the M-Pesa API
  // For now, we'll just simulate a successful response
  const { phoneNumber, amount } = req.body;
  console.log(`Received STK push request for ${amount} to ${phoneNumber}`);

  // Simulate a successful response
  res.json({
    ResultCode: 0,
    ResultDesc: "Success",
    CheckoutRequestID: "ws_CO_1234567890"
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});