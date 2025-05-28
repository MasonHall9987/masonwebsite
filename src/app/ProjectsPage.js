"use client";
import { useState } from 'react';
import { LargeButton, SmallButton } from "./UIElements";

const ProjectsPage = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      name: "Self Watering Plant Pot",
      date: "01/01/25-04/21/25",
      subtitle: "Arduino - Self Watering Plant Pot",
      description: "A Minecraft-inspired portfolio website built with Next.js and Tailwind CSS. Features include dynamic background videos, custom audio player, and interactive UI elements.",
      image: "/images/icon-plant-pot.png", // placeholder image
      technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    },
    {
      id: 2,
      name: "Futurex",
      date: "05/21/24-08/05/24",
      subtitle: "InternShip - Software Developer",
      description: "Full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.",
      image: "/images/icon-futurex.png", // placeholder image
      technologies: ["Node.js", "Express", "MongoDB", "React"],
    },
    {
      id: 3,
      name: "Cabana App",
      date: "05/21/24-08/05/24",
      subtitle: "React Native - Mobile App",
      description: "Real-time weather application that provides current conditions and forecasts based on user location or search.",
      image: "/images/icon-cabana.png", // placeholder image
      technologies: ["JavaScript", "Weather API", "CSS", "HTML"],
    },
  ];

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
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
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
              {/* Arrow indicator for hover */}
              <div className="absolute left-[-65px] opacity-0 group-hover:opacity-100">
                <img 
                  src="/images/icon-arrow.png" 
                  alt="Selection Arrow" 
                  className="w-14 h-12"
                />
              </div>
              
              {/* Project icon/thumbnail */}
              <div className="w-12 h-12 mr-4 flex-shrink-0">
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
      
      {/* Action buttons */}
      <div className="flex space-x-4">
        <LargeButton text="Back" onClick={onBack} />
        <LargeButton 
          text="Select Project" 
          onClick={handleSelectButtonClick} 
        />
      </div>

      {/* Project Details Modal */}
      {showProjectModal && selectedProjectData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75" onClick={handleCloseModal}></div>
          <div className="bg-gray-800 border-4 border-gray-700 p-6 max-w-2xl w-full mx-4 z-10">
            <h3 className="text-2xl text-white minecraft-font mb-4">{selectedProjectData.name}</h3>
            
            <div className="mb-4">
              <p className="text-white minecraft-font mb-4">{selectedProjectData.description}</p>
              
              <div className="mb-4">
                <h4 className="text-white minecraft-font mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-700 text-white px-2 py-1 text-sm minecraft-font">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Video/Demo placeholder */}
            <div className="w-full h-48 bg-black border-2 border-gray-700 flex items-center justify-center mb-4">
              <span className="text-gray-500 minecraft-font">Project Demo Video</span>
            </div>
            
            <div className="flex justify-center">
              <SmallButton 
                text="Back" 
                onClick={handleCloseModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage; 