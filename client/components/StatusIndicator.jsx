import React, { useState, useEffect } from 'react';
import { Check, Clock, Save, AlertCircle } from 'lucide-react';


export default function StatusIndicator({
  completionStatus,
  totalSections,
  lastSaved,
}) {
  const [showSaved, setShowSaved] = useState(false);

  const completedSections = Object.values(completionStatus).filter(Boolean).length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  // Show "saved" indicator briefly when lastSaved changes
  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true);
      const timeout = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [lastSaved]);

  const getStatusColor = () => {
    if (completionPercentage >= 80) return 'text-green-600';
    if (completionPercentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = () => {
    if (completionPercentage >= 80) return Check;
    if (completionPercentage >= 50) return Clock;
    return AlertCircle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
        {/* Completion Status */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${getStatusColor()}`} />
            <span className="text-sm font-medium text-gray-900">
              {completedSections}/{totalSections} sections
            </span>
          </div>
          <span className={`text-xs font-bold ${getStatusColor()}`}>
            {completionPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Auto-save Status */}
        {showSaved ? (
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-3 h-3" />
            <span className="text-xs">Auto-saved</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <Save className="w-3 h-3" />
            <span className="text-xs">
              {lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : 'Auto-saving...'}
            </span>
          </div>
        )}

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-center">
            <span className="text-xs text-green-800 font-medium">
              🎉 Resume ready for export!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
