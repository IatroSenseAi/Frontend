import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";

export default function Signup({ switchToLogin }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    faculty: "",
    specialty: "",
    year: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = ["Etape 1", "Etape 2", "Etape 03"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-manrope">
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center bg-blue-50 p-6 sm:p-8 md:p-10 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            S'inscrire
          </h1>
          <p className="text-[#031B28] mb-8 text-sm md:text-base text-center">
            Commence ton parcours dès aujourd'hui
          </p>

          <div className="w-full mb-8">
            <div className="flex items-center justify-between">
              {steps.map((label, index) => (
                <div key={label} className="flex items-center">
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        index <= step ? "bg-green-500" : "bg-gray-300"
                      } mr-2`}
                      style={{ minWidth: "40px" }}
                    ></div>
                  )}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < step
                          ? "bg-green-500"
                          : index === step
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {index < step ? (
                        <CheckIcon sx={{ fontSize: 18, color: "white" }} />
                      ) : (
                        <span
                          className={`text-sm ${
                            index === step ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        index < step
                          ? "text-green-600"
                          : index === step
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full min-h-72">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="absolute w-full space-y-6"
                >
                  <div>
                    <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                      Nom d'utilisateur
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        placeholder="Entrer votre nom d'utilisateur"
                        value={formData.username}
                        onChange={handleChange}
                        className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                      />
                      <FaUser className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Entrer votre email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                      />
                      <FaEnvelope className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="absolute w-full space-y-6"
                >
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
                      >
                        <option value="">Choisir votre faculté</option>
                        <option value="medecine">Médecine</option>
                        <option value="pharmacie">Pharmacie</option>
                        <option value="dentaire">Dentaire</option>
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
                      >
                        <option value="">Quelle est votre spécialité</option>
                        <option value="cardiologie">Cardiologie</option>
                        <option value="pediatrie">Pédiatrie</option>
                        <option value="chirurgie">Chirurgie</option>
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
                      >
                        <option value="">Choisir l'année</option>
                        <option value="1">1ère année</option>
                        <option value="2">2ème année</option>
                        <option value="3">3ème année</option>
                      </select>
                      <FaChevronDown className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="absolute w-full space-y-6"
                >
                  <div>
                    <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Minimum 8 caractères"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base pr-12"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmer votre mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base pr-12"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 pt-8 w-full">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center justify-center px-4 py-2 font-semibold bg-white text-sm border border-[#1976d2] text-[#1976d2] rounded-full shadow-md hover:bg-gray-50 transition cursor-pointer"
                style={{ minWidth: "100px" }}
              >
                Retour
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-[#1976d2] text-sm text-white rounded-full shadow-md hover:bg-[#1565c0] transition cursor-pointer flex-1"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={() => alert("Inscription réussie !")}
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-[#1976d2] text-sm text-white rounded-full shadow-md hover:bg-[#1565c0] transition cursor-pointer flex-1"
              >
                Terminer
              </button>
            )}
          </div>

          <div className="flex items-center w-full mt-10">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">
              Ou Continuer avec
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="border rounded-full p-3 hover:bg-gray-100 transition-colors">
              <img
                src="Google.svg"
                alt="google"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
            <button className="border rounded-full p-3 hover:bg-gray-100 transition-colors">
              <img
                src="Facebook.svg"
                alt="facebook"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
          </div>

          <p className="mt-8 text-sm text-[#031B28] text-center">
            Avez-vous déjà un compte ?{" "}
            <button
              onClick={switchToLogin}
              className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
            >
              Se connecter
            </button>
          </p>
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
