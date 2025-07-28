import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Save, AlertCircle } from 'lucide-react';


export default function StatusIndicator({
  completionStatus,
  totalSections,
  lastSaved,
})) {
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
      <motion.div
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Auto-save Status */}
        <AnimatePresence>
          {showSaved ? (
            <motion.div
              className="flex items-center gap-2 text-green-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-3 h-3" />
              <span className="text-xs">Auto-saved</span>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-2 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Save className="w-3 h-3" />
              <span className="text-xs">
                {lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : 'Auto-saving...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <motion.div
            className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs text-green-800 font-medium">
              🎉 Resume ready for export!
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
