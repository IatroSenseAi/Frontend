"use client";

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Search, ChevronRight, BookOpen, Calendar } from "lucide-react";

function Cours() {
  const { authUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const yearMap = {
    1: "1ère année",
    2: "2ème année",
    3: "3ème année",
    4: "4ème année",
    5: "5ème année",
    6: "6ème année",
    7: "7ème année",
  };

  const specialties = [
    { title: "Médecine", courses: "1880 cours", image: "medicine.svg" },
    { title: "Pharmacie", courses: "1880 cours", image: "pharmacie.svg" },
    { title: "Dentaire", courses: "1880 cours", image: "dentaire.svg" },
  ];

  const recentCourses = [
    { name: "Anatomie du Coeur", startDate: "11-03-2026", progress: 90 },
    { name: "Bases de la Physiologie", startDate: "11-03-2026", progress: 75 },
    {
      name: "Introduction à la Pathologie",
      startDate: "11-03-2026",
      progress: 60,
    },
    { name: "Sémiologie Clinique", startDate: "11-03-2026", progress: 40 },
  ];

  return (
    <div className="flex min-h-screen bg-background font-manrope overflow-hidden">
      <Sidebar />
      <Chat />

      <div className="flex-1 md:mx-24 lg:mx-24  p-4 lg:p-8 flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 lg:mb-8 gap-4">
          <div className="hidden md:flex w-full items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold text-secondary">
              Cours
            </h1>

            <div className="flex flex-1 justify-center px-8">
              <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-[0px_4px_20px_rgba(0,0,0,0.15)] px-4 py-1">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 pl-2 pr-2 py-2 bg-transparent rounded-xl border-none focus:outline-none focus:ring-0"
                />
                <Search className="text-gray-400 w-5 h-5" />
              </div>
            </div>

            <h1 className="px-3 py-2 lg:px-4 lg:py-2 bg-cards text-secondary rounded-full border-none font-medium text-sm lg:text-base">
              {yearMap[authUser.year] || "Année inconnue"}
            </h1>
          </div>

          <div className="flex md:hidden w-full justify-between items-center px-12 mt-1">
            <h1 className="text-2xl font-bold text-secondary">Cours</h1>
            <h1 className="px-3 py-2 bg-cards text-secondary rounded-full border-none font-medium text-sm">
              {yearMap[authUser.year] || "Année inconnue"}
            </h1>
          </div>
        </div>

        <div className="relative mb-6 lg:mb-8 flex justify-center md:hidden">
          <div className="flex items-center w-full max-w-md bg-white rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] px-4 py-2">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-2 pr-2 py-2 bg-transparent rounded-xl border-none focus:outline-none focus:ring-0"
            />
            <Search className="text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-secondary mb-4 lg:mb-6">
            Les Spécialités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-cards rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center h-full"
              >
                <img
                  src={specialty.image}
                  alt={specialty.title}
                  className="w-40 h-40 object-contain mb-4"
                />
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <h3 className="text-lg lg:text-xl font-bold mb-1">
                      {specialty.title}
                    </h3>
                    <p className="text-sm">{specialty.courses}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-secondary mb-4 lg:mb-6">
            Mes cours récents
          </h2>

          <div className="hidden md:grid grid-cols-12 gap-4 px-8 mb-2 text-sm font-semibold text-gray-600">
            <div className="col-span-6">Nom du cours</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Progrès</div>
          </div>

          <div className="space-y-3">
            {recentCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer rounded-[30px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all duration-300 py-4 px-6"
              >
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-12 items-center gap-4">
                  <div className="col-span-6 flex items-center gap-3">
                    <img
                      src="cours-active.svg"
                      alt="cours"
                      className="h-10 w-10"
                    />
                    <span className="font-medium text-gray-900">
                      {course.name}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{course.startDate}</span>
                  </div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {course.progress}%
                    </span>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src="cours-active.svg"
                        alt="cours"
                        className="h-8 w-8"
                      />
                      <span className="font-medium text-gray-900 text-sm">
                        {course.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{course.startDate}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cours;
