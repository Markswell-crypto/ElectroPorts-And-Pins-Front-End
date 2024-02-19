import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            // Make a GET request to fetch cart 
            const response = await axios.get('/api/cart'); 
            setCartItems(response.data.cartItems); 
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            // Make a DELETE request to remove an item from the cart
            await axios.delete(`/api/cart/${itemId}`); 
            // Update the cart items state after successful removal
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
