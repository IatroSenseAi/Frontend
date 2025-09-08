import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";

function MonCompte() {
  const { authUser } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 md:ml-20 lg:ml-80 flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Compte</h1>
          {authUser && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Informations personnelles
                </h2>
                <p>
                  <strong>Nom:</strong> {authUser.username}
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
                  <strong>Année:</strong> {authUser.year}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonCompte;
