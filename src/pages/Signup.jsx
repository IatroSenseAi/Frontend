import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

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

  const { signup, isSigningUp, googleAuth } = useAuthStore();

  const steps = ["Etape 1", "Etape 2", "Etape 03"];

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

  useEffect(() => {
    // Load Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
          width: 300,
          text: "signup_with",
          shape: "pill",
        }
      );
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      const result = await googleAuth(response.credential);
      if (result.success) {
        toast.success("Connecté avec Google");
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion avec Google");
    }
  };

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

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 0:
        if (!formData.username.trim()) {
          toast.error("Le nom d'utilisateur est requis");
          return false;
        }
        if (!formData.email.trim()) {
          toast.error("L'email est requis");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Format d'email invalide");
          return false;
        }
        return true;

      case 1:
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

      case 2:
        if (!formData.password) {
          toast.error("Le mot de passe est requis");
          return false;
        }
        if (formData.password.length < 6) {
          toast.error("Le mot de passe doit contenir au moins 6 caractères");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Les mots de passe ne correspondent pas");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    if (step < 2) {
      setStep(step + 1);
      return;
    }

    // Final validation before submission
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) return;

    const result = await signup(formData);
    if (result.success) {
      // Optional: redirect or do something on success
    }
  };

  const getYearLabel = (year) => {
    if (year === "1") return "1ère année";
    if (year === "2") return "2ème année";
    return `${year}ème année`;
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

          <form onSubmit={handleSubmit} className="w-full">
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
                          required
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
                          required
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
                              {specialty.charAt(0).toUpperCase() +
                                specialty.slice(1)}
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
                          required
                          minLength={6}
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
                          required
                          minLength={6}
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
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center justify-center px-4 py-2 font-semibold bg-white text-sm border border-[#1976d2] text-[#1976d2] rounded-full shadow-md hover:bg-gray-50 transition cursor-pointer"
                  style={{ minWidth: "100px" }}
                >
                  Retour
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(step)) {
                      setStep(step + 1);
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-[#1976d2] text-sm text-white rounded-full shadow-md hover:bg-[#1565c0] transition cursor-pointer flex-1"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-semibold bg-[#1976d2] text-sm text-white rounded-full shadow-md hover:bg-[#1565c0] transition cursor-pointer flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningUp ? "Inscription..." : "Terminer"}
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center w-full mt-10">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">
              Ou Continuer avec
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center mt-4 w-full">
            <div id="googleSignInButton"></div>
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
