import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/audio" element={<SoundDevices />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App