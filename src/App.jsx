import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PricingSection from "./components/Pricing Section/PricingSection";

import "./App.css";

export default function App() {
  return (
    // <div className="app">
    //   {/* Navbar stays on top */}
    //   <Navbar />

    //   {/* Full width banner section (navbar sits above it) */}
    //   <section className="heroWrap">
    //     <div className="heroWrap__inner">
    //       <Hero />
    //     </div>
    //   </section>
    //         <PricingSection />

    // </div>

    <>
    
<Navbar/>

<Hero/>

<PricingSection/>

 
    
    
    </>
  );
}