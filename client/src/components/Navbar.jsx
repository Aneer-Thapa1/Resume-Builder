import React, { useState } from "react";
import {
  Menu,
  X,
  FileText,
  Sparkles,
  Layout,
  Star,
  Info,
  Zap,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Height of sticky navbar
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    closeMenu(); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Custom font styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

        .logo-font {
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .nav-font {
          font-family: "Poppins", "Inter", sans-serif;
          font-weight: 500;
        }

        .logo-icon {
          background: linear-gradient(
            135deg,
            #ea580c 0%,
            #c2410c 50%,
            #9a3412 100%
          );
          box-shadow: 0 4px 14px 0 rgba(234, 88, 12, 0.3);
        }

        .logo-text {
          background: linear-gradient(
            135deg,
            #1f2937 0%,
            #374151 50%,
            #111827 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Main navbar container */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo section */}
            <div className="flex items-center group cursor-pointer">
              <div className="logo-icon w-12 h-12 rounded-xl flex items-center justify-center mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <FileText size={22} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="logo-font logo-text text-2xl lg:text-3xl leading-none">
                  ResumeForge
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                  Professional Builder
                </span>
              </div>
            </div>

            {/* Desktop navigation links with centered hover bar */}
            <div className="hidden lg:flex items-center space-x-12">
              <button
                onClick={() => scrollToSection("features")}
                className="nav-font relative text-gray-600 hover:text-gray-900 font-medium text-sm tracking-wide  transition-all duration-200 hover:scale-105 group py-2"
              >
                Features
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-1/2"></span>
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="nav-font relative text-gray-600 hover:text-gray-900 font-medium text-sm tracking-wide  transition-all duration-200 hover:scale-105 group py-2"
              >
                Templates
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-1/2"></span>
              </button>
              <button
                onClick={() => scrollToSection("examples")}
                className="nav-font relative text-gray-600 hover:text-gray-900 font-medium text-sm tracking-wide  transition-all duration-200 hover:scale-105 group py-2"
              >
                Examples
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-1/2"></span>
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="nav-font relative text-gray-600 hover:text-gray-900 font-medium text-sm tracking-wide  transition-all duration-200 hover:scale-105 group py-2"
              >
                About
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-1/2"></span>
              </button>
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="nav-font bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-primary-700 hover:to-primary-800">
                Create Resume
              </button>
            </div>

            {/* Mobile menu toggle button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="relative w-12 h-12 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-sm"
                aria-label="Toggle navigation"
              >
                <div className="relative">
                  <Menu
                    size={22}
                    className={`text-gray-700 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-0 rotate-90"
                        : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    size={22}
                    className={`text-gray-700 absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-90"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div
            className={`lg:hidden transition-all duration-500 ease-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="py-8 border-t border-gray-100 bg-gradient-to-br from-white via-gray-50 to-primary-50/30 backdrop-blur-sm">
              {/* Mobile nav links with different icons */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => scrollToSection("features")}
                  className="group flex items-center px-6 py-4 text-gray-700 hover:text-primary-600 hover:bg-white/70 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="nav-font font-semibold text-base">
                      Features
                    </div>
                    <div className="text-xs text-gray-500">What we offer</div>
                  </div>
                  <Sparkles
                    size={18}
                    className="ml-auto text-success-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>

                <button
                  onClick={() => scrollToSection("templates")}
                  className="group flex items-center px-6 py-4 text-gray-700 hover:text-primary-600 hover:bg-white/70 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <Layout size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="nav-font font-semibold text-base">
                      Templates
                    </div>
                    <div className="text-xs text-gray-500">
                      Choose your style
                    </div>
                  </div>
                  <Sparkles
                    size={18}
                    className="ml-auto text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
                <button
                  onClick={() => scrollToSection("examples")}
                  className="group flex items-center px-6 py-4 text-gray-700 hover:text-primary-600 hover:bg-white/70 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-info-500 to-info-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <Star size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="nav-font font-semibold text-base">
                      Examples
                    </div>
                    <div className="text-xs text-gray-500">Get inspired</div>
                  </div>
                  <Sparkles
                    size={18}
                    className="ml-auto text-info-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className="group flex items-center px-6 py-4 text-gray-700 hover:text-primary-600 hover:bg-white/70 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                    <Info size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="nav-font font-semibold text-base">
                      About
                    </div>
                    <div className="text-xs text-gray-500">Learn more</div>
                  </div>
                  <Sparkles
                    size={18}
                    className="ml-auto text-warning-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
              </div>

              {/* Mobile buttons */}
              <div className="flex flex-col space-y-4 px-6">
                <button
                  onClick={() => scrollToSection("templates")}
                  className="nav-font w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Create Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
