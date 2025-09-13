import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiArrowUp, FiX } from "react-icons/fi";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

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
      {isOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

      <div
        className="hidden md:flex flex-col fixed top-0 right-0 h-screen 
        w-[clamp(3.5rem,4vw,5rem)] 2xl:w-[clamp(4rem,4.5vw,6rem)]
        font-manrope bg-white z-40 rounded-l-3xl 
        p-[clamp(0.4rem,0.7vw,1rem)] "
        style={{ boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="flex flex-col items-center mt-[clamp(0.5rem,1vw,1.5rem)] w-full">
          <img
            src="/bot.svg"
            alt="Logo"
            className="w-[clamp(1.5rem,1.8vw,2.2rem)] h-[clamp(1.5rem,1.8vw,2.2rem)]"
          />
          <div
            className="w-full h-[2px] mt-[clamp(0.5rem,1vw,1.5rem)] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #FFFFFF 0%, #005683 20%, #0077B6 50%, #003D5D 80%, #003F4500 100%)",
            }}
          />
        </div>

        <div className="flex-1" />

        <div className="flex justify-center mb-[clamp(0.5rem,1vw,1.5rem)]">
          <button
            onClick={() => setIsOpen(true)}
            className="w-[clamp(2rem,2.5vw,2.8rem)] h-[clamp(2rem,2.5vw,2.8rem)]
            flex items-center justify-center bg-primary text-white rounded-full 
            hover:bg-[#3A2AEE] transition-colors cursor-pointer"
          >
            <img
              src="/chat-open.svg"
              alt="open"
              className="w-[clamp(1rem,1.3vw,1.5rem)] h-[clamp(1rem,1.3vw,1.5rem)]"
            />
          </button>
        </div>
      </div>

      {!isOpen && (
        <div className="md:hidden fixed mt-5 right-4 font-manrope z-40">
          <button onClick={() => setIsOpen(true)}>
            <img src="/chat-icn.svg" alt="open" className="w-8 h-8" />
          </button>
        </div>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 font-manrope h-screen 
        w-[clamp(16rem,22vw,24rem)] 2xl:w-[clamp(24rem,26vw,28rem)]
        bg-white z-50 transform transition-transform duration-300 rounded-l-3xl
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.15)" }}
      >
        {isOpen && (
          <div className="flex flex-col h-full p-[clamp(0.6rem,1vw,1.2rem)] py-4">
            <div className="flex justify-between items-center p-[clamp(0.4rem,0.8vw,1rem)]">
              <div className="flex items-center space-x-[clamp(0.3rem,0.6vw,0.8rem)]">
                <img
                  src="/bot.svg"
                  alt="Bot"
                  className="hidden md:block w-[clamp(1.2rem,1.6vw,2rem)] h-[clamp(1.2rem,1.6vw,2rem)]"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden text-secondary hover:text-gray-900"
                >
                  <FiX size={22} />
                </button>
                <h1 className="text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold text-secondary">
                  IatroSense Ai
                </h1>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <img
                  src="/chat-icn.svg"
                  alt="close"
                  className="w-[clamp(1.2rem,1.5vw,1.8rem)] h-[clamp(1.2rem,1.5vw,1.8rem)] cursor-pointer"
                />
              </button>
            </div>

            <div
              className="w-full h-[2px] mb-[clamp(0.4rem,0.8vw,1rem)] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF 0%, #005683 20%, #0077B6 50%, #003D5D 80%, #003F4500 100%)",
              }}
            />

            <div className="flex-1 overflow-y-auto px-[clamp(0.5rem,1vw,1.2rem)] py-2">
              {/* Future chat messages */}
            </div>

            <div className="px-[clamp(0.5rem,1vw,1.2rem)] text-center mb-2">
              <h2 className="text-[clamp(1rem,1.3vw,1.6rem)] font-bold mb-1 text-secondary">
                Bonjour
              </h2>
              <p className="text-[clamp(0.75rem,0.9vw,1rem)] text-secondary">
                Commencer à discuter avec IatroSense Ai
              </p>
              <img
                src="/chat-img.svg"
                alt="Chat Illustration"
                className="w-[clamp(8rem,12vw,14rem)] h-auto mx-auto my-2"
              />
            </div>

            <div className="">
              <div
                className="flex items-center border-2 border-secondary rounded-full 
              px-[clamp(0.4rem,0.6vw,0.8rem)] py-[clamp(0.2rem,0.4vw,0.5rem)]
             md:pr-[clamp(0.4rem,0.6vw,0.8rem)]" 
              >
                <button className="text-secondary hover:text-gray-700">
                  <FiPlus className="w-[clamp(1rem,1.2vw,1.4rem)] h-[clamp(1rem,1.2vw,1.4rem)]" />
                </button>

                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="flex-1 bg-transparent px-2 outline-none 
                  text-[clamp(0.75rem,0.9vw,1rem)]"
                />

                <button
                  className="ml-2 bg-secondary text-white rounded-full  
                p-[clamp(0.3rem,0.5vw,0.6rem)] hover:bg-[#3A2AEE] transition-colors"
                >
                  <FiArrowUp className="w-[clamp(0.8rem,1vw,1.1rem)] h-[clamp(0.8rem,1vw,1.1rem)]" />
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
