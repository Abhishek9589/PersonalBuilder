import React, { useState } from 'react';
import { CustomSection, CustomSectionData, CustomField } from '@/pages/Builder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Star, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSectionWizard from './CustomSectionWizard';

interface CustomSectionEditorProps {
  section: CustomSection;
  onUpdateSection: (section: CustomSection) => void;
  onDeleteSection: (sectionId: string) => void;
}

interface FieldInputProps {
  field: CustomField;
  value: any;
  onChange: (value: any) => void;
}

function FieldInput({ field, value, onChange }: FieldInputProps) {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'phone':
        return (
          <Input
            type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
          />
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'rating':
        const maxRating = field.maxRating || 5;
        const currentRating = parseInt(value) || 0;
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: maxRating }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange((i + 1).toString())}
                  className={`text-2xl transition-colors ${
                    i < currentRating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {currentRating}/{maxRating}
            </span>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-2">
            <Input
              value={Array.isArray(value) ? value.join(', ') : (value || '')}
              onChange={(e) => {
                const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                onChange(tags);
              }}
              placeholder={field.placeholder || 'Enter tags separated by commas'}
              className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
            />
            {Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {value.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = value.filter((_, i) => i !== index);
                        onChange(newTags);
                      }}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 'bullets':
        const bullets = Array.isArray(value) ? value : (value ? [value] : ['']);
        return (
          <div className="space-y-2">
            {bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={bullet}
                  onChange={(e) => {
                    const newBullets = [...bullets];
                    newBullets[index] = e.target.value;
                    onChange(newBullets.filter(b => b.trim() !== ''));
                  }}
                  placeholder={field.placeholder || 'Enter bullet point...'}
                  className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newBullets = bullets.filter((_, i) => i !== index);
                    onChange(newBullets.length > 0 ? newBullets : ['']);
                  }}
                  className="text-gray-600 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange([...bullets, ''])}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Bullet Point
            </Button>
          </div>
        );

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="border-gray-border focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-900 flex items-center gap-1">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
}

export default function CustomSectionEditor({
  section,
  onUpdateSection,
  onDeleteSection,
}: CustomSectionEditorProps) {
  const [editingSection, setEditingSection] = useState(false);

  const addEntry = () => {
    const newEntry: CustomSectionData = {};
    section.fields.forEach(field => {
      newEntry[field.id] = field.type === 'tags' ? [] : field.type === 'bullets' ? [''] : '';
    });

    onUpdateSection({
      ...section,
      data: [...section.data, newEntry],
    });
  };

  const updateEntry = (entryIndex: number, fieldId: string, value: any) => {
    const newData = [...section.data];
    newData[entryIndex] = {
      ...newData[entryIndex],
      [fieldId]: value,
    };

    const updatedSection = {
      ...section,
      data: newData,
    };

    console.log('CustomSectionEditor: Updating entry', {
      entryIndex,
      fieldId,
      value,
      updatedSection
    });

    onUpdateSection(updatedSection);
  };

  const removeEntry = (entryIndex: number) => {
    onUpdateSection({
      ...section,
      data: section.data.filter((_, index) => index !== entryIndex),
    });
  };

  const handleEditSection = (updatedSection: Omit<CustomSection, 'id' | 'order'>) => {
    onUpdateSection({
      ...section,
      ...updatedSection,
    });
    setEditingSection(false);
  };

  return (
    <>
      <Card className="border border-gray-border bg-white shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="font-roboto text-black flex items-center gap-2">
              <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
                <span className="text-sm font-bold">
                  {section.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {section.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSection(true)}
              >
                <Settings className="w-4 h-4 mr-1" />
                Edit Section
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addEntry}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Entry
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Layout: {section.layout.charAt(0).toUpperCase() + section.layout.slice(1).replace('-', ' ')} | 
            Fields: {section.fields.length} | 
            Entries: {section.data.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence>
            {section.data.map((entry, entryIndex) => (
              <motion.div
                key={entryIndex}
                className="border border-gray-border rounded-lg p-6 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: entryIndex * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold font-roboto text-black">
                    Entry #{entryIndex + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entryIndex)}
                    className="text-gray-600 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className={`grid gap-4 ${
                  section.layout === 'two-column' ? 'md:grid-cols-2' : 
                  section.layout === 'grid' ? 'md:grid-cols-3' : 
                  'grid-cols-1'
                }`}>
                  {section.fields.map((field) => (
                    <FieldInput
                      key={field.id}
                      field={field}
                      value={entry[field.id]}
                      onChange={(value) => updateEntry(entryIndex, field.id, value)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {section.data.length === 0 && (
            <div className="text-center py-12 text-gray-text">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
              <p className="font-roboto">
                No entries added yet. Click "Add Entry" to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <CustomSectionWizard
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        onSave={handleEditSection}
        editingSection={section}
      />
    </>
  );
}
