import React from 'react';
import './Updates.css';

const Updates = () => {
  return (
    <div className="updates-wrapper">
      <div className="updates-header">
        IMPORTANT UPDATES
      </div>
      <div className="updates-content">
        {/* For the scrolling effect, we use a simple marquee */}
        <marquee behavior="scroll" direction="up" scrollamount="2" style={{ height: '100%' }}>
          <ul>
            <li>
              <a href="#">tender passed</a>
            </li>
            <li>
              <a href="#">list of applicants</a>
            </li>
            <li>
              <a href="#">money spent on departments</a>
            </li>
             <li>
              <a href="#">department wise money alloted</a>
            </li>
          </ul>
        </marquee>
      </div>
    </div>
  );
};

export default Updates;