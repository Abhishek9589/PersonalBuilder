import React, { useEffect } from 'react';
import notifications from '@/lib/notifications';

export default function KeyboardShortcuts({
  onTogglePreview,
  onToggleSections,
  onShowHelp,
  onDownload,
  currentView,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only trigger shortcuts if not typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Cmd/Ctrl + key combinations
      if (event.metaKey || event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case 'p':
            event.preventDefault();
            onTogglePreview();
            notifications.shortcuts.preview();
            break;
          case 's':
            event.preventDefault();
            onToggleSections();
            notifications.shortcuts.sections();
            break;
          case 'd':
            event.preventDefault();
            onDownload();
            notifications.shortcuts.download();
            break;
          case '/':
          case '?':
            event.preventDefault();
            onShowHelp();
            break;
        }
      }

      // Single key shortcuts
      switch (event.key.toLowerCase()) {
        case 'escape':
          if (currentView !== 'sections') {
            onToggleSections();
            notifications.shortcuts.returned();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePreview, onToggleSections, onShowHelp, onDownload, currentView]);

  return null; // This component only handles events
}

// Keyboard shortcuts help dialog
export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl/Cmd + P', description: 'Toggle preview mode' },
  { key: 'Ctrl/Cmd + S', description: 'Go to sections view' },
  { key: 'Ctrl/Cmd + D', description: 'Download PDF' },
  { key: 'Escape', description: 'Return to sections' },
  { key: 'Ctrl/Cmd + ?', description: 'Show this help' },
];
