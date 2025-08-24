import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
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









// Removed the old PrintableResume component - now using shared ResumeTemplate

export default function PDFExportDialog(props) {
  const { isOpen, onClose, personalInfo } = props;
  const printRef = useRef(null);

  const fallbackPrint = React.useCallback(() => {
    // Enhanced fallback method with better mobile/tablet support
    const isMobileTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    const printContent = printRef.current?.innerHTML;
    if (!printContent) {
      alert('Unable to generate PDF content');
      return;
    }

    if (isMobileTablet) {
      // For mobile/tablet: Use direct window.print() with current page
      const originalContent = document.body.innerHTML;
      const printableContent = `
        <html>
          <head>
            <title>${(personalInfo?.name || 'resume').replace(/\s+/g, "_")}_cv</title>
            <style>
              @page { size: A4; margin: 0; }
              @media print {
                body { -webkit-print-color-adjust: exact; color-adjust: exact; font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                * { -webkit-print-color-adjust: exact; color-adjust: exact; }
              }
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `;

      // Temporarily replace page content
      document.body.innerHTML = printContent;

      // Apply print styles
      const style = document.createElement('style');
      style.textContent = `
        @page { size: A4; margin: 0; }
        @media print {
          body { -webkit-print-color-adjust: exact; color-adjust: exact; font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          * { -webkit-print-color-adjust: exact; color-adjust: exact; }
        }
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      `;
      document.head.appendChild(style);

      // Print and restore
      window.print();

      // Restore original content after print dialog
      setTimeout(() => {
        document.body.innerHTML = originalContent;
        document.head.removeChild(style);
        // Re-initialize any necessary scripts/components
        window.location.reload();
      }, 1000);
    } else {
      // For desktop: Use popup window approach
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download the PDF');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${(personalInfo?.name || 'resume').replace(/\s+/g, "_")}_cv</title>
            <style>
              @page { size: A4; margin: 0; }
              @media print {
                body { -webkit-print-color-adjust: exact; color-adjust: exact; }
              }
              body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  }, [personalInfo?.name]);

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${(personalInfo?.name || 'resume').replace(/\s+/g, "_")}_cv`,
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
    console.log('safePrint called', { printRef: printRef.current, name: personalInfo?.name });

    if (!personalInfo || !personalInfo.name) {
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

  if (!personalInfo || !personalInfo.name) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-roboto text-black flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Resume
            </DialogTitle>
            <DialogDescription className="font-roboto text-gray-text">
              Preview your resume before downloading. The PDF will maintain exact formatting and styling.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-roboto font-semibold text-lg text-black flex items-center justify-center gap-2 mb-4">
                  <Eye className="w-5 h-5" />
                  Preview
                </h3>
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

            {/* Action Buttons - Single Download and Close vertically stacked */}
            <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-border">
              <EnhancedButton
                onClick={safePrint}
                className="font-roboto w-full max-w-xs"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </EnhancedButton>
              <Button
                variant="outline"
                onClick={onClose}
                className="font-roboto w-full max-w-xs"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
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
