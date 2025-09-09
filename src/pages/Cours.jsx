"use client";

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Search, ChevronRight, Calendar } from "lucide-react";

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

      <div className="flex-1 md:mx-2 lg:mx-10 xl:mx-16 2xl:mx-20 p-2 md:p-3 lg:p-4 xl:p-6 flex flex-col mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-3 md:mb-4 gap-2.5">
          <div className="hidden md:flex w-full items-center justify-between">
            <h1 className="text-[clamp(0.9rem,1.1vw,1.4rem)] 2xl:text-2xl font-bold text-secondary">
              Cours
            </h1>

            <div className="flex flex-1 justify-center px-2.5">
              <div className="flex items-center w-full max-w-xs md:max-w-sm bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.1)] px-2 py-1.5 2xl:px-3 ">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 pl-1.5 pr-2 py-1 bg-transparent rounded-xl border-none focus:outline-none focus:ring-0 text-[clamp(0.7rem,0.8vw,0.9rem)] 2xl:text-base"
                />
                <Search className="text-gray-400 w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
              </div>
            </div>

            <h1 className="px-2 py-1 bg-cards text-secondary rounded-full font-medium text-[clamp(0.65rem,0.75vw,0.85rem)] 2xl:text-sm">
              {yearMap[authUser.year] || "Année inconnue"}
            </h1>
          </div>

          <div className="flex md:hidden w-full justify-between items-center px-12 mt-3">
            <h1 className="text-xl font-bold text-secondary">Cours</h1>
            <h1 className="px-3 py-2 bg-cards text-secondary rounded-full font-medium text-sm">
              {yearMap[authUser.year] || "Année inconnue"}
            </h1>
          </div>
        </div>

        <div className="relative mb-5 lg:mb-7 flex justify-center md:hidden">
          <div className="flex items-center w-full max-w-md bg-white rounded-[40px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] px-3 py-1.5">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-2 pr-2 py-2 bg-transparent rounded-xl border-none focus:outline-none focus:ring-0"
            />
            <Search className="text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Specialties Section with Enhanced Cards for Large Screens */}
        <div className="mb-5">
          <h2 className="text-[clamp(0.85rem,1vw,1.15rem)] 2xl:text-xl font-bold text-secondary mb-3">
            Les Spécialités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 w-full">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-cards rounded-xl p-4 md:p-5 2xl:p-6 cursor-pointer hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center h-full
                          min-[1800px]:p-8 min-[2000px]:p-10"
              >
                <div
                  className="flex-grow flex items-center justify-center mb-3 md:mb-4 w-full
                              min-[1800px]:mb-6 min-[2000px]:mb-8"
                >
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    className="w-[clamp(5rem,8vw,9rem)] h-[clamp(5rem,8vw,9rem)] 2xl:w-[10rem] 2xl:h-[10rem] object-contain
                              min-[1800px]:w-[12rem] min-[1800px]:h-[12rem] 
                              min-[2000px]:w-[16rem] min-[2000px]:h-[16rem]"
                  />
                </div>
                <div
                  className="flex items-center justify-between w-full mt-auto
                              min-[1800px]:mt-6 min-[2000px]:mt-8"
                >
                  <div className="text-left">
                    <h3
                      className="text-[clamp(0.85rem,1vw,1.1rem)] 2xl:text-xl font-bold mb-1
                                 min-[1800px]:text-2xl min-[2000px]:text-3xl
                                 min-[1800px]:mb-2 min-[2000px]:mb-3"
                    >
                      {specialty.title}
                    </h3>
                    <p
                      className="text-[clamp(0.7rem,0.8vw,0.9rem)] 2xl:text-base
                                 min-[1800px]:text-lg min-[2000px]:text-xl"
                    >
                      {specialty.courses}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0
                                        min-[1800px]:w-8 min-[1800px]:h-8
                                        min-[2000px]:w-10 min-[2000px]:h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[clamp(0.85rem,1vw,1.15rem)] 2xl:text-xl font-bold text-secondary mb-3 md:mb-3.5 lg:mb-4">
            Mes cours récents
          </h2>

          <div className="hidden md:grid grid-cols-12 gap-2.5 px-4 mb-2 text-xs 2xl:text-sm font-semibold text-gray-600">
            <div className="col-span-6">Nom du cours</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Progrès</div>
          </div>

          <div className="space-y-2 md:space-y-2.5 lg:space-y-2.5">
            {recentCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer rounded-lg shadow-[0px_2px_8px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-300 py-2.5 px-3.5 md:py-3 md:px-4 2xl:py-4 2xl:px-6"
              >
                <div className="hidden md:grid grid-cols-12 items-center gap-2">
                  <div className="col-span-6 flex items-center gap-1.5">
                    <img
                      src="cours-active.svg"
                      alt="cours"
                      className="h-6 w-6 2xl:h-8 2xl:w-8"
                    />
                    <span className="font-medium text-gray-900 text-[clamp(0.75rem,0.8vw,0.9rem)] 2xl:text-base">
                      {course.name}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1 text-gray-600 text-xs 2xl:text-sm">
                    <Calendar className="w-3 h-3 2xl:w-4 2xl:h-4" />
                    <span>{course.startDate}</span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1.5">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 2xl:h-2">
                      <div
                        className="bg-blue-600 h-1.5 2xl:h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs 2xl:text-sm font-medium text-blue-600">
                      {course.progress}%
                    </span>
                  </div>
                </div>

                <div className="md:hidden flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src="cours-active.svg"
                        alt="cours"
                        className="h-7 w-7"
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
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 mr-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
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
