import React, { useEffect, useRef } from 'react';
import { GSAPAnimations } from '@/lib/gsapUtils';

const LoadingSpinner = ({ message = "Loading...", fullScreen = false }) => {
  const containerRef = useRef(null);
  const spinnerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      GSAPAnimations.fadeIn(containerRef.current);
    }
    
    if (spinnerRef.current) {
      GSAPAnimations.spinnerAnimation(spinnerRef.current);
    }
  }, []);

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl mx-4 max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <div
            ref={spinnerRef}
            className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
          />
          <p className="font-roboto text-gray-600 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
