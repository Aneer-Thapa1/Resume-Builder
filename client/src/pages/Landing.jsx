import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TemplatesSection from "../components/TemplateSection";

const Landing = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Hero section */}
      <HeroSection />

      {/* Feature Section */}
      <FeaturesSection />

      {/* Templates Section */}
      <TemplatesSection />
    </div>
  );
};

export default Landing;
