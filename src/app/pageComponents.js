// pageComponents.js
"use client";
import { LargeButton, SmallButton } from "./UIElements";
import {React,useState} from "react";

// Helper function to determine initial carousel indices
const getInitialCarouselIndices = (dataArray, currentPath, pathKey = "filepath") => {
  if (!dataArray || dataArray.length === 0) return [0, 0, 0]; // Should not happen with current hardcoded data
  
  const defaultIndices = [
    0, 
    Math.min(1, dataArray.length - 1), 
    Math.min(2, dataArray.length - 1)
  ];
  
  if (dataArray.length === 1) return [0, 0, 0];
  // For length 2, show [0,1,0] to center the second item, or [1,0,1] to center the first.
  // To center the item at index 1: [0,1,0]. To center item at index 0: [1,0,1]
  // Let's try to center the found item, or default to centering index 1.
  // If length 2, default to [0,1,0] which means data[0] is left, data[1] is middle, data[0] is right (repeated) - this is ok.

  const currentIndex = dataArray.findIndex(item => item[pathKey] === currentPath);

  if (currentIndex !== -1) {
    const middle = currentIndex;
    const left = (middle - 1 + dataArray.length) % dataArray.length;
    const right = (middle + 1) % dataArray.length;
    return [left, middle, right];
  } else {
    // Default to centering the second item (index 1) if current not found and array is long enough.
    if (dataArray.length >= 3) return [0, 1, 2];
    if (dataArray.length === 2) return [0, 1, 0]; // shows data[0], data[1], data[0]
    return defaultIndices; // Fallback, though covered by specific length checks
  }
};

// About Page Component
const AboutPage = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
      {/* Heading above the translucent box */}
      <h2 className="text-3xl text-center text-white">About Me</h2>

      {/* FULL-WIDTH translucent container */}
      <div className="bg-black/60 border-t-2 border-b border-white w-full h-[70vh] p-10 px-20 flex flex-col justify-start text-white">
        <div className="mb-6 leading-[1.8]">
          <h3 className="text-xl mb-2">Welcome to my Portfolio Website!</h3>

          <p>
            Thank you so much for taking the time to check it out. If you're here to quickly view my resume and skills, feel free to click the link right
            <span> </span>
            <a href="/images/Mason-Hall-Resume.pdf" download className="underline-link hide-cursor-on-hover">here</a>.
          </p>

          <p>
            Growing up, I spent countless hours playing Minecraft — and if you did too, I think you'll enjoy the nostalgia I've woven into this site. When it came time to build my portfolio, I couldn't think of a better way to showcase my work than through a Minecraft-inspired theme. I hope it brings a smile to your face!
          </p>

          <p>
            Here's how the site works:
            <ul className="list-none pl-5">
              <li className="marker:text-white">* Projects/Experience: Take a look at my relevant coding projects and professional experience.</li>
              <li className="marker:text-white">* About: Learn more about who I am and what drives me.</li>
              <li className="marker:text-white">* Contact: Find my contact information, and you can even send me an email directly through the form.</li>
              <li className="marker:text-white">* Settings: This is where the fun begins! Customize the site's theming, change the background video and music.</li>
            </ul>
          </p>

          <p>
            A little about me: I'm currently a Senior at the University of Central Florida, studying Computer Science, and I'll be graduating in December 2025. When I'm not coding, you'll find me enjoying hobbies like cooking, working out, language learning (currently A1 in Portuguese and B1 in Spanish), traveling, and — believe it or not — diving even deeper into technology.
          </p>

          <p>
            I've dabbled in many different areas of coding: from front-end/back-end for both web development and app development, game development, machine learning, robotics and firmware. What excites me most is working on projects that make a real, positive impact on people's lives, all while challenging myself to innovate and grow within my field.
          </p>

          <p>
            At the end of the day, this website is more than just a portfolio — it's a reflection of who I am, my passions, and my journey. I hope you enjoy exploring it as much as I enjoyed creating it.
          </p>

          <p>Thank you again for visiting!</p>
        </div>
      </div>
    <LargeButton text="Back" onClick={() => onBack()} />   
    </div>
  );
};

// Projects/Experience Page Component
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



// Contact Page Component
const ContactPage = ({ onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const isFormValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";
  const clickSound = new Audio('/audio/effect-button.mp3');


  const handleSubmit = async (e) => {
    e.preventDefault();
    clickSound.play();


    if (!isFormValid) {
      setStatusMessage("Please fill in all fields before sending.");
      setIsError(true);
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    const body = { name, email, message };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Unknown error");
      }

      setStatusMessage("Email sent. I'll get back with you shortly.");
      setIsError(false);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error sending email:", err);
      setStatusMessage(`Failed to send message: ${err.message}`);
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
      <h2 className="text-3xl font-semibold text-center text-white">Contact Me</h2>

      <div className="bg-black/60 border-t-2 border-b border-white w-full h-[70vh] p-10 px-60 flex flex-col justify-between text-white">
        <div className="flex flex-col space-y-6 flex-grow">
          <div className="flex flex-col">
            <label className="mb-1">Name:</label>
            <div className="bg-black border border p-2">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black w-full focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Email:</label>
            <div className="bg-black border border p-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black w-full focus:outline-none"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            <label className="mb-1">Message:</label>
            <div className="bg-black border border p-2 flex-grow">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black w-full h-full resize-none focus:outline-none"
                placeholder="Type your message here..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          {statusMessage && (
            <div className={`${isError ? 'text-red-500' : 'text-green-500'} text-sm`}>
              {statusMessage}
            </div>
          )}
          <div className="flex gap-2 ml-auto">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <div className="h-13 w-13 flex items-center justify-center">
                <img 
                  src="/images/icon-githublogo.png" 
                  alt="GitHub" 
                  className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition duration-200"
                />
              </div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <div className="h-10.5 w-10.5 flex items-center justify-center">
                <img 
                  src="/images/icon-linkedin.png" 
                  alt="LinkedIn" 
                  className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition duration-200"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <LargeButton text="Back" onClick={onBack} />
        <LargeButton 
          text={isSending ? "Sending..." : "Send"} 
          onClick={handleSubmit} 
          disabled={!isFormValid || isSending}
          className={`transition ${!isFormValid || isSending ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
};


const SettingsPage = ({ onBack, setBackgroundVideo, setBackgroundAudio, currentBackgroundVideoPath, currentBackgroundAudioPath }) => {
  // Sample background data with distinct images
  const backgroundsData = [
    { name: "Canyon", image: "images/framed-canyon.png", filepath: "/videos/background-canyon.mp4"},
    { name: "Coral", image: "images/framed-coral.png", filepath: "/videos/background-coral.mp4"},
    { name: "Jungle", image: "images/framed-jungle.png", filepath: "/videos/background-jungle.mp4"},
    { name: "Sakura", image: "images/framed-sakura.png", filepath: "/videos/background-sakura.mp4"},
    { name: "Village", image: "images/framed-village.png", filepath: "/videos/background-village.mp4"},
  ];
  
  // Sample music data with (now updated) different colors
  const musicData = [
    { name: "Moogcity", image: "images/icon-moogcity-disc.png", filepath: "audio/song-moogcity.mp3"},
    { name: "Haggstorm", image: "images/icon-haggstorm-disc.png", filepath: "audio/song-haggstorm.mp3"},
    { name: "Mice On Venus", image: "images/icon-mice-disc.png", filepath: "audio/song-mice.mp3"},
    { name: "Minecraft", image: "images/icon-minecraft-disc.png", filepath: "audio/song-minecraft.mp3"},
    { name: "Aria Math", image: "images/icon-aria-disc.png", filepath: "audio/song-aria.mp3"},
  ];
  
  // State for visible carousel items - array of exactly 3 indices
  const [visibleBackgroundIndices, setVisibleBackgroundIndices] = useState(() => 
    getInitialCarouselIndices(backgroundsData, currentBackgroundVideoPath, "filepath")
  );
  const [visibleMusicIndices, setVisibleMusicIndices] = useState(() =>
    getInitialCarouselIndices(musicData, currentBackgroundAudioPath, "filepath")
  );

  const clickSound = new Audio('/audio/effect-button.mp3');
  
  // Function to shift backgrounds carousel left
  const shiftBackgroundsRight = () => {
    clickSound.play();
    setVisibleBackgroundIndices(prevIndices => {
      // Calculate the new indices by shifting left
      return prevIndices.map(index => 
        (index + 1) % backgroundsData.length
      );
    });
  };
  
  // Function to shift backgrounds carousel right
  const shiftBackgroundsLeft = () => {
    clickSound.play();
    setVisibleBackgroundIndices(prevIndices => {
      // Calculate the new indices by shifting right
      return prevIndices.map(index => 
        (index - 1 + backgroundsData.length) % backgroundsData.length
      );
    });
  };
  
  // Function to shift music carousel left
  const shiftMusicRight = () => {
    clickSound.play();
    setVisibleMusicIndices(prevIndices => {
      // Calculate the new indices by shifting left
      return prevIndices.map(index => 
        (index + 1) % musicData.length
      );
    });
  };
  
  // Function to shift music carousel right
  const shiftMusicLeft = () => {
    clickSound.play();
    setVisibleMusicIndices(prevIndices => {
      // Calculate the new indices by shifting right
      return prevIndices.map(index => 
        (index - 1 + musicData.length) % musicData.length
      );
    });
  };
  
  // Get the selected items (middle of each carousel)
  const selectedBackground = backgroundsData[visibleBackgroundIndices[1]];
  const selectedMusic = musicData[visibleMusicIndices[1]];
  
  // Handler for Save button
  const handleSave = (videoPath, musicPath) => {
    clickSound.play();
    console.log(musicPath);
    console.log(videoPath);
    setBackgroundVideo([videoPath, "/images/background-jungle.jpg"]);
    setBackgroundAudio(musicPath);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-12 space-y-3">
      {/* Heading above the translucent box */}
      <h2 className="text-3xl font-semibold text-center text-white">Setting</h2>
      
      {/* FULL-WIDTH translucent container */}
      <div className="bg-black/60 border-t-2 border-b border-white w-full h-[70vh] p-10 px-20 flex flex-col justify-start text-white space-y-12">
        {/* Backgrounds carousel */}
        <div className="mb-10">
          <h3 className="text-2xl font-medium mb-8 text-center">Background</h3>
          
          <div className="flex items-center justify-center gap-4">
            {/* Left arrow button */}
            <button 
              onClick={shiftBackgroundsLeft}
              className="text-white text-2xl opacity-70 hover:opacity-100"
            >
              <img 
                src="/images/icon-next.png" 
                alt="Shift Left" 
                className="w-10 h-10"
                style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
              />
            </button>
            
            {/* Three carousel items using direct indices */}
            <div className="flex items-center justify-center gap-3">
              {/* Left item (index 0) */}
              <div className="transition-all duration-300 opacity-40 scale-90">
                <img 
                  src={backgroundsData[visibleBackgroundIndices[0]].image} 
                  alt={backgroundsData[visibleBackgroundIndices[0]].name}
                  className="w-50 h-32 object-cover"
                />
              </div>
              
              {/* Middle item (index 1) - highlighted */}
              <div className="transition-all duration-300 transform scale-110 opacity-100 z-10">
                <img 
                  src={backgroundsData[visibleBackgroundIndices[1]].image} 
                  alt={backgroundsData[visibleBackgroundIndices[1]].name}
                  className="w-50 h-32 object-cover"
                />
              </div>
              
              {/* Right item (index 2) */}
              <div className="transition-all duration-300 opacity-40 scale-90">
                <img 
                  src={backgroundsData[visibleBackgroundIndices[2]].image} 
                  alt={backgroundsData[visibleBackgroundIndices[2]].name}
                  className="w-50 h-32 object-cover"
                />
              </div>
            </div>
            
            {/* Right arrow button */}
            <button 
              onClick={shiftBackgroundsRight}
              className="text-white text-2xl opacity-70 hover:opacity-100"
            >
              <img 
                src="/images/icon-next.png" 
                alt="Shift Right" 
                className="w-10 h-10"
              />
            </button>
          </div>
          
          {/* Display the selected background name */}
          <p className="text-xl text-center mt-6">{selectedBackground.name}</p>
        </div>
        
        {/* Music carousel */}
        <div>
          <h3 className="text-2xl font-medium mb-8 text-center">Music</h3>
          
          <div className="flex items-center justify-center gap-4">
            {/* Left arrow button */}
            <button 
              onClick={shiftMusicLeft}
              className="text-white text-2xl opacity-70 hover:opacity-100"
            >
              <img 
                src="/images/icon-next.png" 
                alt="Shift Left" 
                className="w-10 h-10"
                style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
              />
            </button>
            
            {/* Three music items using direct indices */}
            <div className="flex items-center justify-center gap-3">
              {/* Left item (index 0) */}
              <img 
                src={musicData[visibleMusicIndices[0]].image} 
                alt={musicData[visibleMusicIndices[0]].name}
                className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-50 scale-90 brightness-75 saturate-50"
              />
              
              {/* Middle item (index 1) - highlighted */}
              <img 
                src={musicData[visibleMusicIndices[1]].image} 
                alt={musicData[visibleMusicIndices[1]].name}
                className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-100 scale-110 brightness-100 saturate-100 z-10"
              />
              
              {/* Right item (index 2) */}
              <img 
                src={musicData[visibleMusicIndices[2]].image} 
                alt={musicData[visibleMusicIndices[2]].name}
                className="w-32 h-32 object-cover rounded-full transition-all duration-300 opacity-50 scale-90 brightness-75 saturate-50"
              />
            </div>
            
            {/* Right arrow button */}
            <button 
              onClick={shiftMusicRight}
              className="text-white text-2xl opacity-70 hover:opacity-100"
            >
              <img 
                src="/images/icon-next.png" 
                alt="Shift Right" 
                className="w-10 h-10" 
              />
            </button>
          </div>
          
          {/* Display the selected music name */}
          <p className="text-xl text-center mt-6">{selectedMusic.name}</p>
        </div>
      </div>
      
      {/* Bottom buttons */}
      <div className="flex gap-4">
        <LargeButton text="Back" onClick={onBack} />
        <LargeButton text="Save" onClick={() => handleSave(selectedBackground.filepath, selectedMusic.filepath)} />
      </div>
    </div>
  );
};

export { AboutPage, ProjectsPage, ContactPage, SettingsPage };