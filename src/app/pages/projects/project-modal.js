"use client";
import { useState, useRef } from 'react';
import { getClickAudio, getAssetUrl } from '../../scripts/get-asset';

const ProjectModal = ({ project, isVisible, onClose }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleTechHover = (tech, event) => {
    setHoveredTech(tech);
    if (modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();
      setHoverPosition({ 
        x: event.clientX - modalRect.left + 10,
        y: event.clientY - modalRect.top - 30
      });
    }
  };

  const handleTechLeave = () => {
    setHoveredTech(null);
  };

  const handleCloseModal = () => {
    const clickSound = getClickAudio();
    clickSound.play();
    onClose();
  };

  if (!isVisible || !project) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
        
        <div 
          ref={modalRef}
          className="relative bg-gray-600 minecraft-modal-border max-w-4xl w-full mx-4 z-10" 
          style={{ 
            backgroundColor: '#c6c6c6'
          }}>
          
          <div className="flex p-4">
            <div className="w-1/2 pr-4">
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
              
              <div className="mb-4">
                <h4 className="text-white minecraft-font mb-3 text-center" style={{ textShadow: '2px 2px 0px #000000' }}>
                  Technologies
                </h4>
                <div className="flex flex-wrap justify-center">
                  {project.technologies.map((tech, index) => {
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
                        <img
                          src={tech.iconPath || getAssetUrl('image', 'icon-arduino.png')}
                          alt={tech.name}
                          className="w-15 h-15 object-cover"
                          style={{ imageRendering: 'pixelated' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getAssetUrl('image', 'icon-arduino.png');
                          }}
                        />
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
              
              <div className="bg-black minecraft-inset-border p-3 h-80 overflow-y-auto scrollbar-3d">
                {project.description.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return <br key={index} />;
                  
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