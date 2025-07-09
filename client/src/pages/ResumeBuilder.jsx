import React, { useState, useEffect, useRef } from "react";
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
  Download,
  Printer,
  Check,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Import your actual template components
import AcademicResearchTemplate from "../components/AcademicResearchTemplate";
import CreativePortfolioTemplate from "../components/CreativePortfolioTemplate";
import ModernProfessionalTemplate from "../components/ModernProfessionalTemplate";
import CorporateExecutiveTemplate from "../components/CorporateExecutiveTemplate";
import MinimalistCleanTemplate from "../components/MinimalistCleanTemplate";
import CleanSidebarTemplate from "../components/CleanSidebarTemplate";

const ResumeBuilder = () => {
  const printRef = useRef();

  // Get template from URL
  const urlParams = new URLSearchParams(window.location.search);
  const templateFromUrl = urlParams.get("template");

  // State
  const [selectedTemplate, setSelectedTemplate] = useState(
    templateFromUrl || "ModernProfessionalTemplate"
  );
  const [showTemplateSelector, setShowTemplateSelector] = useState(
    !templateFromUrl
  );
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [resumeId, setResumeId] = useState(null);

  // Enhanced form data structure matching template expectations
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "John Smith",
      firstName: "John",
      lastName: "Smith",
      title: "Software Engineer",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johnsmith",
      github: "github.com/johnsmith",
      website: "johnsmith.dev",
    },
    workExperience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Developer",
        startDate: "2020-01",
        endDate: "2024-01",
        location: "New York, NY",
        description:
          "Led development of web applications using React and Node.js.\nManaged a team of 5 developers.\nImproved system performance by 40%.\nCollaborated with cross-functional teams.",
        responsibilities: [
          "Led development of web applications using React and Node.js",
          "Managed a team of 5 developers",
          "Improved system performance by 40%",
          "Collaborated with cross-functional teams",
        ],
        current: false,
      },
    ],
    education: [
      {
        id: 1,
        institution: "State University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016-09",
        endDate: "2020-05",
        startYear: "2016",
        endYear: "2020",
        description: "Graduated with honors, 3.8 GPA",
        gpa: "3.8",
      },
    ],
    skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "AWS"],
    summary:
      "Experienced software developer with 4+ years in full-stack development. Passionate about creating scalable web applications and leading development teams.",
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06",
      },
    ],
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

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Experience", icon: Briefcase },
    { number: 3, title: "Education", icon: GraduationCap },
    { number: 4, title: "Skills", icon: Zap },
    { number: 5, title: "Summary", icon: FileText },
  ];

  // Transform form data to match template expectations
  const transformDataForTemplate = (formData) => {
    const nameParts = formData.personalInfo?.name?.split(" ") || [
      "John",
      "Smith",
    ];

    return {
      personalInfo: {
        firstName: nameParts[0] || "John",
        lastName: nameParts.slice(1).join(" ") || "Smith",
        title: formData.personalInfo?.title || "Professional",
        email: formData.personalInfo?.email || "",
        phone: formData.personalInfo?.phone || "",
        location: formData.personalInfo?.location || "",
        linkedin: formData.personalInfo?.linkedin || "",
        website:
          formData.personalInfo?.website || formData.personalInfo?.github || "",
      },
      summary: formData.summary || "",
      experience:
        formData.workExperience?.map((exp, index) => ({
          id: index + 1,
          company: exp.company || "",
          position: exp.position || "",
          location: exp.location || formData.personalInfo?.location || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "",
          current: exp.current || false,
          responsibilities: exp.description
            ? exp.description.split("\n").filter((line) => line.trim())
            : exp.responsibilities || [],
        })) || [],
      education:
        formData.education?.map((edu, index) => ({
          id: index + 1,
          institution: edu.institution || "",
          degree: edu.degree || "",
          field: edu.field || "Computer Science",
          startDate: edu.startDate || `${edu.startYear}-09`,
          endDate: edu.endDate || `${edu.endYear}-05`,
          gpa: edu.gpa || "",
        })) || [],
      skills: formData.skills || [],
      certifications: formData.certifications || [],
    };
  };

  // Get selected template component
  const selectedTemplateData = templates.find(
    (t) => t.type === selectedTemplate
  );
  const SelectedTemplateComponent =
    selectedTemplateData?.component || ModernProfessionalTemplate;

  // Transform data for template
  const templateData = transformDataForTemplate(formData);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.type);
    setShowTemplateSelector(false);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?template=${template.type}`
    );
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

  const addWorkExperience = () => {
    updateFormData("workExperience", [
      ...formData.workExperience,
      {
        id: formData.workExperience.length + 1,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        responsibilities: [],
        current: false,
      },
    ]);
  };

  const removeWorkExperience = (index) => {
    if (formData.workExperience.length > 1) {
      updateFormData(
        "workExperience",
        formData.workExperience.filter((_, i) => i !== index)
      );
    }
  };

  const addEducation = () => {
    updateFormData("education", [
      ...formData.education,
      {
        id: formData.education.length + 1,
        institution: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        startDate: "",
        endDate: "",
        description: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      updateFormData(
        "education",
        formData.education.filter((_, i) => i !== index)
      );
    }
  };

  const addSkill = (skillInput) => {
    const skill = skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      updateFormData("skills", [...formData.skills, skill]);
      return true;
    }
    return false;
  };

  const removeSkill = (index) => {
    updateFormData(
      "skills",
      formData.skills.filter((_, i) => i !== index)
    );
  };

  const exportToPDF = () => {
    window.print();
  };

  // Template Selector Component
  const TemplateSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <style>{`
        .hero-text { font-family: "Space Grotesk", sans-serif; }
        .body-text { font-family: "Inter", sans-serif; }
        .glass { backdrop-filter: blur(20px); }
        .gradient-text {
          background: linear-gradient(45deg, #ea580c, #f59e0b, #eab308);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass bg-orange-100/50 border border-orange-200/50 px-6 py-3 rounded-full mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="body-text text-sm font-medium text-orange-800">
              Professional Templates
            </span>
          </div>

          <h1 className="hero-text text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="gradient-text block"> Resume Template</span>
          </h1>

          <p className="body-text text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Professional resume templates designed to get you hired by top
            companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => {
            const TemplateComponent = template.component;
            return (
              <div
                key={template.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
              >
                <div className="glass bg-white/80 border border-orange-200/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500">
                  {template.popular && (
                    <div className="flex justify-end mb-4">
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <Star className="w-3 h-3" />
                        POPULAR
                      </div>
                    </div>
                  )}

                  <div
                    className="h-72 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden mb-6 relative cursor-pointer shadow-lg transform group-hover:scale-105 transition-all duration-500"
                    onClick={() => setPreviewTemplate(template)}
                  >
                    <div
                      className="origin-top-left transform"
                      style={{
                        transform: "scale(0.35)",
                        width: "285%",
                        height: "285%",
                      }}
                    >
                      <TemplateComponent
                        data={templateData}
                        resumeData={templateData}
                        colorScheme="orange"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="glass bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <div className="flex items-center gap-3 text-gray-900 font-bold">
                          <Eye className="w-5 h-5 text-orange-600" />
                          <span>Preview Template</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="hero-text text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                      {template.name}
                    </h3>
                    <p className="body-text text-gray-600 mb-6 leading-relaxed">
                      {template.description}
                    </p>

                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full py-4 rounded-2xl font-bold body-text text-lg transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-r ${template.gradient} text-white shadow-lg flex items-center justify-center gap-3 group`}
                    >
                      <span>Use This Template</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-orange-700 body-text">
            <Zap className="w-5 h-5 text-orange-600" />
            <span>All templates are ATS-optimized and recruiter-approved</span>
          </div>
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="glass bg-white/95 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-200">
              <div>
                <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                  {previewTemplate.name}
                </h3>
                <p className="body-text text-gray-600 text-lg">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 bg-gray-50 max-h-96 overflow-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div
                  style={{
                    width: "794px",
                    height: "500px",
                    overflow: "hidden",
                  }}
                >
                  <previewTemplate.component
                    data={templateData}
                    resumeData={templateData}
                    colorScheme="orange"
                  />
                </div>
              </div>
            </div>
            <div className="p-8 flex justify-end gap-4 border-t border-gray-200">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-8 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors body-text font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPreviewTemplate(null);
                  handleTemplateSelect(previewTemplate);
                }}
                className={`px-8 py-3 rounded-xl font-bold body-text transition-all duration-300 bg-gradient-to-r ${previewTemplate.gradient} text-white hover:shadow-xl flex items-center gap-2`}
              >
                <span>Use Template</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Form step content renderer
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                Personal Information
              </h3>
              <p className="body-text text-gray-600 text-lg">
                Let's start with your basic details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  key: "name",
                  label: "Full Name",
                  type: "text",
                  required: true,
                },
                {
                  key: "title",
                  label: "Job Title",
                  type: "text",
                  required: false,
                },
                {
                  key: "email",
                  label: "Email Address",
                  type: "email",
                  required: true,
                },
                {
                  key: "phone",
                  label: "Phone Number",
                  type: "tel",
                  required: false,
                },
                {
                  key: "location",
                  label: "Location",
                  type: "text",
                  required: false,
                },
                {
                  key: "linkedin",
                  label: "LinkedIn URL",
                  type: "url",
                  required: false,
                },
                {
                  key: "github",
                  label: "GitHub URL",
                  type: "url",
                  required: false,
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.personalInfo[field.key] || ""}
                    onChange={(e) => {
                      const updatedPersonalInfo = {
                        ...formData.personalInfo,
                        [field.key]: e.target.value,
                      };

                      if (field.key === "name") {
                        const nameParts = e.target.value.split(" ");
                        updatedPersonalInfo.firstName = nameParts[0] || "";
                        updatedPersonalInfo.lastName =
                          nameParts.slice(1).join(" ") || "";
                      }

                      updateFormData("personalInfo", updatedPersonalInfo);
                    }}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200 hover:border-gray-300"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                Work Experience
              </h3>
              <p className="body-text text-gray-600 text-lg">
                Tell us about your professional journey
              </p>
            </div>

            {formData.workExperience.map((experience, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-2xl p-6 space-y-6 hover:border-orange-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Experience {index + 1}
                  </h4>
                  {formData.workExperience.length > 1 && (
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => {
                        const newExperience = [...formData.workExperience];
                        newExperience[index].company = e.target.value;
                        updateFormData("workExperience", newExperience);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => {
                        const newExperience = [...formData.workExperience];
                        newExperience[index].position = e.target.value;
                        updateFormData("workExperience", newExperience);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => {
                        const newExperience = [...formData.workExperience];
                        newExperience[index].startDate = e.target.value;
                        updateFormData("workExperience", newExperience);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={experience.endDate}
                      disabled={experience.current}
                      onChange={(e) => {
                        const newExperience = [...formData.workExperience];
                        newExperience[index].endDate = e.target.value;
                        updateFormData("workExperience", newExperience);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={experience.current}
                    onChange={(e) => {
                      const newExperience = [...formData.workExperience];
                      newExperience[index].current = e.target.checked;
                      if (e.target.checked) {
                        newExperience[index].endDate = "";
                      }
                      updateFormData("workExperience", newExperience);
                    }}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`current-${index}`}
                    className="ml-3 body-text text-gray-700 font-medium"
                  >
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                    Description (Use new lines for bullet points)
                  </label>
                  <textarea
                    rows="4"
                    value={experience.description}
                    onChange={(e) => {
                      const newExperience = [...formData.workExperience];
                      newExperience[index].description = e.target.value;
                      newExperience[index].responsibilities = e.target.value
                        ? e.target.value
                            .split("\n")
                            .filter((line) => line.trim())
                        : [];
                      updateFormData("workExperience", newExperience);
                    }}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                    placeholder="• Led development of web applications using React and Node.js&#10;• Managed a team of 5 developers&#10;• Improved system performance by 40%"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addWorkExperience}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-6 px-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-3 body-text font-medium hover:bg-orange-50"
            >
              <Plus className="w-6 h-6" />
              Add Another Experience
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                Education
              </h3>
              <p className="body-text text-gray-600 text-lg">
                Share your educational background
              </p>
            </div>

            {formData.education.map((education, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-2xl p-6 space-y-6 hover:border-orange-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Education {index + 1}
                  </h4>
                  {formData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].institution = e.target.value;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Degree *
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].degree = e.target.value;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].field = e.target.value;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={education.gpa}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].gpa = e.target.value;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      Start Year
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2030"
                      value={education.startYear}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].startYear = e.target.value;
                        newEducation[index].startDate = `${e.target.value}-09`;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                      End Year
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2030"
                      value={education.endYear}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].endYear = e.target.value;
                        newEducation[index].endDate = `${e.target.value}-05`;
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block body-text text-sm font-semibold text-gray-700 mb-3">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={education.description}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].description = e.target.value;
                      updateFormData("education", newEducation);
                    }}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                    placeholder="Relevant coursework, achievements, honors..."
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-6 px-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-3 body-text font-medium hover:bg-orange-50"
            >
              <Plus className="w-6 h-6" />
              Add Another Education
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                Skills & Expertise
              </h3>
              <p className="body-text text-gray-600 text-lg">
                Showcase your professional abilities
              </p>
            </div>

            <div>
              <label className="block body-text text-sm font-semibold text-gray-700 mb-4">
                Add Your Skills
              </label>
              <div className="flex gap-3 mb-6">
                <input
                  id="skillInput"
                  type="text"
                  placeholder="Type a skill and press Enter or click Add"
                  className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const skill = e.target.value.trim();
                      if (addSkill(skill)) {
                        e.target.value = "";
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById("skillInput");
                    const skill = input.value.trim();
                    if (addSkill(skill)) {
                      input.value = "";
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 body-text font-bold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-4 py-2 rounded-full body-text font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-orange-600 hover:text-red-600 hover:bg-red-100 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>

              {formData.skills.length === 0 && (
                <div className="text-center py-8 bg-orange-50 rounded-xl border-2 border-dashed border-orange-200">
                  <Zap className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <p className="text-orange-600 body-text">
                    No skills added yet. Add your first skill above!
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="hero-text text-3xl font-bold text-gray-900 mb-2">
                Professional Summary
              </h3>
              <p className="body-text text-gray-600 text-lg">
                Write a compelling summary that captures your essence
              </p>
            </div>

            <div>
              <label className="block body-text text-sm font-semibold text-gray-700 mb-4">
                Professional Summary *
              </label>
              <textarea
                rows="8"
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 body-text transition-all duration-200 text-lg leading-relaxed"
                placeholder="Write a compelling summary that highlights your experience, skills, and career objectives. Make it engaging and specific to your industry..."
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500 body-text">
                  {formData.summary.length}/500 characters recommended
                </p>
                <div className="flex items-center gap-2">
                  {formData.summary.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-orange-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Looking good!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {validateStep() && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h4 className="hero-text text-2xl font-bold text-orange-900 mb-3">
                  🎉 Resume Complete!
                </h4>
                <p className="body-text text-orange-700 mb-6 text-lg">
                  Congratulations! Your professional resume is ready to impress
                  employers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={exportToPDF}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-xl font-bold body-text hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-bold body-text hover:bg-orange-50 transition-all duration-300"
                  >
                    <Printer className="w-5 h-5" />
                    Print Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (showTemplateSelector) {
    return <TemplateSelector />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <style>{`
        .hero-text { font-family: "Space Grotesk", sans-serif; }
        .body-text { font-family: "Inter", sans-serif; }
        .glass { backdrop-filter: blur(20px); }
      `}</style>

      {/* Header */}
      <div className="glass bg-white/80 border-b border-orange-200/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="p-3 hover:bg-orange-50 rounded-xl transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="hero-text text-3xl font-bold text-gray-900">
                  Resume Builder
                </h1>
                <p className="body-text text-gray-600 text-lg">
                  Step {currentStep} of 5 - {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden px-4 py-3 glass bg-white/50 text-gray-700 rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-2 body-text font-medium"
              >
                {showPreview ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
                {showPreview ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass bg-white/60 border-b border-orange-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold body-text transition-all duration-500 shadow-lg ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-orange-600 to-amber-700 text-white scale-110"
                      : "bg-white/80 text-gray-600 border-2 border-gray-200"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-4 body-text font-semibold text-gray-700 hidden sm:block">
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-2 mx-8 rounded-full transition-all duration-500 ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-orange-600 to-amber-700"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className={`${!showPreview ? "lg:col-span-2" : ""}`}>
            <div className="glass bg-white/90 rounded-3xl p-10 shadow-2xl border border-orange-200/20">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-100">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 body-text font-bold text-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 5 || !validateStep()}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 body-text font-bold text-lg transform hover:-translate-y-1"
                >
                  {currentStep === 5 ? "Complete Resume" : "Next Step"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8">
              <div className="glass bg-white/90 rounded-3xl p-8 shadow-2xl border border-orange-200/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="hero-text text-2xl font-bold text-gray-900">
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="body-text text-sm text-orange-600 font-bold">
                      REAL-TIME
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner">
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                    style={{ height: "600px" }}
                  >
                    <div
                      ref={printRef}
                      className="overflow-auto h-full"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#ea580c #f3f4f6",
                      }}
                    >
                      <div
                        style={{
                          transform: "scale(0.75)",
                          transformOrigin: "top left",
                          width: "133.33%",
                          minHeight: "800px",
                        }}
                      >
                        <SelectedTemplateComponent
                          data={templateData}
                          resumeData={templateData}
                          colorScheme="orange"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <p className="body-text text-sm text-gray-500 mb-2">
                      Using{" "}
                      <span className="font-bold text-gray-700">
                        {selectedTemplateData?.name}
                      </span>{" "}
                      template
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>ATS-Optimized</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowTemplateSelector(true)}
                      className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors body-text font-medium border border-orange-200"
                    >
                      Change Template
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 body-text font-medium flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                  </div>
                </div>

                <div className="mt-6 bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-700 font-medium">
                      Resume Progress
                    </span>
                    <span className="text-orange-600">
                      {Math.round((currentStep / 5) * 100)}% Complete
                    </span>
                  </div>
                  <div className="mt-2 bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .overflow-auto::-webkit-scrollbar { width: 6px; }
        .overflow-auto::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .overflow-auto::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 3px; }
        .overflow-auto::-webkit-scrollbar-thumb:hover { background: #c2410c; }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
