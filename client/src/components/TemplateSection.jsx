import React, { useState, useEffect } from "react";
import { ArrowRight, X, Eye, Zap } from "lucide-react";

// Import your actual template components
import AcademicResearchTemplate from "../components/AcademicResearchTemplate";
import CreativePortfolioTemplate from "../components/CreativePortfolioTemplate";
import ModernProfessionalTemplate from "../components/ModernProfessionalTemplate";
import CorporateExecutiveTemplate from "../components/CorporateExecutiveTemplate";
import MinimalistCleanTemplate from "../components/MinimalistCleanTemplate";
import CleanSidebarTemplate from "../components/CleanSidebarTemplate";

const EnhancedTemplatesSection = () => {
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
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Showcase your creative work",
      component: CreativePortfolioTemplate,
      gradient: "from-purple-600 to-pink-600",
      type: "CreativePortfolioTemplate",
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Contemporary design for modern careers",
      component: ModernProfessionalTemplate,
      gradient: "from-blue-600 to-indigo-700",
      type: "ModernProfessionalTemplate",
    },
    {
      id: "corporate-executive",
      name: "Corporate Executive",
      description: "Executive-level sophisticated design",
      component: CorporateExecutiveTemplate,
      gradient: "from-slate-700 to-slate-900",
      type: "CorporateExecutiveTemplate",
    },
    {
      id: "minimalist-clean",
      name: "Minimalist Clean",
      description: "Less is more - clean and simple",
      component: MinimalistCleanTemplate,
      gradient: "from-gray-600 to-gray-800",
      type: "MinimalistCleanTemplate",
    },
    {
      id: "clean-sidebar",
      name: "Clean Sidebar",
      description: "Organized layout with sidebar",
      component: CleanSidebarTemplate,
      gradient: "from-teal-600 to-cyan-700",
      type: "CleanSidebarTemplate",
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
        <div className="relative">
          {/* Template Preview */}
          <div
            className={`
            relative h-72 bg-gray-100 rounded-2xl overflow-hidden transition-all duration-300
            ${isHovered ? "scale-105" : "scale-100"}
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
                <div className="w-full max-w-4xl bg-white">
                  <TemplateComponent />
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div
              className={`
              absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center
              ${isHovered ? "bg-black/40" : ""}
            `}
            >
              <div
                className={`
                bg-white rounded-xl px-6 py-3 transition-all duration-300
                ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
              >
                <div className="flex items-center gap-2 text-gray-900 font-medium">
                  <Eye size={18} />
                  <span>Preview</span>
                </div>
              </div>
            </div>
          </div>

          {/* Template Info */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {template.name}
            </h3>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUseTemplate(template.type);
              }}
              className={`
                w-full py-3 rounded-xl font-medium transition-all duration-300
                bg-gradient-to-r ${template.gradient} text-white
                hover:opacity-90 flex items-center justify-center gap-2
              `}
            >
              <span>Use Template</span>
              <ArrowRight size={18} />
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-fit max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {template.name}
              </h3>
              <p className="text-gray-600 mt-1">{template.description}</p>
            </div>
            <button
              onClick={() => setPreviewMode(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Template Preview */}
          <div className="px-6 pb-4 bg-gray-50">
            <div className="bg-white  overflow-hidden ">
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

          {/* Actions */}
          <div className="p-6 flex justify-end gap-3">
            <button
              onClick={() => setPreviewMode(null)}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setPreviewMode(null);
                handleUseTemplate(template.type);
              }}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-300
                bg-gradient-to-r ${template.gradient} text-white hover:opacity-90
                flex items-center gap-2
              `}
            >
              <span>Use Template</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h2>
          <p className="text-xl text-gray-600">
            Professional resume templates designed to get you hired
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
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

export default EnhancedTemplatesSection;
