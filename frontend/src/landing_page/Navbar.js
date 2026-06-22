import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg border-bottom px-7 py-3"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="col-1"></div>
        <Link className="navbar-brand ms-5 px-5" to="/">
          <img style={{ width: "30%" }} src="/media/logo.svg" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-7 active px-4 fw-light text-primary" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link fs-7 active px-4 fw-light btn btn-link" 
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'none', textDecoration: 'none', boxShadow: 'none' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active fs-7 px-4 fw-light" aria-current="page" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fs-7 px-4 fw-light" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item ">
              <Link className="nav-link fs-7 active px-4 fw-light" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-7 active px-4 fw-light" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-7 active px-4 fw-light" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-7 active px-4 fw-light" to="/support">
                Support
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center px-4">
                <MenuIcon style={{ fontSize: "24px", cursor: "pointer" }} />
            </li>
          </ul>
        </div>
        <div className="col-1"></div>
      </nav>
    </>
  );
}
