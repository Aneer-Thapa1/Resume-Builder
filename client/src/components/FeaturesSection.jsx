import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Zap,
  Users,
  Download,
  Eye,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Preview",
      description:
        "Watch your resume come to life as you type. See exactly how your final resume will look with instant updates.",
      gradient: "from-primary-500 to-primary-700",
      bgColor: "bg-primary-50",
      iconBg: "bg-primary-100",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Smart Validation",
      description:
        "Built-in validation ensures your resume is error-free. We check formats, dates, and required fields automatically.",
      gradient: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Step Process",
      description:
        "Break down resume building into manageable steps. Focus on one section at a time for better results.",
      gradient: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Ready",
      description:
        "Download your resume in multiple formats. Print-ready PDFs that look professional every time.",
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Live Updates",
      description:
        "See changes instantly as you edit. No surprises - what you see is exactly what you get.",
      gradient: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Storage",
      description:
        "Your information is safe with us. Secure backend storage with enterprise-grade protection.",
      gradient: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }

        .nav-font {
          font-family: "Poppins", sans-serif;
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

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
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
      `}</style>

      <section
        id="features"
        className="gradient-bg py-16 lg:py-24 relative overflow-hidden"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-primary-600" />
              <span className="nav-font text-sm font-medium text-gray-700">
                100% Free Features
              </span>
            </div> */}

            <h2 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Why{" "}
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                ResumeForge?
              </span>
            </h2>

            <p className="nav-font text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Built with cutting-edge technology to give you the best resume
              building experience. Fast, secure, and completely free forever.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`
                  feature-card relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl h-full
                  glass-effect border border-gray-200/50
                  ${
                    hoveredCard === index
                      ? `${feature.bgColor} border-gray-300`
                      : ""
                  }
                `}
                >
                  {/* Icon container */}
                  <div
                    className={`
                    inline-flex p-4 rounded-xl lg:rounded-2xl mb-6 transition-all duration-300
                    ${
                      hoveredCard === index
                        ? `bg-gradient-to-r ${feature.gradient}`
                        : feature.iconBg
                    }
                    ${hoveredCard === index ? "scale-110 shadow-lg" : ""}
                  `}
                  >
                    <div
                      className={`${
                        hoveredCard === index ? "text-white" : "text-gray-700"
                      } transition-colors duration-300`}
                    >
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="hero-text text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="nav-font text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Hover arrow */}
                  <div
                    className={`
                    absolute bottom-6 right-6 transform transition-all duration-300
                    ${
                      hoveredCard === index
                        ? "translate-x-0 opacity-100"
                        : "translate-x-2 opacity-0"
                    }
                  `}
                  >
                    <ArrowRight className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-primary-600 mb-6">
              <span className="nav-font text-sm font-medium">
                No signup required • Start building instantly • 100% free
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
