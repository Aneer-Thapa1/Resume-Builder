import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from "lucide-react";

// Minimalist Clean Template
const MinimalistCleanTemplate = ({
  colorScheme = "black",
  resumeData,
  fontSize = "medium",
  spacing = "normal",
}) => {
  const colorSchemes = {
    black: {
      primary: "bg-black",
      primaryText: "text-black",
      primaryLight: "bg-gray-50",
      border: "border-gray-300",
      accent: "bg-gray-100",
      line: "bg-black",
    },
    blue: {
      primary: "bg-blue-600",
      primaryText: "text-blue-600",
      primaryLight: "bg-blue-50",
      border: "border-blue-300",
      accent: "bg-blue-100",
      line: "bg-blue-600",
    },
    green: {
      primary: "bg-green-600",
      primaryText: "text-green-600",
      primaryLight: "bg-green-50",
      border: "border-green-300",
      accent: "bg-green-100",
      line: "bg-green-600",
    },
    purple: {
      primary: "bg-purple-600",
      primaryText: "text-purple-600",
      primaryLight: "bg-purple-50",
      border: "border-purple-300",
      accent: "bg-purple-100",
      line: "bg-purple-600",
    },
    red: {
      primary: "bg-red-600",
      primaryText: "text-red-600",
      primaryLight: "bg-red-50",
      border: "border-red-300",
      accent: "bg-red-100",
      line: "bg-red-600",
    },
    gray: {
      primary: "bg-gray-700",
      primaryText: "text-gray-700",
      primaryLight: "bg-gray-50",
      border: "border-gray-300",
      accent: "bg-gray-100",
      line: "bg-gray-700",
    },
  };

  const colors = colorSchemes[colorScheme];

  const defaultData = {
    personalInfo: {
      firstName: "Emily",
      lastName: "Davis",
      title: "Product Designer",
      email: "emily.davis@email.com",
      phone: "(555) 456-7890",
      location: "Seattle, WA",
      linkedin: "linkedin.com/in/emilydavis",
      website: "emilydavis.design",
    },
    summary:
      "Creative product designer with 4+ years of experience crafting user-centered digital experiences. Specializes in UX/UI design, design systems, and prototyping for web and mobile applications.",
    experience: [
      {
        id: 1,
        company: "Microsoft",
        position: "Product Designer",
        location: "Seattle, WA",
        startDate: "2022-08",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Design user interfaces for Microsoft Office suite used by 300M+ users",
          "Collaborate with engineering teams to implement design solutions",
          "Conduct user research and usability testing sessions",
          "Maintain and evolve design system components",
        ],
      },
      {
        id: 2,
        company: "Design Studio",
        position: "UX Designer",
        location: "Seattle, WA",
        startDate: "2020-06",
        endDate: "2022-08",
        current: false,
        responsibilities: [
          "Created wireframes and prototypes for client projects",
          "Conducted user interviews and analyzed feedback",
          "Designed responsive web and mobile applications",
          "Collaborated with development teams on implementation",
        ],
      },
      {
        id: 3,
        company: "Freelance",
        position: "UI/UX Designer",
        location: "Seattle, WA",
        startDate: "2019-01",
        endDate: "2020-06",
        current: false,
        responsibilities: [
          "Provided design services for small businesses and startups",
          "Created brand identities and marketing materials",
          "Designed and developed websites using modern frameworks",
          "Managed client relationships and project timelines",
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of Washington",
        degree: "Bachelor of Fine Arts",
        field: "Graphic Design",
        startDate: "2015-09",
        endDate: "2019-05",
        gpa: "3.8",
      },
    ],
    skills: [
      "Figma",
      "Sketch",
      "Adobe Creative Suite",
      "Prototyping",
      "User Research",
      "Wireframing",
      "Design Systems",
      "HTML/CSS",
      "JavaScript",
      "React",
    ],
    projects: [
      {
        name: "E-commerce Mobile App",
        description:
          "Designed complete mobile shopping experience with 40% increase in conversion",
      },
      {
        name: "SaaS Dashboard Redesign",
        description:
          "Redesigned analytics dashboard improving user satisfaction by 60%",
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
      <div className="p-8 text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className={`w-20 h-0.5 ${colors.line} mx-auto mb-3`}></div>
        <p className="text-xl text-gray-600 mb-6">{data.personalInfo.title}</p>

        <div className="flex justify-center items-center flex-wrap gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Mail size={14} />
            {data.personalInfo.email}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Phone size={14} />
            {data.personalInfo.phone}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {data.personalInfo.location}
          </span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Linkedin size={14} />
                {data.personalInfo.linkedin}
              </span>
            </>
          )}
          {data.personalInfo.website && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe size={14} />
                {data.personalInfo.website}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Professional Summary */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <div className={`w-1 h-6 ${colors.line} mr-4`}></div>
            <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">
              Summary
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed ml-5">{data.summary}</p>
        </section>

        {/* Professional Experience */}
        <section className="mb-10">
          <div className="flex items-center mb-6">
            <div className={`w-1 h-6 ${colors.line} mr-4`}></div>
            <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">
              Experience
            </h2>
          </div>
          <div className="ml-5 space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {exp.position}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} —{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className={`${colors.primaryText} font-medium mb-3`}>
                  {exp.company} • {exp.location}
                </p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-gray-700 flex items-start">
                      <span className="mr-3">—</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <div className="flex items-center mb-6">
            <div className={`w-1 h-6 ${colors.line} mr-4`}></div>
            <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">
              Education
            </h2>
          </div>
          <div className="ml-5 space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className={`${colors.primaryText} font-medium`}>
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <div className="flex items-center mb-6">
            <div className={`w-1 h-6 ${colors.line} mr-4`}></div>
            <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">
              Skills
            </h2>
          </div>
          <div className="ml-5">
            <p className="text-gray-700 leading-relaxed">
              {data.skills.join(" • ")}
            </p>
          </div>
        </section>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div className={`w-1 h-6 ${colors.line} mr-4`}></div>
              <h2 className="text-lg font-light text-gray-900 uppercase tracking-widest">
                Projects
              </h2>
            </div>
            <div className="ml-5 space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalistCleanTemplate;
