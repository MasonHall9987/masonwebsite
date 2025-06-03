"use client";
import { useState, useEffect } from 'react';
import { useCursor } from './cursor-context';

export default function MinecraftCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isOverButton, setIsOverButton] = useState(false);
  const { is404Active } = useCursor();
  
  useEffect(() => {
    // Hide default cursor everywhere with no exceptions
    document.body.style.cursor = 'none';
    
    // Also ensure buttons don't show default cursor
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      element.style.cursor = 'none';
    });
    
    // Track cursor position and detect if over buttons
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a textured button
      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const isOverTexturedButton = elemBelow?.closest('.textured-button') !== null;
      setIsOverButton(isOverTexturedButton);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      // Restore default cursor behavior when component unmounts
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Don't render the custom cursor if 404 is active
  if (is404Active) {
    return null;
  }

  return (
    <div 
      className={`fixed pointer-events-none z-50 ${!isOverButton ? 'mix-blend-difference' : ''}`}
      style={{ 
        left: cursorPosition.x, 
        top: cursorPosition.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
      >
        {/* Connected crosshair with thicker lines */}
        <path
          d="M 12,4 L 12,20 M 4,12 L 20,12"
          stroke={isOverButton ? "black" : "white"}
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}