import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact"
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
import NavBar from './components/NavBar';
// import Search from "./components/Search";



function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  // const handleSearch = (searchTerm) => {
  //   // Implement your search logic here
  //   console.log("Search term:", searchTerm);
  // };

  return (
    <>
      <BrowserRouter>
      <NavBar />
        {/* <Search onSearch={handleSearch}/> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/phones" element={<Phones addToCart={addToCart} />} />
          <Route path="/laptops" element={<Laptops addToCart={addToCart} />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/accessories" element={<Accessories addToCart={addToCart} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/audio" element={<SoundDevices addToCart={addToCart} />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path="/search/phones" element={<Search name="phones" />} />
          <Route path="/search/laptops" element={<Search name="laptops" />} />
          <Route path="/search/accessories" element={<Search name="accessories" />} />
          <Route path="/search/sounddevices" element={<Search name="sounddevices" />} />
          <Route path="/search/brands" element={<Search name="brands" />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;