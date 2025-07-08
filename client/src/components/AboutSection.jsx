import React from "react";
import { Heart, Users, Sparkles, ArrowRight, Star } from "lucide-react";

const EmotionalAboutSection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");

        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }

        .nav-font {
          font-family: "Inter", sans-serif;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #fef7ed 50%, #fdf2f8 75%, #f8fafc 100%);
          background-size: 400% 400%;
          animation: gradientShift 25s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .floating-heart {
          animation: floatHeart 6s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .typing-dots {
          animation: typing 1.4s infinite;
        }

        .typing-dots:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dots:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes floatHeart {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(1deg); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0%, 100% { 
        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-effect rounded-3xl p-8 lg:p-12 max-w-3xl mx-auto">
            <h3 className="hero-text text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your Success Story?
            </h3>opacity: 1; 
            transform: scale(1);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
          }
        }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in-left {
          animation: slideInFromLeft 0.8s ease-out;
        }

        .slide-in-right {
          animation: slideInFromRight 0.8s ease-out;
        }
      `}</style>

      <div className="gradient-bg absolute inset-0"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 floating-heart"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-15 floating-heart"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-25 floating-heart"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-8">
            <Heart className="w-4 h-4 text-primary-600 pulse-glow" />
            <span className="nav-font text-sm font-medium text-gray-700">
              From Our Heart to Yours
            </span>
          </div>

          <h2 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Your Dream Job is Just
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              {" "}
              One Resume Away
            </span>
          </h2>

          <p className="nav-font text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We know that behind every resume is a real person with real dreams,
            fears, and hopes.
            <span className="text-primary-600 font-semibold">
              {" "}
              You matter, and your story deserves to be told beautifully.
            </span>
          </p>
        </div>

        {/* Emotional Journey Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="card-hover glass-effect rounded-3xl p-8 text-center slide-in-left">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">😰</span>
            </div>
            <h3 className="hero-text text-xl font-bold text-gray-900 mb-4">
              We Know It's Scary
            </h3>
            <p className="nav-font text-gray-600 leading-relaxed">
              Staring at a blank page, wondering if you're good enough. The fear
              of rejection, the impostor syndrome.
              <span className="text-primary-600 font-medium">
                {" "}
                We've all been there, and it's okay to feel this way.
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="card-hover glass-effect rounded-3xl p-8 text-center"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">💪</span>
            </div>
            <h3 className="hero-text text-xl font-bold text-gray-900 mb-4">
              You're Stronger Than You Think
            </h3>
            <p className="nav-font text-gray-600 leading-relaxed">
              Every challenge you've overcome, every skill you've learned, every
              small victory counts.
              <span className="text-green-600 font-medium">
                {" "}
                Your journey has prepared you for this moment.
              </span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="card-hover glass-effect rounded-3xl p-8 text-center slide-in-right">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="hero-text text-xl font-bold text-gray-900 mb-4">
              Your Moment is Now
            </h3>
            <p className="nav-font text-gray-600 leading-relaxed">
              Someone out there is looking for exactly what you bring to the
              table.
              <span className="text-primary-600 font-medium">
                {" "}
                Let's help you shine and show them who you really are.
              </span>
            </p>
          </div>
        </div>

        {/* Personal Message */}
        <div className="glass-effect rounded-3xl p-8 lg:p-12 text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            </div>

            <h3 className="hero-text text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              A Personal Message From Our Team
            </h3>

            <div className="bg-gradient-to-r from-primary-50 to-orange-50 border-l-4 border-primary-400 rounded-lg p-6 mb-8">
              <p className="nav-font text-lg text-gray-700 leading-relaxed italic">
                "We built this tool because we remember our own struggles with
                job applications. The sleepless nights, the endless rejections,
                the feeling that we weren't enough. But here's what we learned:
                <span className="font-semibold text-primary-600">
                  {" "}
                  you are enough, you always have been.{" "}
                </span>
                Sometimes you just need the right way to tell your story."
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <Users className="w-6 h-6 text-gray-600" />
              <span className="nav-font text-gray-600">
                — The team behind your success
              </span>
            </div>
          </div>
        </div>

        <p className="nav-font text-lg text-gray-600 mb-8 leading-relaxed text-center">
          Your future self is waiting. That dream job, that career breakthrough,
          that moment when everything clicks — <br />
          <span className="text-primary-600 font-semibold">
            {" "}
            it all starts with taking this first step.
          </span>
        </p>
      </div>
    </section>
  );
};

export default EmotionalAboutSection;
