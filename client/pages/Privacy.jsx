import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-roboto">Back to Home</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-roboto font-bold text-3xl md:text-4xl text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: August 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Information We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PersonalBuilder is designed with privacy in mind. We collect minimal information to provide our resume building service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Resume content you create (stored locally in your browser)</li>
                  <li>Basic usage analytics to improve our service</li>
                  <li>Contact information only when you reach out to us</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your resume data is stored locally in your browser and never uploaded to our servers unless you explicitly choose to save or export it. We use collected information to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and maintain our resume building service</li>
                  <li>Improve user experience and fix technical issues</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze usage patterns to enhance our features</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Data Storage and Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your resume content is stored locally in your browser's storage. This means your personal information never leaves your device unless you explicitly export or share your resume. We implement appropriate security measures to protect any data we do collect.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Cookies and Tracking
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use minimal cookies and local storage to enhance your experience and remember your preferences. We do not use tracking cookies for advertising purposes.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may use third-party services for analytics and hosting. These services have their own privacy policies and data handling practices.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access and control your data stored locally</li>
                  <li>Delete your data at any time by clearing your browser storage</li>
                  <li>Contact us with any privacy concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-roboto font-medium text-black">
                    Email: kushwahaabhishek9981@gmail.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
