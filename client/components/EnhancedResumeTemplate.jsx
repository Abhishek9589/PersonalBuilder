import React from "react";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";

const EnhancedResumeTemplate = React.forwardRef((props, ref) => {
    const {
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
      fontSize,
      marginSize,
      enhancedSteps,
      customSections,
    } = props;

    // Get enabled sections in order
    const enabledSections = enhancedSteps
      .filter(step => step.enabled)
      .sort((a, b) => a.order - b.order)
      .filter(step => step.id !== 'customization'); // Exclude customization from resume

    const renderCustomSection = (customSection) => {
      return (
        <CustomSectionRenderer
          section={customSection}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
      );
    };

    const renderSection = (step) => {
      // Handle custom sections
      if (step.isCustom) {
        // Use the latest data from customSections array instead of step.customSection
        const latestCustomSection = customSections.find(cs => cs.id === step.id);
        if (latestCustomSection) {
          return renderCustomSection(latestCustomSection);
        }
      }

      // Handle built-in sections
      switch (step.id) {
        case 'header':
          return (
            <div className="text-center mb-3">
              <h1 className="font-bold text-black mb-2 tracking-wide uppercase" style={{ fontSize: '2em' }}>
                {personalInfo.name}
              </h1>
              <div className="text-black space-y-1" style={{ fontSize: '0.75em' }}>
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
          );

        case 'summary':
          return summary ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                SUMMARY
              </h2>
              <hr className="border-black mb-1" />
              <p className="text-black leading-tight" style={{ fontSize: '0.9em' }}>{summary}</p>
            </div>
          ) : null;

        case 'skills':
          return Object.values(skills).some((skillArray) => skillArray.length > 0) ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                SKILLS
              </h2>
              <hr className="border-black mb-1" />
              <div className="text-black space-y-0.5" style={{ fontSize: '0.9em' }}>
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
          ) : null;

        case 'experience':
          return experiences.length > 0 ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                EXPERIENCE
              </h2>
              <hr className="border-black mb-1" />
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-2">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-black" style={{ fontSize: '0.9em' }}>{exp.position}</h3>
                    <span className="text-black" style={{ fontSize: '0.9em' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-black mb-0.5" style={{ fontSize: '0.9em' }}>{exp.company}</p>
                  <ul className="text-black list-disc list-inside space-y-0" style={{ fontSize: '0.9em' }}>
                    {exp.responsibilities
                      .filter((r) => r.trim())
                      .map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null;

        case 'projects':
          return projects.length > 0 ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                PROJECTS
              </h2>
              <hr className="border-black mb-1" />
              {projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-black" style={{ fontSize: '0.9em' }}>{project.name}</h3>
                    {(project.githubLink || project.deployLink) && (
                      <span className="text-black" style={{ fontSize: '0.9em' }}>
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
                  <p className="text-black mb-0.5" style={{ fontSize: '0.9em' }}>
                    <strong>Tech Stack:</strong> {project.techStack}
                  </p>
                  <ul className="text-black list-disc list-inside space-y-0" style={{ fontSize: '0.9em' }}>
                    {project.description
                      .filter((d) => d.trim())
                      .map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null;

        case 'education':
          return education.length > 0 ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                EDUCATION
              </h2>
              <hr className="border-black mb-1" />
              <div className="text-black space-y-1" style={{ fontSize: '0.9em' }}>
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
                      {edu.location && <span style={{ fontSize: '0.8em' }}>{edu.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null;

        case 'certifications':
          return certifications.length > 0 ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                CERTIFICATIONS
              </h2>
              <hr className="border-black mb-1" />
              <div className="text-black space-y-1" style={{ fontSize: '0.9em' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} className="ml-3">
                    <div className="flex justify-between items-start">
                      <span className="relative">
                        <span className="absolute -left-3 top-0">•</span>
                        <strong>{cert.title}</strong> - {cert.organization}
                      </span>
                      <span className="ml-2">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null;

        case 'achievements':
          return achievements.length > 0 ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                ACHIEVEMENTS
              </h2>
              <hr className="border-black mb-1" />
              <ul className="text-black list-disc list-inside space-y-0.5" style={{ fontSize: '0.9em' }}>
                {achievements.map((achievement) => (
                  <li key={achievement.id}>{achievement.description}</li>
                ))}
              </ul>
            </div>
          ) : null;

        case 'interests':
          return interests ? (
            <div className="mb-3">
              <h2 className="font-bold text-black mb-1 uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                INTERESTS
              </h2>
              <hr className="border-black mb-1" />
              <ul className="text-black list-disc list-inside" style={{ fontSize: '0.9em' }}>
                <li>{interests}</li>
              </ul>
            </div>
          ) : null;

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className="min-h-[11in] max-w-[8.5in] mx-auto bg-white leading-snug"
        style={{
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`,
          padding: `${marginSize}px`
        }}
      >
        {enabledSections.map((step) => (
          <div key={step.id}>
            {renderSection(step)}
          </div>
        ))}
      </div>
    );
  }
);

EnhancedResumeTemplate.displayName = "EnhancedResumeTemplate";

export default EnhancedResumeTemplate;
