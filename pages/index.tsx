// pages/index.tsx
import Countdown from "@/components/countdown";
import Fireworks from "@/components/fireworks";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        <Countdown />
        <Fireworks />
      </div>
      <Footer />
    </>
  );
};

export default Home;