"use client";
import { useState } from 'react';
import { LargeButton, SmallButton } from "../../components/UIElements";
import ProjectModal from "./project-modal";
import { projects } from './project-descriptions';
import { getClickAudio, getAssetUrl } from '../../scripts/get-asset';
import Image from 'next/image';

const ProjectsPage = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleProjectDoubleClick = (projectId) => {
    const clickSound = getClickAudio();
    clickSound.play();
    setSelectedProject(projectId);
    setShowProjectModal(true);
  };

  const handleSelectButtonClick = () => {
    const clickSound = getClickAudio();
    clickSound.play();
    if (selectedProject !== null) {
      setShowProjectModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const parseDate = (dateStr) => {
    // Extract the first date from the range (e.g., "01/2025-04/2025" -> "01/2025")
    const firstDate = dateStr.split('-')[0];
    const [month, year] = firstDate.split('/');
    return new Date(parseInt(year), parseInt(month) - 1);
  };

  const filteredProjects = projects
    .filter(project => {
    const searchLower = searchQuery.toLowerCase();
    return project.name.toLowerCase().includes(searchLower) ||
           project.technologies.some(tech => tech.name.toLowerCase().includes(searchLower));
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const selectedProjectData = projects.find(project => project.id === selectedProject);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
        <h2 className="text-3xl font-semibold text-center text-white">Project/Experience</h2>
        
        {/* Search bar */}
        <div className="w-full max-w-xl">
          <input 
            type="text" 
            placeholder="Search projects or technologies..."
            className="w-full p-2 border-2 border-white bg-black text-white minecraft-font text-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Project list container - modified to match other pages */}
        <div className="translucent-container-projects px-60">
          <div className="scrollbar-3d pr-2">
            <div className="space-y-3">
            {filteredProjects.map((project) => (
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
                  <Image 
                    src={getAssetUrl('image', 'icon-arrow.png')} 
                    alt="Selection Arrow" 
                    className="w-10 h-8"
                    width={40}
                    height={32}
                    priority
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
                      e.target.src = getAssetUrl('image', 'icon-arrow.png');
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
      </div>

      {/* Project Modal - Moved outside the main container */}
      <ProjectModal 
        project={selectedProjectData}
        isVisible={showProjectModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsPage; 