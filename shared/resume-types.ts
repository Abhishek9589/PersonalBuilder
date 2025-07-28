// Enhanced resume types with section ordering and visibility
export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  techStack: string;
  githubLink: string;
  deployLink: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  year: string;
  marks: string;
  location: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
}

export interface Achievement {
  id: string;
  description: string;
}

export interface Skills {
  programmingLanguages: string[];
  webTechnologies: string[];
  frameworksLibraries: string[];
  databases: string[];
  toolsPlatforms: string[];
  cloudHosting: string[];
  otherTechnical: string[];
}

// Custom section field types
export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'date' 
  | 'email' 
  | 'url' 
  | 'phone' 
  | 'tags' 
  | 'bullets' 
  | 'rating' 
  | 'select' 
  | 'number';

export interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select type
  maxRating?: number; // For rating type
}

export interface CustomSectionData {
  [fieldId: string]: any;
}

export interface CustomSection {
  id: string;
  name: string;
  layout: 'single-column' | 'two-column' | 'timeline' | 'grid';
  fields: CustomField[];
  data: CustomSectionData[];
  isCustom: true;
  isVisible: boolean;
  order: number;
}

// Built-in section types
export type SectionType = 
  | 'personalInfo'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'interests'
  | 'custom';

export interface ResumeSection {
  id: string;
  type: SectionType;
  name: string;
  isVisible: boolean;
  isRequired: boolean;
  order: number;
  customSectionId?: string; // For custom sections
}

// Main resume data structure
export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string;
  
  // Customization options
  fontFamily: string;
  fontCategory: string;
  fontSize: number;
  marginSize: number;
  
  // Section management
  sectionOrder: ResumeSection[];
  customSections: CustomSection[];
  
  // Metadata
  lastModified: string;
  version: string;
}

// Default sections configuration
export const DEFAULT_SECTIONS: ResumeSection[] = [
  { id: 'personalInfo', type: 'personalInfo', name: 'Personal Information', isVisible: true, isRequired: true, order: 0 },
  { id: 'summary', type: 'summary', name: 'Professional Summary', isVisible: true, isRequired: true, order: 1 },
  { id: 'skills', type: 'skills', name: 'Technical Skills', isVisible: true, isRequired: true, order: 2 },
  { id: 'experience', type: 'experience', name: 'Work Experience', isVisible: true, isRequired: false, order: 3 },
  { id: 'projects', type: 'projects', name: 'Projects', isVisible: true, isRequired: true, order: 4 },
  { id: 'education', type: 'education', name: 'Education', isVisible: true, isRequired: true, order: 5 },
  { id: 'certifications', type: 'certifications', name: 'Certifications', isVisible: true, isRequired: false, order: 6 },
  { id: 'achievements', type: 'achievements', name: 'Achievements', isVisible: true, isRequired: false, order: 7 },
  { id: 'interests', type: 'interests', name: 'Interests', isVisible: true, isRequired: false, order: 8 },
];

// Section icons mapping
export const SECTION_ICONS = {
  personalInfo: 'User',
  summary: 'FileText',
  skills: 'Code',
  experience: 'Briefcase',
  projects: 'FolderOpen',
  education: 'GraduationCap',
  certifications: 'Award',
  achievements: 'Trophy',
  interests: 'Heart',
  custom: 'Settings',
} as const;

// Validation helpers
export function validateSection(section: ResumeSection, data: ResumeData): boolean {
  if (!section.isVisible && !section.isRequired) return true;
  
  switch (section.type) {
    case 'personalInfo':
      return !!(data.personalInfo.name && data.personalInfo.email && data.personalInfo.phone);
    case 'summary':
      return data.summary.trim().length > 0;
    case 'skills':
      return data.skills.programmingLanguages.length > 0 || data.skills.frameworksLibraries.length > 0;
    case 'projects':
      return data.projects.length > 0 && data.projects.every(p => p.name && p.techStack);
    case 'education':
      return data.education.length > 0 && data.education.every(e => e.institution && e.degree);
    case 'experience':
      return data.experiences.length === 0 || data.experiences.every(e => e.position && e.company);
    case 'certifications':
      return data.certifications.length === 0 || data.certifications.every(c => c.title && c.organization);
    case 'achievements':
      return data.achievements.length === 0 || data.achievements.every(a => a.description.trim().length > 0);
    case 'interests':
      return true;
    case 'custom':
      const customSection = data.customSections.find(cs => cs.id === section.customSectionId);
      return customSection ? customSection.data.length > 0 : true;
    default:
      return true;
  }
}
