import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Flashcards() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Chat />
      <div className="ml-0 md:ml-20 lg:ml-80 flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Flashcards</h1>
          <p>Contenu des flashcards à venir...</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcards;
