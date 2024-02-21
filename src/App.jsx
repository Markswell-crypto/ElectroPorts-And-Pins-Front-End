import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact"
import Navbar from "./components/Navbar"
import HomePage from "./components/HomePage"
import Phones from "./components/Phones";
import Laptops from "./components/Laptops";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Review from "./components/Review"
import Accessories from "./components/Accessories"
import SignUp from "./components/SignUp"
import Profile from "./components/Profile"
import Login from "./components/Login"
import SoundDevices from "./components/SoundDevices"
import About from "./components/About"
import Account from "./components/Account"
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/phones" element={<Phones addToCart={addToCart} />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/audio" element={<SoundDevices />} />
          <Route path="/account" element={<Account />} />
          
        
          

          <Route path="/account" element={<Account />} />          

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
