import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Save, Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Import your template components
import AcademicResearchTemplate from "../components/AcademicResearchTemplate";
import CreativePortfolioTemplate from "../components/CreativePortfolioTemplate";
import ModernProfessionalTemplate from "../components/ModernProfessionalTemplate";
import CorporateExecutiveTemplate from "../components/CorporateExecutiveTemplate";
import MinimalistCleanTemplate from "../components/MinimalistCleanTemplate";
import CleanSidebarTemplate from "../components/CleanSidebarTemplate";

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const templateType =
    searchParams.get("template") || "ModernProfessionalTemplate";

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

  // Template components mapping
  const templateComponents = {
    AcademicResearchTemplate,
    CreativePortfolioTemplate,
    ModernProfessionalTemplate,
    CorporateExecutiveTemplate,
    MinimalistCleanTemplate,
    CleanSidebarTemplate,
  };

  const SelectedTemplate =
    templateComponents[templateType] || ModernProfessionalTemplate;

  // Generate or retrieve session ID
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
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          resumeData: formData,
          templateType,
        }),
      });

      if (response.ok) {
        console.log("Resume saved successfully");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save on form data change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sessionId) {
        saveResumeData();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData, sessionId]);

  const steps = [
    { number: 1, title: "Personal Information" },
    { number: 2, title: "Work Experience" },
    { number: 3, title: "Education" },
    { number: 4, title: "Skills" },
    { number: 5, title: "Summary" },
  ];

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false,
        },
      ],
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          startYear: "",
          endYear: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addSkill = (skill) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="linkedin.com/in/johnsmith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="github.com/johnsmith"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Work Experience
              </h3>
              <button
                onClick={addWorkExperience}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Experience
              </button>
            </div>
            {formData.workExperience.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    Experience {index + 1}
                  </h4>
                  {formData.workExperience.length > 1 && (
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...formData.workExperience];
                        updated[index].company = e.target.value;
                        updateFormData("workExperience", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="TechCorp Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const updated = [...formData.workExperience];
                        updated[index].position = e.target.value;
                        updateFormData("workExperience", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...formData.workExperience];
                        updated[index].startDate = e.target.value;
                        updateFormData("workExperience", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => {
                        const updated = [...formData.workExperience];
                        updated[index].endDate = e.target.value;
                        updateFormData("workExperience", updated);
                      }}
                      disabled={exp.current}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].current = e.target.checked;
                          if (e.target.checked) {
                            updated[index].endDate = "";
                          }
                          updateFormData("workExperience", updated);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        Currently working here
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...formData.workExperience];
                      updated[index].description = e.target.value;
                      updateFormData("workExperience", updated);
                    }}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Education
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    Education {index + 1}
                  </h4>
                  {formData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].institution = e.target.value;
                        updateFormData("education", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="University of Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree *
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].degree = e.target.value;
                        updateFormData("education", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Year
                    </label>
                    <input
                      type="number"
                      value={edu.startYear}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].startYear = e.target.value;
                        updateFormData("education", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2018"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Year
                    </label>
                    <input
                      type="number"
                      value={edu.endYear}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].endYear = e.target.value;
                        updateFormData("education", updated);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2022"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[index].description = e.target.value;
                      updateFormData("education", updated);
                    }}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Relevant coursework, achievements, GPA, etc."
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Skills
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    addSkill(input.value);
                    input.value = "";
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {formData.skills.length === 0 && (
                <p className="text-gray-500 text-sm mt-2">
                  Add at least one skill to continue
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Professional Summary
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary / About Me *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a brief summary about yourself, your experience, and what makes you unique..."
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.summary.length}/500 characters
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Resume Builder
                </h1>
                <p className="text-gray-600">
                  Step {currentStep} of 5 - {steps[currentStep - 1].title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Save size={16} />
                {isSaving ? "Saving..." : "Auto-saved"}
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep >= step.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                `}
                >
                  {step.number}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600 hidden sm:block">
                  {step.title}
                </div>
                {step.number < 5 && (
                  <div
                    className={`
                    w-12 h-1 mx-4
                    ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}
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
            <div className="bg-white rounded-xl shadow-sm p-8">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-8 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 5 || !validateStep()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {currentStep === 5 ? "Complete" : "Next"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Live Preview
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="bg-white transform origin-top-left"
                    style={{
                      transform: "scale(0.5)",
                      width: "200%",
                      height: "600px",
                    }}
                  >
                    <SelectedTemplate data={formData} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Using {templateType.replace(/([A-Z])/g, " $1").trim()}{" "}
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
