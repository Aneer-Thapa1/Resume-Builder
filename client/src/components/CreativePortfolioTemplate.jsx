import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Palette,
  Camera,
  Monitor,
  PenTool,
  Trophy,
  Heart,
  Star,
  Award,
} from "lucide-react";

const CreativePortfolioTemplate = ({
  colorScheme = "creative-purple",
  resumeData,
  fontSize = "medium",
  spacing = "normal",
}) => {
  const colorSchemes = {
    "creative-purple": {
      primary: "bg-purple-600",
      primaryText: "text-purple-600",
      primaryLight: "bg-purple-50",
      border: "border-purple-200",
      accent: "bg-purple-100",
      gradient: "from-purple-600 via-pink-600 to-orange-500",
    },
    "artistic-teal": {
      primary: "bg-teal-500",
      primaryText: "text-teal-600",
      primaryLight: "bg-teal-50",
      border: "border-teal-200",
      accent: "bg-teal-100",
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
    },
    "vibrant-orange": {
      primary: "bg-orange-500",
      primaryText: "text-orange-600",
      primaryLight: "bg-orange-50",
      border: "border-orange-200",
      accent: "bg-orange-100",
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
  };

  const colors = colorSchemes[colorScheme];

  const defaultData = {
    personalInfo: {
      firstName: "Alex",
      lastName: "Rivera",
      title: "Creative Director & Designer",
      subtitle:
        "Crafting beautiful digital experiences that inspire and engage",
      email: "alex.rivera@creative.studio",
      phone: "(555) 123-9876",
      location: "Los Angeles, CA",
      website: "alexrivera.design",
      instagram: "@alexcreates",
      behance: "behance.net/alexrivera",
    },
    creativeVision:
      "Award-winning creative director with 8+ years of experience in brand identity, digital design, and creative strategy. Passionate about creating memorable visual experiences that drive engagement and tell compelling stories across all mediums.",
    experience: [
      {
        id: 1,
        company: "Creative Studios Inc.",
        position: "Creative Director",
        location: "Los Angeles, CA",
        startDate: "2021-01",
        endDate: "Present",
        current: true,
        description:
          "Lead creative vision and strategy for major brand campaigns. Manage team of 12 designers and collaborate with Fortune 500 clients.",
        achievements: [
          "Increased client retention rate by 40% through innovative design solutions",
          "Led rebranding project that resulted in 60% increase in brand recognition",
          "Managed $2M+ creative budget across multiple campaigns",
          "Won 3 industry awards for creative excellence",
        ],
        projects: [
          {
            name: "Nike Campaign",
            type: "Brand Campaign",
            description: "360° campaign for new product launch",
            impact: "50M+ impressions",
          },
          {
            name: "Startup Rebrand",
            type: "Brand Identity",
            description: "Complete visual identity overhaul",
            impact: "200% increase in brand engagement",
          },
        ],
      },
      {
        id: 2,
        company: "Design Collective",
        position: "Senior Art Director",
        location: "Los Angeles, CA",
        startDate: "2019-03",
        endDate: "2020-12",
        current: false,
        description:
          "Developed creative concepts and managed design execution for digital and print campaigns across various industries.",
        achievements: [
          "Created award-winning campaign for major automotive brand",
          "Streamlined design process reducing project timelines by 30%",
          "Mentored junior designers and established design standards",
          "Collaborated with cross-functional teams on product launches",
        ],
      },
      {
        id: 3,
        company: "Freelance Designer",
        position: "Creative Consultant",
        location: "Los Angeles, CA",
        startDate: "2016-06",
        endDate: "2019-02",
        current: false,
        description:
          "Provided creative services for startups and small businesses, specializing in brand identity and digital design.",
        achievements: [
          "Built portfolio of 50+ successful client projects",
          "Developed brand identities for 20+ startups",
          "Achieved 95% client satisfaction rate",
          "Generated $500K+ in revenue over 3 years",
        ],
      },
    ],
    education: [
      {
        institution: "Art Center College of Design",
        degree: "Bachelor of Fine Arts",
        field: "Graphic Design",
        year: "2016",
        honors: "Magna Cum Laude",
        portfolio: "Dean's List Portfolio Award",
      },
    ],
    skills: {
      design: ["Brand Identity", "UI/UX Design", "Typography", "Illustration"],
      software: ["Adobe Creative Suite", "Figma", "Sketch", "After Effects"],
      specialties: [
        "Motion Graphics",
        "Web Design",
        "Print Design",
        "Photography",
      ],
      additional: [
        "Creative Strategy",
        "Art Direction",
        "Team Leadership",
        "Client Relations",
      ],
    },
    awards: [
      "Creative Excellence Award - Design Annual 2023",
      "Best Brand Identity - LA Design Awards 2022",
      "Rising Star Designer - Creative Review 2021",
      "Student Portfolio Award - Art Center 2016",
    ],
    clients: ["Nike", "Apple", "Spotify", "Airbnb", "Tesla", "Netflix"],
    portfolio: [
      {
        project: "Tech Startup Branding",
        client: "InnovateTech",
        category: "Brand Identity",
        year: "2023",
        description:
          "Complete brand overhaul including logo, guidelines, and digital assets",
        awards: ["Gold - Design Awards 2023"],
      },
      {
        project: "Mobile App Interface",
        client: "HealthFirst",
        category: "UI/UX Design",
        year: "2023",
        description: "User-centered design for healthcare mobile application",
        awards: ["UX Excellence Award"],
      },
      {
        project: "Campaign Design",
        client: "EcoGreen",
        category: "Digital Campaign",
        year: "2022",
        description:
          "Environmental awareness campaign across multiple touchpoints",
        awards: ["Green Design Award"],
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
    <div className="bg-white min-h-full shadow-lg max-w-5xl mx-auto overflow-hidden">
      {/* Creative Header */}
      <div
        className={`bg-gradient-to-r ${colors.gradient} text-white p-8 relative overflow-hidden`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-2 tracking-wide">
            {data.personalInfo.firstName}{" "}
            <span className="text-white text-opacity-80">
              {data.personalInfo.lastName}
            </span>
          </h1>
          <p className="text-2xl mb-2 text-white text-opacity-90">
            {data.personalInfo.title}
          </p>
          <p className="text-lg text-white text-opacity-80 mb-6 max-w-2xl">
            {data.personalInfo.subtitle}
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Globe size={16} />
              {data.personalInfo.website}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} />
              {data.personalInfo.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} />
              {data.personalInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {data.personalInfo.location}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Creative Vision */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
            <span
              className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              Creative Vision
            </span>
            <div
              className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
            ></div>
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.creativeVision}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
            <span
              className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              Experience
            </span>
            <div
              className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
            ></div>
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6">
                <div
                  className={`absolute left-0 top-2 w-3 h-3 bg-gradient-to-r ${colors.gradient} rounded-full`}
                ></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {exp.position}
                    </h3>
                    <p
                      className={`${colors.primaryText} font-semibold text-lg`}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${colors.primaryText}`} />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${colors.gradient} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Projects */}
                {exp.projects && exp.projects.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <PenTool className={`w-5 h-5 ${colors.primaryText}`} />
                      Featured Projects
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {exp.projects.map((project, i) => (
                        <div
                          key={i}
                          className={`${colors.primaryLight} p-4 rounded-lg border ${colors.border}`}
                        >
                          <h5 className="font-semibold text-gray-900">
                            {project.name}
                          </h5>
                          <span
                            className={`text-xs ${colors.primaryText} font-medium bg-white px-2 py-1 rounded-full`}
                          >
                            {project.type}
                          </span>
                          <p className="text-sm text-gray-600 mt-2 mb-2">
                            {project.description}
                          </p>
                          <p
                            className={`text-sm ${colors.primaryText} font-semibold`}
                          >
                            {project.impact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Skills & Expertise */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
              <span
                className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              >
                Skills & Expertise
              </span>
              <div
                className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
              ></div>
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Palette size={16} />
                  Design Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.design.map((skill, index) => (
                    <span
                      key={index}
                      className={`bg-gradient-to-r from-purple-100 to-pink-100 ${colors.primaryText} px-4 py-2 rounded-full text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Monitor size={16} />
                  Software Proficiency
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.software.map((skill, index) => (
                    <span
                      key={index}
                      className={`bg-gradient-to-r from-purple-100 to-pink-100 ${colors.primaryText} px-4 py-2 rounded-full text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Camera size={16} />
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.specialties.map((skill, index) => (
                    <span
                      key={index}
                      className={`bg-gradient-to-r from-purple-100 to-pink-100 ${colors.primaryText} px-4 py-2 rounded-full text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
              <span
                className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              >
                Education
              </span>
              <div
                className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
              ></div>
            </h2>
            {data.education.map((edu, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-4`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className={`${colors.primaryText} font-semibold`}>
                      {edu.institution}
                    </p>
                    <p className="text-gray-600">{edu.field}</p>
                    {edu.honors && (
                      <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                        {edu.honors}
                      </span>
                    )}
                    {edu.portfolio && (
                      <span className="inline-block mt-2 ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {edu.portfolio}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-600 font-medium">{edu.year}</span>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Portfolio Highlights */}
        <section className="mt-10 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 relative">
            <span
              className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              Portfolio Highlights
            </span>
            <div
              className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
            ></div>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.portfolio.map((item, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} p-6 rounded-lg border ${colors.border} hover:shadow-lg transition-shadow`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{item.project}</h3>
                  <span className="text-gray-500 text-sm">{item.year}</span>
                </div>
                <p className={`${colors.primaryText} font-semibold mb-2`}>
                  {item.client}
                </p>
                <span className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium mb-3">
                  {item.category}
                </span>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                {item.awards && item.awards.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.awards.map((award, i) => (
                      <span
                        key={i}
                        className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
            <span
              className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              Awards & Recognition
            </span>
            <div
              className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
            ></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.awards.map((award, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg flex items-center gap-3`}
              >
                <Trophy
                  className={`w-6 h-6 ${colors.primaryText} flex-shrink-0`}
                />
                <span className="font-medium text-gray-800">{award}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Notable Clients */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
            <span
              className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              Notable Clients
            </span>
            <div
              className={`absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r ${colors.gradient}`}
            ></div>
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.clients.map((client, index) => (
              <div
                key={index}
                className={`${colors.primaryLight} px-6 py-3 rounded-full border ${colors.border} flex items-center gap-2`}
              >
                <Heart size={16} className={colors.primaryText} />
                <span className="font-semibold text-gray-800">{client}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreativePortfolioTemplate;
