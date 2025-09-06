import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function Login({ switchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const { login, isLoggingIn, googleAuth } = useAuthStore();

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
          text: "continue_with",
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "", general: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login(formData);

    if (!result.success) {
      if (
        result.error.includes("credentials") ||
        result.error.includes("Invalid")
      ) {
        setErrors({
          ...errors,
          general: "Email ou mot de passe incorrect",
        });
      } else if (result.error.includes("required")) {
        if (result.error.includes("email")) {
          setErrors({ ...errors, email: "L'email est requis" });
        } else if (result.error.includes("password")) {
          setErrors({ ...errors, password: "Le mot de passe est requis" });
        }
      } else {
        setErrors({ ...errors, general: result.error });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-manrope">
      <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden">
        <img
          src="Login.jpg"
          alt="Doctor"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center bg-blue-50 p-6 sm:p-8 md:p-10 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Se Connecter
          </h1>
          <p className="text-[#031B28] mb-8 text-sm md:text-base text-center ">
            Content de te retrouver, futur sauveur de vies !
          </p>

          {/* General error message */}
          {errors.general && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-6">
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
                  className={`px-4 py-3 bg-white border-2 rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 text-sm md:text-base ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#EBEBEB] focus:ring-[#2F6FED]"
                  }`}
                  required
                />
                <FaEnvelope className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 pl-4">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Entrer votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className={`px-4 py-3 bg-white border-2 rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 text-sm md:text-base pr-12 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#EBEBEB] focus:ring-[#2F6FED]"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 pl-4">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-6 md:mt-10 flex items-center justify-center gap-4 md:gap-6 px-8 md:px-16 lg:px-20 py-2 md:py-3 font-semibold bg-primary text-sm md:text-base lg:text-xl text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? "Connexion..." : "Se connecter"}
            </button>
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
            Vous n'avez pas un compte ?{" "}
            <button
              onClick={switchToSignup}
              className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
