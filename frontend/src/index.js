import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import Login from './landing_page/signup/Login';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from './landing_page/NotFound';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import Dashboard from './dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';

// Layout wrapper for landing pages that need common Navbar and Footer
const LandingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout><HomePage /></LandingLayout>} />
        <Route path="/signup" element={<LandingLayout><Signup /></LandingLayout>} />
        <Route path="/login" element={<LandingLayout><Login /></LandingLayout>} />
        <Route path="/about" element={<LandingLayout><AboutPage /></LandingLayout>} />
        <Route path="/product" element={<LandingLayout><ProductPage /></LandingLayout>} />
        <Route path="/pricing" element={<LandingLayout><PricingPage /></LandingLayout>} />
        <Route path="/support" element={<LandingLayout><SupportPage /></LandingLayout>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<LandingLayout><NotFound /></LandingLayout>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
