import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
  Star,
  X,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FileText,
} from "lucide-react";

// Mock Template Components
const AcademicResearchTemplate = ({ data }) => (
  <div className="w-full h-full bg-white p-8 shadow-lg">
    <div className="border-b-2 border-blue-600 pb-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {data?.personalInfo?.name || "Your Name"}
      </h1>
      <p className="text-blue-600 text-lg">
        {data?.personalInfo?.email || "your.email@example.com"}
      </p>
    </div>
    <div className="space-y-6">
      {data?.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Research Focus
          </h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
      {data?.workExperience?.[0]?.company && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Experience</h2>
          {data.workExperience.map((exp, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold">
                {exp.position} at {exp.company}
              </h3>
              <p className="text-gray-600 text-sm">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ModernProfessionalTemplate = ({ data }) => (
  <div className="w-full h-full bg-white p-8 shadow-lg">
    <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 mb-6 rounded-lg">
      <h1 className="text-3xl font-bold">
        {data?.personalInfo?.name || "Your Name"}
      </h1>
      <p className="text-orange-100">
        {data?.personalInfo?.email || "your.email@example.com"}
      </p>
      <p className="text-orange-100">
        {data?.personalInfo?.phone || "Your Phone"}
      </p>
    </div>
    <div className="space-y-6">
      {data?.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-orange-600 pb-1">
            Summary
          </h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
      {data?.skills?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-orange-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const ResumeBuilder = () => {
  // Check for template parameter
  const urlParams = new URLSearchParams(window.location.search);
  const templateFromUrl = urlParams.get("template");

  const [selectedTemplate, setSelectedTemplate] = useState(templateFromUrl);
  const [showTemplateSelector, setShowTemplateSelector] = useState(
    !templateFromUrl
  );
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    skills: [],
    summary: "",
  });

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
      id: "modern-professional",
      name: "Modern Professional",
      description: "Contemporary design for modern careers",
      component: ModernProfessionalTemplate,
      gradient: "from-primary-600 to-primary-700",
      type: "ModernProfessionalTemplate",
      popular: true,
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Showcase your creative work",
      component: ModernProfessionalTemplate,
      gradient: "from-purple-600 to-pink-600",
      type: "CreativePortfolioTemplate",
      popular: true,
    },
    {
      id: "corporate-executive",
      name: "Corporate Executive",
      description: "Executive-level sophisticated design",
      component: AcademicResearchTemplate,
      gradient: "from-slate-700 to-slate-900",
      type: "CorporateExecutiveTemplate",
      popular: false,
    },
    {
      id: "minimalist-clean",
      name: "Minimalist Clean",
      description: "Less is more - clean and simple",
      component: AcademicResearchTemplate,
      gradient: "from-gray-600 to-gray-800",
      type: "MinimalistCleanTemplate",
      popular: false,
    },
    {
      id: "clean-sidebar",
      name: "Clean Sidebar",
      description: "Organized layout with sidebar",
      component: ModernProfessionalTemplate,
      gradient: "from-teal-600 to-cyan-700",
      type: "CleanSidebarTemplate",
      popular: true,
    },
  ];

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Work Experience", icon: Briefcase },
    { number: 3, title: "Education", icon: GraduationCap },
    { number: 4, title: "Skills", icon: Zap },
    { number: 5, title: "Summary", icon: FileText },
  ];

  // Template components mapping
  const templateComponents = {
    AcademicResearchTemplate,
    CreativePortfolioTemplate: ModernProfessionalTemplate,
    ModernProfessionalTemplate,
    CorporateExecutiveTemplate: AcademicResearchTemplate,
    MinimalistCleanTemplate: AcademicResearchTemplate,
    CleanSidebarTemplate: ModernProfessionalTemplate,
  };

  const SelectedTemplate =
    templateComponents[selectedTemplate] || ModernProfessionalTemplate;

  // Initialize session
  useEffect(() => {
    let id = localStorage.getItem("resumeSessionId");
    if (!id) {
      id =
        "resume_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("resumeSessionId", id);
    }
    setSessionId(id);
    loadResumeData(id);
  }, []);

  // Load existing resume data
  const loadResumeData = async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data.resumeData);
      }
    } catch (error) {
      console.log("No existing data found or error loading:", error);
    }
  };

  // Save resume data to backend
  const saveResumeData = async () => {
    if (!sessionId) return;
    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:8000/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          resumeData: formData,
          templateType: selectedTemplate,
        }),
      });
      if (response.ok) console.log("Resume saved successfully");
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save on form data change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sessionId) saveResumeData();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, sessionId]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.type);
    setShowTemplateSelector(false);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?template=${template.type}`
    );
  };

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.personalInfo.name && formData.personalInfo.email;
      case 2:
        return formData.workExperience.some(
          (exp) => exp.company && exp.position
        );
      case 3:
        return formData.education.some((edu) => edu.institution && edu.degree);
      case 4:
        return formData.skills.length > 0;
      case 5:
        return formData.summary.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Template Selector Component
  const TemplateSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");
        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }
        .nav-font {
          font-family: "Inter", sans-serif;
        }
        .floating-animation {
          animation: float 8s ease-in-out infinite;
        }
        .template-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .template-card:hover {
          transform: translateY(-8px) scale(1.02);
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/80 border border-white/20 px-4 py-2 rounded-full mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="nav-font text-sm font-medium text-gray-700">
              Choose Your Style
            </span>
          </div>

          <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Select Your Perfect
            <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {" "}
              Resume Template
            </span>
          </h1>

          <p className="nav-font text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Choose from our professionally designed templates that are loved by
            recruiters and optimized for ATS systems.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => {
            const TemplateComponent = template.component;
            return (
              <div
                key={template.id}
                className="template-card group cursor-pointer"
              >
                <div className="backdrop-blur-sm bg-white/90 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl">
                  {/* Popular Badge */}
                  {template.popular && (
                    <div className="flex justify-end mb-4">
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Template Preview */}
                  <div
                    className="h-64 bg-gray-100 rounded-xl overflow-hidden mb-6 relative group cursor-pointer"
                    onClick={() => setPreviewTemplate(template)}
                  >
                    <div
                      className="origin-top-left transform scale-50 w-full h-full"
                      style={{
                        transform: "scale(0.4)",
                        width: "250%",
                        height: "250%",
                      }}
                    >
                      <TemplateComponent data={formData} />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-xl px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                        <div className="flex items-center gap-2 text-gray-900 font-medium nav-font">
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="text-center">
                    <h3 className="hero-text text-xl font-bold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="nav-font text-gray-600 mb-6">
                      {template.description}
                    </p>

                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full bg-gradient-to-r ${template.gradient} text-white py-3 rounded-xl font-semibold nav-font hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1`}
                    >
                      Use This Template
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="hero-text text-2xl font-bold text-gray-900">
                  {previewTemplate.name}
                </h3>
                <p className="nav-font text-gray-600">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-gray-50 max-h-96 overflow-auto">
              <div className="bg-white rounded-lg shadow-sm">
                <div
                  style={{
                    width: "794px",
                    height: "400px",
                    overflow: "hidden",
                  }}
                >
                  <previewTemplate.component data={formData} />
                </div>
              </div>
            </div>
            <div className="p-6 flex justify-end gap-3 border-t">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors nav-font"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPreviewTemplate(null);
                  handleTemplateSelect(previewTemplate);
                }}
                className={`px-6 py-2 bg-gradient-to-r ${previewTemplate.gradient} text-white rounded-lg font-medium nav-font hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
              >
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Form Step Content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                Personal Information
              </h3>
              <p className="nav-font text-gray-600">
                Let's start with your basic details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      linkedin: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="linkedin.com/in/johnsmith"
                />
              </div>
              <div>
                <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.github}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      github: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="github.com/johnsmith"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                Skills
              </h3>
              <p className="nav-font text-gray-600">
                Add your professional skills
              </p>
            </div>

            <div>
              <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                Add Skills
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const skill = e.target.value.trim();
                      if (skill && !formData.skills.includes(skill)) {
                        updateFormData("skills", [...formData.skills, skill]);
                        e.target.value = "";
                      }
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    const skill = input.value.trim();
                    if (skill && !formData.skills.includes(skill)) {
                      updateFormData("skills", [...formData.skills, skill]);
                      input.value = "";
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 nav-font font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm nav-font"
                  >
                    {skill}
                    <button
                      onClick={() =>
                        updateFormData(
                          "skills",
                          formData.skills.filter((_, i) => i !== index)
                        )
                      }
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {formData.skills.length === 0 && (
                <p className="text-gray-500 text-sm mt-2 nav-font">
                  Add at least one skill to continue
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {React.createElement(steps[currentStep - 1]?.icon, {
                  className: "w-8 h-8 text-white",
                })}
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep - 1]?.title}
              </h3>
              <p className="nav-font text-gray-600">
                This step is being implemented...
              </p>
            </div>
          </div>
        );
    }
  };

  // Show template selector if no template is selected
  if (showTemplateSelector) {
    return <TemplateSelector />;
  }

  // Main Resume Builder
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");
        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }
        .nav-font {
          font-family: "Inter", sans-serif;
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Header */}
      <div className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="hero-text text-2xl font-bold text-gray-900">
                  Resume Builder
                </h1>
                <p className="nav-font text-gray-600">
                  Step {currentStep} of 5 - {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 nav-font text-sm text-gray-600">
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Auto-saved"}
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden px-4 py-2 glass-effect text-gray-700 rounded-xl hover:bg-white/70 transition-colors flex items-center gap-2 nav-font"
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium nav-font transition-all duration-300
                  ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg"
                      : "bg-white/70 text-gray-600 border border-gray-200"
                  }
                `}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 nav-font text-sm font-medium text-gray-700 hidden sm:block">
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                    w-16 h-1 mx-6 rounded-full transition-all duration-300
                    ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-orange-600 to-orange-700"
                        : "bg-gray-200"
                    }
                  `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`${!showPreview ? "lg:col-span-2" : ""}`}>
            <div className="glass-effect rounded-2xl p-8 shadow-xl">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-8 border-t border-white/20">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-white/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 nav-font font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 5 || !validateStep()}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 nav-font font-medium transform hover:-translate-y-0.5"
                >
                  {currentStep === 5 ? "Complete" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8">
              <div className="glass-effect rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="hero-text text-lg font-bold text-gray-900">
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span className="nav-font text-sm text-orange-600 font-medium">
                      Real-time
                    </span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <div
                    className="transform origin-top-left"
                    style={{
                      transform: "scale(0.5)",
                      width: "200%",
                      height: "600px",
                    }}
                  >
                    <SelectedTemplate data={formData} />
                  </div>
                </div>

                <p className="nav-font text-xs text-gray-500 mt-3 text-center">
                  Using{" "}
                  {selectedTemplate?.replace(/([A-Z])/g, " $1").trim() ||
                    "Default"}{" "}
                  template
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
