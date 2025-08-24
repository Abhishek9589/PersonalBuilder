import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import Logo from "@/components/Logo";
import { Menu, X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useLockBodyScroll(isMobileMenuOpen);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="relative z-10">
              <Link to="/" className="group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                  <div className="relative">
                    <Logo size="md" showText={true} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div
                  key={item.path}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`relative group px-6 py-3 font-roboto font-medium transition-all duration-500 rounded-2xl overflow-hidden ${
                      isActive(item.path)
                        ? "text-black"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {/* Circular hover background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>

                    {/* Active/hover border effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                        isActive(item.path)
                          ? "border-black/20 scale-100"
                          : "border-transparent group-hover:border-gray-200 group-hover:scale-100 scale-95"
                      }`}
                    ></div>

                    {/* Background glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700"></div>

                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mobile & Desktop CTA + Hamburger */}
            <div className="flex items-center space-x-3">
              {/* CTA Button */}
              <div className="relative">
                <Link to="/builder">
                  <div className="relative group">
                    {/* Animated background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>

                    <EnhancedButton
                      variant="premium"
                      size="lg"
                      className="relative font-roboto font-semibold px-4 md:px-8 py-3 md:py-4 text-sm md:text-base text-white bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-800 hover:to-black rounded-3xl border border-white/20 shadow-2xl"
                    >
                      <span className="relative z-10 hidden sm:inline">Create Resume</span>
                      <span className="relative z-10 sm:hidden">Create</span>
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </EnhancedButton>
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group touch-target"
                  aria-label="Toggle mobile menu"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700 relative z-10" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700 relative z-10" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 touch-manipulation" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl z-50 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-6 py-4 rounded-2xl font-roboto font-medium transition-all duration-300 touch-target ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-black border-2 border-gray-200"
                          : "text-gray-600 hover:text-black hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 overflow-hidden border-t border-gray-200">
        {/* Background pattern */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-indigo-100/20 to-purple-100/30"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <div className="group flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative">
                    <Logo size="md" showText={true} />
                  </div>
                </div>
              </div>
              <p className="font-roboto text-gray-600 max-w-md leading-relaxed text-base md:text-lg mx-auto md:mx-0">
                Create professional, ATS-friendly resumes that pass through
                applicant tracking systems. Simple, minimal, and effective.
              </p>
              <div className="flex space-x-3 md:space-x-4 justify-center md:justify-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-indigo-200 transition-all duration-300 cursor-pointer group border border-indigo-200 touch-manipulation">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-indigo-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-blue-200 transition-all duration-300 cursor-pointer group border border-blue-200 touch-manipulation">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h3 className="font-roboto font-bold text-lg md:text-xl text-gray-800 mb-4 md:mb-6">
                Features
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "ATS-Friendly Format",
                  "One-Page Layout",
                  "PDF Export",
                  "Free Forever",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 md:space-x-3 group cursor-pointer justify-center md:justify-start touch-manipulation"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                    <span className="font-roboto text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h3 className="font-roboto font-bold text-lg md:text-xl text-gray-800 mb-4 md:mb-6">
                About
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "No Login Required",
                  "Privacy Focused",
                  "Student Friendly",
                  "Professional Quality",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 md:space-x-3 group cursor-pointer justify-center md:justify-start touch-manipulation"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                    <span className="font-roboto text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 md:mt-16 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
              <p className="font-roboto text-gray-600 text-xs md:text-sm">
                © 2025 PersonalBuilder. Free for students and professionals.
              </p>
              <div className="flex justify-center md:justify-end space-x-6 md:space-x-8">
                <Link
                  to="/privacy"
                  className="text-gray-500 text-xs md:text-sm hover:text-gray-800 transition-colors duration-200 touch-manipulation"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-500 text-xs md:text-sm hover:text-gray-800 transition-colors duration-200 touch-manipulation"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
