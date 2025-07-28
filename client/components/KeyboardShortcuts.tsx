import React, { useEffect } from 'react';
import { toast } from 'sonner';

interface KeyboardShortcutsProps {
  onTogglePreview: () => void;
  onToggleSections: () => void;
  onShowHelp: () => void;
  onDownload: () => void;
  currentView: string;
}

export default function KeyboardShortcuts({
  onTogglePreview,
  onToggleSections,
  onShowHelp,
  onDownload,
  currentView,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
            toast.info('Switched to preview mode', { duration: 1500 });
            break;
          case 's':
            event.preventDefault();
            onToggleSections();
            toast.info('Switched to sections mode', { duration: 1500 });
            break;
          case 'd':
            event.preventDefault();
            onDownload();
            toast.info('Downloading resume...', { duration: 1500 });
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
            toast.info('Returned to sections', { duration: 1500 });
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
