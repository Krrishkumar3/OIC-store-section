import React from 'react';
import './Navbar.css'; // Don't forget to create Navbar.css
 // Assuming you save the image as dtu-logo.png in the same directory

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/dtu-logo.png" alt="DTU Logo" className="dtu-logo" />
        <div className="brand-text">
          <span className="university-name">Delhi Technological University</span>
          <span className="department-name">OIC store section</span>
        </div>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="https://dtu.ac.in/" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link">About Us</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Policies</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;