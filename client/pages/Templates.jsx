import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Download,
  Copy,
  Star,
  CheckCircle,
  Code,
  Briefcase,
  GraduationCap,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

// Template Preview Modal Component
function TemplatePreviewModal({ template, isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{template.name}</h3>
            <p className="text-gray-600 mt-1">{template.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/builder">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
                Use This Template
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Sample Resume Content */}
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
                <p className="text-lg text-gray-600 mt-2">Software Engineer</p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
                  <span>john.doe@email.com</span>
                  <span>•</span>
                  <span>(555) 123-4567</span>
                  <span>•</span>
                  <span>linkedin.com/in/johndoe</span>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Experienced Software Engineer with 5+ years developing scalable web applications.
                  Proven track record of delivering high-quality code and leading technical initiatives.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                  Experience
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">Senior Software Engineer</h3>
                        <p className="text-gray-600">Tech Company Inc.</p>
                      </div>
                      <span className="text-gray-500 text-sm">2021 - Present</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>• Developed and maintained React applications serving 100k+ users</li>
                      <li>• Led migration from legacy PHP to modern Node.js architecture</li>
                      <li>• Improved application performance by 40% through optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                  Education
                </h2>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
                      <p className="text-gray-600">University of Technology</p>
                    </div>
                    <span className="text-gray-500 text-sm">2019</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Templates() {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };
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

  const ResumePreview = ({ template }) => (
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
              <strong>{category}:</strong> {skills.join(", ")}
            </p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="font-bold text-base text-black mb-3 uppercase tracking-wider border-b border-black pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        {template.preview.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-black">{exp.position}</h3>
              <span className="text-gray-600 text-sm">{exp.duration}</span>
            </div>
            <p className="text-gray-700 mb-2 font-medium">{exp.company}</p>
            <ul className="text-gray-800 list-disc list-inside space-y-1">
              {exp.achievements.map((achievement, idx) => (
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
        {template.preview.projects.map((project, index) => (
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
              {project.description.map((desc, idx) => (
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
        {template.preview.education.map((edu, index) => (
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
        {template.preview.certifications.map((cert, index) => (
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
            />
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
                      onClick={() => openPreview(template)}
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

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </Layout>
  );
}
