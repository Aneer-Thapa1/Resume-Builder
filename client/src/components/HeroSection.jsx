import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  Download,
  Users,
  Star,
  CheckCircle,
  MousePointer,
} from "lucide-react";

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const animatedWords = [
    { text: "Dream Resume", color: "from-primary-500 to-primary-700" },
    { text: "Perfect CV", color: "from-blue-500 to-blue-700" },
    { text: "Pro Profile", color: "from-purple-500 to-purple-700" },
    { text: "Career Success", color: "from-green-500 to-green-700" },
  ];

  useEffect(() => {
    const word = animatedWords[currentWordIndex].text;

    const timer = setTimeout(
      () => {
        if (!isDeleting && currentText === word) {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        } else if (!isDeleting) {
          // Typing
          setCurrentText(word.substring(0, currentText.length + 1));
        } else {
          // Deleting
          setCurrentText(word.substring(0, currentText.length - 1));
        }
      },
      isDeleting ? 100 : 150
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {/* Custom styles for animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }

        .nav-font {
          font-family: "Poppins", sans-serif;
        }

        .typing-cursor {
          border-right: 3px solid;
          animation: blink 1s infinite;
        }

        .typing-text {
          transition: all 0.2s ease;
        }

        @keyframes blink {
          0%,
          50% {
            border-color: transparent;
          }
          51%,
          100% {
            border-color: currentColor;
          }
        }

        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .gradient-bg {
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #f1f5f9 25%,
            #fef7ed 50%,
            #fdf2f8 75%,
            #f8fafc 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .resume-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
          will-change: transform;
        }

        .resume-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .custom-cursor {
          position: absolute;
          width: 28px;
          height: 28px;
          background: #ea580c;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          transform: translate(-50%, -50%);
          transition: none;
          display: ${isHovering ? "flex" : "none"};
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(234, 88, 12, 0.4);
        }

        .cursor-tooltip {
          position: absolute;
          left: 35px;
          top: -8px;
          background: bg-primary-600;
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          font-family: "Poppins", sans-serif;
        }

        .cursor-tooltip::before {
          content: "";
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 4px solid rgba(0, 0, 0, 0.8);
        }

        .hero-section {
          height: calc(100vh - 80px);
          max-height: calc(100vh - 80px);
          overflow: hidden;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(2deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1deg);
          }
          75% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (max-width: 1024px) {
          .hero-section {
            height: auto;
            max-height: none;
            min-height: calc(100vh - 80px);
            overflow: visible;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="hero"
        className="gradient-bg hero-section flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 lg:w-80 lg:h-80 bg-primary-200 rounded-full opacity-20 floating-animation"></div>
          <div
            className="absolute -bottom-32 -left-32 w-72 h-72 lg:w-96 lg:h-96 bg-blue-200 rounded-full opacity-20 floating-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 left-2/3 w-48 h-48 lg:w-64 lg:h-64 bg-purple-200 rounded-full opacity-10 floating-animation"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 w-full">
          {/* Left Column - Content */}
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-primary-600" />
              <span className="nav-font text-sm font-medium text-gray-700">
                Professional Resume Builder
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Build Your
                <br />
                <span className="inline-block min-h-[1.2em] relative">
                  <span
                    className={`typing-text typing-cursor bg-gradient-to-r ${animatedWords[currentWordIndex].color} bg-clip-text text-transparent`}
                  >
                    {currentText}
                  </span>
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-600">
                  in Minutes
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="nav-font text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-xl mx-auto lg:mx-0">
              Create stunning, ATS-friendly resumes with our intuitive builder.
              <span className="text-primary-600 font-semibold">
                {" "}
                Land your dream job
              </span>{" "}
              with professional templates designed by experts.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 py-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary-600" />
                <span className="nav-font font-semibold text-gray-900">
                  100K+
                </span>
                <span className="nav-font text-gray-600 text-sm">
                  Resumes Created
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-500" />
                <span className="nav-font font-semibold text-gray-900">
                  4.8/5
                </span>
                <span className="nav-font text-gray-600 text-sm">
                  User Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                <span className="nav-font font-semibold text-gray-900">
                  100%
                </span>
                <span className="nav-font text-gray-600 text-sm">Free</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3 justify-center lg:justify-start">
              <button className="nav-font group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Create Resume Now
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="nav-font group glass-effect text-gray-700 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold text-base lg:text-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
                <Play size={16} />
                View Templates
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 lg:pt-6 border-t border-gray-200/50">
              <p className="nav-font text-sm text-gray-500 mb-3 text-center lg:text-left">
                Join thousands of professionals who got hired at top companies
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 lg:gap-6 opacity-60">
                <div className="nav-font text-lg lg:text-xl font-bold text-gray-400">
                  Netflix
                </div>
                <div className="nav-font text-lg lg:text-xl font-bold text-gray-400">
                  Nike
                </div>
                <div className="nav-font text-lg lg:text-xl font-bold text-gray-400">
                  McKinsey
                </div>
                <div className="nav-font text-lg lg:text-xl font-bold text-gray-400">
                  Goldman Sachs
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Preview */}
          <div className="relative mt-8 lg:mt-0 ">
            {/* Custom Cursor */}
            <div
              className="custom-cursor"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            >
              <MousePointer size={14} className="text-white " />
              <div className="cursor-tooltip bg-primary-500">Make Your Now</div>
            </div>

            {/* Main Resume Preview */}
            <div
              className="resume-card glass-effect rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg lg:text-xl">
                      JD
                    </span>
                  </div>
                  <div>
                    <h3 className="nav-font text-xl lg:text-2xl font-bold text-gray-900">
                      John Doe
                    </h3>
                    <p className="nav-font text-primary-600 font-medium text-sm lg:text-base">
                      Digital Marketing Manager
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600">
                  <div className="nav-font">📧 John.Doe@email.com</div>
                  <div className="nav-font">📱 +1 (555) 987-6543</div>
                  <div className="nav-font">📍 New York, NY</div>
                  <div className="nav-font">🔗 linkedin.com/in/JohnDoe1</div>
                </div>

                {/* Experience */}
                <div className="space-y-3 lg:space-y-4">
                  <h4 className="nav-font text-base lg:text-lg font-semibold text-gray-900 border-b border-primary-200 pb-2">
                    Experience
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="nav-font font-semibold text-gray-900 text-sm lg:text-base">
                          Digital Marketing Manager
                        </h5>
                        <span className="nav-font text-xs lg:text-sm text-gray-500">
                          2022-2024
                        </span>
                      </div>
                      <p className="nav-font text-primary-600 text-xs lg:text-sm mb-2">
                        Creative Media Agency
                      </p>
                      <p className="nav-font text-gray-600 text-xs lg:text-sm leading-relaxed">
                        Led multi-channel marketing campaigns that increased
                        brand awareness by 85% and generated $2.3M in revenue.
                        Managed social media strategy across 5 platforms.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="nav-font font-semibold text-gray-900 text-sm lg:text-base">
                          Marketing Specialist
                        </h5>
                        <span className="nav-font text-xs lg:text-sm text-gray-500">
                          2020-2022
                        </span>
                      </div>
                      <p className="nav-font text-primary-600 text-xs lg:text-sm mb-2">
                        TechStart Solutions
                      </p>
                      <p className="nav-font text-gray-600 text-xs lg:text-sm leading-relaxed">
                        Developed content marketing strategies that boosted
                        organic traffic by 150%. Coordinated product launches
                        and managed email campaigns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="nav-font text-base lg:text-lg font-semibold text-gray-900 border-b border-primary-200 pb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Google Analytics",
                      "SEO/SEM",
                      "Social Media",
                      "Content Strategy",
                      "Adobe Creative Suite",
                      "Email Marketing",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="nav-font bg-primary-100 text-primary-700 px-2 lg:px-3 py-1 rounded-lg text-xs lg:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h4 className="nav-font text-base lg:text-lg font-semibold text-gray-900 border-b border-primary-200 pb-2">
                    Education
                  </h4>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="nav-font font-semibold text-gray-900 text-sm lg:text-base">
                        Marketing & Communications, B.A.
                      </h5>
                      <span className="nav-font text-xs lg:text-sm text-gray-500">
                        2016-2020
                      </span>
                    </div>
                    <p className="nav-font text-primary-600 text-xs lg:text-sm">
                      New York University
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 glass-effect p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg pulse-animation">
              <Download size={18} className="text-primary-600 lg:w-6 lg:h-6" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
