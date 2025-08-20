import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import NotificationTest from "@/components/NotificationTest";

export default function Index() {
  const features = [
    {
      title: "ATS-Friendly Format",
      description:
        "Optimized for applicant tracking systems used by 99% of companies.",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "One-Page Layout",
      description:
        "Auto-adjusts font size and spacing to fit everything on one page.",
      icon: "📄",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "PDF Export",
      description:
        "Download pixel-perfect PDF resumes ready for job applications.",
      icon: "⬇️",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Real-time Recommendations",
      description:
        "Get ATS score and suggestions to improve your resume while you build.",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "No Login Required",
      description:
        "Start building immediately without creating accounts or subscriptions.",
      icon: "🚀",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Free Forever",
      description:
        "Completely free for students and professionals. No hidden costs.",
      icon: "💎",
      color: "from-pink-500 to-red-500",
    },
  ];

  const sections = [
    "Header (Name, Contact, Links)",
    "Professional Summary",
    "Skills (Categorized)",
    "Work Experience",
    "Projects with GitHub Links",
    "Education",
    "Certifications",
    "Achievements",
    "Interests",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                <span className="bg-gradient-to-r from-gray-900 via-black to-gray-700 bg-clip-text text-transparent">
                  ATS-Friendly
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Resume Builder
                </span>
              </h1>

              <motion.h2
                className="text-2xl sm:text-3xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Create professional resumes that pass applicant tracking systems
              </motion.h2>

              <motion.p
                className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Simple, minimal, and effective. Build one-page resumes optimized
                for ATS systems. Free for students and professionals. No login
                required.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/builder">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
                  <EnhancedButton
                    size="lg"
                    variant="premium"
                    className="relative text-xl px-16 py-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl border border-white/20"
                  >
                    Resume Builder ✨
                  </EnhancedButton>
                </div>
              </Link>
              <Link to="/templates">
                <EnhancedButton
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-6 rounded-3xl border-2 border-gray-300 hover:border-gray-500"
                >
                  View Templates
                </EnhancedButton>
              </Link>
            </motion.div>

            {/* Sample Resume Preview */}
            <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20"></div>

                {/* Resume preview card */}
                <div className="relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
                  <div className="space-y-6 text-left">
                    <div className="text-center border-b border-gray-200 pb-6">
                      <h3 className="font-bold text-2xl text-black mb-3">
                        JOHN DOE
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p>john@email.com | (555) 123-4567</p>
                        <p>LinkedIn: /in/johndoe | New York, NY</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-lg text-black mb-3 flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          SUMMARY
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          Software engineer with 3+ years of experience in
                          full-stack development...
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg text-black mb-3 flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                          SKILLS
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          <p>
                            <strong>Languages:</strong> JavaScript, Python, Java
                          </p>
                          <p>
                            <strong>Frameworks:</strong> React, Node.js, Express
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h4 className="font-bold text-lg text-black mb-3 flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          EXPERIENCE
                        </h4>
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-black">
                              Software Engineer
                            </h5>
                            <span className="text-gray-500 text-sm">
                              2021 - Present
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">Tech Company</p>
                          <ul className="text-gray-700 space-y-1">
                            <li className="flex items-start">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Built responsive web applications serving 10k+
                              users
                            </li>
                            <li className="flex items-start">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Improved application performance by 40%
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-2xl">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-green-800">
                        ATS-Optimized Format
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
                Why Choose Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resume Builder?
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Designed specifically for students and professionals who need
              ATS-friendly resumes without complicated features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Background glow */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}
                  ></div>

                  {/* Card */}
                  <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="space-y-6">
                      {/* Icon */}
                      <div className="relative">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {feature.icon}
                        </div>
                        <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-bold text-xl text-black mb-4 group-hover:text-gray-900 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Included */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
                  Resume Sections
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Included
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                All essential sections you need for a complete professional
                resume
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>

                    {/* Card */}
                    <div className="relative flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                        <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <span className="font-semibold text-black text-lg group-hover:text-gray-900 transition-colors duration-300">
                        {section}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-gray-800 relative overflow-hidden border-t border-gray-200">
        {/* Background effects */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        ></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight text-gray-800">
              Ready to Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Dream Resume
              </span>
              ?
            </h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Start building your ATS-friendly resume now. No signup required.
              Completely free for students and professionals.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/builder">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
                  <EnhancedButton
                    size="lg"
                    className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl px-16 py-6 rounded-3xl border border-indigo-200 shadow-2xl"
                  >
                    Start Building Resume
                  </EnhancedButton>
                </div>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-8 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                "No login required",
                "Free forever",
                "ATS-optimized",
                "Privacy focused",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 group cursor-pointer"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Notification Test Section - Temporary for demonstration */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔔 Notification System Demo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Test the new unified notification system that shows all notifications in the bottom-right corner with beautiful animations and proper styling.
            </p>
          </div>
          <NotificationTest />
        </div>
      </section>
    </Layout>
  );
}
