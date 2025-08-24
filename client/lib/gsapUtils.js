import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Animation utility class for GSAP to replace framer-motion
export class GSAPAnimations {
  // Default animation settings
  static defaults = {
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1
  };

  // Fade in animation (replaces motion initial/animate)
  static fadeIn(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    gsap.fromTo(element, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: settings.duration,
        ease: settings.ease,
        delay: settings.delay || 0
      }
    );
  }

  // Fade out animation
  static fadeOut(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: settings.duration,
      ease: settings.ease,
      onComplete: options.onComplete
    });
  }

  // Scale animation (replaces motion scale)
  static scale(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    gsap.fromTo(element,
      { scale: options.from || 0.95, opacity: 0 },
      { 
        scale: options.to || 1, 
        opacity: 1,
        duration: settings.duration,
        ease: settings.ease,
        delay: settings.delay || 0
      }
    );
  }

  // Slide in from left
  static slideInLeft(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    gsap.fromTo(element,
      { x: -20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1,
        duration: settings.duration,
        ease: settings.ease,
        delay: settings.delay || 0
      }
    );
  }

  // Slide in from right
  static slideInRight(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    gsap.fromTo(element,
      { x: 20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1,
        duration: settings.duration,
        ease: settings.ease,
        delay: settings.delay || 0
      }
    );
  }

  // Generic slide in animation with direction
  static slideIn(element, options = {}) {
    const settings = { ...this.defaults, ...options };
    const direction = options.direction || 'right';

    let fromVars = { opacity: 0 };
    let toVars = { opacity: 1, duration: settings.duration, ease: settings.ease, delay: settings.delay || 0 };

    switch (direction) {
      case 'left':
        fromVars.x = -20;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = 20;
        toVars.x = 0;
        break;
      case 'up':
        fromVars.y = 20;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -20;
        toVars.y = 0;
        break;
      default:
        fromVars.x = 20;
        toVars.x = 0;
    }

    gsap.fromTo(element, fromVars, toVars);
  }

  // Stagger animation for multiple elements
  static staggerIn(elements, options = {}) {
    const settings = { ...this.defaults, ...options };
    
    gsap.fromTo(elements,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        duration: settings.duration,
        ease: settings.ease,
        stagger: settings.stagger
      }
    );
  }

  // Hover animations
  static addHoverEffect(element, options = {}) {
    const hoverIn = options.hoverIn || { scale: 1.05, duration: 0.2 };
    const hoverOut = options.hoverOut || { scale: 1, duration: 0.2 };

    element.addEventListener('mouseenter', () => {
      gsap.to(element, hoverIn);
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, hoverOut);
    });
  }

  // Loading spinner animation
  static spinnerAnimation(element) {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: "none",
      repeat: -1
    });
  }

  // Pulse animation
  static pulse(element, options = {}) {
    return gsap.to(element, {
      scale: options.scale || 1.1,
      duration: options.duration || 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  // Modal/Dialog entrance animation
  static modalIn(backdrop, modal, options = {}) {
    const tl = gsap.timeline();
    
    tl.fromTo(backdrop, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    .fromTo(modal,
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.1"
    );

    return tl;
  }

  // Modal/Dialog exit animation
  static modalOut(backdrop, modal, options = {}) {
    const tl = gsap.timeline();
    
    tl.to(modal,
      { scale: 0.95, opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }
    )
    .to(backdrop,
      { opacity: 0, duration: 0.2 },
      "-=0.1"
    );

    return tl;
  }

  // List item animations (for dynamic lists)
  static listItemEnter(element, index = 0) {
    gsap.fromTo(element,
      { x: -20, opacity: 0, scale: 0.95 },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: index * 0.05
      }
    );
  }

  static listItemExit(element, onComplete) {
    return gsap.to(element, {
      x: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete
    });
  }

  // Page transition animations
  static pageEnter(element) {
    gsap.fromTo(element,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }

  static pageExit(element, onComplete) {
    return gsap.to(element, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete
    });
  }

  // Card animations
  static cardHover(element) {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      y: -4,
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: "power2.out"
    });

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());
    
    return tl;
  }

  // Button press effect
  static buttonPress(element) {
    gsap.to(element, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }

  // Utility function to clean up animations
  static killAll(selector) {
    gsap.killTweensOf(selector);
  }

  // Set animation for entering elements (replaces AnimatePresence)
  static animatePresenceEnter(element, type = 'fade') {
    switch (type) {
      case 'slide':
        this.slideInLeft(element);
        break;
      case 'scale':
        this.scale(element);
        break;
      case 'fade':
      default:
        this.fadeIn(element);
        break;
    }
  }

  // Set animation for exiting elements
  static animatePresenceExit(element, type = 'fade', onComplete) {
    switch (type) {
      case 'slide':
        return gsap.to(element, {
          x: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete
        });
      case 'scale':
        return gsap.to(element, {
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete
        });
      case 'fade':
      default:
        return this.fadeOut(element, { onComplete });
    }
  }
}

// React hook for GSAP animations (alternative to framer-motion hooks)
export const useGSAP = () => {
  return {
    fadeIn: GSAPAnimations.fadeIn,
    fadeOut: GSAPAnimations.fadeOut,
    scale: GSAPAnimations.scale,
    slideInLeft: GSAPAnimations.slideInLeft,
    slideInRight: GSAPAnimations.slideInRight,
    staggerIn: GSAPAnimations.staggerIn,
    addHoverEffect: GSAPAnimations.addHoverEffect,
    modalIn: GSAPAnimations.modalIn,
    modalOut: GSAPAnimations.modalOut,
    listItemEnter: GSAPAnimations.listItemEnter,
    listItemExit: GSAPAnimations.listItemExit,
    pageEnter: GSAPAnimations.pageEnter,
    pageExit: GSAPAnimations.pageExit,
    cardHover: GSAPAnimations.cardHover,
    buttonPress: GSAPAnimations.buttonPress,
    killAll: GSAPAnimations.killAll,
    animatePresenceEnter: GSAPAnimations.animatePresenceEnter,
    animatePresenceExit: GSAPAnimations.animatePresenceExit
  };
};

// Higher-order component for automatic animations
export const withGSAPAnimation = (WrappedComponent, animationType = 'fade') => {
  return function AnimatedComponent(props) {
    const elementRef = useRef(null);

    useEffect(() => {
      if (elementRef.current) {
        GSAPAnimations.animatePresenceEnter(elementRef.current, animationType);
      }
    }, []);

    return React.createElement(WrappedComponent, {
      ...props,
      ref: elementRef
    });
  };
};
