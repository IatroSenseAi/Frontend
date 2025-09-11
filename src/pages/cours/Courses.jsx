import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Courses({ searchQuery }) {
  const { specialty, module } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(5);
  const containerRef = useRef(null);

  const courses = [
    {
      id: "anatomie-coeur",
      name: "Anatomie du coeur",
      date: "11-03-2026",
      progress: 75,
    },
    {
      id: "physio-base",
      name: "Bases de la Physiologie",
      date: "11-03-2026",
      progress: 60,
    },
    {
      id: "patho-intro",
      name: "Introduction à la Pathologie",
      date: "11-03-2026",
      progress: 45,
    },
    {
      id: "biochimie-avancee",
      name: "Biochimie Avancée",
      date: "12-03-2026",
      progress: 30,
    },
    {
      id: "pharmacologie",
      name: "Pharmacologie",
      date: "13-03-2026",
      progress: 20,
    },
    {
      id: "immunologie",
      name: "Immunologie",
      date: "14-03-2026",
      progress: 90,
    },
    { id: "neurologie", name: "Neurologie", date: "15-03-2026", progress: 10 },
    {
      id: "cardiologie",
      name: "Cardiologie",
      date: "16-03-2026",
      progress: 50,
    },
    {
      id: "pneumologie",
      name: "Pneumologie",
      date: "17-03-2026",
      progress: 65,
    },
    {
      id: "endocrinologie",
      name: "Endocrinologie",
      date: "18-03-2026",
      progress: 80,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1800) {
        setCoursesPerPage(6);
      } else {
        setCoursesPerPage(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of courses container when page changes
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="font-manrope flex flex-col min-h-[70vh] 2xl:px-4">
      <div className="flex items-center gap-2 mb-3">
        <Link
          to={`/cours/${specialty}`}
          className="flex items-center text-secondary hover:underline"
        >
          <ArrowLeft className="w-4 h-4 2xl:w-8 2xl:h-8 mr-1" />
        </Link>
        <h2 className="text-lg 2xl:text-2xl font-bold text-secondary">
          {module.charAt(0).toUpperCase() + module.slice(1)}
        </h2>
      </div>
      <h2 className="text-lg md:text-xl 2xl:text-3xl font-bold text-secondary my-3 2xl:my-6">
        Tous les cours
      </h2>

      <div className="hidden md:grid grid-cols-12 gap-2 px-6 2xl:px-8 mb-2 text-xs 2xl:text-lg font-semibold text-gray-600">
        <div className="col-span-6">Nom du cours</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-3">Progrès</div>
      </div>

      <div ref={containerRef} className="flex-grow">
        {currentCourses.map((course) => (
          <Link
            key={course.id}
            to={`/cours/${specialty}/${module}/${course.id}`}
            className=" bg-white cursor-pointer rounded-2xl 2xl:rounded-4xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] hover:shadow-lg transition-all duration-300 py-3 px-4 2xl:py-6 2xl:px-7 block mb-4 "
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
                <span className="">{course.date}</span>
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
          </Link>
        ))}
      </div>
      {filteredCourses.length > coursesPerPage && (
        <div className="mt-auto pt-6">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-secondary hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-8 h-8 rounded-full text-sm ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-secondary hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="md:hidden flex justify-center items-center mt-2 text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
