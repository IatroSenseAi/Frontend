import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiArrowUp, FiX } from "react-icons/fi";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay (mobile only when opened) */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

      {/* Desktop Sidebar (collapsed state) */}
      <div
        className="hidden md:flex flex-col fixed top-0 right-0 h-screen w-20 bg-white z-40 rounded-l-3xl p-4"
        style={{ boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.15)" }}
      >
        {/* Logo at Top */}
        <div className="flex flex-col items-center mt-4 w-full">
          <img src="bot.svg" alt="Logo" className="w-10 h-10" />

          {/* Gradient line */}
          <div
            className="w-full h-[2px] mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #FFFFFF 0%, #005683 20%, #0077B6 50%, #003D5D 80%, #003F4500 100%)",
            }}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Open Button at Bottom */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 flex items-center justify-center bg-[#4A3AFF] text-white rounded-full hover:bg-[#3A2AEE] transition-colors"
          >
            <img src="chat-open.svg" alt="open" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Closed State */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 right-4 z-40">
          <button onClick={() => setIsOpen(true)}>
            <img
              src="chat-icn.svg"
              alt="open"
              className="w-12 h-12"
              style={{ boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.15)" }}
            />
          </button>
        </div>
      )}

      {/* Opened Sidebar (desktop + mobile) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen md:h-screen w-96 bg-white z-50 transform transition-transform duration-300 rounded-l-3xl
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.15)" }}
      >
        {isOpen && (
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
              {/* Left: Bot on desktop / X on mobile */}
              <div className="flex items-center space-x-2">
                <img
                  src="bot.svg"
                  alt="Bot"
                  className="w-10 h-10 hidden md:block"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden text-secondary hover:text-gray-900"
                >
                  <FiX size={26} />
                </button>
                <h1 className="text-2xl text-secondary ">
                  IatroSense Ai
                </h1>
              </div>

              {/* Right: chat-icn for both desktop + mobile */}
              <button onClick={() => setIsOpen(false)}>
                <img
                  src="chat-icn.svg"
                  alt="close"
                  className="w-8 h-8 cursor-pointer"
                />
              </button>
            </div>

            {/* Gradient line under header */}
            <div
              className="w-full h-[2px] mb-4 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF 0%, #005683 20%, #0077B6 50%, #003D5D 80%, #003F4500 100%)",
              }}
            />

            {/* Messages area (scrollable) */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {/* Future chat messages */}
            </div>

            {/* Greeting Section ABOVE the message bar */}
            <div className="px-4 text-center mb-2">
              <h2 className="text-3xl font-bold mb-2 text-secondary">
                Bonjour
              </h2>
              <p className=" text-lg text-secondary">
                Commencer à discuter avec IatroSense Ai
              </p>
              <img
                src="chat-img.svg"
                alt="Chat Illustration"
                className="w-64 h-64 mx-auto my-2"
              />
            </div>

            {/* Message Input Bar */}
            <div className="p-4">
              <div className="flex items-center border-2 border-secondary rounded-full px-3 py-2 ">
                {/* Plus icon */}
                <button className="text-secondary hover:text-gray-700">
                  <FiPlus size={22} />
                </button>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="flex-1 bg-transparent px-2 outline-none text-sm"
                />

                {/* Send button */}
                <button className="ml-2 bg-secondary text-white rounded-full p-2 hover:bg-[#3A2AEE] transition-colors">
                  <FiArrowUp size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
