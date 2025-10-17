import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">DTU</h2>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Admissions</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
