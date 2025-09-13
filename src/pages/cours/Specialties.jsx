import { Link } from "react-router-dom";
import { ChevronRight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

function Specialties({ searchQuery }) {
  const specialties = [
    { title: "Médecine", courses: "1880 cours", image: "/medicine.svg" },
    { title: "Pharmacie", courses: "1880 cours", image: "/pharmacie.svg" },
    { title: "Dentaire", courses: "1880 cours", image: "/dentaire.svg" },
  ];

  const recentCourses = [
    { name: "Anatomie du Coeur", startDate: "11-03-2026", progress: 90 },
    { name: "Bases de la Physiologie", startDate: "11-03-2026", progress: 75 },
    { name: "Pharmacologie Avancée", startDate: "15-03-2026", progress: 60 },
  ];

  const filteredSpecialties = specialties.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="2xl:p-4">
      <div className="mb-1">
        <h2 className="text-lg md:text-xl font-bold text-secondary mb-1">
          Les Spécialités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {filteredSpecialties.map((specialty, index) => (
            <Link
              key={index}
              to={`/cours/${specialty.title.toLowerCase()}`}
              className="specialty-card bg-cards rounded-2xl p-3 md:p-4 cursor-pointer hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center h-full"
            >
              <div className="image-container">
                <img
                  src={specialty.image}
                  alt={specialty.title}
                  className="specialty-image h-16 w-16 object-contain"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-auto">
                <div className="text-left">
                  <h3 className="specialty-title text-base md:text-lg font-bold mb-1 text-primary">
                    {specialty.title}
                  </h3>
                  <p className="specialty-courses text-xs md:text-sm">
                    {specialty.courses}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg md:text-xl font-bold text-secondary mb-3">
          Mes cours récents
        </h2>

        <div className="hidden md:grid grid-cols-12 gap-2 px-4 mb-2 text-xs font-semibold text-gray-600">
          <div className="col-span-6">Nom du cours</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-3">Progrès</div>
        </div>

        <div className="recent-courses-container">
          {recentCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer rounded-2xl 2xl:rounded-4xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] hover:shadow-lg transition-all duration-300 py-3 px-4 2xl:py-6 2xl:px-7 block "
            >
              <div className="hidden md:grid grid-cols-12 items-center gap-3 ">
                <div className="col-span-6 flex items-center gap-2">
                  <img
                    src="/flashcards-active.svg"
                    alt="cours"
                    className=" h-8 w-8 2xl:h-10 2xl:w-10"
                  />
                  <span className=" font-bold text-secondary text-sm 2xl:text-lg ">
                    {course.name}
                  </span>
                </div>
                <div className="col-span-3 flex items-center gap-2 text-secondary text-sm 2xl:text-lg">
                  <Calendar className="w-3 h-3" />
                  <span className="">{course.startDate}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-secondary h-1.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className=" text-xs 2xl:text-lg font-medium text-secondary">
                    {course.progress}%
                  </span>
                </div>
              </div>

              <div className="md:hidden flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/cours-active.svg"
                      alt="cours"
                      className="h-6 w-6"
                    />
                    <span className="font-medium text-gray-900 text-xs">
                      {course.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{course.date}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 mr-2">
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
  );
}

export default Specialties;
