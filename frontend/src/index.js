import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Summary from './dashboard/Summary';
import Holdings from './dashboard/Holdings';
import Positions from './dashboard/Positions';
import Orders from './dashboard/Orders';
import Funds from './dashboard/Funds';
import Analytics from './dashboard/Analytics';
import { useAuthStore } from './store/useAuthStore';

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

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {/* Toast notifications container */}
      <Toaster position="bottom-right" reverseOrder={false} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout><HomePage /></LandingLayout>} />
          <Route path="/signup" element={<LandingLayout><Signup /></LandingLayout>} />
          <Route path="/login" element={<LandingLayout><Login /></LandingLayout>} />
          <Route path="/about" element={<LandingLayout><AboutPage /></LandingLayout>} />
          <Route path="/product" element={<LandingLayout><ProductPage /></LandingLayout>} />
          <Route path="/pricing" element={<LandingLayout><PricingPage /></LandingLayout>} />
          <Route path="/support" element={<LandingLayout><SupportPage /></LandingLayout>} />
          
          {/* Nested subroutes for dashboard sections */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          <Route path="*" element={<LandingLayout><NotFound /></LandingLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
