"use client";
import { useState } from 'react';
import { LargeButton, SmallButton } from "./UIElements";
import ProjectModal from "./components/ProjectModal";
import { projects } from './projectDescriptions';

const ProjectsPage = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleProjectDoubleClick = (projectId) => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    setSelectedProject(projectId);
    setShowProjectModal(true);
  };

  const handleSelectButtonClick = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    if (selectedProject !== null) {
      setShowProjectModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
  };

  const selectedProjectData = projects.find(project => project.id === selectedProject);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
      <h2 className="text-3xl font-semibold text-center text-white">Project/Experience</h2>
      
      {/* Search bar (non-functional) */}
      <div className="w-full max-w-xl">
        <input 
          type="text" 
          placeholder="Search projects..."
          className="w-full p-2 border-2 border-gray-700 bg-black text-white minecraft-font text-sm"
          readOnly 
        />
      </div>
      
      {/* Project list container - modified to match other pages */}
      <div className="translucent-container-projects px-60">
        <div className="scrollable-content">
          <div className="space-y-3">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              onDoubleClick={() => handleProjectDoubleClick(project.id)}
              className={`relative flex items-center p-2 cursor-pointer transition-all group
                ${selectedProject === project.id 
                  ? 'border-3 border-white bg-black' 
                  : 'border-3 border-transparent'}`}
            >
              {/* Arrow indicator for hover - positioned inside container */}
              <div className="absolute left-1 opacity-0 group-hover:opacity-100 z-10">
                <img 
                  src="/images/icon-arrow.png" 
                  alt="Selection Arrow" 
                  className="w-10 h-8"
                />
              </div>
              
              {/* Project icon/thumbnail */}
              <div className="w-12 h-12 mr-4 ml-10 flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/icon-arrow.png";
                  }}
                />
              </div>
              
              {/* Project info */}
              <div className="flex flex-col">
                <span className="text-white minecraft-font">{project.name}</span>
                <span className="text-gray-400 text-sm minecraft-font">{project.date}</span>
                <span className="text-gray-400 text-sm minecraft-font">{project.subtitle}</span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-4">
        <LargeButton text="Back" onClick={onBack} />
        <LargeButton 
          text="Select Project" 
          onClick={handleSelectButtonClick} 
        />
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProjectData}
        isVisible={showProjectModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsPage; 