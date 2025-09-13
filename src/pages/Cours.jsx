import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Specialties from "./cours/Specialties";
import Modules from "./cours/Modules";
import Courses from "./cours/Courses";
import CourseContent from "./cours/CourseContent";
import { Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function Cours() {
  const { authUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const yearMap = {
    1: "1ère année",
    2: "2ème année",
    3: "3ème année",
    4: "4ème année",
    5: "5ème année",
    6: "6ème année",
    7: "7ème année",
  };

  // Detect exact course content route: /cours/:specialty/:module/:course
  // This regex matches paths with exactly 3 segments after /cours
  const isCourseContent = /^\/cours\/[^/]+\/[^/]+\/[^/]+$/.test(
    location.pathname
  );

  return (
    <div className="flex min-h-screen bg-background font-manrope overflow-hidden">
      <Sidebar />
      <Chat />

      {/* central column */}
      <div
        className={`flex-1 md:mx-2 lg:mx-10 xl:mx-16 2xl:mx-20 p-2 md:p-3 lg:p-4 xl:pt-6 flex flex-col mx-auto`}
      >
        {/* HEADER global */}
        <div className="flex flex-col md:flex-row 2xl:pr-4 items-center justify-between mb-3 md:mb-4 gap-2.5">
          <div className="hidden md:flex w-full items-center justify-between">
            <h1 className="text-[clamp(1rem,1.1vw,1.4rem)] 2xl:text-2xl font-bold text-secondary 2xl:mx-6 ">
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

        {/* CONTENU DYNAMIQUE - wrapper relatif pour positionner le footer */}
        <div className={`relative flex-1 ${isCourseContent ? "pb-12" : ""}`}>
          <Routes>
            <Route index element={<Specialties searchQuery={searchQuery} />} />
            <Route
              path=":specialty"
              element={<Modules searchQuery={searchQuery} />}
            />
            <Route
              path=":specialty/:module"
              element={<Courses searchQuery={searchQuery} />}
            />
            <Route
              path=":specialty/:module/:course"
              element={<CourseContent searchQuery={searchQuery} />}
            />
          </Routes>

          {/* Footer visible ONLY on course-content route */}
          {isCourseContent && (
            <div className="absolute left-0 right-0 bottom-0 2xl:bottom-6 flex justify-center">
              <h1 className="w-full max-w-4xl text-center  md:text-sm text-secondary font-manrope ">
                Sélectionnez un texte, ou glissez-déposez le PDF pour poser
                votre question à IatroSense AI.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cours;
