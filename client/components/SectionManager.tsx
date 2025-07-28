import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ResumeSection, SectionType, SECTION_ICONS } from '@shared/resume-types';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  User,
  FileText,
  Code,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Trophy,
  Heart,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const iconMap = {
  User,
  FileText,
  Code,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Trophy,
  Heart,
  Settings,
};

interface SortableSectionProps {
  section: ResumeSection;
  isComplete: boolean;
  onToggleVisibility: (sectionId: string, isVisible: boolean) => void;
  onEdit: (sectionId: string) => void;
  children?: React.ReactNode;
}

function SortableSection({
  section,
  isComplete,
  onToggleVisibility,
  onEdit,
  children,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = iconMap[SECTION_ICONS[section.type] as keyof typeof iconMap];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200
        ${!section.isVisible ? 'opacity-60 bg-gray-50' : ''}
        ${isDragging ? 'z-50 shadow-lg scale-105' : 'hover:shadow-md'}
      `}
    >
      <div className="flex items-center p-4 gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
          aria-label={`Drag to reorder ${section.name}`}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* Section Icon */}
        <div className={`flex items-center justify-center w-8 h-8 rounded-md ${
          section.isVisible 
            ? 'bg-black text-white' 
            : 'bg-gray-200 text-gray-400'
        }`}>
          <IconComponent className="w-4 h-4" />
        </div>

        {/* Section Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium truncate ${
              section.isVisible ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {section.name}
            </h3>
            {section.isRequired && (
              <span className="text-xs text-red-500 font-medium">*</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              {isComplete ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <AlertCircle className="w-3 h-3 text-orange-500" />
              )}
              <span className="text-xs text-gray-500">
                {isComplete ? 'Complete' : 'Incomplete'}
              </span>
            </div>
            {!section.isVisible && (
              <div className="flex items-center gap-1">
                <EyeOff className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">Hidden</span>
              </div>
            )}
          </div>
        </div>

        {/* Visibility Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {section.isVisible ? 'Show' : 'Hide'}
            </span>
            <Switch
              checked={section.isVisible}
              onCheckedChange={(checked) => onToggleVisibility(section.id, checked)}
              aria-label={`Toggle visibility for ${section.name}`}
              className="data-[state=checked]:bg-black"
            />
          </div>
        </div>

        {/* Edit Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(section.id)}
          className="text-gray-500 hover:text-gray-700"
          aria-label={`Edit ${section.name}`}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {children && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </motion.div>
  );
}

interface SectionManagerProps {
  sections: ResumeSection[];
  completionStatus: Record<string, boolean>;
  onReorderSections: (newOrder: ResumeSection[]) => void;
  onToggleVisibility: (sectionId: string, isVisible: boolean) => void;
  onEditSection: (sectionId: string) => void;
  onAddCustomSection: () => void;
}

export default function SectionManager({
  sections,
  completionStatus,
  onReorderSections,
  onToggleVisibility,
  onEditSection,
  onAddCustomSection,
}: SectionManagerProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over?.id);

      const newSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index,
      }));

      onReorderSections(newSections);
      
      // Show success toast with debounce
      setTimeout(() => {
        toast.success('Section order updated', {
          description: 'Your resume section order has been saved.',
          duration: 2000,
        });
      }, 100);
    }
  };

  const visibleSections = sections.filter(s => s.isVisible);
  const hiddenSections = sections.filter(s => !s.isVisible);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Resume Sections</h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag to reorder, toggle visibility, or customize each section.
          </p>
        </div>
        <Button
          onClick={onAddCustomSection}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Section
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{sections.length}</div>
              <div className="text-sm text-gray-600">Total Sections</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{visibleSections.length}</div>
              <div className="text-sm text-gray-600">Visible</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Object.values(completionStatus).filter(Boolean).length}
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drag and Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          {/* Visible Sections */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visible Sections ({visibleSections.length})
            </h3>
            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <AnimatePresence>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      isComplete={completionStatus[section.id] || false}
                      onToggleVisibility={onToggleVisibility}
                      onEdit={onEditSection}
                    />
                  ))}
                </div>
              </AnimatePresence>
            </SortableContext>
          </div>
        </div>
      </DndContext>

      {/* Help Text */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Tips</h4>
            <ul className="text-sm text-blue-800 mt-1 space-y-1">
              <li>• Drag sections by the handle (⋮⋮) to reorder them</li>
              <li>• Toggle visibility to hide sections from your resume without deleting data</li>
              <li>• Required sections (*) must remain visible</li>
              <li>• Changes are saved automatically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
