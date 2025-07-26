import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Download,
  Plus,
  X,
  Check,
  User,
  FileText,
  Code,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Trophy,
  Heart,
  Palette,
  Sparkles,
} from "lucide-react";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Project {
  id: string;
  name: string;
  techStack: string;
  githubLink: string;
  deployLink: string;
  description: string[];
}

interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  year: string;
  marks: string;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
}

const FONT_CATEGORIES = {
  "sans-serif": {
    name: "Sans-Serif (Modern & Clean)",
    fonts: [
      "Helvetica",
      "Arial",
      "Calibri",
      "Open Sans",
      "Lato",
      "Roboto",
      "Verdana",
      "Source Sans Pro",
      "Tahoma",
      "Trebuchet MS",
    ],
  },
  serif: {
    name: "Serif (Traditional & Professional)",
    fonts: [
      "Georgia",
      "Cambria",
      "Times New Roman",
      "Garamond",
      "Baskerville",
      "Palatino Linotype",
    ],
  },
  "modern-minimal": {
    name: "Modern & Minimal Sans-Serif",
    fonts: [
      "Poppins",
      "Montserrat",
      "Nunito",
      "Work Sans",
      "Exo 2",
      "Mulish",
      "Ubuntu",
      "Inter",
    ],
  },
};

const STEPS = [
  { id: "header", title: "Personal Info", icon: User, required: true },
  { id: "summary", title: "Summary", icon: FileText, required: true },
  { id: "skills", title: "Skills", icon: Code, required: true },
  { id: "experience", title: "Experience", icon: Briefcase, required: false },
  { id: "projects", title: "Projects", icon: FolderOpen, required: true },
  { id: "education", title: "Education", icon: GraduationCap, required: true },
  {
    id: "certifications",
    title: "Certifications",
    icon: Award,
    required: false,
  },
  { id: "achievements", title: "Achievements", icon: Trophy, required: false },
  { id: "interests", title: "Interests", icon: Heart, required: false },
  {
    id: "customization",
    title: "Customization",
    icon: Palette,
    required: true,
  },
];

export default function Builder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Roboto");
  const [fontCategory, setFontCategory] = useState<string>("sans-serif");

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    address: "",
  });

  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState({
    programmingLanguages: [] as string[],
    webTechnologies: [] as string[],
    frameworksLibraries: [] as string[],
    databases: [] as string[],
    toolsPlatforms: [] as string[],
    cloudHosting: [] as string[],
    otherTechnical: [] as string[],
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState("");
  const [interests, setInterests] = useState("");
  const [customSkillInputs, setCustomSkillInputs] = useState<
    Record<string, string>
  >({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setPersonalInfo(data.personalInfo || personalInfo);
        setSummary(data.summary || "");
        setSkills(
          data.skills || {
            programmingLanguages: [],
            webTechnologies: [],
            frameworksLibraries: [],
            databases: [],
            toolsPlatforms: [],
            cloudHosting: [],
            otherTechnical: [],
          },
        );
        setExperiences(data.experiences || []);
        setProjects(data.projects || []);
        setEducation(data.education || []);
        setCertifications(data.certifications || []);
        setAchievements(data.achievements || "");
        setInterests(data.interests || "");
        setFontFamily(data.fontFamily || "Roboto");
        setFontCategory(data.fontCategory || "sans-serif");
        setCurrentStep(data.currentStep || 0);
        setCustomSkillInputs(data.customSkillInputs || {});
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      personalInfo,
      summary,
      skills,
      experiences,
      projects,
      education,
      certifications,
      achievements,
      interests,
      fontFamily,
      fontCategory,
      currentStep,
      customSkillInputs,
    };
    localStorage.setItem("resumeBuilderData", JSON.stringify(dataToSave));
  }, [
    personalInfo,
    summary,
    skills,
    experiences,
    projects,
    education,
    certifications,
    achievements,
    interests,
    fontFamily,
    fontCategory,
    currentStep,
    customSkillInputs,
  ]);

  // Animation effects
  useEffect(() => {
    gsap.fromTo(
      ".sidebar-step",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".step-content",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }, [currentStep]);

  // ATS Score calculation
  const calculateATSScore = () => {
    let score = 0;

    if (personalInfo.name && personalInfo.email && personalInfo.phone)
      score += 20;
    if (personalInfo.linkedin) score += 10;
    if (personalInfo.github) score += 10;
    if (summary.length > 50) score += 15;
    if (
      skills.programmingLanguages.length > 0 &&
      skills.frameworksLibraries.length > 0
    )
      score += 15;
    if (projects.length > 0) score += 15;
    if (education.length > 0) score += 10;
    if (experiences.length > 0) score += 5;

    return Math.min(score, 100);
  };

  const getATSRecommendations = () => {
    const recommendations = [];

    if (!personalInfo.linkedin)
      recommendations.push("Add LinkedIn profile URL to increase visibility");
    if (!personalInfo.github)
      recommendations.push("Add GitHub profile for tech roles");
    if (summary.length < 100)
      recommendations.push("Expand summary to 2-3 detailed sentences");
    if (projects.length < 2)
      recommendations.push("Add more projects to showcase your skills");
    if (experiences.length === 0)
      recommendations.push("Add work experience or internships");
    if (skills.databases.length === 0)
      recommendations.push("Add database skills for better tech positioning");
    if (projects.some((p) => !p.githubLink))
      recommendations.push("Add GitHub links to all projects");

    return recommendations;
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: any,
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      techStack: "",
      githubLink: "",
      deployLink: "",
      description: [""],
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      course: "",
      degree: "",
      year: "",
      marks: "",
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string,
  ) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      year: "",
    };
    setCertifications([...certifications, newCert]);
  };

  const updateCertification = (
    id: string,
    field: keyof Certification,
    value: string,
  ) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    );
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) {
      alert("Resume content not ready. Please try again.");
      return;
    }

    if (!personalInfo.name || personalInfo.name.trim().length === 0) {
      alert("Please fill in your name before downloading.");
      return;
    }

    try {
      // Create text-based PDF
      const pdf = new jsPDF("p", "pt", "a4");

      // Set font
      pdf.setFont("helvetica");

      let yPosition = 60;
      const margin = 40;
      const pageWidth = 595 - 2 * margin;

      // Helper function to add text with word wrapping
      const addWrappedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize: number = 10,
      ) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + lines.length * (fontSize + 2);
      };

      // Helper function to check if we need a new page
      const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > 750) {
          // A4 height is about 842 points
          pdf.addPage();
          yPosition = 60;
        }
      };

      // Header - Name (centered)
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      const nameWidth = pdf.getTextWidth(personalInfo.name.toUpperCase());
      const centerX = (595 - nameWidth) / 2; // Center on page
      pdf.text(personalInfo.name.toUpperCase(), centerX, yPosition);
      yPosition += 30;

      // Contact Information (centered and properly formatted)
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      const contactLines = [];
      if (personalInfo.phone && personalInfo.email) {
        contactLines.push(`${personalInfo.phone} | ${personalInfo.email}`);
      }

      const socialLinks = [
        personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`,
        personalInfo.github && `GitHub: ${personalInfo.github}`,
        personalInfo.portfolio && `Portfolio: ${personalInfo.portfolio}`,
      ].filter(Boolean);

      if (socialLinks.length > 0) {
        contactLines.push(socialLinks.join(" | "));
      }

      if (personalInfo.address) {
        contactLines.push(personalInfo.address);
      }

      contactLines.forEach((line) => {
        const lineWidth = pdf.getTextWidth(line);
        const lineCenterX = (595 - lineWidth) / 2;
        pdf.text(line, lineCenterX, yPosition);
        yPosition += 12;
      });

      yPosition += 10;

      // Summary
      if (summary) {
        checkPageBreak(60);

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("SUMMARY", margin, yPosition);
        yPosition += 5;

        // Draw underline
        pdf.setLineWidth(1);
        pdf.line(margin, yPosition, margin + pageWidth, yPosition);
        yPosition += 15;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        yPosition = addWrappedText(summary, margin, yPosition, pageWidth);
        yPosition += 20;
      }

      // Skills
      if (Object.values(skills).some((skillArray) => skillArray.length > 0)) {
        checkPageBreak(100);

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("SKILLS", margin, yPosition);
        yPosition += 5;

        pdf.setLineWidth(1);
        pdf.line(margin, yPosition, margin + pageWidth, yPosition);
        yPosition += 15;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");

        const skillCategories = [
          {
            title: "Programming Languages",
            skills: skills.programmingLanguages,
          },
          { title: "Web Technologies", skills: skills.webTechnologies },
          {
            title: "Frameworks & Libraries",
            skills: skills.frameworksLibraries,
          },
          { title: "Databases", skills: skills.databases },
          { title: "Tools & Platforms", skills: skills.toolsPlatforms },
          { title: "Cloud & Hosting", skills: skills.cloudHosting },
          { title: "Other Technical Skills", skills: skills.otherTechnical },
        ];

        skillCategories.forEach((category) => {
          if (category.skills.length > 0) {
            pdf.setFont("helvetica", "bold");
            pdf.text(`${category.title}:`, margin, yPosition);
            yPosition += 12;

            pdf.setFont("helvetica", "normal");
            const skillsText = category.skills.join(", ");
            yPosition = addWrappedText(
              skillsText,
              margin + 10,
              yPosition,
              pageWidth - 10,
            );
            yPosition += 8;
          }
        });
        yPosition += 15;
      }

      // Experience
      if (experiences.length > 0) {
        checkPageBreak(80);

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("EXPERIENCE", margin, yPosition);
        yPosition += 5;

        pdf.setLineWidth(1);
        pdf.line(margin, yPosition, margin + pageWidth, yPosition);
        yPosition += 15;

        experiences.forEach((exp, index) => {
          if (index > 0) checkPageBreak(60);

          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");
          pdf.text(exp.position, margin, yPosition);

          pdf.setFont("helvetica", "normal");
          const dateText = `${exp.startDate} - ${exp.endDate}`;
          const dateWidth = pdf.getTextWidth(dateText);
          pdf.text(dateText, margin + pageWidth - dateWidth, yPosition);
          yPosition += 14;

          pdf.setFontSize(10);
          pdf.setFont("helvetica", "italic");
          pdf.text(exp.company, margin, yPosition);
          yPosition += 16;

          pdf.setFont("helvetica", "normal");
          exp.responsibilities
            .filter((r) => r.trim())
            .forEach((resp) => {
              yPosition = addWrappedText(
                `• ${resp}`,
                margin + 10,
                yPosition,
                pageWidth - 10,
              );
              yPosition += 4;
            });
          yPosition += 12;
        });
      }

      // Projects
      if (projects.length > 0) {
        checkPageBreak(80);

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("PROJECTS", margin, yPosition);
        yPosition += 5;

        pdf.setLineWidth(1);
        pdf.line(margin, yPosition, margin + pageWidth, yPosition);
        yPosition += 15;

        projects.forEach((project, index) => {
          if (index > 0) checkPageBreak(50);

          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");
          pdf.text(project.name, margin, yPosition);
          yPosition += 14;

          if (project.techStack) {
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            yPosition = addWrappedText(
              `Tech Stack: ${project.techStack}`,
              margin,
              yPosition,
              pageWidth,
            );
            yPosition += 4;
          }

          if (project.githubLink || project.deployLink) {
            const links = [
              project.githubLink && `GitHub: ${project.githubLink}`,
              project.deployLink && `Live Demo: ${project.deployLink}`,
            ]
              .filter(Boolean)
              .join(" | ");
            yPosition = addWrappedText(links, margin, yPosition, pageWidth);
            yPosition += 4;
          }

          project.description
            .filter((d) => d.trim())
            .forEach((desc) => {
              yPosition = addWrappedText(
                `• ${desc}`,
                margin + 10,
                yPosition,
                pageWidth - 10,
              );
              yPosition += 4;
            });
          yPosition += 12;
        });
      }

      // Education
      if (education.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("EDUCATION", margin, yPosition);
        yPosition += 15;

        pdf.line(margin, yPosition - 5, margin + pageWidth, yPosition - 5);
        yPosition += 5;

        education.forEach((edu) => {
          pdf.setFont("helvetica", "bold");
          pdf.text(edu.institution, margin, yPosition);
          pdf.setFont("helvetica", "normal");
          pdf.text(edu.year, margin + 300, yPosition);
          yPosition += 12;

          pdf.text(`${edu.degree} in ${edu.course}`, margin, yPosition);
          yPosition += 12;

          if (edu.marks) {
            pdf.text(edu.marks, margin, yPosition);
            yPosition += 12;
          }
          yPosition += 5;
        });
      }

      // Certifications
      if (certifications.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("CERTIFICATIONS", margin, yPosition);
        yPosition += 15;

        pdf.line(margin, yPosition - 5, margin + pageWidth, yPosition - 5);
        yPosition += 5;

        certifications.forEach((cert) => {
          pdf.setFont("helvetica", "normal");
          pdf.text(cert.title, margin, yPosition);
          pdf.text(cert.year, margin + 300, yPosition);
          yPosition += 12;
          pdf.text(cert.organization, margin, yPosition);
          yPosition += 15;
        });
      }

      // Achievements
      if (achievements) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("ACHIEVEMENTS", margin, yPosition);
        yPosition += 15;

        pdf.line(margin, yPosition - 5, margin + pageWidth, yPosition - 5);
        yPosition += 5;

        pdf.setFont("helvetica", "normal");
        yPosition = addWrappedText(
          achievements,
          margin,
          yPosition,
          pageWidth,
          10,
        );
      }

      // Interests
      if (interests) {
        yPosition += 15;
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("INTERESTS", margin, yPosition);
        yPosition += 15;

        pdf.line(margin, yPosition - 5, margin + pageWidth, yPosition - 5);
        yPosition += 5;

        pdf.setFont("helvetica", "normal");
        yPosition = addWrappedText(interests, margin, yPosition, pageWidth, 10);
      }

      // Download the PDF
      const fileName = `${personalInfo.name.replace(/\s+/g, "")}_cv.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    // Check if trying to skip required sections
    const currentStepObj = STEPS[currentStep];
    const targetStepObj = STEPS[stepIndex];

    // Only allow skipping if current step is optional or moving backward
    if (stepIndex > currentStep && currentStepObj.required) {
      // Check if current required step has minimum data
      if (!isStepComplete(currentStep)) {
        alert(
          `Please complete the required fields in ${currentStepObj.title} section before proceeding.`,
        );
        return;
      }
    }

    setCurrentStep(stepIndex);
  };

  const isStepComplete = (stepIndex: number) => {
    const step = STEPS[stepIndex];

    switch (step.id) {
      case "header":
        return (
          personalInfo.name &&
          personalInfo.email &&
          personalInfo.phone &&
          personalInfo.address
        );
      case "summary":
        return summary.trim().length > 0;
      case "skills":
        return (
          skills.programmingLanguages.length > 0 &&
          skills.frameworksLibraries.length > 0
        );
      case "projects":
        return (
          projects.length > 0 && projects.every((p) => p.name && p.techStack)
        );
      case "education":
        return (
          education.length > 0 &&
          education.every((e) => e.institution && e.degree && e.year)
        );
      case "customization":
        return true; // Font selection is always complete
      default:
        return true; // Optional sections are always "complete"
    }
  };

  const updateResponsibility = (
    expId: string,
    index: number,
    value: string,
  ) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const newResponsibilities = [...exp.responsibilities];
          newResponsibilities[index] = value;
          return { ...exp, responsibilities: newResponsibilities };
        }
        return exp;
      }),
    );
  };

  const addResponsibility = (expId: string) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: [...exp.responsibilities, ""] };
        }
        return exp;
      }),
    );
  };

  const removeResponsibility = (expId: string, index: number) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const newResponsibilities = exp.responsibilities.filter(
            (_, i) => i !== index,
          );
          return {
            ...exp,
            responsibilities:
              newResponsibilities.length > 0 ? newResponsibilities : [""],
          };
        }
        return exp;
      }),
    );
  };

  const updateProjectDescription = (
    projId: string,
    index: number,
    value: string,
  ) => {
    setProjects(
      projects.map((proj) => {
        if (proj.id === projId) {
          const newDescription = [...proj.description];
          newDescription[index] = value;
          return { ...proj, description: newDescription };
        }
        return proj;
      }),
    );
  };

  const addProjectDescription = (projId: string) => {
    setProjects(
      projects.map((proj) => {
        if (proj.id === projId) {
          return { ...proj, description: [...proj.description, ""] };
        }
        return proj;
      }),
    );
  };

  const removeProjectDescription = (projId: string, index: number) => {
    setProjects(
      projects.map((proj) => {
        if (proj.id === projId) {
          const newDescription = proj.description.filter((_, i) => i !== index);
          return {
            ...proj,
            description: newDescription.length > 0 ? newDescription : [""],
          };
        }
        return proj;
      }),
    );
  };

  const ResumePreview = () => (
    <motion.div
      ref={resumeRef}
      className="bg-white p-6 shadow-lg max-w-[21cm] mx-auto text-sm leading-tight print:p-4 print:shadow-none"
      style={{ fontFamily: fontFamily }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="font-bold text-xl text-black mb-2 tracking-wide uppercase">
          {personalInfo.name}
        </h1>
        <div className="text-black space-y-1 text-xs">
          <p>
            {personalInfo.phone} |{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-black hover:underline cursor-pointer"
            >
              {personalInfo.email}
            </a>
          </p>
          {(personalInfo.linkedin ||
            personalInfo.github ||
            personalInfo.portfolio) && (
            <p className="flex justify-center gap-2 flex-wrap">
              {personalInfo.linkedin && (
                <a
                  href={
                    personalInfo.linkedin.startsWith("http")
                      ? personalInfo.linkedin
                      : `https://${personalInfo.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline cursor-pointer"
                >
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <>
                  {personalInfo.linkedin && " | "}
                  <a
                    href={
                      personalInfo.github.startsWith("http")
                        ? personalInfo.github
                        : `https://${personalInfo.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline cursor-pointer"
                  >
                    GitHub
                  </a>
                </>
              )}
              {personalInfo.portfolio && (
                <>
                  {(personalInfo.linkedin || personalInfo.github) && " | "}
                  <a
                    href={
                      personalInfo.portfolio.startsWith("http")
                        ? personalInfo.portfolio
                        : `https://${personalInfo.portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline cursor-pointer"
                  >
                    Portfolio
                  </a>
                </>
              )}
            </p>
          )}
          <p>{personalInfo.address}</p>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            SUMMARY
          </h2>
          <hr className="border-black mb-2" />
          <p className="text-black text-xs leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {(skills.programmingLanguages.length > 0 ||
        skills.webTechnologies.length > 0 ||
        skills.frameworksLibraries.length > 0 ||
        skills.databases.length > 0 ||
        skills.toolsPlatforms.length > 0 ||
        skills.cloudHosting.length > 0 ||
        skills.otherTechnical.length > 0) && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            SKILLS
          </h2>
          <hr className="border-black mb-2" />
          <div className="text-black text-xs space-y-1">
            {skills.programmingLanguages.length > 0 && (
              <p>
                <strong>Programming Languages:</strong>{" "}
                {skills.programmingLanguages.join(", ")}
              </p>
            )}
            {skills.webTechnologies.length > 0 && (
              <p>
                <strong>Web Technologies:</strong>{" "}
                {skills.webTechnologies.join(", ")}
              </p>
            )}
            {skills.frameworksLibraries.length > 0 && (
              <p>
                <strong>Frameworks & Libraries:</strong>{" "}
                {skills.frameworksLibraries.join(", ")}
              </p>
            )}
            {skills.databases.length > 0 && (
              <p>
                <strong>Databases:</strong> {skills.databases.join(", ")}
              </p>
            )}
            {skills.toolsPlatforms.length > 0 && (
              <p>
                <strong>Tools & Platforms:</strong>{" "}
                {skills.toolsPlatforms.join(", ")}
              </p>
            )}
            {skills.cloudHosting.length > 0 && (
              <p>
                <strong>Cloud & Hosting:</strong>{" "}
                {skills.cloudHosting.join(", ")}
              </p>
            )}
            {skills.otherTechnical.length > 0 && (
              <p>
                <strong>Other Technical Skills:</strong>{" "}
                {skills.otherTechnical.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            EXPERIENCE
          </h2>
          <hr className="border-black mb-2" />
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-black text-xs">{exp.position}</h3>
                <span className="text-black text-xs">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-black text-xs mb-1">{exp.company}</p>
              <ul className="text-black text-xs list-disc list-inside space-y-0.5">
                {exp.responsibilities
                  .filter((r) => r.trim())
                  .map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            PROJECTS
          </h2>
          <hr className="border-black mb-2" />
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-black text-xs">{project.name}</h3>
              <p className="text-black text-xs mb-1">
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
              {(project.githubLink || project.deployLink) && (
                <p className="text-black text-xs mb-1">
                  {project.githubLink && (
                    <a
                      href={
                        project.githubLink.startsWith("http")
                          ? project.githubLink
                          : `https://${project.githubLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline cursor-pointer"
                    >
                      GitHub
                    </a>
                  )}
                  {project.deployLink && (
                    <>
                      {project.githubLink && " | "}
                      <a
                        href={
                          project.deployLink.startsWith("http")
                            ? project.deployLink
                            : `https://${project.deployLink}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline cursor-pointer"
                      >
                        Live Demo
                      </a>
                    </>
                  )}
                </p>
              )}
              <ul className="text-black text-xs list-disc list-inside space-y-0.5">
                {project.description
                  .filter((d) => d.trim())
                  .map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            EDUCATION
          </h2>
          <hr className="border-black mb-2" />
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-black text-xs">
                  {edu.institution}
                </h3>
                <span className="text-black text-xs">{edu.year}</span>
              </div>
              <p className="text-black text-xs">
                {edu.degree} in {edu.course}
              </p>
              {edu.marks && <p className="text-black text-xs">{edu.marks}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            CERTIFICATIONS
          </h2>
          <hr className="border-black mb-2" />
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-1">
              <div className="flex justify-between items-start">
                <span className="text-black text-xs">{cert.title}</span>
                <span className="text-black text-xs">{cert.year}</span>
              </div>
              <p className="text-black text-xs">{cert.organization}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            ACHIEVEMENTS
          </h2>
          <hr className="border-black mb-2" />
          <p className="text-black text-xs">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="mb-4">
          <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
            INTERESTS
          </h2>
          <hr className="border-black mb-2" />
          <p className="text-black text-xs">{interests}</p>
        </div>
      )}
    </motion.div>
  );

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case "header":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    Full Name *
                  </Label>
                  <Input
                    value={personalInfo.name}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, name: e.target.value })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="Your full name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        phone: e.target.value,
                      })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    LinkedIn
                  </Label>
                  <Input
                    value={personalInfo.linkedin}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        linkedin: e.target.value,
                      })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="linkedin.com/in/username"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    GitHub
                  </Label>
                  <Input
                    value={personalInfo.github}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        github: e.target.value,
                      })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="github.com/username"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label className="font-roboto text-black font-medium">
                    Portfolio
                  </Label>
                  <Input
                    value={personalInfo.portfolio}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        portfolio: e.target.value,
                      })
                    }
                    className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                    placeholder="yourportfolio.com"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Address *
                </Label>
                <Input
                  value={personalInfo.address}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      address: e.target.value,
                    })
                  }
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="City, State - Postal Code, Country"
                />
              </motion.div>
            </CardContent>
          </Card>
        );

      case "summary":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Summary (2-3 lines) *
                </Label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  rows={4}
                  placeholder="Write a brief professional summary highlighting your key skills and experience..."
                />
                <p className="text-xs text-gray-text mt-2">
                  {summary.length} characters
                </p>
              </motion.div>
            </CardContent>
          </Card>
        );

      case "skills":
        const SKILL_CATEGORIES = {
          programmingLanguages: {
            title: "Programming Languages",
            required: true,
            skills: [
              "C",
              "C++",
              "C#",
              "Java",
              "Kotlin",
              "Scala",
              "Python",
              "Ruby",
              "PHP",
              "Perl",
              "JavaScript (ES6+)",
              "TypeScript",
              "Go",
              "Rust",
              "Swift",
              "Objective‑C",
              "R",
              "Dart",
              "Julia",
              "Shell Scripting (Bash, Zsh, PowerShell)",
              "MATLAB",
            ],
          },
          webTechnologies: {
            title: "Web Technologies",
            required: false,
            skills: [
              "HTML5",
              "CSS3",
              "SCSS / SASS",
              "Less",
              "Tailwind CSS",
              "Bootstrap",
              "JSON",
              "XML",
              "REST APIs",
              "SOAP",
              "GraphQL",
              "WebSockets",
            ],
          },
          frameworksLibraries: {
            title: "Frameworks & Libraries",
            required: true,
            skills: [
              "React.js",
              "Next.js",
              "Vue.js",
              "Angular",
              "Node.js",
              "Express.js",
              "NestJS",
              "jQuery",
              "Spring Boot (Java)",
              "Django",
              "Flask (Python)",
              "FastAPI",
              "Laravel",
              "CodeIgniter (PHP)",
              "Hibernate (Java)",
            ],
          },
          databases: {
            title: "Databases",
            required: false,
            skills: [
              "MySQL",
              "PostgreSQL",
              "MariaDB",
              "Oracle DB",
              "SQLite",
              "MongoDB",
              "Firebase Firestore",
              "CouchDB",
              "Cassandra",
              "DynamoDB",
              "Redis",
              "Memcached",
            ],
          },
          toolsPlatforms: {
            title: "Tools & Platforms",
            required: false,
            skills: [
              "Git",
              "GitHub",
              "GitLab",
              "Bitbucket",
              "Docker",
              "Kubernetes",
              "Jenkins",
              "Travis CI",
              "CircleCI",
              "Postman",
              "Swagger",
              "VS Code",
              "IntelliJ IDEA",
              "Eclipse",
              "PyCharm",
              "Figma",
              "Adobe XD",
              "Jira",
              "Trello",
            ],
          },
          cloudHosting: {
            title: "Cloud & Hosting",
            required: false,
            skills: [
              "AWS (EC2, S3, RDS, Lambda)",
              "Microsoft Azure",
              "Google Cloud Platform (GCP)",
              "Netlify",
              "Vercel",
              "Heroku",
              "DigitalOcean",
              "Render",
            ],
          },
          otherTechnical: {
            title: "Other Technical Skills",
            required: false,
            skills: [
              "Responsive Web Design (RWD)",
              "API Development (REST, GraphQL)",
              "Agile & Scrum Methodologies",
              "CI/CD Pipelines",
              "Unit Testing (Jest, Mocha, PyTest)",
              "Performance Optimization",
              "SEO Basics",
            ],
          },
        };

        const toggleSkill = (category: keyof typeof skills, skill: string) => {
          setSkills((prevSkills) => {
            const categorySkills = prevSkills[category];
            const isSelected = categorySkills.includes(skill);

            if (isSelected) {
              return {
                ...prevSkills,
                [category]: categorySkills.filter((s) => s !== skill),
              };
            } else {
              return {
                ...prevSkills,
                [category]: [...categorySkills, skill],
              };
            }
          });
        };

        const addCustomSkill = (category: keyof typeof skills) => {
          const customSkill = customSkillInputs[category]?.trim();
          if (customSkill && !skills[category].includes(customSkill)) {
            setSkills((prevSkills) => ({
              ...prevSkills,
              [category]: [...prevSkills[category], customSkill],
            }));
            setCustomSkillInputs((prev) => ({ ...prev, [category]: "" }));
          }
        };

        const removeSkill = (category: keyof typeof skills, skill: string) => {
          setSkills((prevSkills) => ({
            ...prevSkills,
            [category]: prevSkills[category].filter((s) => s !== skill),
          }));
        };

        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technical Skills
              </CardTitle>
              <p className="text-sm text-gray-text mt-2">
                Select your technical skills from the categories below.
                Programming Languages and Frameworks are required.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(SKILL_CATEGORIES).map(
                ([categoryKey, category], categoryIndex) => {
                  const typedCategoryKey = categoryKey as keyof typeof skills;
                  return (
                    <motion.div
                      key={categoryKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-roboto font-semibold text-lg text-black">
                          {category.title}
                        </h3>
                        {category.required && (
                          <span className="text-red-500 text-sm">*</span>
                        )}
                      </div>

                      {/* Selected Skills Tags */}
                      {skills[typedCategoryKey].length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                          {skills[typedCategoryKey].map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full"
                            >
                              {skill}
                              <button
                                onClick={() =>
                                  removeSkill(typedCategoryKey, skill)
                                }
                                className="ml-1 hover:text-red-300 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Skill Checkboxes */}
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => {
                          const isSelected =
                            skills[typedCategoryKey].includes(skill);
                          return (
                            <motion.label
                              key={skill}
                              className={`inline-flex items-center px-3 py-2 rounded-full cursor-pointer transition-all duration-200 text-xs font-medium ${
                                isSelected
                                  ? "bg-black text-white shadow-md"
                                  : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() =>
                                  toggleSkill(typedCategoryKey, skill)
                                }
                                className="hidden"
                              />
                              <span className="whitespace-nowrap">{skill}</span>
                            </motion.label>
                          );
                        })}
                      </div>

                      {/* Add Custom Skill */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom skill..."
                          value={customSkillInputs[categoryKey] || ""}
                          onChange={(e) =>
                            setCustomSkillInputs((prev) => ({
                              ...prev,
                              [categoryKey]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCustomSkill(typedCategoryKey);
                            }
                          }}
                          className="border-gray-border font-roboto focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                        />
                        <EnhancedButton
                          onClick={() => addCustomSkill(typedCategoryKey)}
                          variant="outline"
                          size="sm"
                          disabled={!customSkillInputs[categoryKey]?.trim()}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </EnhancedButton>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </CardContent>
          </Card>
        );

      case "experience":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="font-roboto text-black flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience (Optional)
                </CardTitle>
                <EnhancedButton
                  onClick={addExperience}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Experience
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence>
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="border border-gray-border rounded-lg p-6 bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold font-roboto text-black">
                        Experience Entry
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Position
                        </Label>
                        <Input
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, "position", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Company
                        </Label>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Start Date
                        </Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="Jan 2023"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          End Date
                        </Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="font-roboto text-black font-medium">
                        Responsibilities
                      </Label>
                      {exp.responsibilities.map((resp, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            value={resp}
                            onChange={(e) =>
                              updateResponsibility(
                                exp.id,
                                index,
                                e.target.value,
                              )
                            }
                            className="border-gray-border font-roboto focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="Describe your responsibility..."
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeResponsibility(exp.id, index)}
                            className="text-gray-600 hover:text-black"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <EnhancedButton
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addResponsibility(exp.id)}
                        className="mt-2"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Responsibility
                      </EnhancedButton>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {experiences.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No work experience added yet. This section is optional.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "projects":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="font-roboto text-black flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  Projects
                </CardTitle>
                <EnhancedButton
                  onClick={addProject}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Project
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="border border-gray-border rounded-lg p-6 bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold font-roboto text-black">
                        Project Entry
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(project.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Project Name
                        </Label>
                        <Input
                          value={project.name}
                          onChange={(e) =>
                            updateProject(project.id, "name", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Tech Stack
                        </Label>
                        <Input
                          value={project.techStack}
                          onChange={(e) =>
                            updateProject(
                              project.id,
                              "techStack",
                              e.target.value,
                            )
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="React, Node.js, MongoDB..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            GitHub Link
                          </Label>
                          <Input
                            value={project.githubLink}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "githubLink",
                                e.target.value,
                              )
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="github.com/username/project"
                          />
                        </div>
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            Live Demo Link
                          </Label>
                          <Input
                            value={project.deployLink}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "deployLink",
                                e.target.value,
                              )
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="project.netlify.app"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Description (3-5 bullet points)
                        </Label>
                        {project.description.map((desc, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <Input
                              value={desc}
                              onChange={(e) =>
                                updateProjectDescription(
                                  project.id,
                                  index,
                                  e.target.value,
                                )
                              }
                              className="border-gray-border font-roboto focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                              placeholder="Describe what you built or achieved..."
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeProjectDescription(project.id, index)
                              }
                              className="text-gray-600 hover:text-black"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <EnhancedButton
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addProjectDescription(project.id)}
                          className="mt-2"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Description Point
                        </EnhancedButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {projects.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No projects added yet. Click "Add Project" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "education":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="font-roboto text-black flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
                <EnhancedButton
                  onClick={addEducation}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Education
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence>
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="border border-gray-border rounded-lg p-6 bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold font-roboto text-black">
                        Education Entry
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Institution
                        </Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="University Name"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            Degree
                          </Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="Bachelor's, Master's, PhD..."
                          />
                        </div>
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            Course/Major
                          </Label>
                          <Input
                            value={edu.course}
                            onChange={(e) =>
                              updateEducation(edu.id, "course", e.target.value)
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="Computer Science"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            Year
                          </Label>
                          <Input
                            value={edu.year}
                            onChange={(e) =>
                              updateEducation(edu.id, "year", e.target.value)
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="2020 - 2024"
                          />
                        </div>
                        <div>
                          <Label className="font-roboto text-black font-medium">
                            GPA/Marks (optional)
                          </Label>
                          <Input
                            value={edu.marks}
                            onChange={(e) =>
                              updateEducation(edu.id, "marks", e.target.value)
                            }
                            className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                            placeholder="3.8 GPA or 85%"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {education.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No education added yet. Click "Add Education" to get
                    started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "certifications":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="font-roboto text-black flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications (Optional)
                </CardTitle>
                <EnhancedButton
                  onClick={addCertification}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Certification
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence>
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="border border-gray-border rounded-lg p-6 bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold font-roboto text-black">
                        Certification Entry
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCertification(cert.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label className="font-roboto text-black font-medium">
                          Certification Title
                        </Label>
                        <Input
                          value={cert.title}
                          onChange={(e) =>
                            updateCertification(
                              cert.id,
                              "title",
                              e.target.value,
                            )
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="AWS Certified Developer"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Organization
                        </Label>
                        <Input
                          value={cert.organization}
                          onChange={(e) =>
                            updateCertification(
                              cert.id,
                              "organization",
                              e.target.value,
                            )
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Year
                        </Label>
                        <Input
                          value={cert.year}
                          onChange={(e) =>
                            updateCertification(cert.id, "year", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="2024"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {certifications.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No certifications added yet. This section is optional.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "achievements":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Achievements
                </Label>
                <Textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  rows={4}
                  placeholder="List your professional or academic achievements, awards, recognitions..."
                />
              </motion.div>
            </CardContent>
          </Card>
        );

      case "interests":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Interests (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Interests
                </Label>
                <Textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  rows={3}
                  placeholder="List your hobbies, interests, or relevant activities..."
                />
              </motion.div>
            </CardContent>
          </Card>
        );

      case "customization":
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-roboto text-black flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Resume Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Font Category
                </Label>
                <Select
                  value={fontCategory}
                  onValueChange={(value: string) => {
                    setFontCategory(value);
                    // Set first font from the selected category as default
                    const firstFont =
                      FONT_CATEGORIES[value as keyof typeof FONT_CATEGORIES]
                        ?.fonts[0] || "Roboto";
                    setFontFamily(firstFont);
                  }}
                >
                  <SelectTrigger className="border-gray-border mt-1 focus:ring-2 focus:ring-black focus:border-transparent">
                    <SelectValue placeholder="Select font category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FONT_CATEGORIES).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="font-roboto text-black font-medium">
                  Font Family
                </Label>
                <Select
                  value={fontFamily}
                  onValueChange={(value: string) => setFontFamily(value)}
                  disabled={!fontCategory}
                >
                  <SelectTrigger className="border-gray-border mt-1 focus:ring-2 focus:ring-black focus:border-transparent">
                    <SelectValue placeholder="Select a font category first" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontCategory &&
                      FONT_CATEGORIES[
                        fontCategory as keyof typeof FONT_CATEGORIES
                      ]?.fonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-text mt-2">
                  Select a font from the{" "}
                  {fontCategory
                    ? FONT_CATEGORIES[
                        fontCategory as keyof typeof FONT_CATEGORIES
                      ]?.name.toLowerCase()
                    : "selected"}{" "}
                  category. This will change the font for your entire resume.
                </p>
              </motion.div>

              <motion.div
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-roboto font-semibold text-black mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Font Preview
                </h4>
                <div className="space-y-3" style={{ fontFamily: fontFamily }}>
                  <motion.p
                    className="text-xl font-bold text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    JOHN DOE
                  </motion.p>
                  <motion.p
                    className="text-sm text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Full Stack Software Engineer with 5+ years of experience
                  </motion.p>
                  <motion.p
                    className="text-xs text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <strong>Skills:</strong> JavaScript, React, Node.js, Python,
                    MongoDB, AWS
                  </motion.p>
                  <motion.p
                    className="text-xs text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <strong>Experience:</strong> Led development of scalable web
                    applications serving 10k+ users
                  </motion.p>
                </div>
                <div className="mt-4 p-2 bg-white rounded-lg border">
                  <p className="text-xs text-gray-500">
                    <strong>Current Font:</strong> {fontFamily} from{" "}
                    {fontCategory
                      ? FONT_CATEGORIES[
                          fontCategory as keyof typeof FONT_CATEGORIES
                        ]?.name
                      : "Unknown"}{" "}
                    category
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card className="border border-gray-border bg-white shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="font-roboto text-gray-text">
                This section is under development. Use the navigation to move
                between completed sections.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  const atsScore = calculateATSScore();
  const recommendations = getATSRecommendations();
  const currentStepObj = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
      {/* Header */}
      <motion.div
        className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5 sticky top-0 z-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log("Logo clicked - navigating to home");
                  window.location.assign("/");
                }}
                style={{ userSelect: "none" }}
              >
                <Logo size="md" showText={true} />
              </div>
              <EnhancedButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.location.assign("/");
                }}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                Home
              </EnhancedButton>
            </div>

            <div className="flex items-center gap-6">
              <motion.div
                className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <motion.span
                    className="font-roboto text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    key={atsScore}
                    initial={{ scale: 1.3, rotate: 5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {atsScore}%
                  </motion.span>
                </motion.div>
                <span className="font-roboto text-xs text-gray-600 font-medium mt-1">
                  ATS Score
                </span>
              </motion.div>

              <EnhancedButton
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showPreview ? "Close Preview" : "Preview Resume"}
              </EnhancedButton>

              <EnhancedButton onClick={handleDownload} variant="premium">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </EnhancedButton>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex min-h-screen">
        {/* Sidebar - 25% width */}
        <motion.div
          className="w-1/4 bg-gradient-to-b from-white/90 via-white/80 to-blue-50/50 backdrop-blur-xl border-r border-white/30 shadow-2xl shadow-black/5"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Sidebar background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20"></div>
          <div className="p-6">
            <h2 className="font-roboto text-lg font-bold text-black mb-6">
              Resume Sections
            </h2>
            <div className="space-y-2">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                const isCompleted =
                  index < currentStep ||
                  (index <= currentStep && isStepComplete(index));

                return (
                  <motion.button
                    key={step.id}
                    className={`sidebar-step w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-2xl"
                        : isCompleted
                          ? "bg-green-50 text-black hover:bg-green-100 border border-green-200"
                          : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                    }`}
                    onClick={() => goToStep(index)}
                    whileHover={{ scale: 1.03, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-white text-black shadow-lg"
                          : isCompleted
                            ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                      }`}
                      whileHover={{ rotate: isCompleted ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {isCompleted && !isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-roboto font-medium text-sm">
                        {step.title}
                      </div>
                      {!step.required && (
                        <div className="text-xs opacity-75">Optional</div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Content - 75% width */}
        <div className="flex-1">
          {showPreview ? (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Only Resume Preview - No ATS Recommendations */}
              <div className="bg-white border border-gray-border shadow-lg p-1">
                <div className="bg-gray-light p-3 flex justify-between items-center">
                  <span className="font-roboto text-sm text-gray-text">
                    Resume Preview
                  </span>
                  <span className="font-roboto text-xs text-gray-text">
                    ATS Score: {atsScore}%
                  </span>
                </div>
                <div className="max-h-[800px] overflow-y-auto">
                  <ResumePreview />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="font-roboto text-2xl font-bold text-black">
                  {currentStepObj.title}
                  {!currentStepObj.required && (
                    <span className="text-gray-500 ml-2">(Optional)</span>
                  )}
                </h1>
                <p className="font-roboto text-gray-text">
                  Step {currentStep + 1} of {STEPS.length}
                </p>
              </motion.div>

              <motion.div
                className="step-content"
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {renderStepContent()}
              </motion.div>

              {/* Navigation */}
              <motion.div
                className="flex justify-between items-center pt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <EnhancedButton
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </EnhancedButton>

                <div className="flex items-center gap-3">
                  {STEPS.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                        index === currentStep
                          ? "bg-black shadow-lg scale-125"
                          : index < currentStep
                            ? "bg-gradient-to-r from-green-400 to-green-600 shadow-md"
                            : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => goToStep(index)}
                      whileHover={{ scale: 1.4 }}
                      whileTap={{ scale: 0.8 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: index === currentStep ? 1.25 : 1,
                      }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    />
                  ))}
                </div>

                {currentStep === STEPS.length - 1 ? (
                  <EnhancedButton
                    onClick={() => setShowPreview(true)}
                    variant="premium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Resume
                  </EnhancedButton>
                ) : (
                  <EnhancedButton
                    onClick={nextStep}
                    disabled={currentStep === STEPS.length - 1}
                    variant="premium"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </EnhancedButton>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
