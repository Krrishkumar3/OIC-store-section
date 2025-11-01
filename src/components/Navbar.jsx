import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img
          src="/dtu-logo.png"
          alt="DTU Logo"
          className="logo"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://dtu.ac.in/images/logo.png";
          }}
        />
        <div className="logo-text">
          <h1>Delhi Technological University</h1>
          <p>OIC Store Section</p>
        </div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {/* Auction dropdown */}
        <li className="dropdown">
          <Link to="/auction" className="dropbtn">Auction ▾</Link>
          <div className="dropdown-content">
            <Link to="/auction/notice">Notice</Link>
            <Link to="/auction/guideline">Guideline</Link>
          </div>
        </li>

        {/* Download dropdown */}
        <li className="dropdown">
          <Link to="/download" className="dropbtn">Download ▾</Link>
          <div className="dropdown-content">
            <Link to="/download/sop">SOP</Link>
            <Link to="/download/guideline">Guideline</Link>
          </div>
        </li>

        <li><Link to="/staff">Staff</Link></li>
        <li><Link to="/policies">Policies</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
