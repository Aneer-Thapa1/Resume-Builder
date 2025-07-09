import React, { useState, useEffect } from "react";
import { ArrowRight, X, Eye, Zap, Star, Sparkles } from "lucide-react";

// Import your actual template components
import AcademicResearchTemplate from "./AcademicResearchTemplate";
import CreativePortfolioTemplate from "./CreativePortfolioTemplate";
import ModernProfessionalTemplate from "./ModernProfessionalTemplate";
import CorporateExecutiveTemplate from "./CorporateExecutiveTemplate";
import MinimalistCleanTemplate from "./MinimalistCleanTemplate";
import CleanSidebarTemplate from "./CleanSidebarTemplate";

const TemplatesSection = () => {
  const [previewMode, setPreviewMode] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const templates = [
    {
      id: "academic-research",
      name: "Academic Research",
      description: "Perfect for researchers and academics",
      component: AcademicResearchTemplate,
      gradient: "from-blue-600 to-blue-800",
      type: "AcademicResearchTemplate",
      popular: false,
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Showcase your creative work",
      component: CreativePortfolioTemplate,
      gradient: "from-purple-600 to-pink-600",
      type: "CreativePortfolioTemplate",
      popular: true,
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Contemporary design for modern careers",
      component: ModernProfessionalTemplate,
      gradient: "from-orange-600 to-orange-700",
      type: "ModernProfessionalTemplate",
      popular: true,
    },
    {
      id: "corporate-executive",
      name: "Corporate Executive",
      description: "Executive-level sophisticated design",
      component: CorporateExecutiveTemplate,
      gradient: "from-slate-700 to-slate-900",
      type: "CorporateExecutiveTemplate",
      popular: false,
    },
    {
      id: "minimalist-clean",
      name: "Minimalist Clean",
      description: "Less is more - clean and simple",
      component: MinimalistCleanTemplate,
      gradient: "from-gray-600 to-gray-800",
      type: "MinimalistCleanTemplate",
      popular: false,
    },
    {
      id: "clean-sidebar",
      name: "Clean Sidebar",
      description: "Organized layout with sidebar",
      component: CleanSidebarTemplate,
      gradient: "from-teal-600 to-cyan-700",
      type: "CleanSidebarTemplate",
      popular: true,
    },
  ];

  const handleUseTemplate = (templateType) => {
    window.open(`/resume-builder?template=${templateType}`, "_blank");
  };

  const TemplateCard = ({ template }) => {
    const isHovered = hoveredTemplate === template.id;
    const TemplateComponent = template.component;

    return (
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHoveredTemplate(template.id)}
        onMouseLeave={() => setHoveredTemplate(null)}
        onClick={() => setPreviewMode(template.id)}
      >
        <div className="relative backdrop-blur-sm bg-white/95 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          {/* Popular Badge */}
          {template.popular && (
            <div className="absolute -top-2 -right-2 z-10">
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                <Star className="w-3 h-3" />
                Popular
              </div>
            </div>
          )}

          {/* Template Preview */}
          <div
            className={`
              relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden transition-all duration-500 mb-6
              ${isHovered ? "scale-105 shadow-lg" : "scale-100"}
            `}
          >
            <div className="absolute inset-0">
              <div
                className="origin-top-left"
                style={{
                  transform: "scale(0.35)",
                  width: "285%",
                  height: "285%",
                }}
              >
                <div className="w-full max-w-4xl bg-white shadow-sm">
                  <TemplateComponent />
                </div>
              </div>
            </div>

            {/* Hover overlay with enhanced effects */}
            <div
              className={`
                absolute inset-0 bg-black/0 transition-all duration-500 flex items-center justify-center
                ${isHovered ? "bg-black/40 backdrop-blur-sm" : ""}
              `}
            >
              <div
                className={`
                  bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 transition-all duration-500 border border-white/20 shadow-lg
                  ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-2"
                  }
                `}
              >
                <div className="flex items-center gap-2 text-gray-900 font-medium">
                  <Eye className="w-5 h-5" />
                  <span>Preview Template</span>
                </div>
              </div>
            </div>

            {/* Animated corner accent */}
            <div
              className={`absolute top-4 left-4 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Template Info with enhanced styling */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
              {template.name}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {template.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUseTemplate(template.type);
              }}
              className={`
                w-full py-3 rounded-xl font-semibold transition-all duration-300
                bg-gradient-to-r ${template.gradient} text-white
                hover:shadow-lg transform hover:-translate-y-1 active:scale-95
                flex items-center justify-center gap-2 group
              `}
            >
              <span>Use This Template</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FullPreviewModal = ({ template }) => {
    if (!template) return null;

    const TemplateComponent = template.component;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl w-fit max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
          {/* Enhanced Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {template.name}
                </h3>
                {template.popular && (
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                )}
              </div>
              <p className="text-gray-600">{template.description}</p>
            </div>
            <button
              onClick={() => setPreviewMode(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Template Preview with better styling */}
          <div className="px-6 pb-4 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                style={{
                  width: "794px",
                  height: "600px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <TemplateComponent />
              </div>
            </div>
          </div>

          {/* Enhanced Actions */}
          <div className="p-6 flex justify-between items-center border-t border-gray-100 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-orange-600" />
              <span>ATS-optimized design</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(null)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPreviewMode(null);
                  handleUseTemplate(template.type);
                }}
                className={`
                  px-6 py-2 rounded-lg font-semibold transition-all duration-300
                  bg-gradient-to-r ${template.gradient} text-white hover:shadow-lg
                  flex items-center gap-2 transform hover:-translate-y-0.5
                `}
              >
                <span>Use Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");
        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }
        .body-text {
          font-family: "Inter", sans-serif;
        }
        .floating-animation {
          animation: float 8s ease-in-out infinite;
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
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-orange-300/20 rounded-full floating-animation"></div>
        <div
          className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="hero-text text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {" "}
              Resume Template
            </span>
          </h2>

          <p className="body-text text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Professional resume templates designed to get you hired by top
            companies
          </p>
        </div>

        {/* Enhanced Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 body-text">
            <Zap className="w-4 h-4 text-orange-600" />
            <span>All templates are ATS-optimized and recruiter-approved</span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewMode && (
        <FullPreviewModal
          template={templates.find((t) => t.id === previewMode)}
        />
      )}
    </section>
  );
};

export default TemplatesSection;
