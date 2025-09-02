import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login({ switchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

          <div className="w-full space-y-6">
            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                />
                <FaEnvelope className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm md:text-base mb-3 md:mb-2 pl-4">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrer votre mot de passe"
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
          </div>

          <button className="mt-6 md:mt-10 flex items-center justify-center gap-4 md:gap-6 px-8 md:px-16 lg:px-20 py-2 md:py-3 font-semibold bg-primary text-sm md:text-base lg:text-xl text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer w-full">
            Se connecter
          </button>

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
