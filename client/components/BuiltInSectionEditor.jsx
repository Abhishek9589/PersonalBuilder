import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Plus, X, User, FileText, Code, Briefcase, FolderOpen, GraduationCap, Award, Trophy, Heart, Palette } from 'lucide-react';
import { ResumeData, SectionType } from '@shared/resume-types';


const sectionIcons = {
  personalInfo: User,
  summary: FileText,
  skills: Code,
  experience: Briefcase,
  projects: FolderOpen,
  education: GraduationCap,
  certifications: Award,
  achievements: Trophy,
  interests: Heart,
  custom: Palette,
};

export default function BuiltInSectionEditor({
  sectionType,
  sectionName,
  resumeData,
  onUpdateData,
  onBack,
})) {
  const IconComponent = sectionIcons[sectionType] || User;

  const renderSectionEditor = () => {
    switch (sectionType) {
      case 'personalInfo':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-roboto text-black font-medium">Full Name *</Label>
                <Input
                  value={resumeData.personalInfo.name}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label className="font-roboto text-black font-medium">Phone Number *</Label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label className="font-roboto text-black font-medium">Email *</Label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label className="font-roboto text-black font-medium">LinkedIn</Label>
                <Input
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div>
                <Label className="font-roboto text-black font-medium">GitHub</Label>
                <Input
                  value={resumeData.personalInfo.github}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, github: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="github.com/username"
                />
              </div>
              <div>
                <Label className="font-roboto text-black font-medium">Portfolio</Label>
                <Input
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) => onUpdateData({
                    personalInfo: { ...resumeData.personalInfo, portfolio: e.target.value }
                  })}
                  className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                  placeholder="yourportfolio.com"
                />
              </div>
            </div>
            <div>
              <Label className="font-roboto text-black font-medium">Address *</Label>
              <Input
                value={resumeData.personalInfo.address}
                onChange={(e) => onUpdateData({
                  personalInfo: { ...resumeData.personalInfo, address: e.target.value }
                })}
                className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
                placeholder="City, State - Postal Code, Country"
              />
            </div>
          </div>
        );

      case 'summary':
        return (
          <div>
            <Label className="font-roboto text-black font-medium">Professional Summary *</Label>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => onUpdateData({ summary: e.target.value })}
              className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
              rows={4}
              placeholder="Write a brief professional summary highlighting your key skills and experience..."
            />
            <p className="text-xs text-gray-500 mt-2">
              {resumeData.summary.length} characters
            </p>
          </div>
        );

      case 'interests':
        return (
          <div>
            <Label className="font-roboto text-black font-medium">Interests</Label>
            <Textarea
              value={resumeData.interests}
              onChange={(e) => onUpdateData({ interests: e.target.value })}
              className="border-gray-border font-roboto mt-1 focus:ring-2 focus:ring-black focus:border-transparent rounded-xl"
              rows={3}
              placeholder="List your hobbies, interests, or relevant activities..."
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <IconComponent className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Section Editor</h3>
            <p className="text-gray-600 mb-4">
              Advanced editing for {sectionName} is coming soon.
            </p>
            <p className="text-sm text-gray-500">
              For now, you can use the classic builder to edit this section.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="border border-gray-border bg-white shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="font-roboto text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
              <IconComponent className="w-4 h-4" />
            </div>
            Edit {sectionName}
          </CardTitle>
          <Button
            variant="outline"
            onClick={onBack}
            className="text-gray-600 hover:text-black"
          >
            ← Back to Sections
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSectionEditor()}
        </motion.div>
      </CardContent>
    </Card>
  );
}
