import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  CheckCircle,
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  MousePointer,
} from "lucide-react";

const ResumeBuildingDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progressWidths, setProgressWidths] = useState({});
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    education: "",
    skills: [],
    summary: "",
  });

  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      icon: <User className="w-5 h-5" />,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      data: {
        name: "Sarah Johnson",
        title: "Frontend Developer",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
      },
    },
    {
      id: "experience",
      title: "Work Experience",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      data: {
        experience:
          "Frontend Developer at TechCorp (2022-2024)\nLed development of responsive web applications using React and TypeScript. Improved page load times by 40% and increased user engagement by 25%.",
      },
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      data: {
        education:
          "B.S. Computer Science\nStanford University (2018-2022)\nGPA: 3.8/4.0",
      },
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Code className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      data: {
        skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB"],
      },
    },
    {
      id: "summary",
      title: "Summary",
      icon: <FileText className="w-5 h-5" />,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      data: {
        summary:
          "Passionate Frontend Developer with 3+ years of experience building scalable web applications. Expertise in React ecosystem and modern JavaScript frameworks.",
      },
    },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length) {
      // Start progress bar animation for current step
      setProgressWidths((prev) => ({ ...prev, [currentStep]: 100 }));

      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const stepData = steps[prev].data;
          setResumeData((prevData) => ({
            ...prevData,
            ...stepData,
          }));

          setCompletedSteps((prevCompleted) => {
            if (!prevCompleted.includes(prev)) {
              return [...prevCompleted, prev];
            }
            return prevCompleted;
          });

          const nextStep = prev + 1;
          if (nextStep >= steps.length) {
            setIsPlaying(false);
            return prev;
          }
          return nextStep;
        });
      }, 2500);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlayDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setProgressWidths({});
    setResumeData({
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      education: "",
      skills: [],
      summary: "",
    });

    setTimeout(() => {
      setIsPlaying(true);
    }, 500);
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);

    const newData = {};
    for (let i = 0; i <= stepIndex; i++) {
      Object.assign(newData, steps[i].data);
    }
    setResumeData((prevData) => ({ ...prevData, ...newData }));
    setCompletedSteps(Array.from({ length: stepIndex + 1 }, (_, i) => i));

    // Set progress for clicked step
    setProgressWidths((prev) => ({ ...prev, [stepIndex]: 100 }));
  };

  const handleBuildYourself = () => {
    window.location.href = "/resume-builder";
  };

  const isCompleted = completedSteps.length === steps.length;

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");

        .hero-text {
          font-family: "Space Grotesk", sans-serif;
        }

        .nav-font {
          font-family: "Inter", sans-serif;
        }

        .gradient-bg {
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #f1f5f9 25%,
            #fef7ed 50%,
            #fdf2f8 75%,
            #f8fafc 100%
          );
          background-size: 300% 300%;
          animation: gradientShift 20s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .floating-animation {
          animation: float 8s ease-in-out infinite;
        }

        .step-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
        }

        .step-card.active {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .resume-preview {
          transition: all 0.4s ease;
        }

        .resume-preview.updating {
          transform: scale(1.01);
          box-shadow: 0 0 20px rgba(234, 88, 12, 0.2);
        }

        .progress-bar {
          transition: width 2.5s ease-out;
        }

        .pulse-dot {
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-in-up {
          animation: slideInUp 0.5s ease-out;
        }

        .cursor-magic {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY2QjM1IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K"),
            auto;
        }

        .cursor-pointer-custom {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgM0wyMC41IDEyTDMgMjFWM1oiIGZpbGw9IiNGRjZCMzUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo="),
            pointer;
        }

        .cursor-grab {
          cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTFIMTVNOSAxNUgxNU0xMS4wMTc3IDJDNi4zNzI4NSAyIDIuNzU1MzMgNSAyLjc1NTMzIDlWMTVDMi43NTUzMyAyMSA2LjM3Mjg1IDI0IDExLjAxNzcgMjRIMTMuMDE3N0MxNy42NDI2IDI0IDIxLjI2IDIxIDIxLjI2IDE1VjlDMjEuMjYgNSAxNy42NDI2IDIgMTMuMDE3NyAySDExLjAxNzdaIiBzdHJva2U9IiNGRjZCMzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="),
            grab;
        }
      `}</style>

      <div className="gradient-bg absolute inset-0"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 lg:w-60 lg:h-60 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 floating-animation"></div>
        <div
          className="absolute -bottom-20 -left-20 w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-20 floating-animation"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-15 floating-animation"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="nav-font text-sm font-medium text-gray-700">
              Interactive Demo
            </span>
          </div>

          <h2 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Build Your Resume in
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              {" "}
              5 Simple Steps
            </span>
          </h2>

          <p className="nav-font text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Watch how easy it is to create a professional resume. No design
            skills required!
          </p>

          <button
            onClick={handlePlayDemo}
            className="cursor-magic inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            {isPlaying ? "Restart Demo" : "Watch Demo"}
          </button>
        </div>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-card glass-effect rounded-2xl p-6 border cursor-pointer-custom ${
                  currentStep === index
                    ? `active ${step.bgColor} border-gray-300`
                    : completedSteps.includes(index)
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      currentStep === index
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                        : completedSteps.includes(index)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {completedSteps.includes(index) && currentStep !== index ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="nav-font text-lg font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <p className="nav-font text-gray-600 text-sm">
                      Step {index + 1} of {steps.length}
                    </p>
                  </div>

                  {currentStep === index && (
                    <div className="pulse-dot w-3 h-3 bg-primary-500 rounded-full"></div>
                  )}
                </div>

                {/* Progress Bar - Show for current step */}
                {currentStep === index && (
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`progress-bar bg-gradient-to-r ${step.color} h-2 rounded-full`}
                      style={{
                        width: `${progressWidths[index] || 0}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}

            {/* Demo Complete Message - Show below Summary step */}
            {isCompleted && (
              <div className="slide-in-up glass-effect rounded-2xl p-6 border border-green-200 bg-green-50 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                  <div>
                    <h4 className="hero-text text-xl font-bold text-green-900">
                      Demo Complete!
                    </h4>
                    <p className="nav-font text-green-700">
                      Ready to create your own professional resume?
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBuildYourself}
                  className="cursor-magic w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Building Your Resume
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Resume Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="glass-effect rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="hero-text text-xl font-bold text-gray-900">
                  Live Preview
                </h3>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-600" />
                  <span className="nav-font text-sm text-primary-600 font-medium">
                    Real-time
                  </span>
                </div>
              </div>

              <div
                className={`resume-preview bg-white rounded-xl p-6 border-2 transition-all duration-400 shadow-lg cursor-grab ${
                  isPlaying ? "updating border-primary-200" : "border-gray-200"
                }`}
              >
                {resumeData.name || resumeData.title ? (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="border-b border-gray-200 pb-4">
                      <h1 className="nav-font text-2xl font-bold text-gray-900">
                        {resumeData.name}
                      </h1>
                      <p className="nav-font text-primary-600 font-medium text-lg">
                        {resumeData.title}
                      </p>
                      <div className="nav-font text-sm text-gray-600 mt-2 space-y-1">
                        {resumeData.email && <div>{resumeData.email}</div>}
                        {resumeData.phone && <div>{resumeData.phone}</div>}
                        {resumeData.location && (
                          <div>{resumeData.location}</div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                      <div>
                        <h3 className="nav-font text-lg font-semibold text-gray-900 mb-2">
                          Summary
                        </h3>
                        <p className="nav-font text-gray-700 text-sm leading-relaxed">
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience && (
                      <div>
                        <h3 className="nav-font text-lg font-semibold text-gray-900 mb-2">
                          Experience
                        </h3>
                        <div className="nav-font text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {resumeData.experience}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education && (
                      <div>
                        <h3 className="nav-font text-lg font-semibold text-gray-900 mb-2">
                          Education
                        </h3>
                        <div className="nav-font text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {resumeData.education}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills && resumeData.skills.length > 0 && (
                      <div>
                        <h3 className="nav-font text-lg font-semibold text-gray-900 mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="nav-font bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MousePointer className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="nav-font text-lg font-semibold text-gray-900 mb-2">
                      Your Resume Preview
                    </h4>
                    <p className="nav-font text-gray-600">
                      Click on steps above or start the demo to see your resume
                      build in real-time
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  onClick={handleBuildYourself}
                  className="cursor-magic w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Build Your Resume
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuildingDemo;
