import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">STORE SECION DTU</h2>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Policies</li>
        <li>Query</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
}
