import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PricingSection from "./components/Pricing Section/PricingSection";
import WorkspaceJourney from "./components/WorkspaceJourney/WorkspaceJourney";

import "./App.css";

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <PricingSection />
      <WorkspaceJourney />
    </main>
  );
}
