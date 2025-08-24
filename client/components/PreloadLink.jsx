import React, { useCallback, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

// Route preloading cache
const preloadCache = new Set();

// Route component mapping for preloading
const routeComponents = {
  '/': () => import('../pages/Index'),
  '/builder': () => import('../pages/Builder'),
  '/about': () => import('../pages/About'),
  '/templates': () => import('../pages/Templates'),
  '/contact': () => import('../pages/Contact'),
};

// Preload a route component
const preloadRoute = async (path) => {
  // Normalize path (remove query params and hash)
  const normalizedPath = path.split('?')[0].split('#')[0];
  
  // Skip if already preloaded or no component mapping
  if (preloadCache.has(normalizedPath) || !routeComponents[normalizedPath]) {
    return;
  }

  try {
    // Add to cache immediately to prevent duplicate requests
    preloadCache.add(normalizedPath);
    
    // Import the component
    await routeComponents[normalizedPath]();
    
    console.log(`Preloaded route: ${normalizedPath}`);
  } catch (error) {
    // Remove from cache if failed to allow retry
    preloadCache.delete(normalizedPath);
    console.warn(`Failed to preload route ${normalizedPath}:`, error);
  }
};

// Enhanced Link component with preloading
const PreloadLink = React.forwardRef(({ 
  to, 
  children, 
  preloadDelay = 50, // Delay before preloading (ms)
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  prefetch = true, // Enable/disable prefetching
  className = "",
  ...props 
}, ref) => {
  const preloadTimeoutRef = useRef(null);
  const hasFocusedRef = useRef(false);

  // Handle mouse enter with delay
  const handleMouseEnter = useCallback((e) => {
    if (prefetch && to) {
      preloadTimeoutRef.current = setTimeout(() => {
        preloadRoute(to);
      }, preloadDelay);
    }
    onMouseEnter?.(e);
  }, [to, prefetch, preloadDelay, onMouseEnter]);

  // Handle mouse leave - cancel preload if still pending
  const handleMouseLeave = useCallback((e) => {
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
      preloadTimeoutRef.current = null;
    }
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  // Handle focus for keyboard navigation
  const handleFocus = useCallback((e) => {
    if (prefetch && to && !hasFocusedRef.current) {
      hasFocusedRef.current = true;
      preloadRoute(to);
    }
    onFocus?.(e);
  }, [to, prefetch, onFocus]);

  // Handle blur
  const handleBlur = useCallback((e) => {
    hasFocusedRef.current = false;
    onBlur?.(e);
  }, [onBlur]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, []);

  return (
    <RouterLink
      ref={ref}
      to={to}
      className={`${className} transition-all duration-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </RouterLink>
  );
});

PreloadLink.displayName = "PreloadLink";

export default PreloadLink;

// Hook to preload routes programmatically
export const usePreloadRoute = () => {
  return useCallback((path) => {
    preloadRoute(path);
  }, []);
};

// Preload all critical routes on app load
export const preloadCriticalRoutes = () => {
  // Preload most important routes after a short delay
  setTimeout(() => {
    preloadRoute('/builder');
    preloadRoute('/templates');
  }, 1000);
};

// Preload route when user is likely to navigate (e.g., on scroll, after interaction)
export const preloadLikelyRoutes = () => {
  const routes = ['/about', '/contact'];
  routes.forEach(route => {
    setTimeout(() => preloadRoute(route), Math.random() * 2000 + 1000);
  });
};
