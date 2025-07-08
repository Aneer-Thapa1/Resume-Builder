import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from "lucide-react";

// Modern Professional Template - Clean and ATS-Friendly
const ModernProfessionalTemplate = ({
  colorScheme = "blue",
  resumeData,
  fontSize = "medium",
  spacing = "normal",
}) => {
  // Simple, professional color schemes
  const colorSchemes = {
    blue: {
      primary: "bg-blue-600",
      primaryText: "text-blue-600",
      primaryLight: "bg-blue-50",
      border: "border-blue-200",
      accent: "bg-blue-100",
    },
    green: {
      primary: "bg-green-600",
      primaryText: "text-green-600",
      primaryLight: "bg-green-50",
      border: "border-green-200",
      accent: "bg-green-100",
    },
    purple: {
      primary: "bg-purple-600",
      primaryText: "text-purple-600",
      primaryLight: "bg-purple-50",
      border: "border-purple-200",
      accent: "bg-purple-100",
    },
    gray: {
      primary: "bg-gray-600",
      primaryText: "text-gray-600",
      primaryLight: "bg-gray-50",
      border: "border-gray-200",
      accent: "bg-gray-100",
    },
    teal: {
      primary: "bg-teal-600",
      primaryText: "text-teal-600",
      primaryLight: "bg-teal-50",
      border: "border-teal-200",
      accent: "bg-teal-100",
    },
    orange: {
      primary: "bg-orange-600",
      primaryText: "text-orange-600",
      primaryLight: "bg-orange-50",
      border: "border-orange-200",
      accent: "bg-orange-100",
    },
  };

  const colors = colorSchemes[colorScheme];

  // Default professional data
  const defaultData = {
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      title: "Software Engineer",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johnsmith",
      website: "johnsmith.dev",
    },
    summary:
      "Experienced software engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies. Proven track record of delivering scalable solutions and leading development teams.",
    experience: [
      {
        id: 1,
        company: "TechCorp Inc.",
        position: "Senior Software Engineer",
        location: "New York, NY",
        startDate: "2022-01",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Led development of microservices architecture serving 1M+ users",
          "Mentored 3 junior developers and conducted code reviews",
          "Improved application performance by 40% through optimization",
          "Collaborated with product team on feature planning and execution",
        ],
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Software Engineer",
        location: "New York, NY",
        startDate: "2020-03",
        endDate: "2022-01",
        current: false,
        responsibilities: [
          "Built responsive web applications using React and Node.js",
          "Implemented automated testing reducing bugs by 60%",
          "Participated in agile development process and sprint planning",
          "Contributed to design and architecture decisions",
        ],
      },
      {
        id: 3,
        company: "Digital Agency",
        position: "Junior Developer",
        location: "New York, NY",
        startDate: "2019-06",
        endDate: "2020-03",
        current: false,
        responsibilities: [
          "Developed client websites using HTML, CSS, and JavaScript",
          "Collaborated with designers to implement pixel-perfect designs",
          "Maintained and updated existing client applications",
          "Learned and applied best practices in web development",
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: "New York University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09",
        endDate: "2019-05",
        gpa: "3.7",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "AWS",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "Git",
      "REST APIs",
      "GraphQL",
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06",
      },
      {
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2022-12",
      },
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
    <div className="bg-white min-h-full border border-gray-200 shadow-sm print:shadow-none max-w-4xl mx-auto">
      {/* Header */}
      <div className={`${colors.primary} text-white p-8`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl opacity-90 mb-4">{data.personalInfo.title}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={16} />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <h3 className="font-semibold text-gray-900">
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

          {/* Certifications */}
          <section>
            <h2
              className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border}`}
            >
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(cert.date)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Technical Skills */}
        <section className="mt-8">
          <h2
            className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border}`}
          >
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className={`${colors.accent} ${colors.primaryText} px-3 py-1 rounded-full text-sm font-medium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernProfessionalTemplate;
