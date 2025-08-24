import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Share, FileDown, Smartphone } from "lucide-react";
import EnhancedResumeTemplate from "@/components/EnhancedResumeTemplate";
import { isMobileOrTablet } from "@/lib/deviceDetection";

export default function PDFView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Get resume data from URL params or localStorage
  useEffect(() => {
    try {
      // First try to get data from URL params (for fresh data)
      const dataParam = searchParams.get('data');
      if (dataParam) {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setResumeData(decodedData);
        setIsLoading(false);
        // Check if this is a mobile redirect and show welcome message
        const isMobileTablet = isMobileOrTablet();
        setIsMobileDevice(isMobileTablet);
        if (isMobileTablet) {
          setShowWelcomeMessage(true);
          toast.success('✨ Mobile PDF preview ready!', {
            description: 'Your resume is optimized for mobile viewing and download',
            duration: 3000,
          });
        }
        // Add fade in effect after data loads
        setTimeout(() => setFadeIn(true), 100);
        return;
      }

      // Fallback to localStorage
      const savedPersonalInfo = localStorage.getItem('personalInfo');
      const savedSummary = localStorage.getItem('summary');
      const savedSkills = localStorage.getItem('skills');
      const savedExperiences = localStorage.getItem('experiences');
      const savedProjects = localStorage.getItem('projects');
      const savedEducation = localStorage.getItem('education');
      const savedCertifications = localStorage.getItem('certifications');
      const savedAchievements = localStorage.getItem('achievements');
      const savedInterests = localStorage.getItem('interests');
      const savedEnhancedSteps = localStorage.getItem('enhancedSteps');
      const savedCustomSections = localStorage.getItem('customSections');
      const savedFontFamily = localStorage.getItem('fontFamily');
      const savedFontSize = localStorage.getItem('fontSize');
      const savedMarginSize = localStorage.getItem('marginSize');

      if (savedPersonalInfo) {
        setResumeData({
          personalInfo: JSON.parse(savedPersonalInfo),
          summary: savedSummary || "",
          skills: savedSkills ? JSON.parse(savedSkills) : {},
          experiences: savedExperiences ? JSON.parse(savedExperiences) : [],
          projects: savedProjects ? JSON.parse(savedProjects) : [],
          education: savedEducation ? JSON.parse(savedEducation) : [],
          certifications: savedCertifications ? JSON.parse(savedCertifications) : [],
          achievements: savedAchievements ? JSON.parse(savedAchievements) : [],
          interests: savedInterests || "",
          enhancedSteps: savedEnhancedSteps ? JSON.parse(savedEnhancedSteps) : [],
          customSections: savedCustomSections ? JSON.parse(savedCustomSections) : [],
          fontFamily: savedFontFamily || "Roboto",
          fontSize: savedFontSize ? parseInt(savedFontSize) : 12,
          marginSize: savedMarginSize ? parseInt(savedMarginSize) : 24,
        });
        // Check if this is a mobile device for welcome message
        const isMobileTablet = isMobileOrTablet();
        setIsMobileDevice(isMobileTablet);
        if (isMobileTablet) {
          setShowWelcomeMessage(true);
        }
        // Add fade in effect after data loads
        setTimeout(() => setFadeIn(true), 100);
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    } finally {
      setIsLoading(false);
      // Add fade in effect even if no data found
      setTimeout(() => setFadeIn(true), 100);
    }
  }, [searchParams]);

  // Handle browser back button
  const handleBack = () => {
    navigate('/builder');
  };

  // Handle print/download
  const handlePrint = () => {
    window.print();
  };

  // Handle share (for mobile)
  const handleShare = async () => {
    if (navigator.share && resumeData?.personalInfo?.name) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.name} - Resume`,
          text: 'Check out my resume',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
        handlePrint(); // Fallback to print
      }
    } else {
      handlePrint(); // Fallback to print
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
          <p className="text-sm text-gray-400 mt-2">Preparing PDF preview...</p>
        </div>
      </div>
    );
  }

  if (!resumeData || !resumeData.personalInfo?.name) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Resume Not Found</h1>
          <p className="text-gray-600 mb-6">
            No resume data found. Please return to the builder and try again.
          </p>
          <Button onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-container {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            max-width: none !important;
          }

          .resume-content {
            padding: 0 !important;
            margin: 0 !important;
          }

          @page {
            size: A4;
            margin: 0;
          }
        }

        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}</style>

      <div className={`min-h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${
        isMobileDevice ? 'bg-white' : 'bg-gray-50'
      }`}>
        {/* Header - Hidden in print */}
        <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Builder</span>
                </Button>
                <div>
                  <h1 className="font-semibold text-gray-800">
                    {resumeData.personalInfo.name} - Resume
                  </h1>
                  <p className="text-sm text-gray-500">
                    Ready for download
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Share button for mobile */}
                {navigator.share && (
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 md:hidden"
                  >
                    <Share className="w-4 h-4" />
                    Share
                  </Button>
                )}
                
                {/* Download/Print button */}
                <Button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message for Mobile Users - Hidden in print */}
        {showWelcomeMessage && (
          <div className="no-print md:hidden bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    ✨ Mobile-Optimized PDF Preview
                  </p>
                  <p className="text-xs text-green-800">
                    Your resume has been prepared for easy mobile download. Scroll down to review and tap "Download PDF" when ready.
                  </p>
                  <button
                    onClick={() => setShowWelcomeMessage(false)}
                    className="text-xs text-green-600 hover:text-green-800 mt-1 underline"
                  >
                    Got it, hide this message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Instructions - Hidden in print */}
        <div className="no-print md:hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <FileDown className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  📱 Mobile PDF Download
                </p>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>• Tap "Download PDF" button below</p>
                  <p>• Select "Save as PDF" or "Print to PDF"</p>
                  <p>• Choose your download location</p>
                </div>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  ✨ Your resume is ready to download!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className={`${isMobileDevice ? 'w-full p-0' : 'max-w-4xl mx-auto p-4 md:p-8'}`}>
          <div className={`resume-container bg-white ${
            isMobileDevice
              ? 'shadow-none rounded-none'
              : 'shadow-lg rounded-lg md:rounded-xl transform transition-transform duration-300 hover:scale-[1.005]'
          } overflow-hidden`}>
            <div className={`resume-content ${isMobileDevice ? 'p-0' : 'p-6 md:p-8'}`}>
              <EnhancedResumeTemplate
                personalInfo={resumeData.personalInfo}
                summary={resumeData.summary}
                skills={resumeData.skills}
                experiences={resumeData.experiences}
                projects={resumeData.projects}
                education={resumeData.education}
                certifications={resumeData.certifications}
                achievements={resumeData.achievements}
                interests={resumeData.interests}
                fontFamily={resumeData.fontFamily}
                fontSize={resumeData.fontSize}
                marginSize={resumeData.marginSize}
                enhancedSteps={resumeData.enhancedSteps}
                customSections={resumeData.customSections}
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA for mobile - Hidden in print */}
        <div className="no-print md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <Button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 h-12 text-base font-semibold rounded-lg shadow-lg transform active:scale-95 transition-all duration-150"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Perfect formatting • {resumeData?.personalInfo?.name || 'Your'} Resume
            </p>
          </div>
        </div>

        {/* Spacer for mobile fixed button */}
        <div className="no-print md:hidden h-24"></div>
      </div>
    </>
  );
}
