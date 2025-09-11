import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

function Modules({ searchQuery }) {
  const { specialty } = useParams();

  const modules = [
    { name: "Anatomie", courseCount: 100 },
    { name: "Physiologie", courseCount: 80 },
    { name: "Pathologie", courseCount: 60 },
    { name: "Anatomie", courseCount: 100 },
    { name: "Physiologie", courseCount: 80 },
    { name: "Pathologie", courseCount: 60 },
    { name: "Anatomie", courseCount: 100 },
    { name: "Physiologie", courseCount: 80 },
    { name: "Pathologie", courseCount: 60 },
  ];

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="2xl:p-4">
      <div className="flex items-center gap-2 mb-3">
        <Link
          to="/cours"
          className="flex items-center text-secondary hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
        </Link>
        <h2 className="text-lg font-bold text-secondary">
          {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
        </h2>
      </div>
      <h1 className="text-secondary font-bold text-2xl p-4">
        Tous les modules
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3  2xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 w-full">
        {filteredModules.map((module, index) => (
          <Link
            key={index}
            to={`/cours/${specialty}/${module.name.toLowerCase()}`}
            className=" rounded-3xl p-4 md:p-5 cursor-pointer hover:shadow-md transition-all duration-300 group flex bg-module  justify-between items-center"
          >
            <div className="text-secondary">
              <h3 className="text-lg font-bold mb-1">{module.name}</h3>
              <p className="text-sm">{module.courseCount} cours</p>
            </div>
            <ChevronRight className="w-8 h-8  text-primary group-hover:text-gray-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Modules;
