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
    // Create a new window for clean resume export
    const printWindow = window.open("", "_blank");

    // Get the selected template component
    const SelectedTemplate =
      selectedTemplateData?.component || ModernProfessionalTemplate;

    // Create a clean HTML structure for the resume
    const resumeHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume - ${templateData.personalInfo.firstName} ${templateData.personalInfo.lastName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    orange: {
                      50: '#fff7ed',
                      100: '#ffedd5',
                      200: '#fed7aa',
                      300: '#fdba74',
                      400: '#fb923c',
                      500: '#f97316',
                      600: '#ea580c',
                      700: '#c2410c',
                      800: '#9a3412',
                      900: '#7c2d12',
                    }
                  }
                }
              }
            }
          </script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            body { 
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 0;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              body { margin: 0; }
              @page { 
                margin: 0.5in; 
                size: A4;
              }
              .no-print { display: none !important; }
            }
            .print-container {
              width: 8.5in;
              min-height: 11in;
              margin: 0 auto;
              background: white;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            @media print {
              .print-container {
                box-shadow: none;
                width: 100%;
                height: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div id="resume-content"></div>
          </div>
          <script>
            // Auto-print after a short delay
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                window.close();
              }, 100);
            }, 1000);
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(resumeHTML);
    printWindow.document.close();

    // Wait for the document to load, then inject the resume content
    printWindow.addEventListener("load", () => {
      const resumeContainer =
        printWindow.document.getElementById("resume-content");

      // Create the resume component in the new window
      if (selectedTemplateData?.type === "ModernProfessionalTemplate") {
        resumeContainer.innerHTML = generateModernProfessionalHTML();
      } else {
        // For other templates, we'll create a basic structure
        resumeContainer.innerHTML = generateBasicResumeHTML();
      }
    });
  };

  // Generate Modern Professional Template HTML
  const generateModernProfessionalHTML = () => {
    const data = templateData;

    return `
      <div class="bg-white min-h-full max-w-4xl mx-auto">
        <!-- Header -->
        <div class="bg-orange-600 text-white p-8">
          <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold mb-2">
              ${data.personalInfo.firstName} ${data.personalInfo.lastName}
            </h1>
            <p class="text-xl opacity-90 mb-4">${data.personalInfo.title}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>${data.personalInfo.email}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>${data.personalInfo.phone}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <span>${data.personalInfo.location}</span>
              </div>
              ${
                data.personalInfo.linkedin
                  ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${data.personalInfo.linkedin}</span>
                </div>
              `
                  : ""
              }
              ${
                data.personalInfo.website
                  ? `
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${data.personalInfo.website}</span>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="p-8">
          <!-- Professional Summary -->
          ${
            data.summary
              ? `
            <section class="mb-8">
              <h2 class="text-xl font-bold text-orange-600 mb-3 pb-2 border-b-2 border-orange-200">
                Professional Summary
              </h2>
              <p class="text-gray-700 leading-relaxed">${data.summary}</p>
            </section>
          `
              : ""
          }

          <!-- Professional Experience -->
          ${
            data.experience && data.experience.length > 0
              ? `
            <section class="mb-8">
              <h2 class="text-xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-200">
                Professional Experience
              </h2>
              <div class="space-y-6">
                ${data.experience
                  .map(
                    (exp) => `
                  <div>
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                          ${exp.position}
                        </h3>
                        <p class="text-orange-600 font-medium">
                          ${exp.company} • ${exp.location}
                        </p>
                      </div>
                      <div class="text-gray-600 text-sm flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                        </svg>
                        ${formatDateForExport(exp.startDate)} - ${
                      exp.current ? "Present" : formatDateForExport(exp.endDate)
                    }
                      </div>
                    </div>
                    <ul class="space-y-1">
                      ${(exp.responsibilities || [])
                        .map(
                          (resp) => `
                        <li class="flex items-start gap-2 text-gray-700">
                          <span class="text-orange-600 font-bold mt-1.5">•</span>
                          <span>${resp}</span>
                        </li>
                      `
                        )
                        .join("")}
                    </ul>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </section>
          `
              : ""
          }

          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Education -->
            ${
              data.education && data.education.length > 0
                ? `
              <section>
                <h2 class="text-xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-200">
                  Education
                </h2>
                <div class="space-y-4">
                  ${data.education
                    .map(
                      (edu) => `
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        ${edu.degree}${edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <p class="text-orange-600 font-medium">
                        ${edu.institution}
                      </p>
                      <div class="flex justify-between text-sm text-gray-600">
                        <span>
                          ${formatDateForExport(
                            edu.startDate
                          )} - ${formatDateForExport(edu.endDate)}
                        </span>
                        ${edu.gpa ? `<span>GPA: ${edu.gpa}</span>` : ""}
                      </div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            <!-- Certifications -->
            ${
              data.certifications && data.certifications.length > 0
                ? `
              <section>
                <h2 class="text-xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-200">
                  Certifications
                </h2>
                <div class="space-y-3">
                  ${data.certifications
                    .map(
                      (cert) => `
                    <div>
                      <h3 class="font-semibold text-gray-900">${cert.name}</h3>
                      <p class="text-gray-600">${cert.issuer}</p>
                      <p class="text-sm text-gray-500">
                        ${formatDateForExport(cert.date)}
                      </p>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }
          </div>

          <!-- Technical Skills -->
          ${
            data.skills && data.skills.length > 0
              ? `
            <section class="mt-8">
              <h2 class="text-xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-200">
                Technical Skills
              </h2>
              <div class="flex flex-wrap gap-2">
                ${data.skills
                  .map(
                    (skill) => `
                  <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    ${skill}
                  </span>
                `
                  )
                  .join("")}
              </div>
            </section>
          `
              : ""
          }
        </div>
      </div>
    `;
  };

  // Generate basic resume HTML for other templates
  const generateBasicResumeHTML = () => {
    const data = templateData;

    return `
      <div class="bg-white p-8 max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            ${data.personalInfo.firstName} ${data.personalInfo.lastName}
          </h1>
          <p class="text-xl text-gray-600 mb-4">${data.personalInfo.title}</p>
          <div class="text-sm text-gray-600 space-y-1">
            <p>${data.personalInfo.email} • ${data.personalInfo.phone}</p>
            <p>${data.personalInfo.location}</p>
          </div>
        </div>

        ${
          data.summary
            ? `
          <section class="mb-6">
            <h2 class="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p class="text-gray-700">${data.summary}</p>
          </section>
        `
            : ""
        }

        ${
          data.experience && data.experience.length > 0
            ? `
          <section class="mb-6">
            <h2 class="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              EXPERIENCE
            </h2>
            ${data.experience
              .map(
                (exp) => `
              <div class="mb-4">
                <div class="flex justify-between mb-1">
                  <h3 class="font-semibold">${exp.position}</h3>
                  <span class="text-sm text-gray-600">
                    ${formatDateForExport(exp.startDate)} - ${
                  exp.current ? "Present" : formatDateForExport(exp.endDate)
                }
                  </span>
                </div>
                <p class="font-medium text-gray-700">${exp.company}</p>
                <ul class="text-sm text-gray-600 mt-1">
                  ${(exp.responsibilities || [])
                    .map((resp) => `<li>• ${resp}</li>`)
                    .join("")}
                </ul>
              </div>
            `
              )
              .join("")}
          </section>
        `
            : ""
        }

        <div class="grid grid-cols-2 gap-8">
          ${
            data.education && data.education.length > 0
              ? `
            <section>
              <h2 class="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                EDUCATION
              </h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="mb-3">
                  <h3 class="font-semibold">${edu.degree}</h3>
                  <p class="text-gray-700">${edu.institution}</p>
                  <p class="text-sm text-gray-600">
                    ${formatDateForExport(
                      edu.startDate
                    )} - ${formatDateForExport(edu.endDate)}
                  </p>
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          ${
            data.skills && data.skills.length > 0
              ? `
            <section>
              <h2 class="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                SKILLS
              </h2>
              <div class="flex flex-wrap gap-1">
                ${data.skills
                  .map(
                    (skill) => `
                  <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                    ${skill}
                  </span>
                `
                  )
                  .join("")}
              </div>
            </section>
          `
              : ""
          }
        </div>
      </div>
    `;
  };

  // Helper function to format dates for export
  const formatDateForExport = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
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
