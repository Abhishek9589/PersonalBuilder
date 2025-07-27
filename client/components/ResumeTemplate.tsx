import React from "react";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Project {
  id: string;
  name: string;
  techStack: string;
  githubLink: string;
  deployLink: string;
  description: string[];
}

interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  year: string;
  marks: string;
  location: string;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
}

interface Skills {
  programmingLanguages: string[];
  webTechnologies: string[];
  frameworksLibraries: string[];
  databases: string[];
  toolsPlatforms: string[];
  cloudHosting: string[];
  otherTechnical: string[];
}

interface ResumeTemplateProps {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  achievements: string;
  interests: string;
  fontFamily: string;
}

const ResumeTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(
  (
    {
      personalInfo,
      summary,
      skills,
      experiences,
      projects,
      education,
      certifications,
      achievements,
      interests,
      fontFamily,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="min-h-[11in] max-w-[8.5in] mx-auto p-6 bg-white text-sm leading-snug"
        style={{ fontFamily: fontFamily }}
      >
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="font-bold text-2xl text-black mb-2 tracking-wide uppercase">
            {personalInfo.name}
          </h1>
          <div className="text-black space-y-1 text-xs">
            <p>
              {personalInfo.phone} |{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-black hover:underline cursor-pointer"
              >
                {personalInfo.email}
              </a>
            </p>
            {(personalInfo.linkedin ||
              personalInfo.github ||
              personalInfo.portfolio ||
              personalInfo.address) && (
              <p className="flex justify-center gap-2 flex-wrap">
                {personalInfo.linkedin && (
                  <a
                    href={
                      personalInfo.linkedin.startsWith("http")
                        ? personalInfo.linkedin
                        : `https://${personalInfo.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline cursor-pointer"
                  >
                    LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <>
                    {personalInfo.linkedin && " | "}
                    <a
                      href={
                        personalInfo.github.startsWith("http")
                          ? personalInfo.github
                          : `https://${personalInfo.github}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline cursor-pointer"
                    >
                      GitHub
                    </a>
                  </>
                )}
                {personalInfo.portfolio && (
                  <>
                    {(personalInfo.linkedin || personalInfo.github) && " | "}
                    <a
                      href={
                        personalInfo.portfolio.startsWith("http")
                          ? personalInfo.portfolio
                          : `https://${personalInfo.portfolio}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline cursor-pointer"
                    >
                      Portfolio
                    </a>
                  </>
                )}
                {personalInfo.address && (
                  <>
                    {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && " | "}
                    <span>{personalInfo.address}</span>
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              SUMMARY
            </h2>
            <hr className="border-black mb-1" />
            <p className="text-black text-xs leading-tight">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {Object.values(skills).some((skillArray) => skillArray.length > 0) && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              SKILLS
            </h2>
            <hr className="border-black mb-1" />
            <div className="text-black text-xs space-y-0.5">
              {skills.programmingLanguages.length > 0 && (
                <p>
                  <strong>Programming Languages:</strong>{" "}
                  {skills.programmingLanguages.join(", ")}
                </p>
              )}
              {skills.webTechnologies.length > 0 && (
                <p>
                  <strong>Web Technologies:</strong>{" "}
                  {skills.webTechnologies.join(", ")}
                </p>
              )}
              {skills.frameworksLibraries.length > 0 && (
                <p>
                  <strong>Frameworks & Libraries:</strong>{" "}
                  {skills.frameworksLibraries.join(", ")}
                </p>
              )}
              {skills.databases.length > 0 && (
                <p>
                  <strong>Databases:</strong> {skills.databases.join(", ")}
                </p>
              )}
              {skills.toolsPlatforms.length > 0 && (
                <p>
                  <strong>Tools & Platforms:</strong>{" "}
                  {skills.toolsPlatforms.join(", ")}
                </p>
              )}
              {skills.cloudHosting.length > 0 && (
                <p>
                  <strong>Cloud & Hosting:</strong>{" "}
                  {skills.cloudHosting.join(", ")}
                </p>
              )}
              {skills.otherTechnical.length > 0 && (
                <p>
                  <strong>Other Technical Skills:</strong>{" "}
                  {skills.otherTechnical.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              EXPERIENCE
            </h2>
            <hr className="border-black mb-1" />
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-black text-xs">{exp.position}</h3>
                  <span className="text-black text-xs">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-black text-xs mb-0.5">{exp.company}</p>
                <ul className="text-black text-xs list-disc list-inside space-y-0">
                  {exp.responsibilities
                    .filter((r) => r.trim())
                    .map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              PROJECTS
            </h2>
            <hr className="border-black mb-1" />
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-black text-xs">{project.name}</h3>
                  {(project.githubLink || project.deployLink) && (
                    <span className="text-black text-xs">
                      {project.githubLink && (
                        <a
                          href={
                            project.githubLink.startsWith("http")
                              ? project.githubLink
                              : `https://${project.githubLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:underline cursor-pointer"
                        >
                          GitHub
                        </a>
                      )}
                      {project.deployLink && (
                        <>
                          {project.githubLink && " | "}
                          <a
                            href={
                              project.deployLink.startsWith("http")
                                ? project.deployLink
                                : `https://${project.deployLink}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:underline cursor-pointer"
                          >
                            Live Demo
                          </a>
                        </>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-black text-xs mb-0.5">
                  <strong>Tech Stack:</strong> {project.techStack}
                </p>
                <ul className="text-black text-xs list-disc list-inside space-y-0">
                  {project.description
                    .filter((d) => d.trim())
                    .map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              EDUCATION
            </h2>
            <hr className="border-black mb-1" />
            <div className="text-black text-xs space-y-1">
              {education.map((edu) => (
                <div key={edu.id} className="ml-3">
                  <div className="flex justify-between items-start">
                    <span className="relative">
                      <span className="absolute -left-3 top-0">•</span>
                      <strong>{edu.institution}</strong>
                    </span>
                    <span>{edu.year}</span>
                  </div>
                  <div className="flex justify-between items-start mt-0.5">
                    <span>
                      {edu.degree} in {edu.course}{edu.marks && ` - ${edu.marks}`}
                    </span>
                    {edu.location && <span className="text-xs">{edu.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              CERTIFICATIONS
            </h2>
            <hr className="border-black mb-1" />
            <ul className="text-black text-xs list-disc list-inside space-y-0.5">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <div className="flex justify-between items-start">
                    <span>
                      <strong>{cert.title}</strong> - {cert.organization}
                    </span>
                    <span className="ml-2">{cert.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {achievements && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              ACHIEVEMENTS
            </h2>
            <hr className="border-black mb-1" />
            <ul className="text-black text-xs list-disc list-inside">
              <li>{achievements}</li>
            </ul>
          </div>
        )}

        {/* Interests */}
        {interests && (
          <div className="mb-3">
            <h2 className="font-bold text-sm text-black mb-1 uppercase tracking-wider">
              INTERESTS
            </h2>
            <hr className="border-black mb-1" />
            <ul className="text-black text-xs list-disc list-inside">
              <li>{interests}</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
