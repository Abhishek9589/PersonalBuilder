// Profile management utilities for local storage

const PROFILES_STORAGE_KEY = 'resume_profiles';
const CURRENT_PROFILE_KEY = 'current_profile_id';

/**
 * Get all saved profiles from local storage
 * @returns {Array} Array of profile objects
 */
export const getAllProfiles = () => {
  try {
    const profiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    return profiles ? JSON.parse(profiles) : [];
  } catch (error) {
    console.error('Error getting profiles:', error);
    return [];
  }
};

/**
 * Save a new profile or update existing one
 * @param {Object} profile - Profile object with id, name, and data
 * @returns {boolean} Success status
 */
export const saveProfile = (profile) => {
  try {
    const profiles = getAllProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingIndex >= 0) {
      profiles[existingIndex] = { ...profile, updatedAt: new Date().toISOString() };
    } else {
      profiles.push({ 
        ...profile, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
};

/**
 * Delete a profile by ID
 * @param {string} profileId - Profile ID to delete
 * @returns {boolean} Success status
 */
export const deleteProfile = (profileId) => {
  try {
    const profiles = getAllProfiles();
    const filteredProfiles = profiles.filter(p => p.id !== profileId);
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(filteredProfiles));
    
    // Clear current profile if it was deleted
    if (getCurrentProfileId() === profileId) {
      setCurrentProfileId(null);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting profile:', error);
    return false;
  }
};

/**
 * Get a specific profile by ID
 * @param {string} profileId - Profile ID
 * @returns {Object|null} Profile object or null if not found
 */
export const getProfile = (profileId) => {
  try {
    const profiles = getAllProfiles();
    return profiles.find(p => p.id === profileId) || null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

/**
 * Set the current active profile ID
 * @param {string|null} profileId - Profile ID to set as current
 */
export const setCurrentProfileId = (profileId) => {
  try {
    if (profileId) {
      localStorage.setItem(CURRENT_PROFILE_KEY, profileId);
    } else {
      localStorage.removeItem(CURRENT_PROFILE_KEY);
    }
  } catch (error) {
    console.error('Error setting current profile:', error);
  }
};

/**
 * Get the current active profile ID
 * @returns {string|null} Current profile ID or null
 */
export const getCurrentProfileId = () => {
  try {
    return localStorage.getItem(CURRENT_PROFILE_KEY);
  } catch (error) {
    console.error('Error getting current profile:', error);
    return null;
  }
};

/**
 * Generate a unique profile ID
 * @returns {string} Unique profile ID
 */
export const generateProfileId = () => {
  return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a default profile structure
 * @param {string} name - Profile name
 * @returns {Object} Default profile object
 */
export const createDefaultProfile = (name) => {
  return {
    id: generateProfileId(),
    name: name.trim(),
    data: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: ''
      },
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
      interests: [],
      customSections: []
    }
  };
};

/**
 * Update profile data
 * @param {string} profileId - Profile ID
 * @param {Object} newData - New data to merge with existing data
 * @returns {boolean} Success status
 */
export const updateProfileData = (profileId, newData) => {
  try {
    const profile = getProfile(profileId);
    if (!profile) return false;
    
    profile.data = { ...profile.data, ...newData };
    return saveProfile(profile);
  } catch (error) {
    console.error('Error updating profile data:', error);
    return false;
  }
};
