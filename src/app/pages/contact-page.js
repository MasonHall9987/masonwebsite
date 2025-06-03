"use client";
import { useState } from 'react';
import { LargeButton } from "../components/UIElements";

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

      setStatusMessage("Email sent. I\'ll get back with you shortly.");
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

      <div className="translucent-container-contact px-60">
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

export default ContactPage; 