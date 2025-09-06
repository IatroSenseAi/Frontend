import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function CompleteProfile({ onComplete }) {
  const [formData, setFormData] = useState({
    faculty: "",
    specialty: "",
    year: "",
  });

  const { completeGoogleProfile, isCompletingProfile } = useAuthStore();

  // Faculties data matching backend enum
  const faculties = [
    "Faculté de Médecine Dr Ben Zerjeb – Université Abou Bekr Belkaïd – Tlemcen",
    "Faculté de Médecine – Université Djillali Liabès – Sidi Bel Abbès",
    "Faculté de Médecine Ahmed Ben Zerguine – Université d'Oran 1 Ahmed Ben Bella – Oran",
    "Faculté de Médecine Moulay Driss Mansouri – Université des Sciences et de la Technologie d'Oran Mohamed Boudiaf (USTO-MB) – Oran",
    "Faculté de Médecine – Université d'Alger 1 Benyoucef Benkhedda – Alger",
    "Faculté de Médecine – Université Saâd Dahlab – Blida",
    "Faculté de Médecine – Université Ferhat Abbas Sétif 1 – Sétif",
    "Faculté de Médecine – Université Mouloud Mammeri – Tizi Ouzou",
    "Faculté de Médecine – Université Constantine 3 Salah Boubnider – Constantine",
    "Faculté de Médecine – Université Badji Mokhtar – Annaba",
    "Faculté de Médecine – Université Abderrahmane Mira – Béjaïa",
    "Faculté de Médecine – Université Kasdi Merbah – Ouargla",
    "Faculté de Médecine – Université Tahar Moulay – Béchar",
    "Faculté de Médecine – Université Amar Telidji – Laghouat",
    "Faculté de Médecine – Université de Batna 2 Mostefa Ben Boulaïd – Batna",
    "Faculté de Médecine – Université Abdelhamid Ibn Badis – Mostaganem",
  ];

  // Specialties data matching backend enum
  const specialties = ["medecine", "pharmacie", "dentaire"];

  // Years data matching backend enum
  const years = ["1", "2", "3", "4", "5", "6", "7"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getYearLabel = (year) => {
    if (year === "1") return "1ère année";
    if (year === "2") return "2ème année";
    return `${year}ème année`;
  };

  const validateForm = () => {
    if (!formData.faculty) {
      toast.error("La faculté est requise");
      return false;
    }
    if (!formData.specialty) {
      toast.error("La spécialité est requise");
      return false;
    }
    if (!formData.year) {
      toast.error("L'année est requise");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await completeGoogleProfile(formData);
    if (result.success) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-manrope">
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center bg-blue-50 p-6 sm:p-8 md:p-10 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Compléter votre profil
          </h1>
          <p className="text-[#031B28] mb-8 text-sm md:text-base text-center">
            Veuillez compléter vos informations pour finaliser votre inscription
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Faculté
              </label>
              <div className="relative">
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base appearance-none"
                  required
                >
                  <option value="">Choisir votre faculté</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Spécialité
              </label>
              <div className="relative">
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base appearance-none"
                  required
                >
                  <option value="">Quelle est votre spécialité</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Année
              </label>
              <div className="relative">
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base appearance-none"
                  required
                >
                  <option value="">Choisir l'année</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {getYearLabel(year)}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCompletingProfile}
              className="flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-[#1976d2] text-sm text-white rounded-full shadow-md hover:bg-[#1565c0] transition cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isCompletingProfile ? "Enregistrement..." : "Terminer"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden">
        <img
          src="Signup.jpg"
          alt="Doctor"
          className="w-full h-full object-cover object-left"
        />
      </div>
    </div>
  );
}
