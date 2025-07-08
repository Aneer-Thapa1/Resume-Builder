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
  Download,
  Printer,
  Share2,
  Check,
} from "lucide-react";

const ResumeBuilder = () => {
  // Check for template parameter
  const urlParams = new URLSearchParams(window.location.search);
  const templateFromUrl = urlParams.get("template");

  const [selectedTemplate, setSelectedTemplate] = useState(
    templateFromUrl || "modern-professional"
  );
  const [showTemplateSelector, setShowTemplateSelector] = useState(
    !templateFromUrl
  );
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
        responsibilities: [],
      },
    ],
    education: [
      {
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
    ],
    skills: [],
    summary: "",
    experience: [],
  });

  const templates = [
    {
      id: "academic-research",
      name: "Academic Research",
      description: "Perfect for researchers and academics",
      gradient: "from-blue-600 to-blue-800",
      type: "academic-research",
      popular: false,
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Showcase your creative work",
      gradient: "from-purple-600 to-pink-600",
      type: "creative-portfolio",
      popular: true,
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Contemporary design for modern careers",
      gradient: "from-orange-600 to-orange-700",
      type: "modern-professional",
      popular: true,
    },
    {
      id: "corporate-executive",
      name: "Corporate Executive",
      description: "Executive-level sophisticated design",
      gradient: "from-slate-700 to-slate-900",
      type: "corporate-executive",
      popular: false,
    },
    {
      id: "minimalist-clean",
      name: "Minimalist Clean",
      description: "Less is more - clean and simple",
      gradient: "from-gray-600 to-gray-800",
      type: "minimalist-clean",
      popular: false,
    },
    {
      id: "clean-sidebar",
      name: "Clean Sidebar",
      description: "Organized layout with sidebar",
      gradient: "from-teal-600 to-cyan-700",
      type: "clean-sidebar",
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

  // Simple Template Component for demonstration
  const ResumeTemplate = ({ resumeData }) => (
    <div className="bg-white p-8 min-h-[800px] font-sans">
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {resumeData.personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
        </div>
      </div>

      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {resumeData.workExperience.length > 0 &&
        resumeData.workExperience[0].company && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.position} at {exp.company}
                </h3>
                <p className="text-gray-600 mb-2">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

      {resumeData.education.length > 0 &&
        resumeData.education[0].institution && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-gray-600 mb-2">
                  {edu.institution} • {edu.startYear} - {edu.endYear}
                </p>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

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
      const response = await fetch(`http://localhost:8000/api/resumes/${id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setFormData(result.data);
        }
      }
    } catch (error) {
      console.log("No existing data found or error loading:", error);
    }
  };

  // Save resume data to backend
  const saveResumeData = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch("http://localhost:8000/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: sessionId,
          ...formData,
        }),
      });

      if (response.ok) {
        console.log("Resume saved successfully");
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      setIsSaving(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (
      Object.values(formData.personalInfo).some(
        (value) => value.trim() !== ""
      ) ||
      formData.workExperience.some((exp) => exp.company || exp.position) ||
      formData.education.some((edu) => edu.institution || edu.degree) ||
      formData.skills.length > 0 ||
      formData.summary.trim() !== ""
    ) {
      setIsSaving(true);
      const timeoutId = setTimeout(() => {
        if (sessionId) {
          saveResumeData();
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, sessionId]);

  // Export functions
  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      // First save the current data
      await saveResumeData();

      // Simulate PDF generation (in real app, you'd use libraries like jsPDF or Puppeteer)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For now, we'll create a simple HTML download
      const resumeContent = document.querySelector(".resume-preview");
      if (resumeContent) {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <title>${formData.personalInfo.name || "Resume"}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .resume-content { max-width: 8.5in; margin: 0 auto; }
              </style>
            </head>
            <body>
              <div class="resume-content">
                ${resumeContent.innerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsHTML = () => {
    const resumeHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${formData.personalInfo.name || "Resume"}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; }
            .contact-info { margin: 10px 0; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${formData.personalInfo.name || "Your Name"}</h1>
            <div class="contact-info">
              ${
                formData.personalInfo.email
                  ? `<p>Email: ${formData.personalInfo.email}</p>`
                  : ""
              }
              ${
                formData.personalInfo.phone
                  ? `<p>Phone: ${formData.personalInfo.phone}</p>`
                  : ""
              }
              ${
                formData.personalInfo.location
                  ? `<p>Location: ${formData.personalInfo.location}</p>`
                  : ""
              }
            </div>
            
            ${
              formData.summary
                ? `
              <h2>Summary</h2>
              <p>${formData.summary}</p>
            `
                : ""
            }
            
            ${
              formData.workExperience.some((exp) => exp.company)
                ? `
              <h2>Work Experience</h2>
              ${formData.workExperience
                .map(
                  (exp) => `
                <div class="experience-item">
                  <h3>${exp.position} at ${exp.company}</h3>
                  <p><em>${exp.startDate} - ${
                    exp.current ? "Present" : exp.endDate
                  }</em></p>
                  ${exp.description ? `<p>${exp.description}</p>` : ""}
                </div>
              `
                )
                .join("")}
            `
                : ""
            }
            
            ${
              formData.education.some((edu) => edu.institution)
                ? `
              <h2>Education</h2>
              ${formData.education
                .map(
                  (edu) => `
                <div class="education-item">
                  <h3>${edu.degree}</h3>
                  <p><em>${edu.institution} • ${edu.startYear} - ${
                    edu.endYear
                  }</em></p>
                  ${edu.description ? `<p>${edu.description}</p>` : ""}
                </div>
              `
                )
                .join("")}
            `
                : ""
            }
            
            ${
              formData.skills.length > 0
                ? `
              <h2>Skills</h2>
              <div class="skills">
                ${formData.skills
                  .map((skill) => `<span class="skill">${skill}</span>`)
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([resumeHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.personalInfo.name || "resume"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Form update function
  const updateFormData = (section, data) => {
    setFormData((prev) => {
      const newData = { ...prev, [section]: data };

      // Handle name splitting for template compatibility
      if (section === "personalInfo" && data.name) {
        const nameParts = data.name.split(" ");
        newData.personalInfo.firstName = nameParts[0] || "";
        newData.personalInfo.lastName = nameParts.slice(1).join(" ") || "";
      }

      // Mirror workExperience as experience for template compatibility
      if (section === "workExperience") {
        newData.experience = data.map((exp) => ({
          id: exp.id || Date.now() + Math.random(),
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
          responsibilities: exp.description ? [exp.description] : [],
          location: exp.location || "",
        }));
      }

      // Fix education data for template compatibility
      if (section === "education") {
        newData.education = data.map((edu) => ({
          id: edu.id || Date.now() + Math.random(),
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || edu.degree,
          startDate: edu.startYear ? `${edu.startYear}-09` : "",
          endDate: edu.endYear ? `${edu.endYear}-05` : "",
          startYear: edu.startYear,
          endYear: edu.endYear,
          description: edu.description,
          gpa: edu.gpa,
        }));
      }

      return newData;
    });
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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.type);
    setShowTemplateSelector(false);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?template=${template.type}`
    );
  };

  // Add work experience entry
  const addWorkExperience = () => {
    updateFormData("workExperience", [
      ...formData.workExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
        responsibilities: [],
      },
    ]);
  };

  // Remove work experience entry
  const removeWorkExperience = (index) => {
    updateFormData(
      "workExperience",
      formData.workExperience.filter((_, i) => i !== index)
    );
  };

  // Add education entry
  const addEducation = () => {
    updateFormData("education", [
      ...formData.education,
      {
        institution: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        description: "",
        gpa: "",
      },
    ]);
  };

  // Remove education entry
  const removeEducation = (index) => {
    updateFormData(
      "education",
      formData.education.filter((_, i) => i !== index)
    );
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
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Select Your Perfect
            <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {" "}
              Resume Template
            </span>
          </h1>
          <p className="nav-font text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group cursor-pointer">
              <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {template.popular && (
                  <div className="flex justify-end mb-4">
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                )}

                <div className="h-48 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">{template.name}</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="hero-text text-xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="nav-font text-gray-600 mb-6">
                    {template.description}
                  </p>
                  <button
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full bg-gradient-to-r ${template.gradient} text-white py-3 rounded-xl font-semibold nav-font hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    Use This Template
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) =>
                    updateFormData("personalInfo", {
                      ...formData.personalInfo,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font transition-all duration-200"
                  placeholder="Software Engineer"
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

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                Work Experience
              </h3>
              <p className="nav-font text-gray-600">
                Add your professional experience
              </p>
            </div>

            {formData.workExperience.map((experience, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">
                    Experience {index + 1}
                  </h4>
                  {formData.workExperience.length > 1 && (
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font disabled:bg-gray-100"
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
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`current-${index}`}
                    className="ml-2 nav-font text-sm text-gray-700"
                  >
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={experience.description}
                    onChange={(e) => {
                      const newExperience = [...formData.workExperience];
                      newExperience[index].description = e.target.value;
                      updateFormData("workExperience", newExperience);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addWorkExperience}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 px-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2 nav-font"
            >
              <Plus className="w-5 h-5" />
              Add Another Experience
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                Education
              </h3>
              <p className="nav-font text-gray-600">
                Add your educational background
              </p>
            </div>

            {formData.education.map((education, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">
                    Education {index + 1}
                  </h4>
                  {formData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
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
                        updateFormData("education", newEducation);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    rows="3"
                    value={education.description}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].description = e.target.value;
                      updateFormData("education", newEducation);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                    placeholder="Relevant coursework, achievements, etc."
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 px-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2 nav-font"
            >
              <Plus className="w-5 h-5" />
              Add Another Education
            </button>
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

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="hero-text text-2xl font-bold text-gray-900 mb-2">
                Professional Summary
              </h3>
              <p className="nav-font text-gray-600">
                Write a brief summary about yourself
              </p>
            </div>

            <div>
              <label className="block nav-font text-sm font-medium text-gray-700 mb-2">
                Summary *
              </label>
              <textarea
                rows="6"
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent nav-font"
                placeholder="Write a compelling summary that highlights your experience, skills, and career objectives..."
              />
              <p className="text-sm text-gray-500 mt-2 nav-font">
                {formData.summary.length}/500 characters
              </p>
            </div>

            {/* Export Options */}
            {currentStep === 5 && validateStep() && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                <h4 className="hero-text text-lg font-bold text-green-900 mb-4">
                  🎉 Your Resume is Ready!
                </h4>
                <p className="nav-font text-green-700 mb-4">
                  Congratulations! You've completed all sections. You can now
                  export your resume.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={exportAsPDF}
                    disabled={isExporting}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-6 rounded-xl font-semibold nav-font hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating PDF...
                      </>
                    ) : exportSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        PDF Ready!
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export as PDF
                      </>
                    )}
                  </button>

                  <button
                    onClick={exportAsHTML}
                    className="flex-1 bg-white border-2 border-orange-600 text-orange-600 py-3 px-6 rounded-xl font-semibold nav-font hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as HTML
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold nav-font hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
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
                <span
                  className={`transition-colors ${
                    isSaving ? "text-orange-600" : "text-green-600"
                  }`}
                >
                  {isSaving ? "Saving..." : "Auto-saved"}
                </span>
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium nav-font transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg"
                      : "bg-white/70 text-gray-600 border border-gray-200"
                  }`}
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
                    className={`w-16 h-1 mx-6 rounded-full transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-orange-600 to-orange-700"
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

                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white resume-preview">
                  <div
                    className="transform origin-top-left"
                    style={{
                      transform: "scale(0.5)",
                      width: "200%",
                      height: "600px",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ width: "100%", height: "1200px" }}>
                      <ResumeTemplate resumeData={formData} />
                    </div>
                  </div>
                </div>

                <p className="nav-font text-xs text-gray-500 mt-3 text-center">
                  Using{" "}
                  {selectedTemplate
                    ?.replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase()) || "Default"}{" "}
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
