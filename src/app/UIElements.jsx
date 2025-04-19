import React from 'react';

// Main reusable button component
export const LargeButton = ({ text, onClick }) => {
  return (
    <div className="border-3 hover:border-white">
        <div className='border-t-3 border-l-3 border-r-3 border-t-[#c7c7c7] border-l-[#c7c7c7] border-r-[#6b6b6b]'>
            <button onClick={onClick} className="textured-button large-button minecraft-font">
            {text}
            </button>
        </div>
    </div>
  );
};

export const SmallButton = ({ text, onClick }) => {
    return (
      <div className="border-3 hover:border-white">
          <div className='border-t-3 border-l-3 border-r-3 border-t-[#c7c7c7] border-l-[#c7c7c7] border-r-[#6b6b6b]'>
              <button onClick={onClick} className="textured-button small-button minecraft-font">
              {text}
              </button>
          </div>
      </div>
    );
  };

  
export const TinyButton = ({ text, onClick }) => {
    return (
      <div className="border-3 hover:border-white">
          <div className='border-t-3 border-l-3 border-r-3 border-t-[#c7c7c7] border-l-[#c7c7c7] border-r-[##6b6b6b]'>
              <button onClick={onClick} className="textured-button tiny-button minecraft-font">
              {text}
              </button>
          </div>
      </div>
    );
  };