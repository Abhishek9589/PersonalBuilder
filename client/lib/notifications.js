import { toast } from 'sonner';

/**
 * Unified notification service for the application
 * All notifications will appear in the bottom-right corner with consistent styling
 */

export const notifications = {
  /**
   * Show a success notification
   * @param {string} message - The main message
   * @param {string} [description] - Optional description
   * @param {Object} [options] - Additional options
   */
  success: (message, description, options = {}) => {
    return toast.success(message, {
      description,
      duration: options.duration || 4000,
      ...options,
    });
  },

  /**
   * Show an error notification
   * @param {string} message - The main message
   * @param {string} [description] - Optional description
   * @param {Object} [options] - Additional options
   */
  error: (message, description, options = {}) => {
    return toast.error(message, {
      description,
      duration: options.duration || 5000, // Errors stay longer
      ...options,
    });
  },

  /**
   * Show an info notification
   * @param {string} message - The main message
   * @param {string} [description] - Optional description
   * @param {Object} [options] - Additional options
   */
  info: (message, description, options = {}) => {
    return toast.info(message, {
      description,
      duration: options.duration || 3000,
      ...options,
    });
  },

  /**
   * Show a warning notification
   * @param {string} message - The main message
   * @param {string} [description] - Optional description
   * @param {Object} [options] - Additional options
   */
  warning: (message, description, options = {}) => {
    return toast.warning(message, {
      description,
      duration: options.duration || 4000,
      ...options,
    });
  },

  /**
   * Show a loading notification
   * @param {string} message - The main message
   * @param {string} [description] - Optional description
   * @param {Object} [options] - Additional options
   */
  loading: (message, description, options = {}) => {
    return toast.loading(message, {
      description,
      ...options,
    });
  },

  /**
   * Show a custom notification with action button
   * @param {string} message - The main message
   * @param {Object} config - Configuration object
   */
  custom: (message, config = {}) => {
    const { description, action, type = 'info', ...options } = config;
    
    return toast[type](message, {
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      ...options,
    });
  },

  /**
   * Profile-specific notifications
   */
  profile: {
    created: (profileName) => {
      return notifications.success(
        `Profile "${profileName}" created successfully!`,
        'Your new profile is ready to use.',
        { duration: 4000 }
      );
    },

    loaded: (profileName) => {
      return notifications.success(
        `Loaded profile: ${profileName}`,
        'All your saved data has been restored.',
        { duration: 3000 }
      );
    },

    switched: (profileName) => {
      return notifications.success(
        `Switched to "${profileName}" profile`,
        'Your profile has been changed successfully.',
        { duration: 3000 }
      );
    },

    deleted: (profileName) => {
      return notifications.success(
        `Profile "${profileName}" deleted`,
        'The profile and all its data have been removed.',
        { duration: 4000 }
      );
    },

    renamed: (newName) => {
      return notifications.success(
        `Profile renamed to "${newName}"`,
        'Your profile name has been updated.',
        { duration: 3000 }
      );
    },

    cloned: (profileName) => {
      return notifications.success(
        `Profile "${profileName}" created successfully!`,
        'Your profile has been duplicated with all settings.',
        { duration: 4000 }
      );
    },

    loadError: () => {
      return notifications.error(
        'Failed to load profile',
        'Please try again or select a different profile.',
        { duration: 5000 }
      );
    },

    deleteError: () => {
      return notifications.error(
        'Failed to delete profile',
        'Please try again later.',
        { duration: 5000 }
      );
    },

    cloneError: () => {
      return notifications.error(
        'Failed to clone profile',
        'Please try again later.',
        { duration: 5000 }
      );
    },

    updateError: () => {
      return notifications.error(
        'Failed to update profile',
        'Please try again later.',
        { duration: 5000 }
      );
    },
  },

  /**
   * Section-specific notifications
   */
  section: {
    moved: () => {
      return notifications.success(
        'Section order updated',
        'Your resume section order has been saved.',
        { duration: 3000 }
      );
    },

    enabled: (sectionTitle) => {
      return notifications.success(
        'Section enabled',
        `${sectionTitle} is now included in your resume.`,
        { duration: 3000 }
      );
    },

    disabled: (sectionTitle) => {
      return notifications.success(
        'Section hidden',
        `${sectionTitle} is now hidden from your resume.`,
        { duration: 3000 }
      );
    },

    created: (sectionName) => {
      return notifications.success(
        'Custom section created',
        `${sectionName} has been added to your resume.`,
        { duration: 4000 }
      );
    },

    deleted: (sectionTitle) => {
      return notifications.success(
        'Custom section deleted',
        `${sectionTitle} has been removed from your resume.`,
        { duration: 4000 }
      );
    },

    cannotMove: () => {
      return notifications.error(
        'Customization section cannot be moved',
        'The customization section must remain at the bottom.',
        { duration: 4000 }
      );
    },

    isDisabled: (sectionTitle) => {
      return notifications.error(
        'Section is disabled',
        `${sectionTitle} section is currently hidden from your resume.`,
        { duration: 4000 }
      );
    },
  },

  /**
   * Keyboard shortcut notifications
   */
  shortcuts: {
    preview: () => {
      return notifications.info(
        'Switched to preview mode',
        'Press Ctrl+P again to return to editing.',
        { duration: 1500 }
      );
    },

    sections: () => {
      return notifications.info(
        'Switched to sections mode',
        'Now you can manage your resume sections.',
        { duration: 1500 }
      );
    },

    download: () => {
      return notifications.info(
        'Downloading resume...',
        'Your resume will be downloaded shortly.',
        { duration: 1500 }
      );
    },

    returned: () => {
      return notifications.info(
        'Returned to sections',
        'You are now back in sections view.',
        { duration: 1500 }
      );
    },
  },

  /**
   * General application notifications
   */
  app: {
    reset: () => {
      return notifications.success(
        'Resume data reset successfully',
        'All your resume data has been cleared.',
        { duration: 4000 }
      );
    },

    saved: () => {
      return notifications.success(
        'Changes saved',
        'Your resume has been updated automatically.',
        { duration: 2000 }
      );
    },

    error: (message = 'Something went wrong') => {
      return notifications.error(
        message,
        'Please try again or contact support if the issue persists.',
        { duration: 5000 }
      );
    },
  },

  /**
   * Dismiss all notifications
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Dismiss a specific notification
   * @param {string} toastId - The ID of the toast to dismiss
   */
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};

// Export the base toast function for advanced usage
export { toast };

// Export as default for convenience
export default notifications;
