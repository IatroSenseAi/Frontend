import React, { useState } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button (only visible on mobile when closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 right-4 z-50 p-3 bg-[#4A3AFF] text-white rounded-full shadow-lg hover:bg-[#3A2AEE] transition-colors"
        >
          <FiMessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* Desktop Floating Button (only visible when closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden md:flex fixed top-1/2 right-4 z-50 p-3 bg-[#4A3AFF] text-white rounded-full shadow-lg hover:bg-[#3A2AEE] transition-colors transform -translate-y-1/2"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Overlay - No blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Full height in both open and closed states */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-40 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-[#4A3AFF] text-white flex items-center justify-between h-16">
          <h2 className="text-lg font-semibold">IATROSENSE AI</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-[#3A2AEE] rounded transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-[calc(100%-4rem)] flex flex-col">
          {/* Welcome Message */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bonjour !</h3>
            <p className="text-gray-600">
              Commencer à discuter avec IATROSENSE AI
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Internet Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  INTERNET
                </span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  Power Line questions à IATROSENSE AI...
                </p>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-500">
                Aucun message pour le moment
              </div>
            </div>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="mt-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 text-[#4A3AFF] hover:text-[#3A2AEE] disabled:text-gray-400"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
