import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-text-area">
            <h1>Store Section</h1>
            <p>
              DTU envisions a holistic and dynamic education in science, technology, design, and
              management that shapes students into responsible contributors of the industry, society
              and nation
            </p>
          </div>
          <div className="hero-buttons-area">
            <button className="hero-button">Work <span className="arrow">›</span></button>
            <button className="hero-button">Students <span className="arrow">›</span></button>
            <button className="hero-button">Co-ordinators <span className="arrow">›</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
