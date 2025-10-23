import React from 'react';
import './VCMessage.css';
// 1. IMPORT the image from the assets folder.
//    Make sure the filename 'vc-photo.jpg' is correct.
import vcPhoto from '../assets/vc-photo.jpg'; 

const VCMessage = () => {
  return (
    <div className="vc-message-wrapper">
      <div className="vc-photo-container">
        {/* 2. USE the imported variable in the src attribute. */}
        <img 
          src={vcPhoto}
          alt="Prof. Prateek Sharma, Vice Chancellor of DTU"
        />
      </div>
      <div className="vc-text-container">
        <p className="vc-quote-icon">“</p>
        <h2>Prof. Prateek Sharma</h2>
        <h3>Vice Chancellor, Delhi Technological University</h3>
        <p>
          Delhi Technological University (DTU), formerly Delhi College of Engineering, has a distinguished legacy of over 84 years in delivering high-quality education, pioneering research, and fostering innovation. Our resolve remains to produce competent, industry-ready professionals across diverse disciplines including engineering, technology, management, and finance. Our academic programs are designed to provide a strong foundation in core principles, complemented by hands-on projects, research opportunities, and holistic development initiatives that nurture both technical competence and leadership qualities.
        </p>
        <p>
          To our valued industry partners, I extend an invitation to collaborate with DTU's skilled and motivated student cohort. We are confident that our graduates will contribute meaningfully to your organizations, both in technical capability and professional conduct.
        </p>
        <p>
          To our students, I encourage you to make the most of the opportunities that come through the Department of T&P. I am sure that all of you will carry forward DTU's legacy with integrity, adaptability, and a deep sense of responsibility. Let your knowledge and values guide you in shaping a better future for yourself and for society.
        </p>
      </div>
    </div>
  );
};

export default VCMessage;