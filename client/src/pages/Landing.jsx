import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TemplatesSection from "../components/TemplateSection";
import BuildingExample from "../components/Example";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

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

      {/* Example section */}
      <BuildingExample />

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
