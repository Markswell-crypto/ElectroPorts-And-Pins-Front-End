import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "./Cart.css"
import cartImage from "../assets/cart.jpg"; // Import the cart image

function Cart({ cartItems, removeFromCart }) {
  const handleRemove = (index) => {
    removeFromCart(index);
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += parseFloat(item.price); // Assuming each item has a 'price' property
    });
    return totalPrice;
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Cart</h1>
      {cartItems.length === 0 ? (
        <div className="d-flex- center">
          <div className="empty-cart-container">
            <img src={cartImage} alt="Cart" className="cart-image" />
            <p>Your cart is empty</p> {/* Moved this line below the image */}
          </div>
        </div>
      ) : (
        <div className="container">
          {cartItems.map((item, index) => (
            <div key={index} className="row">
              <div className="col-md-3">
                {item.image_url && <img src={item.image_url} alt={item.name} className="img-fluid" />}
                {item.image && <img src={item.image} alt={item.name} className="img-fluid" />}
              </div>
              <div className="col-md-9">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    {item.quantity > 1 ? (
                      <p className="card-text">Quantity: {item.quantity}</p>
                    ) : (
                      <p className="card-text">Quantity: 1</p>
                    )}
                    <p className="card-text">Ksh{item.price}</p>
                    <button onClick={() => handleRemove(index)} className="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="total-price">Total Price: Ksh{calculateTotalPrice()}</div>
          <Link to="/account">
            <button className="order-button btn btn-primary">Order</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
