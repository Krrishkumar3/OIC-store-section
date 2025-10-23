import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <img
          src="/dtu-logo.png"
          alt="Delhi Technological University Logo"
          className="logo-img"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://dtu.ac.in/images/logo.png'; }}
        />
        <div className="logo-text">
          <h1>Delhi Technological University</h1>
          <p>OIC store section</p>
        </div>
      </div>
      <div className="nav-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Policies</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;