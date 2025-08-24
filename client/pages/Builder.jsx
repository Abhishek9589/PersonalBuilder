import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isMobileOrTablet } from "@/lib/deviceDetection";
import { gsap } from "gsap";
import { GSAPAnimations, useGSAP } from "@/lib/gsapUtils";
import { initViewportHeight } from "@/lib/viewport";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import LoadingSpinner from "@/components/LoadingSpinner";
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
  Target,
  Zap,
  Brain,
  Wrench,
  Book,
  Star,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Lightbulb,
  PlusCircle,
  Menu,
  Home,
  Trash2,
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
import { TECHNICAL_SKILLS, getCategoryDisplayNames } from "@/data/skills";
import ProfileManager from "@/components/ProfileManager";
import {
  getAllProfiles,
  getCurrentProfileId,
  setCurrentProfileId,
  getProfile,
  updateProfileData
} from "@/lib/profileStorage";

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

// Function to dynamically select icons based on section names
function getDynamicIcon(sectionName, isCustom = false) {
  if (isCustom) {
    return PlusCircle; // Consistent icon for custom sections
  }

  const normalizedName = sectionName.toLowerCase().trim();

  // Map section names to appropriate icons
  const iconMap = {
    'personal info': User,
    'header': User,
    'contact': User,
    'summary': FileText,
    'objective': Target,
    'about': FileText,
    'profile': User,
    'skills': Code,
    'technical skills': Wrench,
    'programming': Code,
    'tools': Wrench,
    'technologies': Zap,
    'experience': Briefcase,
    'work experience': Briefcase,
    'employment': Briefcase,
    'work': Briefcase,
    'career': Briefcase,
    'projects': FolderOpen,
    'portfolio': FolderOpen,
    'work samples': FolderOpen,
    'education': GraduationCap,
    'academic': GraduationCap,
    'learning': Book,
    'certifications': Award,
    'certificates': Award,
    'licenses': Award,
    'achievements': Trophy,
    'accomplishments': Trophy,
    'awards': Star,
    'honors': Star,
    'interests': Heart,
    'hobbies': Heart,
    'personal interests': Heart,
    'activities': Users,
    'volunteer': Users,
    'volunteering': Users,
    'languages': Globe,
    'references': Users,
    'customization': Palette,
    'design': Palette,
    'publications': Book,
    'research': Lightbulb,
    'patents': Lightbulb,
  };

  // Check for exact matches first
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }

  // Check for partial matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }

  // Default fallback icon
  return Settings;
}

// Sortable step component for drag-and-drop with enhanced animations
function SortableStep({ step, index, isActive, isCompleted, onClick, onToggle, onDelete, onShowConfirmation }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const elementRef = useRef(null);
  const dragHandleRef = useRef(null);
  const iconRef = useRef(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    scale: isDragging ? 1.05 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  // Use dynamic icon selection based on section name and type
  const Icon = getDynamicIcon(step.title, step.isCustom);

  // GSAP animations on mount
  useEffect(() => {
    if (elementRef.current) {
      GSAPAnimations.slideInLeft(elementRef.current, { delay: index * 0.1 });
    }
  }, [index]);

  // Add hover effects
  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;

      const handleMouseEnter = () => {
        if (!isDragging) {
          gsap.to(element, { x: 4, duration: 0.3, ease: "power2.out" });
        }
      };

      const handleMouseLeave = () => {
        if (!isDragging) {
          gsap.to(element, { x: 0, duration: 0.3, ease: "power2.out" });
        }
      };

      const handleMouseDown = () => {
        gsap.to(element, { scale: 0.98, duration: 0.1 });
      };

      const handleMouseUp = () => {
        gsap.to(element, { scale: 1, duration: 0.1 });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Drag handle hover effects
  useEffect(() => {
    if (dragHandleRef.current) {
      const element = dragHandleRef.current;

      const handleMouseEnter = () => {
        gsap.to(element, { scale: 1.1, duration: 0.2 });
      };

      const handleMouseLeave = () => {
        gsap.to(element, { scale: 1, duration: 0.2 });
      };

      const handleMouseDown = () => {
        gsap.to(element, { scale: 0.95, duration: 0.1 });
      };

      const handleMouseUp = () => {
        gsap.to(element, { scale: 1.1, duration: 0.1 });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  // Icon hover rotation for completed steps
  useEffect(() => {
    if (iconRef.current && isCompleted && !isActive) {
      const element = iconRef.current;

      const handleMouseEnter = () => {
        gsap.to(element, { rotation: 360, duration: 0.6, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(element, { rotation: 0, duration: 0.6, ease: "power2.out" });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isCompleted, isActive]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        elementRef.current = node;
      }}
      style={style}
      className={`sidebar-step w-full flex items-center gap-2 p-2 rounded-xl text-left transition-all duration-300 relative overflow-hidden card-grab ${
        isDragging
          ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-xl ring-2 ring-gray-300/40 scale-105"
          : !step.enabled
            ? "opacity-50 bg-gray-50/50 border border-dashed border-gray-200 backdrop-blur-sm"
            : isActive
              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg"
              : isCompleted
                ? "bg-gray-50/70 text-gray-800 hover:bg-gray-100/70 border border-gray-100 shadow-sm"
                : "text-gray-600 hover:bg-gray-50/50 hover:shadow-sm backdrop-blur-sm"
      }`}
    >
      {/* Drag Handle */}
      {step.id !== 'customization' ? (
        <div
          ref={dragHandleRef}
          {...attributes}
          {...listeners}
          className={`flex items-center justify-center w-5 h-5 cursor-grab active:cursor-grabbing hover:bg-black/10 rounded transition-all duration-200 ${
            isDragging ? 'bg-white/20 scale-110' : ''
          }`}
          title="Drag to reorder"
        >
          <GripVertical className={`w-3 h-3 transition-colors ${
            isDragging ? 'text-white' : 'text-gray-400'
          }`} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-5 h-5">
          <GripVertical className="w-3 h-3 text-gray-300" title="Customization section is fixed" />
        </div>
      )}

      {/* Section Content */}
      <div className="flex-1 flex items-center gap-2" onClick={onClick}>
        <div
          ref={iconRef}
          className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
            !step.enabled
              ? "bg-gray-100 text-gray-400"
              : isActive
                ? "bg-white text-gray-800 shadow-md"
                : isCompleted
                  ? "bg-gray-100 text-gray-600 shadow-sm"
                  : "bg-gray-100/70 text-gray-500 group-hover:bg-gray-200/70"
          }`}
        >
          {isCompleted && !isActive && step.enabled ? (
            <Check className="w-4 h-4" />
          ) : (
            <Icon className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1">
          <h3 className={`font-inter font-medium text-xs tracking-wide ${!step.enabled ? 'text-gray-400 line-through' : ''}`}>
            {step.title}
            {step.required && <span className="text-red-400 ml-1">*</span>}
          </h3>
          {!step.enabled && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <EyeOff className="w-2 h-2" />
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
    </div>
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
  const [isRedirectingToPDF, setIsRedirectingToPDF] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileNavbarSidebarOpen, setIsMobileNavbarSidebarOpen] = useState(false);

  // Profile management state
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showProfileManager, setShowProfileManager] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

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
    customLinks: [], // Array of {name: "", url: ""} objects
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

  // Load profile data on mount
  useEffect(() => {
    const initializeProfiles = async () => {
      try {
        setIsInitializing(true);

        // Initialize viewport height utility for mobile devices
        if (window.innerWidth <= 768) {
          initViewportHeight();
        }

        const profileId = getCurrentProfileId();
        if (profileId) {
          const profile = getProfile(profileId);
          if (profile) {
            setCurrentProfile(profile);
            loadProfileData(profile);
            setShowProfileManager(false);
          } else {
            // Profile ID exists but profile not found, clear invalid ID
            setCurrentProfileId(null);
            setShowProfileManager(true);
          }
        } else {
          setShowProfileManager(true);
        }
      } catch (error) {
        console.error('Error initializing profiles:', error);
        setShowProfileManager(true);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeProfiles();
  }, []);

  // Function to load data from profile
  const loadProfileData = (profile) => {
    try {
      if (!profile?.data) {
        console.warn('No profile data found, using defaults');
        return;
      }

      const data = profile.data;

      // Safe loading with fallbacks
      setPersonalInfo(data.personalInfo || {
        name: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        address: "",
        customLinks: [],
      });

      setSummary(data.summary || "");

      // Handle skills migration from old array format to new object format
      let skillsData = data.skills;
      if (Array.isArray(skillsData)) {
        // Migrate old array format to new object format
        skillsData = {
          programmingLanguages: skillsData,
          webTechnologies: [],
          frameworksLibraries: [],
          databases: [],
          toolsPlatforms: [],
          cloudHosting: [],
          otherTechnical: [],
        };
      }
      setSkills(skillsData || {
        programmingLanguages: [],
        webTechnologies: [],
        frameworksLibraries: [],
        databases: [],
        toolsPlatforms: [],
        cloudHosting: [],
        otherTechnical: [],
      });

      setExperiences(Array.isArray(data.experiences) ? data.experiences : []);
      setProjects(Array.isArray(data.projects) ? data.projects : []);
      setEducation(Array.isArray(data.education) ? data.education.map((edu) => ({
        ...edu,
        location: edu.location || ""
      })) : []);
      setCertifications(Array.isArray(data.certifications) ? data.certifications : []);
      setAchievements(Array.isArray(data.achievements) ? data.achievements : []);
      setInterests(data.interests || "");
      setFontFamily(data.fontFamily || "Roboto");
      setFontCategory(data.fontCategory || "sans-serif");
      setFontSize(data.fontSize || 12);
      setMarginSize(data.marginSize || 24);
      setCurrentStep(data.currentStep || 0);
      setCustomSkillInputs(data.customSkillInputs || {});
      setEnhancedSteps(Array.isArray(data.enhancedSteps) ? data.enhancedSteps : DEFAULT_STEPS);
      setCustomSections(Array.isArray(data.customSections) ? data.customSections : []);

      console.log('Profile data loaded successfully:', profile.name);
    } catch (error) {
      console.error('Error loading profile data:', error);
      toast.error('Error loading profile data', {
        description: 'Using default values. Please try refreshing the page.',
      });

      // Reset to defaults on error
      setPersonalInfo({
        name: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        address: "",
        customLinks: [],
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
      setFontFamily("Roboto");
      setFontCategory("sans-serif");
      setFontSize(12);
      setMarginSize(24);
      setCurrentStep(0);
      setCustomSkillInputs({});
      setEnhancedSteps(DEFAULT_STEPS);
      setCustomSections([]);
    }
  };

  // Save data to profile whenever state changes
  useEffect(() => {
    if (!currentProfile) return;

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

    updateProfileData(currentProfile.id, dataToSave);
  }, [
    currentProfile,
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
        return experiences && experiences.length > 0;
      case "certifications":
        return certifications && certifications.length > 0;
      case "achievements":
        return achievements && achievements.length > 0;
      case "interests":
        return interests && interests.trim().length > 0;
      default:
        return false;
    }
  };

  const getATSRecommendations = () => {
    const recommendations = [];

    // Add null checks to prevent errors when state is not initialized
    if (personalInfo && !personalInfo.linkedin)
      recommendations.push("Add LinkedIn profile URL to increase visibility");
    if (personalInfo && !personalInfo.github)
      recommendations.push("Add GitHub profile for tech roles");
    if (summary && summary.length < 100)
      recommendations.push("Expand summary to 2-3 detailed sentences");
    if (projects && projects.length < 2)
      recommendations.push("Add more projects to showcase your skills");
    if (experiences && experiences.length === 0)
      recommendations.push("Add work experience or internships");
    if (skills && skills.databases && skills.databases.length === 0)
      recommendations.push("Add database skills for better tech positioning");
    if (projects && projects.length > 0 && projects.some((p) => !p.githubLink))
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

  // Profile selection handlers
  const handleProfileSelected = (profile) => {
    try {
      if (profile) {
        console.log('Loading profile:', profile.name);
        setCurrentProfile(profile);
        loadProfileData(profile);
        setShowProfileManager(false);

        // Small delay to ensure state is updated before showing success
        setTimeout(() => {
          toast.success(`Loaded profile: ${profile.name}`);
        }, 100);
      } else {
        setCurrentProfile(null);
        setShowProfileManager(true);
      }
    } catch (error) {
      console.error('Error handling profile selection:', error);
      toast.error('Failed to load profile', {
        description: 'Please try again or refresh the page.',
      });
      setShowProfileManager(true);
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
      icon: PlusCircle,
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

  // Custom links management functions
  const addCustomLink = () => {
    const newLink = {
      id: Date.now().toString(),
      name: "",
      url: "",
    };
    setPersonalInfo({
      ...personalInfo,
      customLinks: [...(personalInfo.customLinks || []), newLink],
    });
  };

  const updateCustomLink = (id, field, value) => {
    setPersonalInfo({
      ...personalInfo,
      customLinks: personalInfo.customLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  const removeCustomLink = (id) => {
    setPersonalInfo({
      ...personalInfo,
      customLinks: personalInfo.customLinks.filter((link) => link.id !== id),
    });
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
    if (!personalInfo || !personalInfo.name || personalInfo.name.trim().length === 0) {
      alert("Please fill in your name before downloading.");
      return;
    }

    // Check if user is on mobile or tablet
    const isMobileTablet = isMobileOrTablet({
      viewportBreakpoint: 1024,
      useUserAgent: true,
      useViewport: true,
      useTouch: false,
    });

    if (isMobileTablet) {
      // For mobile/tablet users: redirect to preview page with loading state
      setIsRedirectingToPDF(true);

      // Show toast notification
      toast.info('📱 Opening PDF preview for mobile...', {
        description: 'You\'ll be redirected to a mobile-optimized preview page',
        duration: 2500,
      });

      const resumeData = {
        personalInfo,
        summary,
        skills,
        experiences,
        projects,
        education,
        certifications,
        achievements,
        interests,
        enhancedSteps,
        customSections,
        fontFamily,
        fontSize,
        marginSize,
      };

      // Add small delay for better UX and to prevent jarring immediate redirect
      setTimeout(() => {
        const dataParam = encodeURIComponent(JSON.stringify(resumeData));
        navigate(`/pdf-view?data=${dataParam}`);
      }, 300);
    } else {
      // For desktop users: keep existing behavior
      setShowPDFExport(true);
    }
  };

  const nextStep = () => {
    if (!enhancedSteps) return;
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
    if (!enhancedSteps) return;
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

    // Reset current profile data if there's an active profile
    if (currentProfile) {
      const resetData = {
        personalInfo: {
          name: "",
          phone: "",
          email: "",
          linkedin: "",
          github: "",
          portfolio: "",
          address: "",
          customLinks: [],
        },
        summary: "",
        skills: {
          programmingLanguages: [],
          webTechnologies: [],
          frameworksLibraries: [],
          databases: [],
          toolsPlatforms: [],
          cloudHosting: [],
          otherTechnical: [],
        },
        experiences: [],
        projects: [],
        education: [],
        certifications: [],
        achievements: [],
        interests: "",
        fontFamily: "Roboto",
        fontCategory: "sans-serif",
        fontSize: 12,
        marginSize: 24,
        currentStep: 0,
        customSkillInputs: {},
        enhancedSteps: DEFAULT_STEPS,
        customSections: []
      };

      updateProfileData(currentProfile.id, resetData);
    }

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
      customLinks: [],
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
    setEnhancedSteps(DEFAULT_STEPS);
    setCustomSections([]);

    setIsLoading(false);

    // Show success message
    toast.success('Resume data reset successfully');
  };

  // Mobile/Tablet Navbar Component
  const MobileTabletNavbar = () => {
    const getFirstName = () => {
      if (personalInfo?.name) {
        return personalInfo.name.split(' ')[0];
      }
      return 'User';
    };

    return (
      <>
        {/* Mobile/Tablet Navbar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMobileNavbarSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sections menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Profile Name with Icon - Clickable */}
            <button
              onClick={() => setShowProfileManager(true)}
              className="flex items-center gap-2 text-gray-700 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Change profile"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                {personalInfo?.name || currentProfile?.name || 'User'}
              </span>
            </button>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              {/* Home Icon */}
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go to home"
              >
                <Home className="w-5 h-5 text-gray-700" />
              </button>

              {/* Preview Icon */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle preview"
              >
                {showPreview ? (
                  <EyeOff className="w-5 h-5 text-gray-700" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Download Icon */}
              <button
                onClick={handleDownload}
                disabled={isRedirectingToPDF}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isRedirectingToPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Download resume"
              >
                {isRedirectingToPDF ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                ) : (
                  <Download className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Delete Icon */}
              <button
                onClick={() => {
                  setConfirmationDialog({
                    isOpen: true,
                    title: 'Reset All Data',
                    message: 'Are you sure you want to reset all resume data? This action cannot be undone.',
                    onConfirm: resetAll
                  });
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                aria-label="Reset resume data"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navbar Sidebar Overlay */}
        {isMobileNavbarSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileNavbarSidebarOpen(false)}
            />

            {/* Sidebar - Fixed Header + Scrollable Content + Fixed Footer */}
            <div className="absolute inset-0 bg-white flex flex-col">
              {/* Single scrollable container for entire sidebar */}
              <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                  <h2 className="text-xl font-semibold text-gray-800">Resume Sections</h2>
                  <button
                    onClick={() => setIsMobileNavbarSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close sections menu"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Sections List */}
                <div className="p-6">
                  <div className="space-y-3">
                    {enhancedSteps.map((step, index) => {
                      const Icon = getDynamicIcon(step.title, step.isCustom);
                      const isActive = currentStep === index;
                      const isCompleted = hasActualContent(index);

                      return (
                        <div
                          key={step.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            !step.enabled
                              ? "opacity-50 bg-gray-50 border-gray-200"
                              : isActive
                              ? "bg-black text-white border-black"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {/* Section Info */}
                          <div
                            className="flex items-center gap-3 flex-1 cursor-pointer"
                            onClick={() => {
                              if (step.enabled) {
                                goToStep(index);
                                setIsMobileNavbarSidebarOpen(false);
                              }
                            }}
                          >
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                                !step.enabled
                                  ? "bg-gray-200 text-gray-400"
                                  : isActive
                                  ? "bg-white text-black"
                                  : isCompleted
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {isCompleted && !isActive && step.enabled ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Icon className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <h3 className={`font-medium ${
                                !step.enabled ? 'text-gray-400 line-through' : ''
                              }`}>
                                {step.title}
                                {step.required && <span className="text-red-400 ml-1">*</span>}
                              </h3>
                              {!step.enabled && (
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                  <EyeOff className="w-3 h-3" />
                                  Hidden from resume
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Toggle and Delete */}
                          <div className="flex items-center gap-2">
                            {step.id !== 'customization' && (
                              <Switch
                                checked={Boolean(step.enabled)}
                                onCheckedChange={() => toggleSectionEnabled(step.id)}
                                className="data-[state=checked]:bg-black"
                              />
                            )}
                            {step.isCustom && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmationDialog({
                                    title: 'Delete Custom Section',
                                    message: `Are you sure you want to delete the "${step.title}" section? This action cannot be undone.`,
                                    onConfirm: () => deleteCustomSection(step.id)
                                  });
                                }}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-8 w-8"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Fixed Footer with Add Custom Section Button */}
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4">
                  <button
                    onClick={() => {
                      setShowCustomSectionWizard(true);
                      setIsMobileNavbarSidebarOpen(false);
                    }}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 touch-target"
                  >
                    <Plus className="w-5 h-5" />
                    Add Custom Section
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
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

    // Allow free navigation to any enabled section
    setCurrentStep(stepIndex);

    // Close mobile sidebar when step is selected
    setIsMobileSidebarOpen(false);
  };

  const isStepComplete = (stepIndex) => {
    if (!enhancedSteps || !enhancedSteps[stepIndex]) return false;
    const step = enhancedSteps[stepIndex];

    switch (step.id) {
      case "header":
        return Boolean(
          personalInfo &&
          personalInfo.name &&
          personalInfo.email &&
          personalInfo.phone &&
          personalInfo.address
        );
      case "summary":
        return !step.required || (summary && summary.trim().length > 0);
      case "skills":
        return !step.required || Boolean(
          skills &&
          (skills.programmingLanguages?.length > 0 ||
          skills.frameworksLibraries?.length > 0 ||
          skills.webTechnologies?.length > 0 ||
          skills.databases?.length > 0 ||
          skills.toolsPlatforms?.length > 0 ||
          skills.cloudHosting?.length > 0 ||
          skills.otherTechnical?.length > 0)
        );
      case "experience":
        return !step.required || Boolean(experiences && (experiences.length === 0 || experiences.every((e) => e.position && e.company)));
      case "projects":
        return !step.required || Boolean(
          projects && (projects.length === 0 || projects.every((p) => p.name && p.techStack))
        );
      case "education":
        return !step.required || Boolean(
          education && (education.length === 0 ||
          education.every((e) => e.institution && e.degree && e.year))
        );
      case "certifications":
        return Boolean(certifications && (certifications.length === 0 || certifications.every((c) => c.title && c.organization)));
      case "achievements":
        return Boolean(achievements && (achievements.length === 0 || achievements.every((a) => a.description && a.description.trim().length > 0)));
      case "interests":
        return true; // Always complete since it's optional
      case "customization":
        return true; // Font selection is always complete
      default:
        // Handle custom sections
        if (step.isCustom && step.customSection) {
          return !step.required || (step.customSection.data && step.customSection.data.length > 0);
        }
        return true; // Default to complete for unknown sections
    }
  };

  // New function to check if section has actual content (for showing check mark)
  const hasActualContent = (stepIndex) => {
    if (!enhancedSteps || !enhancedSteps[stepIndex]) return false;
    const step = enhancedSteps[stepIndex];

    switch (step.id) {
      case "header":
        return Boolean(
          personalInfo &&
          ((personalInfo.name && typeof personalInfo.name === 'string' && personalInfo.name.trim()) ||
          (personalInfo.email && typeof personalInfo.email === 'string' && personalInfo.email.trim()) ||
          (personalInfo.phone && typeof personalInfo.phone === 'string' && personalInfo.phone.trim()) ||
          (personalInfo.address && typeof personalInfo.address === 'string' && personalInfo.address.trim()) ||
          (personalInfo.linkedin && typeof personalInfo.linkedin === 'string' && personalInfo.linkedin.trim()) ||
          (personalInfo.github && typeof personalInfo.github === 'string' && personalInfo.github.trim()) ||
          (personalInfo.portfolio && typeof personalInfo.portfolio === 'string' && personalInfo.portfolio.trim()))
        );
      case "summary":
        return Boolean(summary && typeof summary === 'string' && summary.trim().length > 0);
      case "skills":
        return Boolean(
          skills &&
          (skills.programmingLanguages?.length > 0 ||
          skills.frameworksLibraries?.length > 0 ||
          skills.webTechnologies?.length > 0 ||
          skills.databases?.length > 0 ||
          skills.toolsPlatforms?.length > 0 ||
          skills.cloudHosting?.length > 0 ||
          skills.otherTechnical?.length > 0)
        );
      case "experience":
        return Boolean(experiences && experiences.length > 0 && experiences.some((e) =>
          (e.position && typeof e.position === 'string' && e.position.trim()) ||
          (e.company && typeof e.company === 'string' && e.company.trim())
        ));
      case "projects":
        return Boolean(projects && projects.length > 0 && projects.some((p) =>
          (p.name && typeof p.name === 'string' && p.name.trim()) ||
          (p.techStack && typeof p.techStack === 'string' && p.techStack.trim())
        ));
      case "education":
        return Boolean(education && education.length > 0 && education.some((e) =>
          (e.institution && typeof e.institution === 'string' && e.institution.trim()) ||
          (e.degree && typeof e.degree === 'string' && e.degree.trim())
        ));
      case "certifications":
        return Boolean(certifications && certifications.length > 0 && certifications.some((c) =>
          (c.title && typeof c.title === 'string' && c.title.trim()) ||
          (c.organization && typeof c.organization === 'string' && c.organization.trim())
        ));
      case "achievements":
        return Boolean(achievements && achievements.length > 0 && achievements.some((a) =>
          a.description && typeof a.description === 'string' && a.description.trim()
        ));
      case "interests":
        return Boolean(interests && typeof interests === 'string' && interests.trim().length > 0);
      case "customization":
        return false; // Customization doesn't need a check mark
      default:
        // Handle custom sections
        if (step.isCustom && step.customSection) {
          return Boolean(step.customSection.data && step.customSection.data.length > 0);
        }
        return false;
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

  const ResumePreview = () => {
    const previewRef = useRef(null);

    useEffect(() => {
      if (previewRef.current) {
        GSAPAnimations.scale(previewRef.current, { duration: 0.5 });
      }
    }, []);

    return (
      <div
        ref={previewRef}
        className="bg-white shadow-lg max-w-[21cm] mx-auto"
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
      </div>
    );
  };

  // Add form field animations when step changes
  useEffect(() => {
    const formFields = document.querySelectorAll('.form-field');
    if (formFields.length > 0) {
      GSAPAnimations.staggerIn(formFields, { delay: 0.1, stagger: 0.1 });
    }
  }, [currentStep]);

  const renderStepContent = () => {
    if (!enhancedSteps || !enhancedSteps[currentStep]) return null;
    const step = enhancedSteps[currentStep];

    switch (step.id) {
      case "header":
        return (
          <div className="space-y-8">
            {/* Essential Information */}
            <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <User className="w-5 h-5" />
                  Essential Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full">
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                      Full Name *
                    </Label>
                    <Input
                      value={personalInfo.name}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, name: e.target.value })
                      }
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="City, State - Postal Code, Country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Links */}
            <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full">
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="github.com/username"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                      className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                      placeholder="yourportfolio.com"
                    />
                  </div>
                </div>

                {/* Custom Links Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                      Additional Links
                    </h3>
                    <Button
                      onClick={addCustomLink}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </Button>
                  </div>

                  {personalInfo.customLinks && personalInfo.customLinks.length > 0 && (
                    <div className="space-y-4">
                      {personalInfo.customLinks.map((link) => (
                        <div key={link.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                          <div className="form-field">
                            <Label className="font-inter text-gray-700 font-medium text-xs tracking-wide">
                              Platform Name
                            </Label>
                            <Input
                              value={link.name}
                              onChange={(e) =>
                                updateCustomLink(link.id, "name", e.target.value)
                              }
                              className="border-0 font-inter mt-2 px-4 py-3 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-xl shadow-sm bg-white/60 hover:bg-white/90 hover:shadow-md transition-all duration-300 text-gray-700"
                              placeholder="e.g., HackerRank, LeetCode, Behance"
                            />
                          </div>
                          <div className="form-field">
                            <Label className="font-inter text-gray-700 font-medium text-xs tracking-wide">
                              Profile URL
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                value={link.url}
                                onChange={(e) =>
                                  updateCustomLink(link.id, "url", e.target.value)
                                }
                                className="border-0 font-inter mt-2 px-4 py-3 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-xl shadow-sm bg-white/60 hover:bg-white/90 hover:shadow-md transition-all duration-300 text-gray-700"
                                placeholder="https://yourprofile.com"
                              />
                              <Button
                                onClick={() => removeCustomLink(link.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2 p-2 h-[44px] w-[44px]"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!personalInfo.customLinks || personalInfo.customLinks.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Globe className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                      <p className="font-inter text-sm">
                        Add links to showcase your profiles on platforms like HackerRank, LeetCode, Behance, or any other relevant professional platform.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "summary":
        return (
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                <FileText className="w-5 h-5" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="form-field">
                <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                  Summary (2-3 lines) *
                </Label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700 resize-none"
                  rows={4}
                  placeholder="Write a brief professional summary highlighting your key skills and experience..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  {summary.length} characters
                </p>
              </div>

              {/* Professional Summary Advice */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-4">
                    <h3 className="font-inter text-blue-800 font-semibold text-sm tracking-wide">
                      How to Write an Effective Professional Summary
                    </h3>
                    <div className="space-y-3 text-sm text-blue-700">
                      <div className="space-y-2">
                        <p className="font-medium">✨ Structure Formula:</p>
                        <p className="pl-4 text-blue-600">
                          [Your Role/Title] + [Years of Experience] + [Key Skills/Technologies] + [What You Achieve/Value You Bring]
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">📝 Best Practices:</p>
                        <ul className="pl-4 space-y-1 text-blue-600">
                          <li>• Keep it 2-3 sentences (50-100 words)</li>
                          <li>• Start with your current role or strongest qualification</li>
                          <li>• Mention specific technologies/skills relevant to your target job</li>
                          <li>• Include quantifiable achievements when possible</li>
                          <li>• Use action words like "develop," "optimize," "lead," "design"</li>
                          <li>• Avoid generic phrases like "hard-working" or "team player"</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">���� Example:</p>
                        <div className="pl-4 p-3 bg-blue-100/50 rounded-lg text-blue-700 italic">
                          "Full-stack developer with 3+ years of experience building scalable web applications using React, Node.js, and Python.
                          Specialized in creating user-centric solutions that improved application performance by 40% and enhanced user engagement across multiple projects."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "skills":
        const SKILL_CATEGORIES = {
          programmingLanguages: {
            title: "Programming Languages",
            required: true,
            skills: TECHNICAL_SKILLS.programmingLanguages,
          },
          webTechnologies: {
            title: "Web Technologies",
            required: false,
            skills: TECHNICAL_SKILLS.webTechnologies,
          },
          frameworksLibraries: {
            title: "Frameworks & Libraries",
            required: true,
            skills: TECHNICAL_SKILLS.frameworksLibraries,
          },
          databases: {
            title: "Databases",
            required: false,
            skills: TECHNICAL_SKILLS.databases,
          },
          toolsPlatforms: {
            title: "Tools & Platforms",
            required: false,
            skills: TECHNICAL_SKILLS.toolsPlatforms,
          },
          cloudHosting: {
            title: "Cloud & Hosting",
            required: false,
            skills: TECHNICAL_SKILLS.cloudHosting,
          },
          otherTechnical: {
            title: "Other Technical Skills",
            required: false,
            skills: TECHNICAL_SKILLS.otherTechnical,
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
            // Add custom skill to both the skills list and mark it as selected
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
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                <Code className="w-5 h-5" />
                Technical Skills
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Click on skills to select them. Selected skills will be highlighted.
                You can also add custom skills in each category.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(SKILL_CATEGORIES).map(
                ([categoryKey, category], categoryIndex) => {
                  return (
                    <div
                      key={categoryKey}
                      className="space-y-4 form-field"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-inter font-semibold text-lg text-gray-800">
                          {category.title}
                        </h3>
                        {category.required && (
                          <span className="text-red-500 text-sm">*</span>
                        )}
                      </div>

                      {/* All Skills (Predefined + Custom) */}
                      <div className="flex flex-wrap gap-2">
                        {/* Predefined Skills */}
                        {category.skills.map((skill) => {
                          const isSelected = skills[categoryKey].includes(skill);
                          return (
                            <label
                              key={skill}
                              className={`inline-flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] ${
                                isSelected
                                  ? "bg-gray-800 text-white shadow-md"
                                  : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-sm text-gray-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSkill(categoryKey, skill)}
                                className="hidden"
                              />
                              <span className="whitespace-nowrap">{skill}</span>
                            </label>
                          );
                        })}

                        {/* Custom Skills */}
                        {skills[categoryKey]
                          .filter(skill => !category.skills.includes(skill))
                          .map((customSkill) => (
                            <label
                              key={customSkill}
                              className="inline-flex items-center px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-sm font-medium bg-gray-800 text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span className="whitespace-nowrap">{customSkill}</span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeSkill(categoryKey, customSkill);
                                }}
                                className="ml-2 hover:text-red-300 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </label>
                        ))}
                      </div>

                      {/* Add Custom Skill */}
                      <div className="flex gap-3 mt-4">
                        <Input
                          placeholder={`Add custom ${category.title.toLowerCase()}...`}
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
                          className="border-0 font-inter px-5 py-3 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                        />
                        <Button
                          onClick={() => addCustomSkill(categoryKey)}
                          variant="outline"
                          size="sm"
                          disabled={!customSkillInputs[categoryKey]?.trim()}
                          className="px-4 py-3 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  );
                },
              )}
            </CardContent>
          </Card>
        );

      case "experience":
        return (
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </CardTitle>
                <EnhancedButton
                  onClick={addExperience}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Add Experience</span>
                  <span className="sm:hidden">Add</span>
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="border-0 bg-white/70 shadow-lg rounded-2xl backdrop-blur-sm p-6"
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
                    <div className="space-y-4 mb-4">
                      {/* Position and Company in same row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            Position
                          </Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(exp.id, "position", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            Company
                          </Label>
                          <Input
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(exp.id, "company", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      {/* Start Date and End Date in same row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Jan 2023"
                          />
                        </div>
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            End Date
                          </Label>
                          <Input
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(exp.id, "endDate", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Present"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                            className="border-0 font-roboto px-3 py-2 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white transition-all duration-200"
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
                  </div>
                ))}
              </div>
              {experiences.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No work experience added yet. Click "Add Experience" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "projects":
        return (
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <FolderOpen className="w-5 h-5" />
                  Projects
                </CardTitle>
                <EnhancedButton
                  onClick={addProject}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Add Project</span>
                  <span className="sm:hidden">Add</span>
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="border-0 bg-white/70 shadow-lg rounded-2xl backdrop-blur-sm p-6"
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
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                          Project Name
                        </Label>
                        <Input
                          value={project.name}
                          onChange={(e) =>
                            updateProject(project.id, "name", e.target.value)
                          }
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div>
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="React, Node.js, MongoDB..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="github.com/username/project"
                          />
                        </div>
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="project.netlify.app"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                              className="border-0 font-roboto px-3 py-2 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white transition-all duration-200"
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
                  </div>
                ))}
              </div>
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
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
                <EnhancedButton
                  onClick={addEducation}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Add Education</span>
                  <span className="sm:hidden">Add</span>
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="border-0 bg-white/70 shadow-lg rounded-2xl backdrop-blur-sm p-6"
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
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="University Name"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            Degree
                          </Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Bachelor's, Master's, PhD..."
                          />
                        </div>
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            Course/Major
                          </Label>
                          <Input
                            value={edu.course}
                            onChange={(e) =>
                              updateEducation(edu.id, "course", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="Computer Science"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            Year
                          </Label>
                          <Input
                            value={edu.year}
                            onChange={(e) =>
                              updateEducation(edu.id, "year", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="2020 - 2025"
                          />
                        </div>
                        <div>
                          <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                            GPA/Marks
                          </Label>
                          <Input
                            value={edu.marks}
                            onChange={(e) =>
                              updateEducation(edu.id, "marks", e.target.value)
                            }
                            className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                            placeholder="3.8 GPA or 85%"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                          Location
                        </Label>
                        <Input
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(edu.id, "location", e.target.value)
                          }
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="City, State/Country"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <Award className="w-5 h-5" />
                  Certifications
                </CardTitle>
                <EnhancedButton
                  onClick={addCertification}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Add Certification</span>
                  <span className="sm:hidden">Add</span>
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="border-0 bg-white/70 shadow-lg rounded-2xl backdrop-blur-sm p-6"
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
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="AWS Certified Developer"
                        />
                      </div>
                      <div>
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                          Year
                        </Label>
                        <Input
                          value={cert.year}
                          onChange={(e) =>
                            updateCertification(cert.id, "year", e.target.value)
                          }
                          className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700"
                          placeholder="2025"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {certifications.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No certifications added yet. Click "Add Certification" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "achievements":
        return (
          <Card className="border-0 bg-white/70 shadow-lg rounded-3xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                  <Trophy className="w-5 h-5" />
                  Achievements
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
            <CardContent className="space-y-8">
              <div>
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="border-0 bg-white/70 shadow-lg rounded-2xl backdrop-blur-sm p-6"
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
                      <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                        Achievement Description
                      </Label>
                      <Textarea
                        value={achievement.description}
                        onChange={(e) =>
                          updateAchievement(achievement.id, "description", e.target.value)
                        }
                        className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700 resize-none"
                        rows={3}
                        placeholder="Describe your achievement, award, or recognition..."
                      />
                    </div>
                  </div>
                ))}
              </div>
              {achievements.length === 0 && (
                <div className="text-center py-12 text-gray-text">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-roboto">
                    No achievements added yet. Click "Add Achievement" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "interests":
        return (
          <Card className="border border-gray-200 bg-white shadow-md rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
              >
                <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                  Interests
                </Label>
                <Textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="border-0 font-inter mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700 resize-none"
                  rows={3}
                  placeholder="List your hobbies, interests, or relevant activities..."
                />
              </div>
            </CardContent>
          </Card>
        );

      case "customization":
        return (
          <Card className="border border-gray-200 bg-white shadow-md rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="font-inter text-gray-800 text-xl font-semibold tracking-tight flex items-center gap-3">
                <Palette className="w-5 h-5" />
                Resume Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                    <SelectTrigger className="border-0 mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700">
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
                </div>

                <div>
                  <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
                    Font Family
                  </Label>
                  <Select
                    value={fontFamily}
                    onValueChange={(value) => setFontFamily(value)}
                    disabled={!fontCategory}
                  >
                    <SelectTrigger className="border-0 mt-3 px-5 py-4 focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-2xl shadow-sm bg-gray-50/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 text-gray-700">
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
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div>
                  <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
                  <Label className="font-inter text-gray-700 font-medium text-sm tracking-wide">
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
              </div>

              <div
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              >
                <h4 className="font-roboto font-semibold text-black mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Font Preview
                </h4>
                <div className="space-y-3" style={{ fontFamily: fontFamily }}>
                  <p
                    className="text-xl font-bold text-black"
                  >
                    JOHN DOE
                  </p>
                  <p
                    className="text-sm text-gray-700"
                  >
                    Full Stack Software Engineer with 5+ years of experience
                  </p>
                  <p
                    className="text-xs text-gray-600"
                  >
                    <strong>Skills:</strong> JavaScript, React, Node.js, Python,
                    MongoDB, AWS
                  </p>
                  <p
                    className="text-xs text-gray-600"
                  >
                    <strong>Experience:</strong> Led development of scalable web
                    applications serving 10k+ users
                  </p>
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
              </div>
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
          <Card className="border border-gray-200 bg-white shadow-md rounded-2xl">
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

  const recommendations = currentProfile ? getATSRecommendations() : [];
  const currentStepObj = enhancedSteps && enhancedSteps[currentStep];

  // Loading Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen">
      <div
        className="bg-white rounded-2xl p-8 shadow-2xl mx-4"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
          />
          <p className="font-roboto text-gray-600">Resetting all data...</p>
        </div>
      </div>
    </div>
  );

  // Show loading spinner during initialization
  if (isInitializing) {
    return <LoadingSpinner fullScreen={true} message="Loading PersonalBuilder..." />;
  }

  // If no profile is selected, show profile manager
  if (showProfileManager || !currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
        <div
          className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.location.assign("/");
                  }}
                  style={{ userSelect: "none" }}
                >
                  <Logo size="md" showText={true} />
                </div>
              </div>
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
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <ProfileManager
            onProfileSelected={handleProfileSelected}
            currentProfileData={currentProfile}
          />
        </div>
      </div>
    );
  }

  // Ensure we have valid enhanced steps before rendering main interface
  if (!enhancedSteps || enhancedSteps.length === 0) {
    console.warn('No enhanced steps found, resetting to defaults');
    setEnhancedSteps(DEFAULT_STEPS);
    return <LoadingSpinner fullScreen={true} message="Initializing resume sections..." />;
  }

  // Ensure current step is valid
  if (currentStep >= enhancedSteps.length || currentStep < 0) {
    console.warn('Invalid current step, resetting to 0');
    setCurrentStep(0);
    return <LoadingSpinner fullScreen={true} message="Loading PersonalBuilder..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-gray-50/30">
      {/* Mobile/Tablet Navbar */}
      <MobileTabletNavbar />

      {/* Desktop Layout - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        {/* Header */}
        <div
          className="bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm sticky top-0 z-40"
        >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                  className="relative w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  aria-label="Toggle sidebar"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isMobileSidebarOpen ? (
                    <X className="w-5 h-5 text-gray-700 relative z-10" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700 relative z-10" />
                  )}
                </button>
              </div>

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
              {currentProfile && (
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-50/80 rounded-full border border-gray-100">
                  <User className="w-4 h-4 text-black" />
                  <span className="text-xs md:text-sm font-medium text-black">{currentProfile.name}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <EnhancedButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.location.assign("/");
                }}
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                Home
              </EnhancedButton>

              <EnhancedButton
                onClick={() => setShowProfileManager(true)}
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">Profile</span>
              </EnhancedButton>

              <EnhancedButton
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 md:gap-2"
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{showPreview ? "Close Preview" : "Preview"}</span>
              </EnhancedButton>

              <EnhancedButton
                onClick={handleDownload}
                variant="premium"
                size="sm"
                className="flex items-center gap-1 md:gap-2"
                disabled={isRedirectingToPDF}
              >
                {isRedirectingToPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="hidden sm:inline">Preparing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </>
                )}
              </EnhancedButton>

              <EnhancedButton
                onClick={() => setConfirmationDialog({
                  isOpen: true,
                  title: 'Reset All Data',
                  message: 'This will permanently delete all your resume information including personal details, skills, experience, projects, and customizations. This action cannot be undone.',
                  onConfirm: resetAll
                })}
                variant="outline"
                size="sm"
                className="hidden md:flex text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 border-red-200 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMobileSidebarOpen(false)}></div>
          </div>
        )}

        {/* Sidebar - 25% width on desktop, overlay on mobile */}
        <div
          className={`${
            isMobileSidebarOpen
              ? "fixed inset-y-0 left-0 z-50 w-80 lg:relative lg:w-1/4"
              : "hidden lg:block lg:w-1/4"
          } bg-white/95 lg:bg-white/70 backdrop-blur-xl border-r border-gray-100/60 relative sticky top-0 h-screen shadow-xl lg:shadow-none`}
        >
          {/* Sidebar background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-transparent to-gray-50/20"></div>
          <div className="relative z-10 p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-inter text-lg font-semibold text-gray-800 tracking-tight">
                Resume Sections
              </h2>
              <div className="flex items-center gap-2">
                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="lg:hidden w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {isDraggingAny && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <GripVertical className="w-4 h-4" />
                    <span>Reordering...</span>
                  </div>
                )}
              </div>
            </div>

            {/* All sections area - no scrolling */}
            <div className="flex-1">
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
                  <div className="space-y-1 pb-2">
                    {enhancedSteps
                      .sort((a, b) => a.order - b.order)
                      .map((step, index) => {
                        // Safety check: ensure step has required properties
                        if (!step || !step.id || !step.title) {
                          return null;
                        }

                        const isActive = currentStep === index;
                        const isCompleted = hasActualContent(index);

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

              {/* Add Custom Section Button - Right after Customization */}
              <div className="mt-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Create Custom Section button clicked');
                    setShowCustomSectionWizard(true);
                  }}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-300 text-xs font-medium bg-white/50 rounded-lg backdrop-blur-sm"
                >
                  <Plus className="w-3 h-3" />
                  Create Custom Section
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Responsive width - Scrollable only when needed */}
        <div className="flex-1 h-screen flex flex-col min-w-0">
          {showPreview ? (
            <div className="flex-1 overflow-auto p-4 md:p-8">
              {/* Only Resume Preview - No ATS Recommendations */}
              <div className="bg-white/80 border-0 shadow-xl rounded-2xl md:rounded-3xl p-1 md:p-2 backdrop-blur-sm">
                <div className="bg-gray-50/50 p-3 md:p-4 rounded-t-xl md:rounded-t-2xl">
                  <span className="font-inter text-xs md:text-sm text-gray-600 font-medium">
                    Resume Preview
                  </span>
                </div>
                <div className="rounded-b-xl md:rounded-b-2xl">
                  <ResumePreview />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {/* Fixed Header */}
              <div className="p-4 md:p-8 pb-0 flex-shrink-0">
                <div className="mb-6 md:mb-8">
                  <h1 className="font-inter text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 tracking-tight">
                    {currentStepObj.title}
                  </h1>
                  <p className="font-inter text-gray-500 mt-2 text-base md:text-lg">
                    Step {currentStep + 1} of {enhancedSteps.length}
                  </p>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-auto px-4 md:px-8 pb-4 md:pb-8">
                <div
                  className="step-content"
                  key={currentStep}
                >
                  {renderStepContent()}
                </div>
              </div>

            </div>
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

      {/* Profile Manager Modal */}
      {showProfileManager && currentProfile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProfileManager(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Switch Profile</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileManager(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ProfileManager
                onProfileSelected={handleProfileSelected}
                currentProfileData={currentProfile}
              />
            </div>
          </div>
        </div>
      )}

        {/* Loading Overlay */}
        {isLoading && <LoadingOverlay />}
      </div>

      {/* Mobile/Tablet Content */}
      <div className="lg:hidden pt-16">
        {showPreview ? (
          <div className="mobile-content-height overflow-y-auto">
            <div className="p-4">
              <ResumePreview />
            </div>
          </div>
        ) : (
          <div className="mobile-content-height overflow-y-auto">
            {/* Single scrollable container */}
            <div className="min-h-full flex flex-col">
              {/* Content Area with bottom padding for navigation and safe areas */}
              <div className="flex-1 p-4 pb-20">
                <div className="step-content">
                  {renderStepContent()}
                </div>
              </div>

              {/* Bottom Navigation - Fixed positioning with safe area support */}
              {enhancedSteps && enhancedSteps[currentStep] && (
                <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg">
                  <div className="flex justify-between items-center max-w-lg mx-auto p-4">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="flex items-center gap-2 touch-target min-w-[100px]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <span className="text-sm text-gray-500 px-4">
                      {currentStep + 1} of {enhancedSteps.length}
                    </span>

                    <Button
                      onClick={nextStep}
                      disabled={currentStep === enhancedSteps.length - 1}
                      className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 touch-target min-w-[100px]"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dialogs - PDFExportDialog moved above to include all props */}

    </div>
  );
}
