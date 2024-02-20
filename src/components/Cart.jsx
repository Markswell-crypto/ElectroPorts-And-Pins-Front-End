// Cart.jsx
import React from 'react';
import "./Phones.css"

function Cart({ cartItems, removeFromCart }) {
  const handleRemove = (index) => {
    removeFromCart(index);
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
              <img src={item.image_url} alt={item.name} style={{ maxWidth: '100px' }} />
              <div>{item.name}</div>
              <div>${item.price}</div>
              <div>Description: {item.description}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Total Price: ${item.quantity * item.price}</div>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
