import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  Award,
} from "lucide-react";

// Clean Sidebar Template - Professional Layout
const CleanSidebarTemplate = ({
  colorScheme = "teal",
  resumeData,
  showPhoto = true,
  fontSize = "medium",
  spacing = "normal",
}) => {
  const colorSchemes = {
    teal: {
      primary: "bg-teal-600",
      primaryText: "text-teal-600",
      primaryLight: "bg-teal-50",
      border: "border-teal-200",
      accent: "bg-teal-100",
      sidebar: "bg-teal-600",
    },
    navy: {
      primary: "bg-blue-800",
      primaryText: "text-blue-800",
      primaryLight: "bg-blue-50",
      border: "border-blue-200",
      accent: "bg-blue-100",
      sidebar: "bg-blue-800",
    },
    purple: {
      primary: "bg-purple-600",
      primaryText: "text-purple-600",
      primaryLight: "bg-purple-50",
      border: "border-purple-200",
      accent: "bg-purple-100",
      sidebar: "bg-purple-600",
    },
    green: {
      primary: "bg-green-600",
      primaryText: "text-green-600",
      primaryLight: "bg-green-50",
      border: "border-green-200",
      accent: "bg-green-100",
      sidebar: "bg-green-600",
    },
    orange: {
      primary: "bg-orange-600",
      primaryText: "text-orange-600",
      primaryLight: "bg-orange-50",
      border: "border-orange-200",
      accent: "bg-orange-100",
      sidebar: "bg-orange-600",
    },
    red: {
      primary: "bg-red-600",
      primaryText: "text-red-600",
      primaryLight: "bg-red-50",
      border: "border-red-200",
      accent: "bg-red-100",
      sidebar: "bg-red-600",
    },
  };

  const colors = colorSchemes[colorScheme];

  const defaultData = {
    personalInfo: {
      firstName: "Sarah",
      lastName: "Johnson",
      title: "Marketing Manager",
      email: "sarah.johnson@email.com",
      phone: "(555) 987-6543",
      location: "Los Angeles, CA",
      linkedin: "linkedin.com/in/sarahjohnson",
      website: "sarahjohnson.com",
      photo: "/api/placeholder/150/150",
    },
    summary:
      "Results-driven marketing professional with 6+ years of experience in digital marketing, brand management, and campaign optimization. Proven track record of increasing brand awareness by 150% and driving revenue growth through strategic marketing initiatives.",
    experience: [
      {
        id: 1,
        company: "Digital Marketing Agency",
        position: "Senior Marketing Manager",
        location: "Los Angeles, CA",
        startDate: "2021-06",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Manage $2M annual marketing budget across multiple channels",
          "Lead team of 8 marketing specialists and coordinators",
          "Develop and execute integrated marketing campaigns",
          "Increase lead generation by 45% through optimized strategies",
        ],
      },
      {
        id: 2,
        company: "Tech Startup Inc.",
        position: "Marketing Specialist",
        location: "Los Angeles, CA",
        startDate: "2019-03",
        endDate: "2021-06",
        current: false,
        responsibilities: [
          "Created content marketing strategy increasing organic traffic by 200%",
          "Managed social media presence across 5 platforms",
          "Executed email marketing campaigns with 25% open rates",
          "Collaborated with sales team on lead nurturing processes",
        ],
      },
      {
        id: 3,
        company: "Creative Solutions",
        position: "Marketing Coordinator",
        location: "Los Angeles, CA",
        startDate: "2018-01",
        endDate: "2019-03",
        current: false,
        responsibilities: [
          "Assisted in planning and execution of marketing campaigns",
          "Conducted market research and competitor analysis",
          "Managed marketing analytics and reporting",
          "Supported event planning and trade show coordination",
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: "UCLA",
        degree: "Bachelor of Arts",
        field: "Marketing",
        startDate: "2014-09",
        endDate: "2018-05",
        gpa: "3.6",
      },
    ],
    skills: {
      "Digital Marketing": [
        "SEO/SEM",
        "Google Analytics",
        "Social Media Marketing",
        "Email Marketing",
      ],
      "Design & Content": [
        "Adobe Creative Suite",
        "Canva",
        "Content Writing",
        "Video Editing",
      ],
      "Analytics & Tools": [
        "Google Analytics",
        "HubSpot",
        "Mailchimp",
        "Hootsuite",
      ],
      "Soft Skills": [
        "Team Leadership",
        "Project Management",
        "Strategic Planning",
        "Communication",
      ],
    },
    certifications: [
      {
        name: "Google Analytics Certified",
        issuer: "Google",
        date: "2023-08",
      },
      {
        name: "HubSpot Content Marketing",
        issuer: "HubSpot",
        date: "2023-05",
      },
      {
        name: "Facebook Social Media Marketing",
        issuer: "Meta",
        date: "2023-03",
      },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Conversational" },
      { name: "French", level: "Basic" },
    ],
  };

  const data = { ...defaultData, ...resumeData };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white min-h-full border border-gray-200 shadow-sm print:shadow-none max-w-5xl mx-auto flex">
      {/* Left Sidebar */}
      <div className={`w-1/3 ${colors.sidebar} text-white p-6`}>
        {/* Profile Photo */}
        {showPhoto && (
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src={data.personalInfo.photo}
                alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-white/20 flex items-center justify-center text-2xl font-bold"
                style={{ display: "none" }}
              >
                {data.personalInfo.firstName[0]}
                {data.personalInfo.lastName[0]}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <p className="text-lg opacity-90">{data.personalInfo.title}</p>
          </div>
        )}

        {/* Contact Information */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">
            CONTACT
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} />
                <span className="break-all">{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span className="break-all">{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">
            SKILLS
          </h2>
          <div className="space-y-4">
            {Object.entries(data.skills).map(([category, skillList], index) => (
              <div key={index}>
                <h3 className="font-semibold text-sm mb-2 opacity-90">
                  {category}
                </h3>
                <div className="space-y-1">
                  {skillList.map((skill, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span>{skill}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div
                          className="bg-white h-1 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">
            LANGUAGES
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span>{lang.name}</span>
                <span className="opacity-75">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/20">
            CERTIFICATIONS
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="opacity-75">{cert.issuer}</p>
                <p className="opacity-60 text-xs">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Professional Summary */}
        <section className="mb-8">
          <h2
            className={`text-xl font-bold ${colors.primaryText} mb-3 pb-2 border-b-2 ${colors.border}`}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h2
            className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border}`}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className={`${colors.primaryText} font-medium`}>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="text-gray-600 text-sm flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <ul className="space-y-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span
                        className={`${colors.primaryText} font-bold mt-1.5`}
                      >
                        •
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2
            className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border}`}
          >
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className={`${colors.primaryText} font-medium`}>
                  {edu.institution}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CleanSidebarTemplate;
