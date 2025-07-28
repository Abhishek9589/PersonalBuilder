import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KEYBOARD_SHORTCUTS } from './KeyboardShortcuts';
import {
  Keyboard,
  GripVertical,
  Eye,
  Plus,
  Settings,
  Download,
  HelpCircle,
} from 'lucide-react';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  const features = [
    {
      icon: GripVertical,
      title: 'Drag & Drop Reordering',
      description: 'Click and drag the handle (⋮⋮) to reorder sections. Works on mobile with touch.',
    },
    {
      icon: Eye,
      title: 'Visibility Toggles',
      description: 'Use the toggle switch to show/hide sections without losing data. Hidden sections won\'t appear in exports.',
    },
    {
      icon: Plus,
      title: 'Custom Sections',
      description: 'Create unlimited custom sections with different layouts and 11 field types.',
    },
    {
      icon: Settings,
      title: 'Section Editing',
      description: 'Click the settings icon to edit individual sections or use the Edit tab.',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Download includes all visible sections and custom sections in the correct order.',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Help & Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Features Guide */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features Guide</h3>
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </h3>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-900">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• All changes auto-save to your browser</li>
                  <li>• Use different layouts for different job applications</li>
                  <li>• Hidden sections are perfect for optional content</li>
                  <li>• Custom sections can include portfolios, publications, etc.</li>
                  <li>• Export includes all visible sections in the correct order</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Storage */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-amber-900">💾 Data Storage</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-amber-800">
                  Your resume data is stored locally in your browser. To backup your data, 
                  consider bookmarking this page and regularly downloading your resume.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
