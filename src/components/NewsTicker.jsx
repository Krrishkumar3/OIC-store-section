import React from 'react';
import Marquee from 'react-fast-marquee';
import './NewsTicker.css';

const NewsTicker = () => {
  const notifications = [
    "Welcome to OIC Store Section of Delhi Technological University!",
    "Course Code for SEC/VAC/AEC of Integrated BSc MSc announced",
    "Withdrawal of admission of students admitted in DTU from B.Tech. Program in Academic Year 2025-26",
    "Scholarship schemes for Under Graduate Courses available",
    "Check OIC store for latest inventory updates and new arrivals"
  ];

  return (
    <div className="news-ticker">
      <h2 className="news-header">Important Updates</h2>
      <Marquee 
        speed={50} 
        gradient={false}
        className="marquee-container"
      >
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <p>📢 {notification}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;