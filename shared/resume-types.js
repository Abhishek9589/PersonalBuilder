// Enhanced resume types with section ordering and visibility
// Using JSDoc for documentation instead of TypeScript interfaces

// Default sections configuration
export const DEFAULT_SECTIONS = [
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
};

// Validation helpers
export function validateSection(section, data) {
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
