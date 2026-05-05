import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PlansIntro from "./components/PlansIntro/PlansIntro";
import PricingSection from "./components/Pricing Section/PricingSection";
import PurposeHalls from "./components/PurposeHalls/PurposeHalls";
import CommunitySection from "./components/Community/CommunitySection";
import WhyWorkHall from "./components/WhyWorkHall/WhyWorkHall";
import WorkhallLocationsMap from "./components/WorkhallLocations/WorkhallLocationsMap";
import FeaturesTicker from "./components/FeaturesTicker/FeaturesTicker";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

import "./App.css";

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <FeaturesTicker />
      <PlansIntro />
      <PricingSection />
      <PurposeHalls />
      <CommunitySection />
      <WhyWorkHall />
      <Testimonials />
      <WorkhallLocationsMap />
      <Footer />
    </main>
  );
}
