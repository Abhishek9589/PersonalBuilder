import { gsap } from 'gsap';

// Simple fade in animation
export const fadeIn = (element, options = {}) => {
  const defaults = {
    duration: 0.5,
    opacity: 1,
    ease: 'power2.out',
    ...options
  };
  
  gsap.fromTo(element, 
    { opacity: 0 }, 
    defaults
  );
};

// Slide in from bottom animation
export const slideInUp = (element, options = {}) => {
  const defaults = {
    duration: 0.6,
    y: 0,
    opacity: 1,
    ease: 'power2.out',
    ...options
  };
  
  gsap.fromTo(element, 
    { y: 30, opacity: 0 }, 
    defaults
  );
};

// Scale in animation
export const scaleIn = (element, options = {}) => {
  const defaults = {
    duration: 0.4,
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)',
    ...options
  };
  
  gsap.fromTo(element, 
    { scale: 0.8, opacity: 0 }, 
    defaults
  );
};

// Stagger animation for multiple elements
export const staggerFadeIn = (elements, options = {}) => {
  const defaults = {
    duration: 0.5,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    ease: 'power2.out',
    ...options
  };
  
  gsap.fromTo(elements, 
    { opacity: 0, y: 20 }, 
    defaults
  );
};

// Simple hover animations
export const addHoverAnimation = (element, options = {}) => {
  const defaults = {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
    ...options
  };
  
  element.addEventListener('mouseenter', () => {
    gsap.to(element, { scale: defaults.scale, duration: defaults.duration, ease: defaults.ease });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration: defaults.duration, ease: defaults.ease });
  });
};

// Performance optimized batch animations
export const batchAnimate = (animations) => {
  const tl = gsap.timeline();
  animations.forEach(({ element, from, to, delay = 0 }) => {
    tl.fromTo(element, from, { ...to, delay }, delay);
  });
  return tl;
};
