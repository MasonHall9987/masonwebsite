"use client";
import { useState, useRef } from 'react';
import * as SimpleIcons from 'simple-icons';

// Default icon if the specified one isn't found
const DEFAULT_ICON = {
  title: 'Default',
  path: 'M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z'
};

const ProjectModal = ({ project, isVisible, onClose }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleTechHover = (tech, event) => {
    setHoveredTech(tech);
    // Get global mouse position and convert to modal-relative coordinates
    if (modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();
      setHoverPosition({ 
        x: event.clientX - modalRect.left + 10, // Global mouse X minus modal X + offset
        y: event.clientY - modalRect.top - 30 // Global mouse Y minus modal Y - offset to appear above cursor
      });
    }
  };

  const handleTechLeave = () => {
    setHoveredTech(null);
  };

  const handleCloseModal = () => {
    const clickSound = new Audio('/audio/effect-button.mp3');
    clickSound.play();
    onClose();
  };

  if (!isVisible || !project) return null;

  return (
    <>
      {/* Project Details Modal - Minecraft Inventory Style */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
        
        {/* Main Inventory Container */}
        <div 
          ref={modalRef}
          className="relative bg-gray-600 minecraft-modal-border max-w-4xl w-full mx-4 z-10" 
          style={{ 
            backgroundColor: '#c6c6c6'
          }}>
          
          {/* Top Section - Video and Info */}
          <div className="flex p-4">
            {/* Left Side - Video and Technologies */}
            <div className="w-1/2 pr-4">
              {/* Video Player Area */}
              <div className="bg-black minecraft-inset-border h-64 flex items-center justify-center mb-4">
                <video 
                  className="w-full h-full object-contain"
                  controls
                  poster="/images/video-placeholder.png"
                >
                  <source src={project.video} type="video/mp4" />
                  <div className="text-white minecraft-font text-center">
                    Video not supported
                  </div>
                </video>
              </div>
              
              {/* Technologies Grid - Dynamic sizing */}
              <div className="mb-4">
                <h4 className="text-white minecraft-font mb-3 text-center" style={{ textShadow: '2px 2px 0px #000000' }}>
                  Technologies
                </h4>
                <div className="flex flex-wrap justify-center">
                  {project.technologies.map((tech, index) => {
                    let iconPath;
                    try {
                      // Try to get the icon using the provided iconName
                      const iconKey = `si${tech.iconName}`;
                      const Icon = SimpleIcons[iconKey];
                      
                      // Use the icon path if found, otherwise use default
                      iconPath = Icon?.path || DEFAULT_ICON.path;
                    } catch (error) {
                      console.warn(`Icon not found for ${tech.name}, using default`);
                      iconPath = DEFAULT_ICON.path;
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className="w-14 h-14 flex items-center justify-center relative cursor-pointer minecraft-inset-border"
                        style={{ 
                          backgroundColor: '#8b8b8b'
                        }}
                        onMouseEnter={(e) => handleTechHover(tech.name, e)}
                        onMouseLeave={handleTechLeave}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill={tech.color || "currentColor"}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <path d={iconPath} />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Right Side - Project Info */}
            <div className="w-1/2 pl-4">
              <h3 className="text-xl text-white minecraft-font mb-2" style={{ textShadow: '2px 2px 0px #000000' }}>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors duration-200 cursor-pointer underline hover:underline-offset-4"
                  onClick={(e) => {
                    const clickSound = new Audio('/audio/effect-button.mp3');
                    clickSound.play();
                  }}
                >
                  {project.name}
                </a>
              </h3>
              <p className="text-white minecraft-font mb-1" style={{ textShadow: '2px 2px 0px #000000' }}>
                {project.date}
              </p>
              <p className="text-white minecraft-font mb-4" style={{ textShadow: '2px 2px 0px #000000' }}>
                {project.subtitle}
              </p>
              
              {/* Project Description */}
              <div className="bg-black minecraft-inset-border p-3 h-80 overflow-y-auto scrollbar-3d">
                {project.description.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return <br key={index} />;
                  
                  // Check if this is a bullet point line
                  if (paragraph.trim().startsWith('•')) {
                    return (
                      <p key={index} className="text-white minecraft-font text-sm leading-relaxed pl-4">
                        {paragraph}
                      </p>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-white minecraft-font text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Technology Hover Tooltip - Positioned next to cursor */}
          {hoveredTech && (
            <div 
              className="absolute bg-black border-2 border-gray-700 px-2 py-1 pointer-events-none z-20"
              style={{ 
                left: hoverPosition.x,
                top: hoverPosition.y,
                borderColor: '#373737'
              }}
            >
              <span className="text-white minecraft-font text-sm">{hoveredTech}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectModal; 