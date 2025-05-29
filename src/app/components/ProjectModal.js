"use client";
import { useState, useRef } from 'react';

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
            backgroundColor: '#c6c6c6',
            boxShadow: 'inset 6px 6px 0px #FFFFFF, inset -6px -6px 0px #373737'
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
                  {project.technologies.map((tech, index) => (
                    <div 
                      key={index} 
                      className="w-14 h-14 flex items-center justify-center relative cursor-pointer minecraft-inset-border"
                      style={{ 
                        backgroundColor: '#8b8b8b'
                      }}
                      onMouseEnter={(e) => handleTechHover(tech.name, e)}
                      onMouseLeave={handleTechLeave}
                    >
                      <span className="text-lg hover:opacity-80 transition-opacity">
                        {tech.icon}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Side - Project Info */}
            <div className="w-1/2 pl-4">
              <h3 className="text-xl text-white minecraft-font mb-2" style={{ textShadow: '2px 2px 0px #000000' }}>
                {project.name}
              </h3>
              <p className="text-white minecraft-font mb-1" style={{ textShadow: '2px 2px 0px #000000' }}>
                {project.date}
              </p>
              <p className="text-white minecraft-font mb-4" style={{ textShadow: '2px 2px 0px #000000' }}>
                {project.subtitle}
              </p>
              
              {/* Project Description */}
              <div className="bg-black minecraft-inset-border p-3 h-80 overflow-y-auto">
                <p className="text-white minecraft-font text-sm leading-relaxed">
                  {project.description}
                </p>
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