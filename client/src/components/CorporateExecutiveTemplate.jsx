import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Building,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

// Corporate Executive Template
const CorporateExecutiveTemplate = ({
  colorScheme = "navy",
  resumeData,
  fontSize = "medium",
  spacing = "normal",
}) => {
  const colorSchemes = {
    navy: {
      primary: "bg-blue-900",
      primaryText: "text-blue-900",
      primaryLight: "bg-blue-50",
      border: "border-blue-300",
      accent: "bg-blue-100",
      line: "bg-blue-900",
    },
    charcoal: {
      primary: "bg-gray-800",
      primaryText: "text-gray-800",
      primaryLight: "bg-gray-50",
      border: "border-gray-300",
      accent: "bg-gray-100",
      line: "bg-gray-800",
    },
    burgundy: {
      primary: "bg-red-800",
      primaryText: "text-red-800",
      primaryLight: "bg-red-50",
      border: "border-red-300",
      accent: "bg-red-100",
      line: "bg-red-800",
    },
    forest: {
      primary: "bg-green-800",
      primaryText: "text-green-800",
      primaryLight: "bg-green-50",
      border: "border-green-300",
      accent: "bg-green-100",
      line: "bg-green-800",
    },
    indigo: {
      primary: "bg-indigo-800",
      primaryText: "text-indigo-800",
      primaryLight: "bg-indigo-50",
      border: "border-indigo-300",
      accent: "bg-indigo-100",
      line: "bg-indigo-800",
    },
    slate: {
      primary: "bg-slate-700",
      primaryText: "text-slate-700",
      primaryLight: "bg-slate-50",
      border: "border-slate-300",
      accent: "bg-slate-100",
      line: "bg-slate-700",
    },
  };

  const colors = colorSchemes[colorScheme];

  const defaultData = {
    personalInfo: {
      firstName: "Michael",
      lastName: "Thompson",
      title: "Chief Executive Officer",
      subtitle: "Strategic Leader & Business Transformation Expert",
      email: "m.thompson@email.com",
      phone: "(555) 123-4567",
      location: "Chicago, IL",
      linkedin: "linkedin.com/in/michaelthompson",
      website: "michaelthompson.com",
    },
    executiveSummary:
      "Accomplished C-suite executive with 20+ years of progressive leadership experience driving organizational growth, operational excellence, and digital transformation. Proven track record of scaling businesses from $50M to $500M+ revenue, leading successful M&A transactions, and building high-performance teams across global markets.",
    coreCompetencies: [
      "Strategic Planning & Execution",
      "P&L Management ($500M+)",
      "Mergers & Acquisitions",
      "Digital Transformation",
      "Global Operations",
      "Team Leadership & Development",
      "Stakeholder Relations",
      "Change Management",
      "Board Governance",
      "Capital Markets",
    ],
    experience: [
      {
        id: 1,
        company: "GlobalTech Corporation",
        position: "Chief Executive Officer",
        location: "Chicago, IL",
        startDate: "2019-01",
        endDate: "Present",
        current: true,
        description:
          "Lead $2B+ technology services company with 5,000+ employees across 15 countries. Direct all strategic initiatives, operational excellence programs, and stakeholder relations.",
        keyMetrics: [
          { label: "Revenue Growth", value: "+180%", period: "5 years" },
          { label: "Market Cap", value: "$8.5B", period: "Current" },
          { label: "Global Workforce", value: "5,000+", period: "Employees" },
          { label: "EBITDA Margin", value: "28%", period: "Improved" },
        ],
        achievements: [
          "Orchestrated successful IPO raising $1.2B in capital markets",
          "Led 8 strategic acquisitions totaling $800M in transaction value",
          "Implemented digital transformation reducing operational costs by $150M annually",
          "Expanded global footprint from 3 to 15 countries",
          "Achieved 95% customer retention rate and 4.8/5 employee satisfaction score",
        ],
      },
      {
        id: 2,
        company: "InnovateX Solutions",
        position: "Chief Operating Officer",
        location: "Chicago, IL",
        startDate: "2015-06",
        endDate: "2018-12",
        current: false,
        description:
          "Directed global operations for $800M enterprise software company. Managed international expansion, operational efficiency initiatives, and customer success programs.",
        keyMetrics: [
          { label: "Revenue Growth", value: "+250%", period: "3.5 years" },
          {
            label: "Operational Efficiency",
            value: "+45%",
            period: "Improvement",
          },
          { label: "Market Expansion", value: "12", period: "New Countries" },
          {
            label: "Customer Growth",
            value: "+400%",
            period: "Enterprise Clients",
          },
        ],
        achievements: [
          "Scaled operations to support 10x revenue growth over 3 years",
          "Established European and Asia-Pacific regional headquarters",
          "Built world-class customer success organization with 98% renewal rate",
          "Implemented lean six sigma methodologies across all business units",
        ],
      },
      {
        id: 3,
        company: "Strategic Consulting Group",
        position: "Managing Director",
        location: "Chicago, IL",
        startDate: "2012-03",
        endDate: "2015-06",
        current: false,
        description:
          "Led management consulting practice specializing in digital transformation and operational excellence for Fortune 500 clients.",
        achievements: [
          "Grew practice revenue from $15M to $75M over 3 years",
          "Advised CEOs and C-suite executives on strategic initiatives",
          "Led transformation projects generating $2B+ in client value",
          "Built and managed team of 150+ senior consultants",
        ],
      },
    ],
    education: [
      {
        institution: "Kellogg School of Management",
        degree: "MBA",
        field: "Strategy & Finance",
        year: "2010",
        honors: "Dean's List",
      },
      {
        institution: "Northwestern University",
        degree: "Bachelor of Science",
        field: "Industrial Engineering",
        year: "2008",
        honors: "Summa Cum Laude",
      },
    ],
    boardPositions: [
      {
        organization: "TechVentures Board",
        role: "Independent Director",
        period: "2020-Present",
      },
      {
        organization: "Chicago Business Council",
        role: "Board Member",
        period: "2019-Present",
      },
      {
        organization: "Innovation Foundation",
        role: "Advisory Board",
        period: "2018-Present",
      },
    ],
    recognition: [
      "CEO of the Year - Chicago Business Journal (2023)",
      "Top 40 Under 40 - Fortune Magazine (2020)",
      "Digital Leader Award - MIT Technology Review (2019)",
      "Excellence in Leadership - Harvard Business Review (2018)",
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
    <div className="bg-white min-h-full border border-gray-200 shadow-sm print:shadow-none max-w-5xl mx-auto">
      {/* Executive Header */}
      <div className="p-8 border-b-2 border-gray-200">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className={`text-2xl ${colors.primaryText} font-medium mb-2`}>
            {data.personalInfo.title}
          </p>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {data.personalInfo.subtitle}
          </p>

          <div className="flex justify-center items-center flex-wrap gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Mail size={16} />
              {data.personalInfo.email}
            </span>
            <span>|</span>
            <span className="flex items-center gap-2">
              <Phone size={16} />
              {data.personalInfo.phone}
            </span>
            <span>|</span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {data.personalInfo.location}
            </span>
            <span>|</span>
            <span className="flex items-center gap-2">
              <Linkedin size={16} />
              {data.personalInfo.linkedin}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Executive Summary */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border} uppercase tracking-wide`}
          >
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.executiveSummary}
          </p>
        </section>

        {/* Core Competencies */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-bold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border} uppercase tracking-wide`}
          >
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {data.coreCompetencies.map((competency, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-3 rounded border ${colors.border}`}
              >
                <span className="font-medium text-gray-800">{competency}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Experience */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-bold ${colors.primaryText} mb-6 pb-2 border-b-2 ${colors.border} uppercase tracking-wide`}
          >
            Executive Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Position Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className={`w-5 h-5 ${colors.primaryText}`} />
                      <span
                        className={`font-semibold ${colors.primaryText} text-lg`}
                      >
                        {exp.company}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{exp.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 font-medium">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Metrics */}
                {exp.keyMetrics && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {exp.keyMetrics.map((metric, i) => (
                      <div
                        key={i}
                        className={`${colors.primaryLight} p-4 rounded border ${colors.border} text-center`}
                      >
                        <div
                          className={`text-2xl font-bold ${colors.primaryText} mb-1`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {metric.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.period}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Achievements */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className={`w-5 h-5 ${colors.primaryText}`} />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 ${colors.line} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education */}
          <section>
            <h2
              className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} uppercase tracking-wide`}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className={`${colors.primaryLight} p-4 rounded border ${colors.border}`}
                >
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className={`${colors.primaryText} font-semibold`}>
                    {edu.institution}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600">{edu.field}</span>
                    <span className="text-gray-500">{edu.year}</span>
                  </div>
                  {edu.honors && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      {edu.honors}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Board Positions */}
          <section>
            <h2
              className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} uppercase tracking-wide`}
            >
              Board Positions
            </h2>
            <div className="space-y-3">
              {data.boardPositions.map((board, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {board.role}
                    </h3>
                    <p className={`${colors.primaryText}`}>
                      {board.organization}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">{board.period}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recognition */}
        <section className="mt-10">
          <h2
            className={`text-xl font-bold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} uppercase tracking-wide`}
          >
            Recognition & Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.recognition.map((award, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-4 rounded border ${colors.border} flex items-center gap-3`}
              >
                <Award
                  className={`w-6 h-6 ${colors.primaryText} flex-shrink-0`}
                />
                <span className="font-medium text-gray-800">{award}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CorporateExecutiveTemplate;
