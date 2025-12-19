import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page-container">
      <h1 className="contact-main-heading">Contact Us</h1>
      
      <div className="contact-card">
        

        {/* Right Side: Detailed Contact Information */}
        <div className="contact-details-box">
          <h2 className="officer-title">OIC Store Section</h2>
          
          <div className="address-info">
            <strong>Delhi Technological University</strong><br />
            Admn. Building<br />
            Shahbad Daulatpur, Bawana Road,<br />
            Delhi-110042
          </div>

          <div className="contact-links">
            <p><strong>Email:</strong> <a href="mailto:store@dtu.ac.in">store@dtu.ac.in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}