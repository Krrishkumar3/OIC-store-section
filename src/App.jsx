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
  <VCMessage imageSrc={'/prateeksharmadtu.png'} /> {/* render VC image from public/prateeksharmadtu.png */}
      <Footer />
    </>
  );
}

export default App;