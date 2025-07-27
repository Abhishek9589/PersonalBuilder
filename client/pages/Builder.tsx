import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import PDFExportDialog from "@/components/PDFExportDialog";
import ResumeTemplate from "@/components/ResumeTemplate";
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
  RotateCcw,
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
  location: string;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
}

interface Achievement {
  id: string;
  description: string;
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showPDFExport, setShowPDFExport] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Roboto");
  const [fontCategory, setFontCategory] = useState<string>("sans-serif");
  const [fontSize, setFontSize] = useState<number>(12);
  const [marginSize, setMarginSize] = useState<number>(24);

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
  const [achievements, setAchievements] = useState<Achievement[]>([]);
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
        setEducation((data.education || []).map((edu: any) => ({
          ...edu,
          location: edu.location || ""
        })));
        setCertifications(data.certifications || []);
        setAchievements(data.achievements || []);
        setInterests(data.interests || "");
        setFontFamily(data.fontFamily || "Roboto");
        setFontCategory(data.fontCategory || "sans-serif");
        setFontSize(data.fontSize || 12);
        setMarginSize(data.marginSize || 24);
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
      fontSize,
      marginSize,
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
    fontSize,
    marginSize,
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



  const hasOptionalStepContent = (stepId: string) => {
    switch (stepId) {
      case "experience":
        return experiences.length > 0;
      case "certifications":
        return certifications.length > 0;
      case "achievements":
        return achievements.length > 0;
      case "interests":
        return interests.trim().length > 0;
      default:
        return false;
    }
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
      location: "",
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

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      description: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  const updateAchievement = (
    id: string,
    field: keyof Achievement,
    value: string,
  ) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement,
      ),
    );
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id));
  };

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!personalInfo.name || personalInfo.name.trim().length === 0) {
      alert("Please fill in your name before downloading.");
      return;
    }
    setShowPDFExport(true);
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

  const resetAll = async () => {
    setIsLoading(true);
    setShowResetDialog(false);

    // Add a small delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 800));

    // Clear localStorage
    localStorage.removeItem("resumeBuilderData");

    // Reset all state to initial values
    setCurrentStep(0);
    setShowPreview(false);
    setShowPDFExport(false);
    setFontFamily("Roboto");
    setFontCategory("sans-serif");
    setFontSize(12);
    setMarginSize(24);

    setPersonalInfo({
      name: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      portfolio: "",
      address: "",
    });

    setSummary("");
    setSkills({
      programmingLanguages: [],
      webTechnologies: [],
      frameworksLibraries: [],
      databases: [],
      toolsPlatforms: [],
      cloudHosting: [],
      otherTechnical: [],
    });

    setExperiences([]);
    setProjects([]);
    setEducation([]);
    setCertifications([]);
    setAchievements([]);
    setInterests("");
    setCustomSkillInputs({});

    setIsLoading(false);

    // Navigate back to home page
    navigate("/");
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
      case "experience":
        return experiences.length === 0 || experiences.every((e) => e.position && e.company);
      case "projects":
        return (
          projects.length > 0 && projects.every((p) => p.name && p.techStack)
        );
      case "education":
        return (
          education.length > 0 &&
          education.every((e) => e.institution && e.degree && e.year)
        );
      case "certifications":
        return certifications.length === 0 || certifications.every((c) => c.title && c.organization);
      case "achievements":
        return achievements.length === 0 || achievements.every((a) => a.description.trim().length > 0);
      case "interests":
        return true; // If it has content, it's complete (checked in hasOptionalStepContent)
      case "customization":
        return true; // Font selection is always complete
      default:
        return false;
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
      className="bg-white shadow-lg max-w-[21cm] mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResumeTemplate
        personalInfo={personalInfo}
        summary={summary}
        skills={skills}
        experiences={experiences}
        projects={projects}
        education={education}
        certifications={certifications}
        achievements={achievements}
        interests={interests}
        fontFamily={fontFamily}
        fontSize={fontSize}
        marginSize={marginSize}
      />
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
                      <div>
                        <Label className="font-roboto text-black font-medium">
                          Location (optional)
                        </Label>
                        <Input
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(edu.id, "location", e.target.value)
                          }
                          className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                          placeholder="City, State/Country"
                        />
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
              <div className="flex justify-between items-center">
                <CardTitle className="font-roboto text-black flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements (Optional)
                </CardTitle>
                <EnhancedButton
                  onClick={addAchievement}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="border border-gray-border rounded-lg p-6 bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold font-roboto text-black">
                        Achievement Entry
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(achievement.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label className="font-roboto text-black font-medium">
                        Achievement Description
                      </Label>
                      <Textarea
                        value={achievement.description}
                        onChange={(e) =>
                          updateAchievement(achievement.id, "description", e.target.value)
                        }
                        className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                        rows={3}
                        placeholder="Describe your achievement, award, or recognition..."
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {achievements.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No achievements added yet. This section is optional.
                  </p>
                </div>
              )}
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div>
                  <Label className="font-roboto text-black font-medium">
                    Font Size (px)
                  </Label>
                  <div className="mt-1 space-y-2">
                    <input
                      type="range"
                      min="10"
                      max="18"
                      step="1"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>10px</span>
                      <span className="font-medium text-black">{fontSize}px</span>
                      <span>18px</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-text mt-2">
                    Adjust the base font size for your resume content.
                  </p>
                </div>

                <div>
                  <Label className="font-roboto text-black font-medium">
                    Page Margin (px)
                  </Label>
                  <div className="mt-1 space-y-2">
                    <input
                      type="range"
                      min="12"
                      max="48"
                      step="4"
                      value={marginSize}
                      onChange={(e) => setMarginSize(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>12px</span>
                      <span className="font-medium text-black">{marginSize}px</span>
                      <span>48px</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-text mt-2">
                    Control the padding around the edges of your resume.
                  </p>
                </div>
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

  const recommendations = getATSRecommendations();
  const currentStepObj = STEPS[currentStep];

  // Loading Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen">
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-2xl mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="font-roboto text-gray-600">Resetting all data...</p>
        </div>
      </motion.div>
    </div>
  );

  // Reset Dialog Component
  const ResetDialog = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-auto"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <RotateCcw className="w-8 h-8 text-red-600" />
          </motion.div>

          <div className="text-center">
            <h3 className="font-roboto font-bold text-xl text-black mb-2">
              Reset All Data?
            </h3>
            <p className="font-roboto text-gray-600 leading-relaxed">
              This will permanently delete all your resume information including personal details,
              skills, experience, projects, and customizations. This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <EnhancedButton
              onClick={() => setShowResetDialog(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton
              onClick={resetAll}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
            >
              Reset All
            </EnhancedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );

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
            </div>

            <div className="flex items-center gap-4">
              <EnhancedButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.location.assign("/");
                }}
                variant="outline"
                size="sm"
              >
                Home
              </EnhancedButton>

              <EnhancedButton
                onClick={() => setShowResetDialog(true)}
                variant="outline"
                className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 border-red-200 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </EnhancedButton>

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
                <div className="bg-gray-light p-3">
                  <span className="font-roboto text-sm text-gray-text">
                    Resume Preview
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

      {/* PDF Export Dialog */}
      <PDFExportDialog
        isOpen={showPDFExport}
        onClose={() => setShowPDFExport(false)}
        personalInfo={personalInfo}
        summary={summary}
        skills={skills}
        experiences={experiences}
        projects={projects}
        education={education}
        certifications={certifications}
        achievements={achievements}
        interests={interests}
        fontFamily={fontFamily}
        fontSize={fontSize}
        marginSize={marginSize}
      />

      {/* Reset Confirmation Dialog */}
      {showResetDialog && <ResetDialog />}

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
