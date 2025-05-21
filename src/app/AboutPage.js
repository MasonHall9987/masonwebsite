"use client";
import React from 'react';
import { LargeButton } from "./UIElements";

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
            Thank you so much for taking the time to check it out. If you\'re here to quickly view my resume and skills, feel free to click the link right
            <span> </span>
            <a href="/images/Mason-Hall-Resume.pdf" download className="underline-link hide-cursor-on-hover">here</a>.
          </p>

          <p>
            Growing up, I spent countless hours playing Minecraft — and if you did too, I think you\'ll enjoy the nostalgia I\'ve woven into this site. When it came time to build my portfolio, I couldn\'t think of a better way to showcase my work than through a Minecraft-inspired theme. I hope it brings a smile to your face!
          </p>

          <p>
            Here\'s how the site works:
            <ul className="list-none pl-5">
              <li className="marker:text-white">* Projects/Experience: Take a look at my relevant coding projects and professional experience.</li>
              <li className="marker:text-white">* About: Learn more about who I am and what drives me.</li>
              <li className="marker:text-white">* Contact: Find my contact information, and you can even send me an email directly through the form.</li>
              <li className="marker:text-white">* Settings: This is where the fun begins! Customize the site\'s theming, change the background video and music.</li>
            </ul>
          </p>

          <p>
            A little about me: I\'m currently a Senior at the University of Central Florida, studying Computer Science, and I\'ll be graduating in December 2025. When I\'m not coding, you\'ll find me enjoying hobbies like cooking, working out, language learning (currently A1 in Portuguese and B1 in Spanish), traveling, and — believe it or not — diving even deeper into technology.
          </p>

          <p>
            I\'ve dabbled in many different areas of coding: from front-end/back-end for both web development and app development, game development, machine learning, robotics and firmware. What excites me most is working on projects that make a real, positive impact on people\'s lives, all while challenging myself to innovate and grow within my field.
          </p>

          <p>
            At the end of the day, this website is more than just a portfolio — it\'s a reflection of who I am, my passions, and my journey. I hope you enjoy exploring it as much as I enjoyed creating it.
          </p>

          <p>Thank you again for visiting!</p>
        </div>
      </div>
    <LargeButton text="Back" onClick={() => onBack()} />   
    </div>
  );
};

export default AboutPage; 