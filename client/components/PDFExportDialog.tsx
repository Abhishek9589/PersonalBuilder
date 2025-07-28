import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Download, X, Eye } from "lucide-react";
import EnhancedResumeTemplate from "@/components/EnhancedResumeTemplate";
import { EnhancedStep, CustomSection } from "@/pages/Builder";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Project {
  id: string;
  name: string;
  techStack: string;
  githubLink: string;
  deployLink: string;
  description: string[];
}

interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  year: string;
  marks: string;
  location: string;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
}

interface Achievement {
  id: string;
  description: string;
}

interface Skills {
  programmingLanguages: string[];
  webTechnologies: string[];
  frameworksLibraries: string[];
  databases: string[];
  toolsPlatforms: string[];
  cloudHosting: string[];
  otherTechnical: string[];
}

interface PDFExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string;
  fontFamily: string;
  fontSize: number;
  marginSize: number;
  enhancedSteps: EnhancedStep[];
  customSections: CustomSection[];
}

// Removed the old PrintableResume component - now using shared ResumeTemplate

export default function PDFExportDialog(props: PDFExportDialogProps) {
  const { isOpen, onClose, personalInfo } = props;
  const printRef = useRef<HTMLDivElement>(null);

  const fallbackPrint = React.useCallback(() => {
    // Fallback method using window.print
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download the PDF');
      return;
    }

    const printContent = printRef.current?.innerHTML;
    if (!printContent) {
      alert('Unable to generate PDF content');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${personalInfo.name.replace(/\s+/g, "_")}_cv</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }, [personalInfo.name]);

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${personalInfo.name.replace(/\s+/g, "_")}_cv`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
    onBeforeGetContent: () => {
      console.log('Getting content for print...', printRef.current);
      // Ensure content is ready before printing
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    },
    onAfterPrint: () => {
      console.log('Print completed');
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
      console.log('Attempting fallback print method...');
      setTimeout(() => fallbackPrint(), 100);
    }
  });

  const safePrint = () => {
    console.log('safePrint called', { printRef: printRef.current, name: personalInfo.name });

    if (!personalInfo.name) {
      alert('Please fill in your name before downloading.');
      return;
    }

    if (!printRef.current) {
      console.error('Print ref not available, using fallback');
      fallbackPrint();
      return;
    }

    try {
      console.log('Calling react-to-print...');
      reactToPrintFn();
    } catch (error) {
      console.error('React-to-print failed, using fallback:', error);
      fallbackPrint();
    }
  };

  // Debug effect to track ref availability
  React.useEffect(() => {
    console.log('PDFExportDialog mounted, printRef:', printRef.current);
    if (isOpen) {
      setTimeout(() => {
        console.log('After delay, printRef:', printRef.current);
      }, 200);
    }
  }, [isOpen]);

  if (!personalInfo.name) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-roboto text-black flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Resume as PDF
            </DialogTitle>
            <DialogDescription className="font-roboto text-gray-text">
              Preview your resume before downloading. The PDF will maintain exact formatting and styling.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-roboto font-semibold text-lg text-black flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </h3>
                <EnhancedButton
                  onClick={safePrint}
                  className="font-roboto"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </EnhancedButton>
              </div>

              {/* Scaled Preview - NO REF */}
              <div className="border border-gray-border rounded-lg p-4 bg-gray-50 overflow-hidden">
                <div
                  className="transform origin-top bg-white shadow-lg mx-auto"
                  style={{
                    scale: "0.5",
                    transformOrigin: "top center"
                  }}
                >
                  <EnhancedResumeTemplate
                    personalInfo={props.personalInfo}
                    summary={props.summary}
                    skills={props.skills}
                    experiences={props.experiences}
                    projects={props.projects}
                    education={props.education}
                    certifications={props.certifications}
                    achievements={props.achievements}
                    interests={props.interests}
                    fontFamily={props.fontFamily}
                    fontSize={props.fontSize}
                    marginSize={props.marginSize}
                    enhancedSteps={props.enhancedSteps}
                    customSections={props.customSections}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-border">
              <Button
                variant="outline"
                onClick={onClose}
                className="font-roboto"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
              <EnhancedButton
                onClick={safePrint}
                className="font-roboto"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </EnhancedButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden Full-Size - WITH REF for printing */}
      <div style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: '210mm',
        height: '297mm',
        overflow: 'hidden'
      }}>
        <EnhancedResumeTemplate
          ref={printRef}
          personalInfo={props.personalInfo}
          summary={props.summary}
          skills={props.skills}
          experiences={props.experiences}
          projects={props.projects}
          education={props.education}
          certifications={props.certifications}
          achievements={props.achievements}
          interests={props.interests}
          fontFamily={props.fontFamily}
          fontSize={props.fontSize}
          marginSize={props.marginSize}
          enhancedSteps={props.enhancedSteps}
          customSections={props.customSections}
        />
      </div>
    </>
  );
}
