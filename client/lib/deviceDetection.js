import React from 'react';

/**
 * Device detection utilities for determining mobile/tablet devices
 * Used to implement different PDF export behaviors
 */

/**
 * Detects if the current device is mobile or tablet using user agent
 * @returns {boolean} True if mobile or tablet device
 */
export const isMobileOrTabletUserAgent = () => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Mobile patterns
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /IEMobile/i,
    /Opera Mini/i,
    /Mobile/i,
    /mobile/i,
    /CriOS/i, // Chrome on iOS
    /FxiOS/i, // Firefox on iOS
  ];
  
  return mobilePatterns.some(pattern => pattern.test(userAgent));
};

/**
 * Detects if the current device is mobile or tablet using viewport width
 * @param {number} breakpoint - Viewport width breakpoint (default: 1024px)
 * @returns {boolean} True if viewport width is less than or equal to breakpoint
 */
export const isMobileOrTabletViewport = (breakpoint = 1024) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= breakpoint;
};

/**
 * Detects if the current device is mobile or tablet using touch capability
 * @returns {boolean} True if device has touch capability
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Comprehensive mobile/tablet detection combining multiple methods
 * @param {Object} options - Detection options
 * @param {number} options.viewportBreakpoint - Viewport width breakpoint (default: 1024px)
 * @param {boolean} options.useUserAgent - Whether to use user agent detection (default: true)
 * @param {boolean} options.useViewport - Whether to use viewport detection (default: true)
 * @param {boolean} options.useTouch - Whether to use touch detection (default: false)
 * @returns {boolean} True if device is detected as mobile or tablet
 */
export const isMobileOrTablet = (options = {}) => {
  const {
    viewportBreakpoint = 1024,
    useUserAgent = true,
    useViewport = true,
    useTouch = false,
  } = options;
  
  let isMobileTablet = false;
  
  // User agent detection (most reliable for actual device type)
  if (useUserAgent && isMobileOrTabletUserAgent()) {
    isMobileTablet = true;
  }
  
  // Viewport detection (for responsive behavior)
  if (useViewport && isMobileOrTabletViewport(viewportBreakpoint)) {
    isMobileTablet = true;
  }
  
  // Touch detection (additional check)
  if (useTouch && isTouchDevice()) {
    isMobileTablet = true;
  }
  
  return isMobileTablet;
};

/**
 * Gets device type string for analytics or debugging
 * @returns {string} Device type: 'mobile', 'tablet', 'desktop'
 */
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const width = window.innerWidth;
  
  // Check for mobile first
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  }
  
  // Check for tablet
  if (/iPad/i.test(userAgent) || (width <= 1024 && width > 768)) {
    return 'tablet';
  }
  
  // Check for mobile-sized viewport
  if (width <= 768) {
    return 'mobile';
  }
  
  return 'desktop';
};

/**
 * React hook for device detection with real-time updates
 * @param {Object} options - Detection options (same as isMobileOrTablet)
 * @returns {Object} Device detection state
 */
export const useDeviceDetection = (options = {}) => {
  const [deviceState, setDeviceState] = React.useState(() => ({
    isMobileOrTablet: isMobileOrTablet(options),
    deviceType: getDeviceType(),
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  }));
  
  React.useEffect(() => {
    const updateDeviceState = () => {
      setDeviceState({
        isMobileOrTablet: isMobileOrTablet(options),
        deviceType: getDeviceType(),
        viewportWidth: window.innerWidth,
      });
    };
    
    // Update on window resize
    window.addEventListener('resize', updateDeviceState);
    
    // Update on orientation change (mobile devices)
    window.addEventListener('orientationchange', updateDeviceState);
    
    return () => {
      window.removeEventListener('resize', updateDeviceState);
      window.removeEventListener('orientationchange', updateDeviceState);
    };
  }, [options]);
  
  return deviceState;
};

// For backwards compatibility, export the main function as default
export default isMobileOrTablet;
