import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import {
  Target,
  Users,
  Zap,
  Shield,
  CheckCircle,
  Heart,
  Award,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: Target,
      title: "ATS-Optimized",
      description:
        "Built specifically to pass Applicant Tracking Systems used by 99% of companies.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Student Friendly",
      description:
        "Perfect for students, fresh graduates, and career changers with minimal experience.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Build professional resumes in under 10 minutes with our intuitive step-by-step process.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "No account required. Your data stays local on your device. We don't store anything.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Resumes Created", icon: CheckCircle },
    { number: "95%", label: "ATS Pass Rate", icon: TrendingUp },
    { number: "< 5min", label: "Average Build Time", icon: Clock },
    { number: "100%", label: "Free Forever", icon: Heart },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-700 bg-clip-text text-transparent mb-6">
                About Our Mission
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
                Empowering students and professionals to create
                <span className="font-semibold text-black">
                  {" "}
                  ATS-friendly resumes
                </span>{" "}
                that actually get noticed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/builder">
                <EnhancedButton
                  size="lg"
                  variant="premium"
                  className="px-8 py-4 text-lg"
                >
                  Start Building Now
                </EnhancedButton>
              </Link>
              <Link to="/templates">
                <EnhancedButton
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg"
                >
                  View Templates
                </EnhancedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-3xl font-bold text-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Why We Built This
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              We saw too many qualified candidates getting rejected by ATS
              systems. Our mission is to level the playing field with completely
              free, optimized resume templates.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                      }}
                    ></div>
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-100 via-white to-gray-100 text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">
              Ready to Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Dream Resume
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of successful job seekers who landed their dream
              jobs with our ATS-optimized resume builder.
            </p>
            <Link to="/builder">
              <EnhancedButton
                size="lg"
                className="bg-black hover:bg-gray-800 text-white text-lg px-12 py-4"
              >
                Start Building for Free
              </EnhancedButton>
            </Link>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                ✓ No signup required • ✓ Free forever • ✓ ATS-optimized • ✓
                Privacy focused
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
