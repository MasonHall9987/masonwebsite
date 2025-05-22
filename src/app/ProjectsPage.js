"use client";
// import React from 'react'; // Removed React
import { LargeButton } from "./UIElements";

const ProjectsPage = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
      {/* Heading above the translucent box */}
      <h2 className="text-3xl font-semibold text-center text-white">Projects/Experience</h2>
      {/* FULL-WIDTH translucent container */}
      <div className="bg-black/60 border-t-2 border-b border-white w-full h-[70vh] p-10 px-60 flex flex-col justify-start text-white">
        <div className="mb-6">
          <h3 className="text-xl mb-2">Project 1</h3>
          <p>Description of your first project goes here.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl mb-2">Project 2</h3>
          <p>Description of your second project goes here.</p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Experience</h3>
          <p>Summary of your professional experience.</p>
        </div>
      </div>

      {/* Back Button */}
      <LargeButton text="Back" onClick={onBack} />
    </div>
  );
};

export default ProjectsPage; 