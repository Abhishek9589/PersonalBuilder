import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-20"></div>
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {this.props.fallbackMessage || 
                 "We encountered an unexpected error. Don't worry, this happens sometimes."}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    this.setState({ hasError: false, error: null, errorInfo: null });
                    window.location.reload();
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg"
                >
                  Try Again
                </Button>
                <Link to="/">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto px-6 py-2 rounded-lg border-2"
                  >
                    Go Home
                  </Button>
                </Link>
              </div>

              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-100 p-4 rounded-lg mt-6">
                  <summary className="cursor-pointer font-medium text-sm text-gray-700 mb-2">
                    Debug Information
                  </summary>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong>Error:</strong>
                      <pre className="text-red-600 whitespace-pre-wrap mt-1">
                        {this.state.error && this.state.error.toString()}
                      </pre>
                    </div>
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="text-gray-600 whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Higher-order component for wrapping routes
export const withErrorBoundary = (Component, fallbackMessage) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary fallbackMessage={fallbackMessage}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};
