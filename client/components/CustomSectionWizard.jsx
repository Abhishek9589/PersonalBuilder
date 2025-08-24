import React, { useState, useRef, useEffect } from 'react';
import { GSAPAnimations } from '@/lib/gsapUtils';
import { 
  CustomSection, 
  CustomField, 
  FieldType,
} from '@/pages/Builder';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  GripVertical,
  Columns,
  List,
  Calendar,
  Grid3X3,
  Type,
  FileText,
  Mail,
  Link,
  Phone,
  Hash,
  Star,
  Tags,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const LAYOUT_OPTIONS = [
  {
    id: 'single-column' ,
    name: 'Single Column',
    description: 'Simple vertical layout',
    icon: List,
  },
  {
    id: 'two-column' ,
    name: 'Two Column',
    description: 'Side-by-side layout',
    icon: Columns,
  },
  {
    id: 'timeline' ,
    name: 'Timeline',
    description: 'Chronological timeline format',
    icon: Calendar,
  },
  {
    id: 'grid' ,
    name: 'Grid',
    description: 'Flexible grid layout',
    icon: Grid3X3,
  },
];

const SECTION_TEMPLATES = [
  {
    name: 'Certifications',
    description: 'Professional certifications and credentials',
    layout: 'single-column' ,
    fields: [
      { label: 'Certificate Name', type: 'text', required: true },
      { label: 'Issuing Organization', type: 'text', required: true },
      { label: 'Issue Date', type: 'date', required: false },
      { label: 'Expiry Date', type: 'date', required: false },
      { label: 'Certificate URL', type: 'url', required: false },
    ],
  },
  {
    name: 'Languages',
    description: 'Language skills and proficiency levels',
    layout: 'two-column' ,
    fields: [
      { label: 'Language', type: 'text', required: true },
      { label: 'Proficiency Level', type: 'rating', required: true, maxRating: 5 },
    ],
  },
  {
    name: 'Volunteer Work',
    description: 'Volunteer experience and community service',
    layout: 'timeline' ,
    fields: [
      { label: 'Organization', type: 'text', required: true },
      { label: 'Role', type: 'text', required: true },
      { label: 'Start Date', type: 'date', required: true },
      { label: 'End Date', type: 'date', required: false },
      { label: 'Description', type: 'bullets', required: false },
    ],
  },
  {
    name: 'Awards',
    description: 'Recognition and honors received',
    layout: 'single-column' ,
    fields: [
      { label: 'Award Title', type: 'text', required: true },
      { label: 'Awarding Organization', type: 'text', required: true },
      { label: 'Date Received', type: 'date', required: true },
      { label: 'Description', type: 'textarea', required: false },
    ],
  },
  {
    name: 'Publications',
    description: 'Research papers, articles, and publications',
    layout: 'single-column' ,
    fields: [
      { label: 'Title', type: 'text', required: true },
      { label: 'Journal/Conference', type: 'text', required: true },
      { label: 'Publication Date', type: 'date', required: true },
      { label: 'URL/DOI', type: 'url', required: false },
      { label: 'Abstract', type: 'textarea', required: false },
    ],
  },
  {
    name: 'References',
    description: 'Professional references and contacts',
    layout: 'two-column' ,
    fields: [
      { label: 'Reference Name', type: 'text', required: true },
      { label: 'Job Title', type: 'text', required: true },
      { label: 'Company', type: 'text', required: true },
      { label: 'Email', type: 'email', required: false },
      { label: 'Phone', type: 'phone', required: false },
    ],
  },
];

const FIELD_TYPES = [
  { type: 'text', name: 'Text', description: 'Single line text input', icon: Type },
  { type: 'textarea', name: 'Long Text', description: 'Multi-line text area', icon: FileText },
  { type: 'email', name: 'Email', description: 'Email address input', icon: Mail },
  { type: 'url', name: 'URL', description: 'Website or link input', icon: Link },
  { type: 'phone', name: 'Phone', description: 'Phone number input', icon: Phone },
  { type: 'date', name: 'Date', description: 'Date picker input', icon: Calendar },
  { type: 'number', name: 'Number', description: 'Numeric input', icon: Hash },
  { type: 'rating', name: 'Rating', description: 'Star rating system', icon: Star },
  { type: 'tags', name: 'Tags', description: 'Comma-separated tags', icon: Tags },
  { type: 'bullets', name: 'Bullet List', description: 'List of bullet points', icon: List },
];

// Sortable field component

function SortableField({ field, index, onUpdate, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const fieldType = FIELD_TYPES.find(ft => ft.type === field.type);
  const IconComponent = fieldType?.icon || Type;

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <IconComponent className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">{fieldType?.name}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Field Label</Label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate(index, { ...field, label: e.target.value })}
            placeholder="Enter field label"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Placeholder Text</Label>
          <Input
            value={field.placeholder || ''}
            onChange={(e) => onUpdate(index, { ...field, placeholder: e.target.value })}
            placeholder="Placeholder text for this field"
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              checked={field.required}
              onCheckedChange={(checked) => onUpdate(index, { ...field, required: checked })}
            />
            <Label className="text-sm">Required field</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomSectionWizard({
  isOpen,
  onClose,
  onSave,
  editingSection,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [sectionName, setSectionName] = useState('');
  const [layout, setLayout] = useState('single-column');
  const [fields, setFields] = useState([]);
  const [showTemplates, setShowTemplates] = useState(true);

  // Initialize with editing section data
  React.useEffect(() => {
    if (editingSection && isOpen) {
      setSectionName(editingSection.name);
      setLayout(editingSection.layout);
      setFields(editingSection.fields);
      setShowTemplates(false);
      setCurrentStep(1); // Start at field configuration for editing
    } else if (isOpen && !editingSection) {
      resetWizard();
    }
  }, [editingSection, isOpen]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const resetWizard = () => {
    setCurrentStep(0);
    setSectionName('');
    setLayout('single-column');
    setFields([]);
    setShowTemplates(true);
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      label: '',
      type,
      required: false,
      placeholder: '',
    };
    setFields([...fields, newField]);
  };

  const useTemplate = (template) => {
    setSectionName(template.name);
    setLayout(template.layout);
    setFields(template.fields.map((field, index) => ({
      id: `field-${Date.now()}-${index}`,
      ...field,
      placeholder: `Enter ${field.label.toLowerCase()}`,
    })));
    setShowTemplates(false);
    setCurrentStep(1); // Skip to field configuration step
  };

  const startFromScratch = () => {
    setShowTemplates(false);
  };

  const updateField = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex(field => field.id === active.id);
      const newIndex = fields.findIndex(field => field.id === over?.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const handleSave = () => {
    if (!sectionName.trim()) {
      alert('Please enter a section name');
      return;
    }

    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    const section = {
      id: '', // Will be set by parent
      name: sectionName,
      layout,
      fields,
      data: [],
    };

    onSave(section);
    handleClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !showTemplates && layout !== null;
      case 1: return fields.length > 0 && fields.every(f => f.label.trim());
      case 2: return sectionName.trim().length > 0;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Template Selection or Layout Selection
        if (showTemplates) {
          return (
            <div className="space-y-6">
              {/* Template Gallery */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Choose a Template</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start with a pre-built template to save time, or create your own from scratch.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {SECTION_TEMPLATES.map((template) => (
                    <Card
                      key={template.name}
                      className="cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-md"
                      onClick={() => useTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{template.layout.replace('-', ' ')} layout</span>
                          <span>{template.fields.length} fields</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">Or</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={startFromScratch}
                    className="mt-4"
                  >
                    Start from Scratch
                  </Button>
                </div>
              </div>
            </div>
          );
        } else {
          // Layout Selection
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Select Layout</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplates(true)}
                >
                  ← Back to Templates
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LAYOUT_OPTIONS.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      layout === option.id
                        ? 'ring-2 ring-black border-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setLayout(option.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <option.icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                      <h3 className="font-medium text-gray-900 mb-1">{option.name}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        }

      case 1: // Field Configuration
        return (
          <div className="space-y-6">
            {/* Add Field Section */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Add Fields</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {FIELD_TYPES.map((fieldType) => (
                  <Button
                    key={fieldType.type}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-gray-50"
                    onClick={() => addField(fieldType.type)}
                  >
                    <fieldType.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{fieldType.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Field List */}
            {fields.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Field Configuration ({fields.length})
                </h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={fields.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {fields.map((field, index) => (
                        <SortableField
                          key={field.id}
                          field={field}
                          index={index}
                          onUpdate={updateField}
                          onRemove={removeField}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8" />
                </div>
                <p>No fields added yet. Click on a field type above to get started.</p>
              </div>
            )}
          </div>
        );

      case 2: // Name and Confirm
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-md font-medium text-gray-900">Section Name</Label>
              <Input
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Enter a name for your custom section"
                className="mt-2"
              />
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Preview</h3>
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{sectionName || 'Custom Section'}</h4>
                  <div className="text-sm text-gray-600 mb-4">
                    Layout: {layout.charAt(0).toUpperCase() + layout.slice(1).replace('-', ' ')} | 
                    Fields: {fields.length}
                  </div>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <div key={field.id} className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{field.label || `${field.type} field`}</span>
                        {field.required && <span className="text-red-500">*</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [showTemplates ? 'Choose Template' : 'Select Layout', 'Design Fields', 'Name & Confirm'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              {editingSection ? 'Edit Custom Section' : 'Create Custom Section'}
              <span className="text-sm font-normal text-gray-500">
                Step {currentStep + 1} of 3
              </span>
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-6">
          {stepTitles.map((title, index) => (
            <div
              key={title}
              className={`flex-1 ${index > 0 ? 'ml-4' : ''}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`flex-1 h-px ml-4 ${
                      index < currentStep ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {title}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6">
          <div
            key={currentStep}
            ref={(el) => {
              if (el) {
                GSAPAnimations.slideIn(el, { direction: 'right', duration: 0.2 });
              }
            }}
          >
            {renderStepContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || (currentStep === 1 && showTemplates)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>

            {currentStep === 2 ? (
              <Button
                onClick={handleSave}
                disabled={!canProceed()}
                className="bg-black hover:bg-gray-800 text-white px-8 flex items-center gap-2"
              >
                {editingSection ? 'Save Changes' : 'Create Section'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-black hover:bg-gray-800 text-white px-8 flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
