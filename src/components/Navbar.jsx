import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Hamburger icon for mobile */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>

        {/* Auction dropdown */}
        <li className="dropdown">
          <Link to="/auction" className="dropbtn" onClick={() => setMenuOpen(false)}>Auction ▾</Link>
          <div className="dropdown-content">
            <Link to="/auction/notice">Notice</Link>
            <Link to="/auction/guideline">Guideline</Link>
          </div>
        </li>

        {/* Download dropdown */}
        <li className="dropdown">
          <Link to="/download" className="dropbtn" onClick={() => setMenuOpen(false)}>Download ▾</Link>
          <div className="dropdown-content">
            <Link to="/download/sop">SOP</Link>
            <Link to="/download/guideline">Guideline</Link>
          </div>
        </li>

        <li><Link to="/staff" onClick={() => setMenuOpen(false)}>Staff</Link></li>
        <li><Link to="/policies" onClick={() => setMenuOpen(false)}>Policies</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
