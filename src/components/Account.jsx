import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from React Bootstrap

const Account = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  const handlePaymentMethod = (method) => {
    console.log(`Selected payment method: ${method}`);
    setSelectedMethod(method);
  };

  const handleProceedToPay = () => {
    // You can perform any action here before showing the modal
    // For now, just show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mt-4">
        {paymentMethods.map((method, index) => (
          <div key={index} className="col-md-4">
            <div className={`card mb-4 ${selectedMethod === method.name ? 'border-primary' : ''}`}>
              <div className="card-body text-center">
                <button
                  className={`btn btn-${method.color} btn-lg btn-block`}
                  onClick={() => handlePaymentMethod(method.name)}
                >
                  <FontAwesomeIcon icon={method.icon} /> {method.label}
                </button>
              </div>
              <img src={method.image} alt={method.label} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg btn-block" onClick={handleProceedToPay}>
            {selectedMethod ? `Proceed to Pay with ${selectedMethod}` : 'Proceed to Pay'}
          </button>
        </div>
      </div>

      {/* Modal for Order Placed successfully */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been successfully placed!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const paymentMethods = [
  { name: 'Mpesa', label: 'Mpesa', icon: faMoneyBillWave, color: 'primary', image: 'https://i0.wp.com/www.k24tv.co.ke/wp-content/uploads/2021/06/Mpesa-logo.png?resize=616%2C450&ssl=1' },
  { name: 'PayPal', label: 'PayPal', icon: faPaypal, color: 'success', image: 'https://www.paypalobjects.com/marketing/web/US/en/rebrand/Shop-and-buy/Credit-and-cards/paypal-credit-and-cards-graphic-split-paypal-cash-card-ratio=1-1-for=all_V4.png' },
  { name: 'Debit Card', label: 'Debit Card', icon: faCreditCard, color: 'danger', image: 'https://e7.pngegg.com/pngimages/212/797/png-clipart-mastercard-logo-credit-card-maestro-payment-card-mastercard-text-orange-thumbnail.png' },
  { name: 'Mastercard', label: 'Mastercard', icon: faCreditCard, color: 'primary', image: 'https://e7.pngegg.com/pngimages/212/797/png-clipart-mastercard-logo-credit-card-maestro-payment-card-mastercard-text-orange-thumbnail.png' },
  { name: 'Western Union', label: 'Western Union', icon: faGlobeAmericas, color: 'success', image: 'https://www.rappler.com/tachyon/2021/09/western-union-march-28-2009-reuters.jpg' },
  { name: 'MoneyGram', label: 'MoneyGram', icon: faGlobeAmericas, color: 'danger', image: 'https://coinme.com/wp-content/uploads/2022/11/mg-hero.webp' },
];

export default Account;
