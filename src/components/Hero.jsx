import React from 'react';
import Updates from './Updates'; // Make sure you have this component
import ImageSlider from './ImageSlider'; // Create this component for the slider
import './Hero.css'; // We will style the layout here

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="slider-container">
        {/* The Image Slider will go here */}
        <ImageSlider />
      </div>
      <div className="updates-container">
        {/* The Important Updates section will go here */}
        <Updates />
      </div>
    </div>
  );
};

export default Hero;