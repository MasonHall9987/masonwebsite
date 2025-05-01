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

  const isFormValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill in all fields before sending.");
      return;
    }

    setIsSending(true);

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

      alert("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send message. Please try again later.");
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

        <div className="flex justify-end gap-2 mt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <div className="h-14 w-14 flex items-center justify-center">
              <img 
                src="/images/icon-githublogo.png" 
                alt="GitHub" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <img 
                src="/images/icon-linkedin.png" 
                alt="LinkedIn" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </a>
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
   return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen px-0 py-12 space-y-2">
      <div className="text-white">
      {/* Heading above the translucent box */}
      <h2 className="text-3xl text-center">About Me</h2>

      {/* FULL-WIDTH translucent container */}
      <div className="bg-black/60 border-t-2 border-b border-white w-full h-[70vh] p-10 px-20 flex flex-col justify-start">
      </div>
      </div>
    <LargeButton text="Back" onClick={() => onBack()} />   
    </div>
  );
};

export { AboutPage, ProjectsPage, ContactPage, SettingsPage };