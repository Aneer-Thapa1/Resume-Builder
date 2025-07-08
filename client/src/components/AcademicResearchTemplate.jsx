import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  FileText,
  Star,
  Monitor,
  Trophy,
} from "lucide-react";

const AcademicResearchTemplate = ({
  colorScheme = "academic-blue",
  resumeData,
  fontSize = "medium",
  spacing = "normal",
}) => {
  const colorSchemes = {
    "academic-blue": {
      primary: "bg-blue-900",
      primaryText: "text-blue-900",
      primaryLight: "bg-blue-50",
      border: "border-blue-300",
      accent: "bg-blue-100",
      line: "bg-blue-900",
    },
    "academic-green": {
      primary: "bg-green-800",
      primaryText: "text-green-800",
      primaryLight: "bg-green-50",
      border: "border-green-300",
      accent: "bg-green-100",
      line: "bg-green-800",
    },
    "academic-purple": {
      primary: "bg-purple-800",
      primaryText: "text-purple-800",
      primaryLight: "bg-purple-50",
      border: "border-purple-300",
      accent: "bg-purple-100",
      line: "bg-purple-800",
    },
  };

  const colors = colorSchemes[colorScheme];

  const defaultData = {
    personalInfo: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      title: "Research Scientist",
      subtitle: "Computational Biology & Machine Learning",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      location: "Boston, MA",
      linkedin: "linkedin.com/in/sarah-johnson",
      website: "sarahjohnson-research.com",
      orcid: "0000-0000-0000-0000",
    },
    researchProfile:
      "Distinguished research scientist with 10+ years of experience in computational biology and machine learning. Published 25+ peer-reviewed papers in top-tier journals with 1500+ citations. Expertise in developing novel algorithms for genomic data analysis and leading interdisciplinary research teams.",
    education: [
      {
        institution: "MIT - Massachusetts Institute of Technology",
        degree: "Ph.D. in Computational Biology",
        year: "2015",
        dissertation:
          "Novel Machine Learning Approaches for Genomic Sequence Analysis",
        advisor: "Prof. John Smith",
        gpa: "3.9/4.0",
      },
      {
        institution: "Stanford University",
        degree: "M.S. in Bioinformatics",
        year: "2010",
        thesis: "Statistical Methods for Protein Structure Prediction",
        gpa: "3.8/4.0",
      },
      {
        institution: "UC Berkeley",
        degree: "B.S. in Computer Science",
        year: "2008",
        honors: "Summa Cum Laude",
        gpa: "3.9/4.0",
      },
    ],
    positions: [
      {
        id: 1,
        position: "Senior Research Scientist",
        institution: "Harvard Medical School",
        department: "Department of Biomedical Informatics",
        location: "Boston, MA",
        startDate: "2020-01",
        endDate: "Present",
        current: true,
        description:
          "Leading computational genomics research initiatives with $2M+ in funding. Managing interdisciplinary team of 8 researchers and graduate students.",
        responsibilities: [
          "Principal Investigator on 3 NIH-funded research grants",
          "Developing machine learning algorithms for cancer genomics",
          "Collaborating with clinical researchers on translational projects",
          "Mentoring 6 graduate students and 2 postdoctoral fellows",
        ],
      },
      {
        id: 2,
        position: "Postdoctoral Research Fellow",
        institution: "Broad Institute",
        department: "Cancer Program",
        location: "Cambridge, MA",
        startDate: "2015-09",
        endDate: "2019-12",
        current: false,
        description:
          "Conducted cutting-edge research in cancer genomics and developed novel computational methods for analyzing large-scale genomic datasets.",
        responsibilities: [
          "Developed algorithms for cancer driver gene identification",
          "Published 15 first-author papers in high-impact journals",
          "Collaborated with experimental biologists on CRISPR screens",
          "Presented research at 20+ international conferences",
        ],
      },
    ],
    publications: [
      {
        title: "Advanced Machine Learning for Genomic Data Analysis",
        authors: "Johnson, S., Smith, J., Brown, K.",
        journal: "Nature Biotechnology",
        year: "2024",
        volume: "42(3)",
        pages: "123-135",
        citations: 45,
        impact: "High",
      },
      {
        title: "Computational Approaches to Cancer Genomics",
        authors: "Johnson, S., Wilson, M.",
        journal: "Cell",
        year: "2023",
        volume: "186(12)",
        pages: "2456-2470",
        citations: 89,
        impact: "High",
      },
      {
        title: "Novel Algorithms for Sequence Analysis",
        authors: "Chen, L., Johnson, S., Davis, R.",
        journal: "Science",
        year: "2023",
        volume: "380(6645)",
        pages: "789-794",
        citations: 67,
        impact: "High",
      },
    ],
    grants: [
      {
        title: "Machine Learning for Precision Medicine",
        agency: "National Institutes of Health (NIH)",
        amount: "$1,200,000",
        period: "2022-2027",
        role: "Principal Investigator",
      },
      {
        title: "Computational Tools for Cancer Research",
        agency: "National Science Foundation (NSF)",
        amount: "$850,000",
        period: "2021-2024",
        role: "Co-Principal Investigator",
      },
    ],
    skills: {
      programming: ["Python", "R", "MATLAB", "Java", "C++"],
      research: [
        "Machine Learning",
        "Bioinformatics",
        "Statistical Analysis",
        "Data Visualization",
      ],
      computational: [
        "High-Performance Computing",
        "Cloud Computing",
        "Docker",
        "Git",
      ],
      laboratory: ["Genomic Sequencing", "CRISPR", "Cell Culture", "PCR"],
    },
    awards: [
      "Early Career Researcher Award - International Society for Computational Biology (2023)",
      "Outstanding Paper Award - RECOMB Conference (2022)",
      "Postdoc Excellence Award - Broad Institute (2019)",
      "Graduate Student Research Award - MIT (2014)",
    ],
    teaching: [
      {
        course: "Computational Genomics",
        institution: "Harvard Medical School",
        role: "Course Director",
        years: "2021-Present",
        students: "25 graduate students",
      },
      {
        course: "Introduction to Bioinformatics",
        institution: "Harvard Medical School",
        role: "Guest Lecturer",
        years: "2020-Present",
        students: "50 undergraduate students",
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
    <div className="bg-white min-h-full border border-gray-200 shadow-sm max-w-5xl mx-auto">
      {/* Academic Header */}
      <div className={`${colors.primary} text-white p-8`}>
        <div className="text-center">
          <h1 className="text-4xl font-light mb-2 tracking-wide">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl opacity-90 mb-2">{data.personalInfo.title}</p>
          <p className="text-lg opacity-80 mb-6">
            {data.personalInfo.subtitle}
          </p>

          <div className="flex justify-center items-center flex-wrap gap-6 text-sm">
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

      <div className="p-8">
        {/* Research Profile */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-semibold ${colors.primaryText} mb-4 pb-2 border-b-2 ${colors.border} flex items-center gap-2`}
          >
            <BookOpen size={24} />
            Research Profile
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.researchProfile}
          </p>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-semibold ${colors.primaryText} mb-6 pb-2 border-b-2 ${colors.border} flex items-center gap-2`}
          >
            <GraduationCap size={24} />
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-6 rounded-lg border ${colors.border}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className={`${colors.primaryText} font-medium text-lg`}>
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium text-lg">
                    {edu.year}
                  </span>
                </div>
                {edu.dissertation && (
                  <p className="text-gray-700 mt-2">
                    <strong>Dissertation:</strong> {edu.dissertation}
                  </p>
                )}
                {edu.thesis && (
                  <p className="text-gray-700 mt-2">
                    <strong>Thesis:</strong> {edu.thesis}
                  </p>
                )}
                {edu.advisor && (
                  <p className="text-gray-700 mt-1">
                    <strong>Advisor:</strong> {edu.advisor}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  {edu.honors && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {edu.honors}
                    </span>
                  )}
                  {edu.gpa && (
                    <span className="text-gray-600 text-sm">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Positions */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-semibold ${colors.primaryText} mb-6 pb-2 border-b-2 ${colors.border} flex items-center gap-2`}
          >
            <Users size={24} />
            Academic Positions
          </h2>
          <div className="space-y-8">
            {data.positions.map((pos) => (
              <div key={pos.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {pos.position}
                    </h3>
                    <p className={`${colors.primaryText} font-medium text-lg`}>
                      {pos.institution}
                    </p>
                    <p className="text-gray-600">{pos.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600 font-medium">
                      {formatDate(pos.startDate)} -{" "}
                      {pos.current ? "Present" : formatDate(pos.endDate)}
                    </span>
                    <p className="text-gray-500 text-sm">{pos.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {pos.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-2">
                    {pos.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 ${colors.line} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-10">
          <h2
            className={`text-2xl font-semibold ${colors.primaryText} mb-6 pb-2 border-b-2 ${colors.border} flex items-center gap-2`}
          >
            <FileText size={24} />
            Selected Publications
          </h2>
          <div className="space-y-4">
            {data.publications.map((pub, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-5 rounded-lg border ${colors.border}`}
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {pub.title}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>{pub.authors}</strong> ({pub.year}).{" "}
                  <em>{pub.journal}</em>, {pub.volume}, {pub.pages}.
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 ${colors.accent} ${colors.primaryText} text-sm rounded-full`}
                  >
                    {pub.impact} Impact
                  </span>
                  <span className="text-gray-600 text-sm">
                    Citations: {pub.citations}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Research Skills */}
          <section>
            <h2
              className={`text-xl font-semibold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} flex items-center gap-2`}
            >
              <Monitor size={20} />
              Research Skills
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.programming.map((skill, index) => (
                    <span
                      key={index}
                      className={`${colors.accent} ${colors.primaryText} px-3 py-1 rounded-full text-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Research Methods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.research.map((skill, index) => (
                    <span
                      key={index}
                      className={`${colors.accent} ${colors.primaryText} px-3 py-1 rounded-full text-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Grants & Funding */}
          <section>
            <h2
              className={`text-xl font-semibold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} flex items-center gap-2`}
            >
              <Award size={20} />
              Grants & Funding
            </h2>
            <div className="space-y-4">
              {data.grants.map((grant, index) => (
                <div
                  key={index}
                  className={`${colors.primaryLight} p-4 rounded-lg border ${colors.border}`}
                >
                  <h3 className="font-semibold text-gray-800">{grant.title}</h3>
                  <p className={`${colors.primaryText} font-medium`}>
                    {grant.agency}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600 text-sm">
                      {grant.period}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {grant.amount}
                    </span>
                  </div>
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {grant.role}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Awards & Recognition */}
        <section className="mt-10">
          <h2
            className={`text-xl font-semibold ${colors.primaryText} mb-4 pb-2 border-b ${colors.border} flex items-center gap-2`}
          >
            <Trophy size={20} />
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.awards.map((award, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-4 rounded-lg border ${colors.border} flex items-center gap-3`}
              >
                <Star
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

export default AcademicResearchTemplate;
