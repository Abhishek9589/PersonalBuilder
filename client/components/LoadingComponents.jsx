import React from "react";

// Main page loading skeleton
export const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 animate-pulse">
    {/* Header skeleton */}
    <div className="sticky top-0 bg-white/70 border-b border-white/20 h-20 flex justify-between items-center px-8">
      <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
      <div className="flex space-x-4">
        <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-300 rounded-3xl"></div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero section skeleton */}
      <div className="text-center space-y-6 py-16">
        <div className="h-16 w-3/4 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="h-8 w-1/2 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="flex justify-center space-x-4 mt-8">
          <div className="h-12 w-40 bg-gray-300 rounded-3xl"></div>
          <div className="h-12 w-32 bg-gray-200 rounded-3xl"></div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="h-16 w-16 bg-gray-200 rounded-2xl mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Simple loading spinner for quick transitions
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

// Centered loading with backdrop
export const CenteredLoading = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center space-y-4">
      <LoadingSpinner size="xl" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

// Inline loading for content areas
export const InlineLoading = ({ className = "" }) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <div className="text-center space-y-3">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-gray-500">Loading content...</p>
    </div>
  </div>
);

// Minimal loading bar for quick transitions
export const LoadingBar = () => (
  <div className="fixed top-0 left-0 right-0 z-50">
    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
  </div>
);

// Form loading overlay
export const FormLoading = () => (
  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
    <div className="text-center space-y-2">
      <LoadingSpinner size="md" />
      <p className="text-sm text-gray-600">Processing...</p>
    </div>
  </div>
);
