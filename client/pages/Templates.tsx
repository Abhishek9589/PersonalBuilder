import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import {
  Eye,
  Download,
  Copy,
  Star,
  CheckCircle,
  Code,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Templates() {
  const templates = [
    {
      id: 1,
      name: "Software Engineer Template",
      description: "Perfect for developers and tech professionals",
      category: "Tech",
      rating: 5,
      downloads: "12.5K",
      features: ["ATS-Optimized", "Tech-Focused", "Project Showcase"],
      preview: {
        name: "ALEX CHEN",
        email: "alex.chen@email.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/alexchen",
        github: "github.com/alexchen",
        portfolio: "alexchen.dev",
        summary:
          "Full-Stack Software Engineer with 4+ years of experience building scalable web applications. Passionate about clean code, performance optimization, and user experience. Led development of applications serving 100K+ users.",
        skills: {
          "Programming Languages": [
            "JavaScript (ES6+)",
            "TypeScript",
            "Python",
            "Java",
            "Go",
          ],
          "Frontend Technologies": [
            "React",
            "Next.js",
            "Vue.js",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
          ],
          "Backend Technologies": [
            "Node.js",
            "Express.js",
            "Django",
            "PostgreSQL",
            "MongoDB",
          ],
          "Cloud & DevOps": [
            "AWS (EC2, S3, RDS)",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "Git",
          ],
        },
        experience: [
          {
            position: "Senior Software Engineer",
            company: "TechCorp Inc.",
            duration: "2022 - Present",
            achievements: [
              "Led development of microservices architecture serving 100K+ daily active users",
              "Improved application performance by 45% through code optimization and caching strategies",
              "Mentored 3 junior developers and established code review best practices",
            ],
          },
          {
            position: "Software Engineer",
            company: "StartupXYZ",
            duration: "2020 - 2022",
            achievements: [
              "Built responsive web applications using React and Node.js",
              "Implemented automated testing increasing code coverage from 60% to 95%",
              "Collaborated with product team to deliver features ahead of schedule",
            ],
          },
        ],
        projects: [
          {
            name: "E-Commerce Platform",
            tech: "React, Node.js, PostgreSQL, AWS",
            github: "github.com/alexchen/ecommerce-platform",
            live: "ecommerce-demo.alexchen.dev",
            description: [
              "Full-stack e-commerce platform with payment integration and inventory management",
              "Implemented real-time notifications and admin dashboard",
              "Deployed on AWS with CI/CD pipeline achieving 99.9% uptime",
            ],
          },
          {
            name: "Task Management API",
            tech: "Python, Django, Redis, Docker",
            github: "github.com/alexchen/task-api",
            live: "api.taskmanager.dev",
            description: [
              "RESTful API for task management with real-time collaboration features",
              "Implemented caching strategy reducing response time by 60%",
              "Comprehensive test suite with 98% code coverage",
            ],
          },
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            school: "University of California, Berkeley",
            year: "2016 - 2020",
            gpa: "3.8 GPA",
          },
        ],
        certifications: [
          {
            name: "AWS Certified Developer",
            organization: "Amazon Web Services",
            year: "2023",
          },
          {
            name: "Google Cloud Professional Developer",
            organization: "Google Cloud",
            year: "2022",
          },
        ],
      },
    },
  ];

  const ResumePreview = ({ template }: { template: any }) => (
    <div className="bg-white p-8 shadow-xl rounded-2xl max-w-4xl mx-auto text-sm leading-tight border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6 border-b border-gray-200 pb-6">
        <h1 className="font-bold text-2xl text-black mb-3 tracking-wide">
          {template.preview.name}
        </h1>
        <div className="text-black space-y-2 text-sm">
          <p className="flex justify-center items-center gap-4 flex-wrap">
            <span>{template.preview.phone}</span>
            <span>•</span>
            <a
              href={`mailto:${template.preview.email}`}
              className="text-blue-600 hover:underline"
            >
              {template.preview.email}
            </a>
            <span>•</span>
            <span>{template.preview.location}</span>
          </p>
          <p className="flex justify-center gap-4 flex-wrap">
            <a
              href={`https://${template.preview.linkedin}`}
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={`https://${template.preview.github}`}
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={`https://${template.preview.portfolio}`}
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-gray-800 leading-relaxed">
          {template.preview.summary}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          TECHNICAL SKILLS
        </h2>
        <div className="space-y-2">
          {Object.entries(template.preview.skills).map(([category, skills]) => (
            <p key={category} className="text-gray-800">
              <strong>{category}:</strong> {(skills as string[]).join(", ")}
            </p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        {template.preview.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-black">{exp.position}</h3>
              <span className="text-gray-600 text-sm">{exp.duration}</span>
            </div>
            <p className="text-gray-700 mb-2 font-medium">{exp.company}</p>
            <ul className="text-gray-800 list-disc list-inside space-y-1">
              {exp.achievements.map((achievement: string, idx: number) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          KEY PROJECTS
        </h2>
        {template.preview.projects.map((project: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-black">{project.name}</h3>
            <p className="text-gray-700 mb-1">
              <strong>Tech Stack:</strong> {project.tech}
            </p>
            <p className="text-gray-700 mb-2">
              <a
                href={`https://${project.github}`}
                className="text-blue-600 hover:underline mr-4"
              >
                GitHub
              </a>
              <a
                href={`https://${project.live}`}
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            </p>
            <ul className="text-gray-800 list-disc list-inside space-y-1">
              {project.description.map((desc: string, idx: number) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          EDUCATION
        </h2>
        {template.preview.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <p className="text-gray-700">{edu.school}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">{edu.year}</p>
                <p className="text-gray-600 text-sm">{edu.gpa}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          CERTIFICATIONS
        </h2>
        {template.preview.certifications.map((cert: any, index: number) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-black">{cert.name}</h3>
              <p className="text-gray-700">{cert.organization}</p>
            </div>
            <span className="text-gray-600">{cert.year}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                Resume Templates
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
                Professional, ATS-optimized templates designed by experts.
                <span className="font-semibold text-black">
                  {" "}
                  Copy the format
                </span>{" "}
                and make it yours.
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
                  Use This Template
                </EnhancedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <motion.h2
              className="text-4xl font-bold text-center text-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Featured Templates
            </motion.h2>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              Each template is carefully crafted to pass ATS systems while
              maintaining a professional appearance.
            </p>
          </div>

          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="mb-20"
            >
              {/* Template Info Card */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(template.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {template.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-black mb-3">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      <Download className="w-4 h-4 inline mr-1" />
                      {template.downloads} downloads
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/builder">
                      <EnhancedButton
                        variant="premium"
                        size="lg"
                        className="px-6 py-3"
                      >
                        <Copy className="w-5 h-5 mr-2" />
                        Use Template
                      </EnhancedButton>
                    </Link>
                    <EnhancedButton
                      variant="outline"
                      size="lg"
                      className="px-6 py-3"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Preview
                    </EnhancedButton>
                  </div>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-black mb-2">
                    Template Preview
                  </h4>
                  <p className="text-gray-600">
                    This is how your resume will look
                  </p>
                </div>
                <ResumePreview template={template} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Create Your Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Use our template as a starting point and customize it with your
              own information. Build your professional resume in minutes.
            </p>
            <Link to="/builder">
              <EnhancedButton
                size="lg"
                className="bg-white hover:bg-gray-100 text-blue-600 text-lg px-12 py-4"
              >
                Start Building Now
              </EnhancedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
