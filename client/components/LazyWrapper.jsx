import React, { Suspense, memo } from 'react';
import { PageLoader } from '@/components/ui/loader';

// HOC for lazy loading components with loading state
export const withLazyLoading = (Component, loadingText = 'Loading component...') => {
  const LazyComponent = memo((props) => (
    <Suspense fallback={<PageLoader text={loadingText} />}>
      <Component {...props} />
    </Suspense>
  ));
  
  LazyComponent.displayName = `LazyLoaded(${Component.displayName || Component.name})`;
  return LazyComponent;
};

// Wrapper for heavy components that might cause layout shifts
export const OptimizedWrapper = memo(({ children, className = '', ...props }) => (
  <div 
    className={`optimize-repaint ${className}`} 
    {...props}
  >
    {children}
  </div>
));

OptimizedWrapper.displayName = 'OptimizedWrapper';

// Debounced wrapper for inputs that cause frequent re-renders
export const DebouncedInput = memo(({ value, onChange, delay = 300, ...props }) => {
  const [localValue, setLocalValue] = React.useState(value);
  const timeoutRef = React.useRef();

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = React.useCallback((e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(e);
    }, delay);
  }, [onChange, delay]);

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <input
      {...props}
      value={localValue}
      onChange={handleChange}
    />
  );
});

DebouncedInput.displayName = 'DebouncedInput';
