import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: August 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using PersonalBuilder, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Use License
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Permission is granted to temporarily access PersonalBuilder for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Free Service
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  PersonalBuilder is provided as a free service. We reserve the right to modify, suspend, or discontinue the service at any time without notice. We are not liable for any modification, suspension, or discontinuation of the service.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  User Content
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You retain all rights to the resume content you create using PersonalBuilder. We do not claim ownership of your resume content. You are responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The accuracy of the information you provide</li>
                  <li>Ensuring your content does not violate any laws or third-party rights</li>
                  <li>Backing up your resume data as it is stored locally in your browser</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  The materials on PersonalBuilder are provided on an 'as is' basis. PersonalBuilder makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Limitations
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall PersonalBuilder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use PersonalBuilder, even if PersonalBuilder or a PersonalBuilder authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Governing Law
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with applicable law, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section>
                <h2 className="font-roboto font-bold text-2xl text-black mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-roboto font-medium text-black">
                    Email: kushwahaabhishek9981@gmail.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
