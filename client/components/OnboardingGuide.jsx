import React, { useState, useEffect, useRef } from 'react';
import { GSAPAnimations } from '@/lib/gsapUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  Settings,
  Download,
  Zap,
} from 'lucide-react';


const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to PersonalBuilder v2.0!',
    description: 'PersonalBuilder just got a major upgrade with powerful new features.',
    icon: Sparkles,
    tips: [
      'Drag and drop to reorder sections',
      'Toggle visibility to customize your resume',
      'Create unlimited custom sections',
      'Everything saves automatically',
    ],
  },
  {
    id: 'reorder',
    title: 'Drag & Drop Section Ordering',
    description: 'Easily reorder your resume sections by dragging them up or down.',
    icon: GripVertical,
    tips: [
      'Click and drag the handle (⋮⋮) to reorder',
      'Works on mobile with touch',
      'Use keyboard arrows for accessibility',
      'Changes save instantly',
    ],
  },
  {
    id: 'visibility',
    title: 'Section Visibility Toggles',
    description: 'Show or hide sections without losing your data.',
    icon: Eye,
    tips: [
      'Toggle sections on/off with the switch',
      'Hidden sections appear grayed out',
      'Won\'t appear in PDF exports',
      'Perfect for customizing per job application',
    ],
  },
  {
    id: 'custom',
    title: 'Custom Section Wizard',
    description: 'Create unlimited custom sections with different layouts and field types.',
    icon: Plus,
    tips: [
      'Choose from 4 layout types',
      'Add 11 different field types',
      'Drag to reorder custom fields',
      'Perfect for portfolios, publications, etc.',
    ],
  },
  {
    id: 'tips',
    title: 'Pro Tips',
    description: 'Get the most out of PersonalBuilder.',
    icon: Zap,
    tips: [
      'Use "Settings" button to edit individual sections',
      'Switch between Sections, Edit, and Preview tabs',
      'All changes auto-save to your browser',
      'Export works with all custom sections',
    ],
  },
];


export default function OnboardingGuide({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('enhancedBuilderOnboardingCompleted', 'true');
    onClose();
  };

  const step = ONBOARDING_STEPS[currentStep];
  const IconComponent = step?.icon || Sparkles;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0"
          >
            <X className="w-4 h-4" />
          </Button>
          <DialogTitle className="text-center pr-10">Getting Started Guide</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div>
          <div
            key={currentStep}
            ref={(el) => {
              if (el) {
                GSAPAnimations.slideIn(el, { direction: 'right', duration: 0.3 });
              }
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step Content */}
            <Card className="border-2 border-black/10">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h2>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Tips List */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-left">
                    {step.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-blue-800">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-sm text-gray-500">
                {currentStep + 1} of {ONBOARDING_STEPS.length}
              </span>

              <Button
                onClick={handleNext}
                className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? (
                  <>
                    Get Started
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip Option */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleFinish}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Skip tutorial
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook to show onboarding for new users
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('enhancedBuilderOnboardingCompleted');
    if (!hasSeenOnboarding) {
      // Delay to let the page load first
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, []);

  const closeOnboarding = () => setShowOnboarding(false);

  return { showOnboarding, closeOnboarding };
}
