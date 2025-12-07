import React from "react";
import { Link } from "react-router-dom";
import "./PreFooter.css";

const PreFooter = () => {
  return (
    <div className="oic-main-footer"> {/* The main wrapper for the deep blue section */}
      <div className="footer-content-cols">
        {/* Column 1: Office of International Affairs (Text/Address) */}
        <div className="footer-col">
          <h4>OIC-store-section</h4>
          <p>Delhi Technological University,</p>
          <p>Admin Block, Ground Floor,</p>
          <p>Bawana Road, 110042, New Delhi</p>
        </div>

        {/* Column 2: Permalinks */}
        <div className="footer-col">
          <h4>Permalinks</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Other links */}
        <div className="footer-col">
          <h4>Other links</h4>
          <ul>
            <li><a href="https://iccr.gov.in/" target="_blank" rel="noopener noreferrer">ICCR portal</a></li>
            <li><a href="https://dtu.admission.nic.in/" target="_blank" rel="noopener noreferrer">DTU admission portal</a></li>
            <li><a href="https://dasa.nic.in/" target="_blank" rel="noopener noreferrer">DASA portal</a></li>
            <li><a href="#">How to Apply</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>oia@dtu.ac.in</p>
          <p>international.dtu@dtu.ac.in</p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;