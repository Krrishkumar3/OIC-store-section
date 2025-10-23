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
              <a href="#">Notification: Annual Fee structure for the students seeking admissions.</a>
            </li>
            <li>
              <a href="#">Notification: R.1(B).17 revised Grading System.</a>
            </li>
            <li>
              <a href="#">Information regarding Travel grant for PG/Ph.D students.</a>
            </li>
             <li>
              <a href="#">Course Code for SEC/VAC/AEC of Integrated BSc-MSc.</a>
            </li>
          </ul>
        </marquee>
      </div>
    </div>
  );
};

export default Updates;