import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "./Cart.css"


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
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border p-3 my-3">
              {item.image_url && <img src={item.image_url} alt={item.name} style={{ maxWidth: '100px' }} />}
              {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />}git 
              <div>{item.name}</div>
              <div>Ksh{item.price}</div>
              {item.quantity > 1 ? (
                <div>Quantity: {item.quantity}</div>
              ) : (
                <div>Quantity: 1</div>
              )}
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
          <div className="total-price">Total Price: Ksh{calculateTotalPrice()}</div>
          <Link to="/account">
            <button className="order-button">Order</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
