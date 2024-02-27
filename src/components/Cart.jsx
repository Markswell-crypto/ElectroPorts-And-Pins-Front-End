import { useState } from 'react';
import NavBar from './NavBar';

function Cart({ cartItems, removeFromCart }) {
  const [cart, setCart] = useState(cartItems);

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
    }
  };

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      total += item.quantity * item.price;
    }
    return total;
  };

  return (
    <div>
      <NavBar />
    <div className="container">
      <h1 className="text-center my-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="border p-3 my-3">
              {item.image_url && <img src={item.image_url} alt={item.name} style={{ maxWidth: '100px' }} />}
              {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />}
              <div>{item.name}</div>
              <div>${item.price}</div>
              <div>Quantity:
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </div>
              <div>Total Price: ${calculateTotalPrice(cart)}</div>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Cart;