import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import GenerateOTP from "./components/GenerateOTP";
import VerifyOTP from "./components/VerifyOTP";
import { Suspense } from "react";
import Loading from "./components/Loading";

const About = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/About")), 1000)));
const Cart = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Cart")), 1000)));
const Collection = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Collection")), 1000)));
const Contact = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Contact")), 1000)));
const Login = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Login")), 1000)));
const Orders = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Orders")), 1000)));
const PlaceOrder = React.lazy(() => new Promise((resolve) => setTimeout(resolve(import("./pages/PlaceOrder")), 1000)));
const Product = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Product")), 1000)));
const Profile = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./pages/Profile")), 1000)));

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/generate-otp" element={<GenerateOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
