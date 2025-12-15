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
    <div className="bg-gray-800 rounded-lg p-6">
      {imageUrl && <img src={imageUrl} alt={title} className="rounded-md mb-4" />}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-4">
        {techStack.map((tech, index) => (
          <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        {liveSiteUrl && (
          <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Live Site
          </a>
        )}
        {sourceCodeUrl && (
          <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Source Code
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
