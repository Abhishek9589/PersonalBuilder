import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import Logo from "@/components/Logo";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      {/* Header */}
      <motion.header
        className="relative backdrop-blur-xl bg-white/70 border-b border-white/20 sticky top-0 z-50 shadow-2xl shadow-black/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="relative z-10"
            >
              <Link to="/" className="group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                  <div className="relative">
                    <Logo size="md" showText={true} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              className="hidden md:flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
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
                </motion.div>
              ))}
            </motion.nav>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="relative"
            >
              <Link to="/builder">
                <div className="relative group">
                  {/* Animated background glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>

                  <EnhancedButton
                    variant="premium"
                    size="lg"
                    className="relative font-roboto font-semibold px-8 py-4 text-white bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-800 hover:to-black rounded-3xl border border-white/20 shadow-2xl"
                  >
                    <span className="relative z-10">Create Resume</span>
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </EnhancedButton>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden mt-20">
        {/* Background pattern */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
          }
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative">
                    <Logo size="md" showText={true} />
                  </div>
                </div>
              </div>
              <p className="font-roboto text-gray-300 max-w-md leading-relaxed text-lg">
                Create professional, ATS-friendly resumes that pass through
                applicant tracking systems. Simple, minimal, and effective.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="w-6 h-6 bg-white/80 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="w-6 h-6 bg-white/80 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-roboto font-bold text-xl text-white mb-6">
                Features
              </h3>
              <ul className="space-y-4">
                {[
                  "ATS-Friendly Format",
                  "One-Page Layout",
                  "PDF Export",
                  "Free Forever",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="font-roboto text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-roboto font-bold text-xl text-white mb-6">
                About
              </h3>
              <ul className="space-y-4">
                {[
                  "No Login Required",
                  "Privacy Focused",
                  "Student Friendly",
                  "Professional Quality",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="font-roboto text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-white/10 mt-16 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-roboto text-gray-400 text-sm">
                © 2024 ATS Resume Builder. Free for students and professionals.
              </p>
              <div className="flex space-x-6">
                <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                  Privacy
                </span>
                <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                  Terms
                </span>
                <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                  Support
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
