import { useEffect, useRef } from 'react';

/**
 * Custom hook to lock body scroll for mobile overlays
 * Provides cross-browser compatible scroll locking without position:fixed glitches
 */
export function useLockBodyScroll(lock = false) {
  const originalStyleRef = useRef({});
  const lockCountRef = useRef(0);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (lock) {
      // Increment lock count to handle multiple overlays
      lockCountRef.current += 1;
      
      // Only apply lock on first lock request
      if (lockCountRef.current === 1) {
        // Store original styles
        originalStyleRef.current = {
          bodyOverflow: body.style.overflow,
          htmlOverflow: html.style.overflow,
          bodyPaddingRight: body.style.paddingRight,
          bodyPosition: body.style.position,
          bodyTop: body.style.top,
          bodyWidth: body.style.width
        };

        // Calculate scrollbar width to prevent layout shift
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Apply scroll lock styles - using overflow hidden instead of position fixed
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        
        // Compensate for scrollbar disappearance to prevent layout shift
        if (scrollBarWidth > 0) {
          body.style.paddingRight = `${scrollBarWidth}px`;
        }
        
        // Additional mobile-specific fixes to prevent glitches
        body.style.touchAction = 'none';
        body.style.webkitOverflowScrolling = 'auto';
      }
    }

    // Cleanup function
    return () => {
      if (lock) {
        // Decrement lock count
        lockCountRef.current = Math.max(0, lockCountRef.current - 1);
        
        // Only restore when no more locks
        if (lockCountRef.current === 0) {
          // Restore original styles safely
          body.style.overflow = originalStyleRef.current.bodyOverflow || '';
          html.style.overflow = originalStyleRef.current.htmlOverflow || '';
          body.style.paddingRight = originalStyleRef.current.bodyPaddingRight || '';
          body.style.position = originalStyleRef.current.bodyPosition || '';
          body.style.top = originalStyleRef.current.bodyTop || '';
          body.style.width = originalStyleRef.current.bodyWidth || '';
          
          // Reset mobile-specific properties
          body.style.touchAction = '';
          body.style.webkitOverflowScrolling = '';
        }
      }
    };
  }, [lock]);
}

export default useLockBodyScroll;
