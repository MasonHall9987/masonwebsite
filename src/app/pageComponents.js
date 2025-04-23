// pageComponents.js
"use client";

// About Page Component
const AboutPage = ({ onBack }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-white p-8">
      <div className="bg-black bg-opacity-60 p-6 rounded max-w-2xl">
        <h2 className="text-2xl mb-4">About Me</h2>
        <p className="mb-4">
          This is the about page content. Replace this with your actual information.
        </p>
        <p className="mb-6">
          You can add more content, your bio, skills, or anything else you want to showcase here.
        </p>
        <button 
          onClick={onBack}
          className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Projects/Experience Page Component
const ProjectsPage = ({ onBack }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-white p-8">
      <div className="bg-black bg-opacity-60 p-6 rounded max-w-2xl">
        <h2 className="text-2xl mb-4">Projects & Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl mb-2">Project 1</h3>
          <p>Description of your first project goes here.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl mb-2">Project 2</h3>
          <p>Description of your second project goes here.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl mb-2">Experience</h3>
          <p>Summary of your professional experience.</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = ({ onBack }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-white p-8">
      <div className="bg-black bg-opacity-60 p-6 rounded max-w-lg">
        <h2 className="text-2xl mb-4">Contact Me</h2>
        <div className="mb-4">
          <p>Email: your.email@example.com</p>
          <p>GitHub: github.com/yourusername</p>
          <p>LinkedIn: linkedin.com/in/yourprofile</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Settings Page Component
const SettingsPage = ({ onBack }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-white p-8">
      <div className="bg-black bg-opacity-60 p-6 rounded max-w-lg">
        <h2 className="text-2xl mb-4">Settings</h2>
        <div className="mb-4">
          <p>Settings options will go here.</p>
          <p className="mt-4">This is just a placeholder for now.</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export { AboutPage, ProjectsPage, ContactPage, SettingsPage };