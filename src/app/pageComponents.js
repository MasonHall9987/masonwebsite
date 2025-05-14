// pageComponents.js
"use client";
import { LargeButton, SmallButton } from "./UIElements";
import {React,useState} from "react";



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
            Here’s how the site works:
            <ul className="list-none pl-5">
              <li className="marker:text-white">* Projects/Experience: Take a look at my relevant coding projects and professional experience.</li>
              <li className="marker:text-white">* About: Learn more about who I am and what drives me.</li>
              <li className="marker:text-white">* Contact: Find my contact information, and you can even send me an email directly through the form.</li>
              <li className="marker:text-white">* Settings: This is where the fun begins! Customize the site's theming, change the background video and music.</li>
            </ul>
          </p>

          <p>
            A little about me: I’m currently a Senior at the University of Central Florida, studying Computer Science, and I’ll be graduating in December 2025. When I’m not coding, you’ll find me enjoying hobbies like cooking, working out, language learning (currently A1 in Portuguese and B1 in Spanish), traveling, and — believe it or not — diving even deeper into technology.
          </p>

          <p>
            I’ve dabbled in many different areas of coding: from front-end/back-end for both web development and app development, game development, machine learning, robotics and firmware. What excites me most is working on projects that make a real, positive impact on people’s lives, all while challenging myself to innovate and grow within my field.
          </p>

          <p>
            At the end of the day, this website is more than just a portfolio — it’s a reflection of who I am, my passions, and my journey. I hope you enjoy exploring it as much as I enjoyed creating it.
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


// Settings Page Component
const SettingsPage = ({ onBack }) => {
  // Sample background data with distinct images
  const backgroundsData = [
    { name: "Forest", image: "images/background-sakura.jpg" },
    { name: "Ocean", image: "images/background-sakura.jpg" },
    { name: "Mountain", image: "images/background-sakura.jpg" },
  ];
  
  // Sample music data with different colors
  const musicData = [
    { name: "Moogcity", image: "images/icon-yellow-disc.png" },
    { name: "Moogcity 2", image: "images/icon-red-disc.png" },
    { name: "Mice On Venus", image: "images/icon-blue-disc.png" },
  ];
  
  // State for carousel items in display order
  const [backgrounds, setBackgrounds] = useState([...backgroundsData]);
  const [musicTracks, setMusicTracks] = useState([...musicData]);

  const clickSound = new Audio('/audio/effect-button.mp3');

  
  // Function to shift backgrounds carousel left
  const shiftBackgroundsLeft = () => {
    clickSound.play();
    setBackgrounds(prevState => {
      const newArray = [...prevState];
      // Remove the first item and add it to the end
      const firstItem = newArray.shift();
      newArray.push(firstItem);
      return newArray;
    });
  };
  
  // Function to shift backgrounds carousel right
  const shiftBackgroundsRight = () => {
    clickSound.play();
    setBackgrounds(prevState => {
      const newArray = [...prevState];
      // Remove the last item and add it to the beginning
      const lastItem = newArray.pop();
      newArray.unshift(lastItem);
      return newArray;
    });
  };
  
  // Function to shift music carousel left
  const shiftMusicLeft = () => {
      clickSound.play();
      setMusicTracks(prevState => {
      const newArray = [...prevState];
      // Remove the first item and add it to the end
      const firstItem = newArray.shift();
      newArray.push(firstItem);
      return newArray;
    });
  };
  
  // Function to shift music carousel right
  const shiftMusicRight = () => {
    clickSound.play();
    setMusicTracks(prevState => {
      const newArray = [...prevState];
      // Remove the last item and add it to the beginning
      const lastItem = newArray.pop();
      newArray.unshift(lastItem);
      return newArray;
    });
  };
  
  // Get currently selected items (middle of carousel)
  const selectedBackground = backgrounds[1];
  const selectedMusic = musicTracks[1];
  
  // Handler for Save button
  const handleSave = () => {
   clickSound.play();
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
    src="/images/icon-arrow.png" 
    alt="Shift Right" 
    className="w-15 h-10" 
    style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
  />
</button>
            {/* Carousel items */}
            <div className="flex items-center justify-center gap-6">
              {backgrounds.map((background, index) => (
                <div 
                  key={index}
                  className={`
                    transition-all duration-300
                    ${index === 1 
                      ? "transform scale-110 opacity-100 z-10 border-2 border-white" 
                      : "opacity-40 scale-90"}
                  `}
                >
                  <img 
                    src={background.image} 
                    alt={background.name}
                    className="w-50 h-32 object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Right arrow button */}
    <button 
  onClick={shiftBackgroundsRight}
  className="text-white text-2xl opacity-70 hover:opacity-100"
>
  <img 
    src="/images/icon-arrow.png" 
    alt="Shift Right" 
    className="w-15 h-10" 
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
    alt="Shift Right" 
    className="w-10 h-10"
    style={{ transform: 'rotate(180deg) scaleY(-1)' }} 
  />
            </button>
            
            {/* Music disc items */}
            <div className="flex items-center justify-center gap-6">
  {musicTracks.map((music, index) => (
    <img 
      key={index}
      src={music.image} 
      alt={music.name}
      className={`
        w-32 h-32 object-cover rounded-full transition-all duration-300
        ${index === 1 
          ? "opacity-100 scale-110 brightness-100 saturate-100 z-10" 
          : "opacity-50 scale-90 brightness-75 saturate-50"}
      `}
    />
  ))}
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
        <LargeButton text="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export { AboutPage, ProjectsPage, ContactPage, SettingsPage };