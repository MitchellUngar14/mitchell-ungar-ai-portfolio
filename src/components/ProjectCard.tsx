import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string | React.ReactNode;
  techStack: string[];
  liveSiteUrl?: string;
  sourceCodeUrl?: string;
  imageUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  liveSiteUrl,
  sourceCodeUrl,
  imageUrl,
}) => {
  return (
    <div className="project-card">
      {imageUrl && <img src={imageUrl} alt={title} className="rounded-lg mb-4 relative" />}
      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-desc">{description}</p>
      <div className="mt-4 relative">
        {techStack.map((tech, index) => (
          <span key={index} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex space-x-5 relative">
        {liveSiteUrl && (
          <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer" className="project-link">
            Live Site
          </a>
        )}
        {sourceCodeUrl && (
          <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="project-link">
            Source Code
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
