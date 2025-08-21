import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';


export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      default:
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Icon */}
            <div className={`w-12 h-12 mx-auto mb-4 ${typeStyles.iconBg} rounded-full flex items-center justify-center`}>
              <AlertTriangle className={`w-6 h-6 ${typeStyles.iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">
              {title}
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 py-2.5 font-medium"
              >
                {cancelText}
              </Button>
              <Button
                onClick={handleConfirm}
                className={`flex-1 py-2.5 font-medium ${typeStyles.confirmButton}`}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
