/**
 * Mobile viewport height utility to handle browser UI
 * This sets a CSS custom property that accurately reflects the viewport height
 * accounting for mobile browser UI elements that can appear/disappear
 */

let viewportHeight = 0;

function setViewportHeight() {
  // Get the actual viewport height
  const vh = window.innerHeight * 0.01;
  
  // Set the CSS custom property to the root element
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  viewportHeight = window.innerHeight;
}

function handleResize() {
  // Only update if the height actually changed significantly
  // This prevents unnecessary updates during horizontal orientation changes
  const currentHeight = window.innerHeight;
  if (Math.abs(currentHeight - viewportHeight) > 50) {
    setViewportHeight();
  }
}

function initViewportHeight() {
  // Set initial height
  setViewportHeight();
  
  // Update on resize and orientation change
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', () => {
    // Small delay to ensure the viewport has updated after orientation change
    setTimeout(setViewportHeight, 100);
  });
}

// Auto-initialize on mobile devices
if (typeof window !== 'undefined' && window.innerWidth <= 768) {
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(initViewportHeight);
}

export { initViewportHeight, setViewportHeight };
