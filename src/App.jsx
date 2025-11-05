import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VCMessage from "./components/VCMessage";
import Footer from "./components/Footer";

import Auction from "./pages/Auction";
import Download from "./pages/Download";
import SOP from "./pages/SOP";
import AuctionNotice from "./pages/AuctionNotice";
import AuctionGuideline from "./pages/AuctionGuideline";
import DownloadGuideline from "./pages/DownloadGuideline";
import Staff from "./pages/Staff";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";

import "./App.css"; // 👈 Make sure this import is here

function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <VCMessage imageSrc={"/prateeksharmadtu.png"} />
              </>
            }
          />

          {/* Auction and its subsections */}
          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/notice" element={<AuctionNotice />} />
          <Route path="/auction/guideline" element={<AuctionGuideline />} />

          {/* Download and its subsections */}
          <Route path="/download" element={<Download />} />
          <Route path="/download/sop" element={<SOP />} />
          <Route path="/download/guideline" element={<DownloadGuideline />} />

          {/* Other pages */}
          <Route path="/staff" element={<Staff />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
