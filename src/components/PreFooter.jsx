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


        {/* Column 4: Contact Us */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>store@dtu.ac.in</p>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;