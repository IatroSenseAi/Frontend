import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Cours() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Chat />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Page d'Accueil
          </h1>

          {authUser && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Informations de l'utilisateur
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Nom d'utilisateur:</strong> {authUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {authUser.email}
                </p>
                <p>
                  <strong>Faculté:</strong> {authUser.faculty}
                </p>
                <p>
                  <strong>Spécialité:</strong> {authUser.specialty}
                </p>
                <p>
                  <strong>Année:</strong> {authUser.year}ème année
                </p>
              </div>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Bienvenue sur la plateforme médicale !
            </h2>
            <p className="text-gray-700">
              Vous êtes maintenant connecté à votre espace personnel.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            Se Déconnecter
          </button>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Pour tester
            </h3>
            <p className="text-sm text-yellow-700">
              Cliquez sur "Se Déconnecter" pour revenir à la page de connexion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cours;
