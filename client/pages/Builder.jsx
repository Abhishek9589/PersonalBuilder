import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import PDFExportDialog from "@/components/PDFExportDialog";
import ResumeTemplate from "@/components/ResumeTemplate";
import EnhancedResumeTemplate from "@/components/EnhancedResumeTemplate";
import CustomSectionWizard from "@/components/CustomSectionWizard";
import CustomSectionEditor from "@/components/CustomSectionEditor";
import ConfirmationDialog from "@/components/ConfirmationDialog";
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
  GripVertical,
  Settings,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

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

// Sortable step component for drag-and-drop
function SortableStep({ step, index, isActive, isCompleted, onClick, onToggle, onDelete, onShowConfirmation }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    scale: isDragging ? 1.05 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  // Ensure Icon is a valid React component
  const Icon = (step.icon && typeof step.icon === 'function') ? step.icon : Settings;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`sidebar-step w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${
        isDragging
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-2xl ring-2 ring-blue-300"
          : !step.enabled
            ? "opacity-60 bg-gray-50 border-2 border-dashed border-gray-300"
            : isActive
              ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-2xl"
              : isCompleted
                ? "bg-green-50 text-black hover:bg-green-100 border border-green-200"
                : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Drag Handle */}
      {step.id !== 'customization' ? (
        <div
          {...attributes}
          {...listeners}
          className={`flex items-center justify-center w-6 h-6 cursor-grab active:cursor-grabbing hover:bg-black/10 rounded transition-colors ${
            isDragging ? 'bg-white/20' : ''
          }`}
          title="Drag to reorder"
        >
          <GripVertical className={`w-4 h-4 transition-colors ${
            isDragging ? 'text-white' : 'text-gray-400'
          }`} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-6 h-6">
          <GripVertical className="w-4 h-4 text-gray-300" title="Customization section is fixed" />
        </div>
      )}

      {/* Section Content */}
      <div className="flex-1 flex items-center gap-3" onClick={onClick}>
        <motion.div
          className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
            !step.enabled
              ? "bg-gray-300 text-gray-500"
              : isActive
                ? "bg-white text-black shadow-lg"
                : isCompleted
                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
          }`}
          whileHover={{ rotate: isCompleted ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {isCompleted && !isActive && step.enabled ? (
            <Check className="w-4 h-4" />
          ) : (
            <Icon className="w-4 h-4" />
          )}
        </motion.div>

        <div className="flex-1">
          <h3 className={`font-semibold text-sm ${!step.enabled ? 'text-gray-500 line-through' : ''}`}>
            {step.title}
            {step.required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          {!step.enabled && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <EyeOff className="w-3 h-3" />
              Hidden from resume
            </p>
          )}
        </div>
      </div>

      {/* Toggle Switch and Delete Button */}
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {step.id !== 'customization' && (
          <Switch
            checked={Boolean(step.enabled)}
            onCheckedChange={() => onToggle(step.id)}
            className="data-[state=checked]:bg-black"
            title={step.enabled ? "Hide from resume" : "Include in resume"}
          />
        )}
        {step.isCustom && onDelete && onShowConfirmation && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onShowConfirmation({
                title: 'Delete Custom Section',
                message: `Are you sure you want to delete the "${step.title}" section? This action cannot be undone.`,
                onConfirm: () => onDelete(step.id)
              });
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-6 w-6"
            title="Delete custom section"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

const DEFAULT_STEPS = [
  { id: "header", title: "Personal Info", icon: User, required: true, enabled: true, order: 0 },
  { id: "summary", title: "Summary", icon: FileText, required: false, enabled: true, order: 1 },
  { id: "skills", title: "Skills", icon: Code, required: false, enabled: true, order: 2 },
  { id: "experience", title: "Experience", icon: Briefcase, required: false, enabled: true, order: 3 },
  { id: "projects", title: "Projects", icon: FolderOpen, required: false, enabled: true, order: 4 },
  { id: "education", title: "Education", icon: GraduationCap, required: false, enabled: true, order: 5 },
  {
    id: "certifications",
    title: "Certifications",
    icon: Award,
    required: false,
    enabled: true,
    order: 6,
  },
  { id: "achievements", title: "Achievements", icon: Trophy, required: false, enabled: true, order: 7 },
  { id: "interests", title: "Interests", icon: Heart, required: false, enabled: true, order: 8 },
  {
    id: "customization",
    title: "Customization",
    icon: Palette,
    required: true,
    enabled: true,
    order: 9,
  },
];

// Type definitions for TypeScript conversion
export const FieldType = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  URL: 'url',
  PHONE: 'phone',
  DATE: 'date',
  NUMBER: 'number',
  SELECT: 'select',
  RATING: 'rating',
  TAGS: 'tags',
  BULLETS: 'bullets'
};

// Example structures for components
export const CustomSection = {};
export const CustomField = {};
export const CustomSectionData = {};
export const EnhancedStep = {};

export default function Builder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showPDFExport, setShowPDFExport] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontCategory, setFontCategory] = useState("sans-serif");
  const [fontSize, setFontSize] = useState(12);
  const [marginSize, setMarginSize] = useState(24);

  const [personalInfo, setPersonalInfo] = useState({
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
    programmingLanguages: [],
    webTechnologies: [],
    frameworksLibraries: [],
    databases: [],
    toolsPlatforms: [],
    cloudHosting: [],
    otherTechnical: [],
  });

  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [interests, setInterests] = useState("");
  const [customSkillInputs, setCustomSkillInputs] = useState({});

  // Enhanced steps with drag-and-drop ordering and toggle support
  const [enhancedSteps, setEnhancedSteps] = useState(DEFAULT_STEPS);
  const [customSections, setCustomSections] = useState([]);
  const [showCustomSectionWizard, setShowCustomSectionWizard] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Drag and drop state
  const [isDraggingAny, setIsDraggingAny] = useState(false);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        setEducation((data.education || []).map((edu) => ({
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
        setEnhancedSteps(data.enhancedSteps || DEFAULT_STEPS);
        setCustomSections(data.customSections || []);
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
      enhancedSteps,
      customSections,
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
    enhancedSteps,
    customSections,
  ]);

  // Debug effect for CustomSectionWizard state
  useEffect(() => {
    console.log('showCustomSectionWizard state changed:', showCustomSectionWizard);
  }, [showCustomSectionWizard]);

  // Debug effect for custom sections data changes
  useEffect(() => {
    console.log('Custom sections data changed:', customSections);
  }, [customSections]);

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

  const hasOptionalStepContent = (stepId) => {
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

  // Drag and drop handlers
  const handleDragStart = () => {
    setIsDraggingAny(true);
  };

  const handleDragEnd = (event) => {
    setIsDraggingAny(false);
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Prevent dragging customization section
      if (active.id === 'customization' || over?.id === 'customization') {
        toast.error('Customization section cannot be moved', {
          description: 'The customization section must remain at the bottom.',
          duration: 2000,
        });
        return;
      }

      const oldIndex = enhancedSteps.findIndex((step) => step.id === active.id);
      const newIndex = enhancedSteps.findIndex((step) => step.id === over?.id);

      const newSteps = arrayMove(enhancedSteps, oldIndex, newIndex).map((step, index) => ({
        ...step,
        order: index,
      }));

      setEnhancedSteps(newSteps);

      // Show success toast with debounce
      setTimeout(() => {
        toast.success('Section order updated', {
          description: 'Your resume section order has been saved.',
          duration: 2000,
        });
      }, 100);
    }
  };

  // Toggle section enabled/disabled
  const toggleSectionEnabled = (stepId) => {
    setEnhancedSteps(steps =>
      steps.map(step =>
        step.id === stepId
          ? { ...step, enabled: !step.enabled }
          : step
      )
    );

    const step = enhancedSteps.find(s => s.id === stepId);
    if (step) {
      toast.success(step.enabled ? 'Section hidden' : 'Section enabled', {
        description: `${step.title} is now ${step.enabled ? 'hidden from' : 'included in'} your resume.`,
        duration: 2000,
      });
    }
  };

  // Custom section management
  const addCustomSection = (customSection) => {
    const newCustomSection = {
      ...customSection,
      id: `custom-${Date.now()}`,
    };

    // Insert custom section before customization (which should always be last)
    const customizationIndex = enhancedSteps.findIndex(step => step.id === 'customization');
    const insertOrder = customizationIndex !== -1 ? customizationIndex : enhancedSteps.length - 1;

    const newStep = {
      id: newCustomSection.id,
      title: newCustomSection.name,
      icon: Settings,
      required: false,
      enabled: true,
      order: insertOrder,
      isCustom: true,
      customSection: newCustomSection,
    };

    // Update orders for steps after the insertion point
    const updatedSteps = enhancedSteps.map(step =>
      step.order >= insertOrder ? { ...step, order: step.order + 1 } : step
    );

    setCustomSections([...customSections, newCustomSection]);
    setEnhancedSteps([...updatedSteps, newStep]);

    toast.success('Custom section created', {
      description: `${newCustomSection.name} has been added to your resume.`,
      duration: 3000,
    });
  };

  const deleteCustomSection = (sectionId) => {
    // Find the section to delete
    const sectionToDelete = enhancedSteps.find(step => step.id === sectionId);
    if (!sectionToDelete) return;

    // Remove from custom sections
    setCustomSections(sections => sections.filter(s => s.id !== sectionId));

    // Remove from enhanced steps and reorder remaining steps
    const updatedSteps = enhancedSteps
      .filter(step => step.id !== sectionId)
      .map((step, index) => ({ ...step, order: index }));

    setEnhancedSteps(updatedSteps);

    // If we're currently on the deleted section, move to previous section
    if (currentStep >= 0 && enhancedSteps[currentStep]?.id === sectionId) {
      const newCurrentStep = Math.max(0, currentStep - 1);
      setCurrentStep(newCurrentStep);
    }

    toast.success('Custom section deleted', {
      description: `${sectionToDelete.title} has been removed from your resume.`,
      duration: 3000,
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      techStack: "",
      githubLink: "",
      deployLink: "",
      description: [""],
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  };

  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const addEducation = () => {
    const newEdu = {
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

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const removeEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      year: "",
    };
    setCertifications([...certifications, newCert]);
  };

  const updateCertification = (id, field, value) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    );
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      description: "",
    };
    setAchievements([...achievements, newAchievement]);
  };

  const updateAchievement = (id, field, value) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement,
      ),
    );
  };

  const removeAchievement = (id) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id));
  };

  const resumeRef = useRef(null);

  const handleDownload = () => {
    if (!personalInfo.name || personalInfo.name.trim().length === 0) {
      alert("Please fill in your name before downloading.");
      return;
    }
    setShowPDFExport(true);
  };

  const nextStep = () => {
    // Find next enabled step
    let nextStepIndex = currentStep + 1;
    while (nextStepIndex < enhancedSteps.length && !enhancedSteps[nextStepIndex].enabled) {
      nextStepIndex++;
    }
    if (nextStepIndex < enhancedSteps.length) {
      setCurrentStep(nextStepIndex);
    }
  };

  const prevStep = () => {
    // Find previous enabled step
    let prevStepIndex = currentStep - 1;
    while (prevStepIndex >= 0 && !enhancedSteps[prevStepIndex].enabled) {
      prevStepIndex--;
    }
    if (prevStepIndex >= 0) {
      setCurrentStep(prevStepIndex);
    }
  };

  const resetAll = async () => {
    setIsLoading(true);

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

  const goToStep = (stepIndex) => {
    const targetStep = enhancedSteps[stepIndex];

    // Prevent navigation to disabled sections
    if (!targetStep.enabled) {
      toast.error('Section is disabled', {
        description: `${targetStep.title} section is currently hidden from your resume.`,
        duration: 2000,
      });
      return;
    }

    // Check if trying to skip required sections
    const currentStepObj = enhancedSteps[currentStep];

    // Only require completion for "Personal Info" section when moving forward
    if (stepIndex > currentStep && currentStepObj.required && currentStepObj.id === 'header') {
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

  const isStepComplete = (stepIndex) => {
    const step = enhancedSteps[stepIndex];

    switch (step.id) {
      case "header":
        return Boolean(
          personalInfo.name &&
          personalInfo.email &&
          personalInfo.phone &&
          personalInfo.address
        );
      case "summary":
        return !step.required || summary.trim().length > 0;
      case "skills":
        return !step.required || Boolean(
          skills.programmingLanguages.length > 0 ||
          skills.frameworksLibraries.length > 0 ||
          skills.webTechnologies.length > 0 ||
          skills.databases.length > 0 ||
          skills.toolsPlatforms.length > 0 ||
          skills.cloudHosting.length > 0 ||
          skills.otherTechnical.length > 0
        );
      case "experience":
        return !step.required || Boolean(experiences.length === 0 || experiences.every((e) => e.position && e.company));
      case "projects":
        return !step.required || Boolean(
          projects.length === 0 || projects.every((p) => p.name && p.techStack)
        );
      case "education":
        return !step.required || Boolean(
          education.length === 0 ||
          education.every((e) => e.institution && e.degree && e.year)
        );
      case "certifications":
        return Boolean(certifications.length === 0 || certifications.every((c) => c.title && c.organization));
      case "achievements":
        return Boolean(achievements.length === 0 || achievements.every((a) => a.description.trim().length > 0));
      case "interests":
        return true; // Always complete since it's optional
      case "customization":
        return true; // Font selection is always complete
      default:
        // Handle custom sections
        if (step.isCustom && step.customSection) {
          return !step.required || step.customSection.data.length > 0;
        }
        return true; // Default to complete for unknown sections
    }
  };

  const updateResponsibility = (expId, index, value) => {
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

  const addResponsibility = (expId) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: [...exp.responsibilities, ""] };
        }
        return exp;
      }),
    );
  };

  const removeResponsibility = (expId, index) => {
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

  const updateProjectDescription = (projId, index, value) => {
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

  const addProjectDescription = (projId) => {
    setProjects(
      projects.map((proj) => {
        if (proj.id === projId) {
          return { ...proj, description: [...proj.description, ""] };
        }
        return proj;
      }),
    );
  };

  const removeProjectDescription = (projId, index) => {
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
      <EnhancedResumeTemplate
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
        enhancedSteps={enhancedSteps}
        customSections={customSections}
      />
    </motion.div>
  );

  const renderStepContent = () => {
    const step = enhancedSteps[currentStep];

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

        const toggleSkill = (category, skill) => {
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

        const addCustomSkill = (category) => {
          const customSkill = customSkillInputs[category]?.trim();
          if (customSkill && !skills[category].includes(customSkill)) {
            setSkills((prevSkills) => ({
              ...prevSkills,
              [category]: [...prevSkills[category], customSkill],
            }));
            setCustomSkillInputs((prev) => ({ ...prev, [category]: "" }));
          }
        };

        const removeSkill = (category, skill) => {
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
                      {skills[categoryKey].length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                          {skills[categoryKey].map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full"
                            >
                              {skill}
                              <button
                                onClick={() =>
                                  removeSkill(categoryKey, skill)
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
                            skills[categoryKey].includes(skill);
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
                                  toggleSkill(categoryKey, skill)
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
                              addCustomSkill(categoryKey);
                            }
                          }}
                          className="border-gray-border font-roboto focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                        />
                        <EnhancedButton
                          onClick={() => addCustomSkill(categoryKey)}
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
                  onValueChange={(value) => {
                    setFontCategory(value);
                    // Set first font from the selected category
                    const firstFont =
                      FONT_CATEGORIES[value]?.fonts[0] || "Roboto";
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
                  onValueChange={(value) => setFontFamily(value)}
                  disabled={!fontCategory}
                >
                  <SelectTrigger className="border-gray-border mt-1 focus:ring-2 focus:ring-black focus:border-transparent">
                    <SelectValue placeholder="Select a font category first" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontCategory &&
                      FONT_CATEGORIES[fontCategory]?.fonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-text mt-2">
                  Select a font from the{" "}
                  {fontCategory
                    ? FONT_CATEGORIES[fontCategory]?.name.toLowerCase()
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
                      ? FONT_CATEGORIES[fontCategory]?.name
                      : "Unknown"}{" "}
                    category
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        );

      default:
        // Handle custom sections
        if (step.isCustom && step.customSection) {
          const customSection = customSections.find(cs => cs.id === step.customSection?.id);
          if (customSection) {
            return (
              <CustomSectionEditor
                section={customSection}
                onUpdateSection={(updatedSection) => {
                  setCustomSections(sections =>
                    sections.map(s => s.id === updatedSection.id ? updatedSection : s)
                  );
                  // Also update the enhanced steps to keep the custom section data in sync
                  setEnhancedSteps(steps =>
                    steps.map(step =>
                      step.id === updatedSection.id
                        ? { ...step, customSection: updatedSection }
                        : step
                    )
                  );
                }}
                onDeleteSection={(sectionId) => {
                  setCustomSections(sections => sections.filter(s => s.id !== sectionId));
                  setEnhancedSteps(steps => steps.filter(s => s.id !== sectionId));
                }}
              />
            );
          }
        }

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
  const currentStepObj = enhancedSteps[currentStep];

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
                onClick={() => setConfirmationDialog({
                  isOpen: true,
                  title: 'Reset All Data',
                  message: 'This will permanently delete all your resume information including personal details, skills, experience, projects, and customizations. This action cannot be undone.',
                  onConfirm: resetAll
                })}
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
          className="w-1/4 bg-gradient-to-b from-white/90 via-white/80 to-blue-50/50 backdrop-blur-xl border-r border-white/30 shadow-2xl shadow-black/5 relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Sidebar background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20"></div>
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-roboto text-lg font-bold text-black">
                Resume Sections
              </h2>
              {isDraggingAny && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <GripVertical className="w-4 h-4" />
                  <span>Reordering...</span>
                </div>
              )}
            </div>

            {/* Scrollable sections area */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={enhancedSteps.filter(step => step.id !== 'customization').map(step => step.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 pb-4">
                    {enhancedSteps
                      .sort((a, b) => a.order - b.order)
                      .map((step, index) => {
                        // Safety check: ensure step has required properties
                        if (!step || !step.id || !step.title) {
                          return null;
                        }

                        const isActive = currentStep === index;
                        const isCompleted =
                          index < currentStep ||
                          (index <= currentStep && isStepComplete(index));

                        return (
                          <SortableStep
                            key={step.id}
                            step={step}
                            index={index}
                            isActive={isActive}
                            isCompleted={isCompleted}
                            onClick={() => goToStep(index)}
                            onToggle={toggleSectionEnabled}
                            onDelete={deleteCustomSection}
                            onShowConfirmation={(config) => setConfirmationDialog({
                              isOpen: true,
                              ...config
                            })}
                          />
                        );
                      })
                      .filter(Boolean)}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Add Custom Section Button - Fixed at bottom */}
            <div className="border-t border-gray-200 pt-4 flex-shrink-0">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Create Custom Section button clicked');
                  setShowCustomSectionWizard(true);
                }}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm font-medium bg-white"
              >
                <Plus className="w-4 h-4" />
                Create Custom Section
              </Button>
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
                  Step {currentStep + 1} of {enhancedSteps.length}
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
                  {enhancedSteps
                    .filter(step => step.enabled)
                    .map((step, enabledIndex) => {
                      const originalIndex = enhancedSteps.findIndex(s => s.id === step.id);
                      return (
                        <motion.div
                          key={step.id}
                          className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                            originalIndex === currentStep
                              ? "bg-black shadow-lg scale-125"
                              : originalIndex < currentStep
                                ? "bg-gradient-to-r from-green-400 to-green-600 shadow-md"
                                : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          onClick={() => goToStep(originalIndex)}
                          whileHover={{ scale: 1.4 }}
                          whileTap={{ scale: 0.8 }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: 1,
                            scale: originalIndex === currentStep ? 1.25 : 1,
                          }}
                          transition={{ delay: enabledIndex * 0.05, duration: 0.3 }}
                        />
                      );
                    })
                  }
                </div>

                {currentStep === enhancedSteps.length - 1 ? (
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
                    disabled={currentStep === enhancedSteps.length - 1}
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
        enhancedSteps={enhancedSteps}
        customSections={customSections}
      />

      {/* Custom Section Wizard */}
      <CustomSectionWizard
        isOpen={showCustomSectionWizard}
        onClose={() => setShowCustomSectionWizard(false)}
        onSave={addCustomSection}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={() => setConfirmationDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationDialog.onConfirm}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
