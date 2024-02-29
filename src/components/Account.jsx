import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

// This is a mock function to handle the payment method selection.
// You should replace this with your actual function to handle the payment method.
const handlePaymentMethod = (method) => {
 console.log(`Selected payment method: ${method}`);
};

const Account = () => {
 return (
    <div className="container mt-4">
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-primary btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('Mpesa')}>
                <FontAwesomeIcon icon={faMoneyBillWave} /> Mpesa
              </button>
            </div>
            <img src="https://images.unsplash.com/photo-1627924657731-3f9af38e09fd?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mpesa" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-success btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('PayPal')}>
                <FontAwesomeIcon icon={faPaypal} /> PayPal
              </button>
            </div>
            <img src="https://www.paypalobjects.com/marketing/web/US/en/rebrand/Shop-and-buy/Credit-and-cards/paypal-credit-and-cards-graphic-split-paypal-cash-card-ratio=1-1-for=all_V4.png" alt="PayPal" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-danger btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('Debit Card')}>
                <FontAwesomeIcon icon={faCreditCard} /> Debit Card
              </button>
            </div>
            <img src="https://e7.pngegg.com/pngimages/212/797/png-clipart-mastercard-logo-credit-card-maestro-payment-card-mastercard-text-orange-thumbnail.png" alt="Debit Card" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-primary btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('Mastercard')}>
                <FontAwesomeIcon icon={faCreditCard} /> Mastercard
              </button>
            </div>
            <img src="https://e7.pngegg.com/pngimages/212/797/png-clipart-mastercard-logo-credit-card-maestro-payment-card-mastercard-text-orange-thumbnail.png" alt="Mastercard" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-success btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('Western Union')}>
                <FontAwesomeIcon icon={faGlobeAmericas} /> Western Union
              </button>
            </div>
            <img src="https://www.rappler.com/tachyon/2021/09/western-union-march-28-2009-reuters.jpg" alt="Western Union" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="card-body text-center">
              <button className="btn btn-danger btn-lg btn-block" style={{ fontStyle: 'italic' }} onClick={() => handlePaymentMethod('MoneyGram')}>
                <FontAwesomeIcon icon={faGlobeAmericas} /> MoneyGram
              </button>
            </div>
            <img src="https://coinme.com/wp-content/uploads/2022/11/mg-hero.webp" alt="MoneyGram" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <button className="btn btn-primary btn-lg btn-block" onClick={() => console.log('Proceed to Pay')}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
 );
};

export default Account;
