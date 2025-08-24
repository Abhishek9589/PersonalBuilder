import React from 'react';
import { cn } from '@/lib/utils';

export function Loader({ className, size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-gray-300 border-t-black',
      sizes[size],
      className
    )} />
  );
}

export function PageLoader({ text = 'Loading...', className }) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-[200px] space-y-4',
      className
    )}>
      <Loader size="lg" />
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );
}

export function FullPageLoader({ text = 'Loading...', className }) {
  return (
    <div className={cn(
      'fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50',
      className
    )}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4">
        <Loader size="xl" />
        <p className="text-gray-800 font-medium text-lg">{text}</p>
      </div>
    </div>
  );
}
