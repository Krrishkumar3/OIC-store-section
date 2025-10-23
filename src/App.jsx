import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VCMessage from './components/VCMessage'; // <-- Make sure it's imported
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <VCMessage /> {/* <-- And make sure it's placed here */}
      <Footer />
    </>
  );
}

export default App;