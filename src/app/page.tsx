"use client"

import { useState, useEffect } from "react"
import {
  Mail,
  MapPin,
  Github,
  ExternalLink,
  Calendar,
  Building,
  GraduationCap,
  Code,
  Languages,
  Sparkles,
  ArrowRight,
  Star,
  Moon,
  Sun,
  User,
  Linkedin,
  Instagram,
} from "lucide-react"
import Image from "next/image"
import profilePhoto from "/public/profile-photo.jpg"

export default function CVPortfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const projects = [
    {
      title: "Earthquake Detection System",
      description:
        "Neural network-based model to detect earthquakes and predict magnitude using seismograph data from Indonesian earthquake stations.",
      tech: ["Python", "TensorFlow", "Machine Learning", "Real-time Processing"],
      year: "2025",
      type: "Thesis Project",
      link: "/earthquake-detection",
      isInternal: true,
      featured: true,
    },
    {
      title: "Chess Elo Prediction",
      description:
        "Built data processing pipeline and RNN/CNN models to predict player Elo ratings from chess move statistics.",
      tech: ["Python", "RNN", "CNN", "Data Processing"],
      year: "2024",
      type: "Machine Learning",
      link: "https://github.com/monsieurafa/Chess-Elo-Prediction",
      isInternal: false,
      featured: false,
    },
    {
      title: "Hafiz Helper App",
      description:
        "Mobile application to assist users in reading the Qur'an, developed using Test-Driven Development principles.",
      tech: ["React Native", "TDD", "Mobile Development"],
      year: "2024",
      type: "Software Engineering",
      link: "#",
      isInternal: false,
      featured: false,
    },
  ]

  const experiences = [
    {
      title: "AI & ML Engineer Intern",
      company: "Bank Mandiri",
      location: "Jakarta, Indonesia",
      period: "Jun 2024 - Aug 2024",
      achievements: [
        "Developed sequential models to predict future features based on historical data",
        "Automated daily predictions for all Livin' users, improving operational efficiency",
        "Implemented automated model retraining pipeline to ensure model performance over time",
      ],
    },
    {
      title: "Computer-Aided Instruction",
      company: "Faculty of Computer Science, University of Indonesia",
      location: "Depok, Indonesia",
      period: "Aug 2024 - Dec 2024",
      achievements: [
        "Mentored two student groups in designing and developing E-learning systems",
        "Facilitated engaging online and offline learning environments",
      ],
    },
  ]

  const skills = {
    languages: ["Python", "Java", "JavaScript", "CSS", "HTML", "SQL"],
    frameworks: ["Django", "SpringBoot", "NextJS", "ReactNative", "TensorFlow", "PyTorch"],
    soft: ["Communication", "Work Ethic", "Teamwork", "Leadership"],
  }

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${isDarkMode ? "dark bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-cyan-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 dark:bg-cyan-500/10 rounded-full blur-2xl animate-pulse"
          style={{
            animation: "float 6s ease-in-out infinite 1s",
          }}
        />
      </div>

      <header className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-emerald-600 dark:from-cyan-800 dark:via-cyan-900 dark:to-emerald-800 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm p-2 sm:px-3 sm:py-2 rounded-lg transition-all duration-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full border-4 border-white/30 overflow-hidden shadow-lg">
              <Image
                src={profilePhoto}
                alt="Rafa Maritza"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority // Loads the image faster as it's above the fold
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Rafa Maritza
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 px-4">
              Computer Science Graduate & AI/ML Enthusiast
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-sm md:text-base mb-6 sm:mb-8 px-4">
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Tangerang Selatan, Indonesia</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mb-6 sm:mb-8">
              <a
                href="mailto:elrafamaritza@gmail.com"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/monsieurafa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rafa-maritza-858447226/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/rafa.tza"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <button
              className="bg-white text-cyan-600 hover:bg-white/90 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
              onClick={() => scrollToSection("projects")}
            >
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">Explore My Work</span>
              <span className="sm:hidden">My Work</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-lg"
            : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
        } border-b border-slate-200 dark:border-slate-700`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center sm:justify-center overflow-x-auto scrollbar-hide py-4">
            <div className="flex space-x-2 sm:space-x-8 min-w-max">
              {["about", "experience", "projects", "skills"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 capitalize font-medium whitespace-nowrap ${
                    activeSection === section
                      ? "bg-cyan-600 text-white shadow-lg scale-105"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-cyan-100 dark:hover:bg-cyan-900/20 hover:scale-105"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-20 relative z-10">
        <section id="about" className="scroll-mt-20">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-600" />
              </div>
              About Me
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-500" />
                    Education
                  </h3>
                  <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-medium text-base sm:text-lg">Bachelor in Computer Science</h4>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">University of Indonesia</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Sept 2021 - July 2025 • GPA: 3.43/4.0</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <Languages className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-500" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-medium">
                      Indonesian
                    </span>
                    <span className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-medium">English</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Relevant Coursework</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  Operating Systems, Software Engineering, Data Structures & Algorithms, Algorithm Design & Analysis,
                  Platform-Based Programming, Advanced Programming, Databases, Machine Learning, Computer-Aided
                  Instruction, Data Mining, Information Retrieval
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Building className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-600" />
            </div>
            Work Experience
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-cyan-600 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:text-right text-sm text-slate-500 dark:text-slate-400 gap-2">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-4 h-4" />
                      <span className="whitespace-nowrap">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full w-fit">
                      <MapPin className="w-4 h-4" />
                      <span className="whitespace-nowrap">{exp.location}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed text-sm sm:text-base">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 group ${
                  project.featured
                    ? "ring-2 ring-cyan-500/20 bg-gradient-to-br from-white to-cyan-500/5 dark:from-slate-800 dark:to-cyan-500/5"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.featured
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {project.type}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.featured && <Star className="w-4 h-4 text-emerald-500 fill-current" />}
                    <span className="text-sm text-slate-500 dark:text-slate-400">{project.year}</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-cyan-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs hover:bg-cyan-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link !== "#" && (
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base ${
                        project.featured
                          ? "bg-cyan-600 text-white hover:bg-cyan-700"
                          : "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                      onClick={() => {
                        if (project.isInternal) {
                          window.location.href = project.link
                        } else {
                          window.open(project.link, "_blank")
                        }
                      }}
                    >
                      {project.isInternal ? (
                        <>
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 group">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <Code className="w-5 h-5" />
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.languages.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 group">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <Building className="w-5 h-5" />
                Frameworks & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.frameworks.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 group">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 group-hover:text-cyan-600 transition-colors">
                <Sparkles className="w-5 h-5" />
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 py-8 sm:py-12 mt-12 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            © 2025 Rafa Maritza. Built with Next.js and Tailwind CSS.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Crafted with passion for innovation and excellence.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
