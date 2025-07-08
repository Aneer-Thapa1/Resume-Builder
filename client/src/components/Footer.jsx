import React from "react";
import {
  FileText,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Github,
  ArrowRight,
  Heart,
  Shield,
  Zap,
  Sparkles,
  Star,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Resume Builder" },
      { name: "Templates" },
      { name: "Cover Letters" },
      { name: "Pricing" },
    ],
    resources: [
      { name: "Career Blog" },
      { name: "Resume Examples" },
      { name: "Job Search Tips" },
      { name: "Help Center" },
    ],
    company: [
      { name: "About Us" },
      { name: "Contact" },
      { name: "Testimonials" },
      { name: "Careers" },
    ],
    legal: [
      { name: "Privacy Policy" },
      { name: "Terms of Service" },
      { name: "Cookie Policy" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      gradient: "from-pink-500 to-purple-600",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      gradient: "from-gray-700 to-gray-900",
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");

        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }

        .nav-font {
          font-family: "Inter", sans-serif;
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
          animation: gradientShift 25s ease infinite;
        }

        .floating-animation {
          animation: float 8s ease-in-out infinite;
        }

        .link-hover {
          position: relative;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .link-hover .arrow {
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
        }

        .link-hover:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .social-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-hover:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .sparkle-animation {
          animation: sparkle 3s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(2deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
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

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(234, 88, 12, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(234, 88, 12, 0.5);
          }
        }
      `}</style>

      {/* Background */}
      <div className="gradient-bg absolute inset-0"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-16 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-orange-300/20 rounded-full floating-animation"></div>
        <div
          className="absolute bottom-60 left-16 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 lg:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/80 border border-white/20 px-4 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-orange-600 sparkle-animation" />
              <span className="nav-font text-sm font-medium text-gray-700">
                Stay Connected
              </span>
            </div>
            <h3 className="hero-text text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Success Community
            </h3>
            <p className="nav-font text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get weekly career insights, exclusive templates, and proven
              strategies.
              <span className="text-orange-600 font-semibold">
                {" "}
                Join 50,000+ professionals.
              </span>
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 bg-transparent border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 nav-font"
              />
              <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 nav-font shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="nav-font text-sm text-gray-500 text-center mt-3">
              No spam, unsubscribe anytime. 💝
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 border-t border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center pulse-glow">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="hero-text text-2xl font-bold text-gray-900">
                    ResumeForge
                  </h4>
                  <p className="nav-font text-sm text-orange-600 font-medium">
                    Professional Builder
                  </p>
                </div>
              </div>

              <p className="nav-font text-gray-600 mb-8 leading-relaxed">
                Empowering professionals worldwide to create stunning resumes
                that land dream jobs.
                <span className="text-orange-600 font-semibold">
                  {" "}
                  Your success story starts here.
                </span>
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600 nav-font">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm">anir234thapa@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 nav-font">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm">Dharan, Nepal</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="nav-font text-sm font-semibold text-gray-900 mb-4">
                  Follow Our Journey
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`social-hover w-10 h-10 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center text-white shadow-md`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product Links */}
              <div>
                <h5 className="hero-text text-lg font-bold text-gray-900 mb-6">
                  Product
                </h5>
                <ul className="space-y-4">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <span className="link-hover nav-font text-gray-600 hover:text-orange-600 font-medium cursor-pointer">
                        <span className="arrow text-orange-600">›</span>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h5 className="hero-text text-lg font-bold text-gray-900 mb-6">
                  Resources
                </h5>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <span className="link-hover nav-font text-gray-600 hover:text-orange-600 font-medium cursor-pointer">
                        <span className="arrow text-orange-600">›</span>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h5 className="hero-text text-lg font-bold text-gray-900 mb-6">
                  Company
                </h5>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <span className="link-hover nav-font text-gray-600 hover:text-orange-600 font-medium cursor-pointer">
                        <span className="arrow text-orange-600">›</span>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h5 className="hero-text text-lg font-bold text-gray-900 mb-6">
                  Legal
                </h5>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <span className="link-hover nav-font text-gray-600 hover:text-orange-600 font-medium cursor-pointer">
                        <span className="arrow text-orange-600">›</span>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 nav-font text-gray-600">
              <div className="flex items-center gap-2">
                <span>© {currentYear} ResumeForge. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in Nepal</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 nav-font text-gray-600">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2 nav-font text-gray-600">
                <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-3 h-3 text-yellow-600" />
                </div>
                <span className="text-sm font-medium">Fast</span>
              </div>
              <div className="flex items-center gap-2 nav-font text-gray-600">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
