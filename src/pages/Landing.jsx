import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

import Icon1 from "../assets/1.svg";
import Icon2 from "../assets/2.svg";
import Icon3 from "../assets/3.svg";
import Icon4 from "../assets/4.svg";
import Icon5 from "../assets/5.svg";
import Icon6 from "../assets/6.svg";
import Phone from "../assets/phone.svg";
import Mail from "../assets/mail.svg";
import Facebookcontact from "../assets/facebook.svg";
import LinkedIncontact from "../assets/linkedin.svg";

export default function Landing() {
  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = ["home", "why", "about", "services", "contact"];
      const scrollPos = window.scrollY + 200;
      for (let i = 0; i < sections.length; i++) {
        const elem = document.getElementById(sections[i]);
        if (elem && scrollPos >= elem.offsetTop) {
          setActive(sections[i]);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 py-4 md:py-10bg-opacity-95">
        <h1 className="text-2xl md:text-4xl font-bold font-righteous text-secondary">
          IatroSense Ai
        </h1>
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-secondary p-2 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
        {!isMobile && (
          <>
            <nav className="flex-1 flex font-manrope justify-center items-center gap-6 lg:gap-12 xl:gap-20 text-secondary font-medium relative">
              {[
                { id: "home", label: "Accueil" },
                { id: "why", label: "Pourquoi nous ?" },
                { id: "about", label: "À propos" },
                { id: "services", label: "Nos Services" },
              ].map((link) => (
                <div key={link.id} className="relative">
                  <a
                    onClick={() => handleScroll(link.id)}
                    className={`text-base lg:text-xl cursor-pointer hover:text-primary ${
                      active === link.id ? "font-bold" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                  {active === link.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-2 h-1 bg-primary w-8 rounded-full"
                    />
                  )}
                </div>
              ))}
            </nav>
            <div className="flex gap-2 md:gap-4">
              <button className="flex flex-row justify-center font-manrope items-center px-6 md:px-12 py-2 cursor-pointer bg-primary text-white rounded-full text-sm md:text-base font-bold hover:bg-secondary transition">
                S'inscrire
              </button>
              <button className="flex flex-row justify-center font-manrope items-center px-6 md:px-12 py-2 bg-accent text-secondary rounded-full text-sm md:text-base font-bold hover:bg-primary hover:text-white transition cursor-pointer">
                Se connecter
              </button>
            </div>
          </>
        )}
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-background shadow-lg p-4 flex flex-col items-center space-y-4"
          >
            {[
              { id: "home", label: "Accueil" },
              { id: "why", label: "Pourquoi nous ?" },
              { id: "about", label: "À propos" },
              { id: "services", label: "Nos Services" },
            ].map((link) => (
              <a
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className={`text-lg cursor-pointer hover:text-primary ${
                  active === link.id ? "font-bold text-primary" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 cursor-pointer bg-primary text-white rounded-full text-sm font-bold hover:bg-secondary transition">
                S'inscrire
              </button>
              <button className="px-6 py-2 bg-accent text-secondary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition cursor-pointer">
                Se connecter
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center px-4 md:px-16 pt-32 md:pt-48 pb-10"
        style={{
          backgroundImage: "url('/doctor-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right top",
        }}
      >
        <div className="relative z-10 flex-1 max-w-4xl">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-righteous mb-4 text-secondary leading-tight md:leading-[1.1]">
            IatroSense Ai
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold font-manrope mb-6 leading-snug">
            Votre compagnon d'apprentissage médical
          </p>
          <div className="max-w-3xl">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-subhead mb-6 font-manrope leading-relaxed">
              La plateforme médicale, renforcée par l'IA, qui simplifie vos
              révisions et vous rapproche chaque jour du médecin que vous rêvez
              d'être.
            </p>
          </div>
          <button className="my-10 md:my-20 flex items-center gap-4 md:gap-6 px-10 md:px-20 py-3 font-manrope font-semibold bg-primary text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
            <span className="text-base md:text-xl">Essayer IatroSense</span>
            <span className="text-2xl md:text-4xl">→</span>
          </button>
        </div>
      </section>

      {/* Why Us */}
      <section
        id="why"
        className="min-h-screen flex items-center justify-center px-4 md:px-16 bg-[#EAF9FD]"
      >
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20 mt-14 font-manrope text-secondary text-center md:text-left">
            Pourquoi Nous ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_2fr] gap-12 md:gap-16 items-start font-manrope">
            <div className="flex flex-col gap-12">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold font-manrope text-primary">
                  01 .
                </h3>
                <h4 className="text-xl md:text-2xl lg:text-4xl font-manrope font-bold text-primary">
                  Précision médicale inégalée :
                </h4>
                <p className="text-subhead text-base md:text-xl font-manrope leading-relaxed">
                  Un socle clair en physiologie et physiopathologie pour un
                  raisonnement clinique solide.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold font-manrope text-primary">
                  03 .
                </h3>
                <h4 className="text-xl md:text-2xl lg:text-4xl font-manrope font-bold text-primary">
                  Une alternative aux ressources dispersées :
                </h4>
                <p className="text-subhead text-base md:text-xl font-manrope leading-relaxed">
                  Organisation simplifiée, apprentissage interactif et
                  assimilation rapide.
                </p>
              </div>
            </div>

            <div className="flex justify-center relative mt-10 md:mt-20 mb-10 md:mb-20">
              <div className="relative flex justify-center">
                <img
                  src="/why-ba.jpg"
                  alt="Medical Professionals"
                  className="w-80 md:w-96 lg:w-[26rem] h-52 md:h-64 lg:h-80 object-cover rounded-4xl"
                />
                <img
                  src="/why-fr.jpg"
                  alt="Laptop with Medical Graphics"
                  className="absolute -right-12 bottom-0 w-2/3 md:w-3/4 h-36 md:h-52 lg:h-64 object-cover rounded-4xl  z-10"
                />
                <div className="absolute -left-12 -bottom-6 bg-[#CAF0F8] rounded-3xl p-3 sm:p-4 md:p-5 z-10 w-44 md:w-56 lg:w-64 h-40">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-primary">
                    +80%
                  </div>
                  <p className="text-sx md:text-sm lg:text-xl font-bold font-manrope text-primary mt-4">
                    de temps gagné sur tes révisions
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12">
              {/* 02 */}
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold font-manrope text-primary">
                  02 .
                </h3>
                <h4 className="text-xl md:text-2xl lg:text-4xl font-manrope font-bold text-primary">
                  Compréhension profonde de vos besoins :
                </h4>
                <p className="text-subhead text-base md:text-xl font-manrope leading-relaxed">
                  Des solutions conçues pour le quotidien réel des étudiants en
                  médecine.
                </p>
              </div>
              {/* 04 */}
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold font-manrope text-primary">
                  04 .
                </h3>
                <h4 className="text-xl md:text-2xl lg:text-4xl font-bold font-manrope text-primary">
                  Plateforme intégrée 360° :
                </h4>
                <p className="text-subhead text-base md:text-xl font-manrope leading-relaxed">
                  Cours, flashcards, quiz, suivi et évaluation réunis au même
                  endroit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="h-0.5 w-11/12 mx-auto bg-gradient-to-r from-transparent via-[#005683] via-[#24789E] via-[#489BB9] via-[#24789E] via-[#005683] to-transparent my-6"></div>

      {/* About */}
      <section
        id="about"
        className="py-16 md:py-20 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between w-full"
      >
        <div className="flex-1 mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-secondary font-manrope">
            À propos de IatroSense AI
          </h2>
          <p className="text-subhead text-lg md:text-xl lg:text-2xl leading-8 md:leading-10 font-manrope my-6 max-w-3xl">
            IatroSense AI est une plateforme d'apprentissage médical tout-en-un,
            renforcée par l'IA. Elle simplifie vos révisions grâce à un contenu
            clair en physiologie et physiopathologie, des outils interactifs
            (flashcards, quiz, cas cliniques) et un suivi personnalisé, pour
            vous rapprocher chaque jour du médecin que vous rêvez de devenir.
          </p>
          <button className="my-10 md:my-20 flex items-center gap-4 md:gap-6 px-10 md:px-20 py-3 font-manrope font-semibold bg-primary text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
            <span className="text-base md:text-xl">Essayer IatroSense</span>
            <span className="text-2xl md:text-4xl">→</span>
          </button>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="/about-doctor.svg"
            alt="doctor"
            className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-20 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-20 text-secondary font-manrope">
          Des services pensés pour vous
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-screen mx-auto">
          {[
            {
              icon: (
                <img
                  src={Icon1}
                  alt="Explications"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Explications intelligentes et instantanées",
              desc: "Cliquez sur n'importe quel passage de vos cours, et l'intelligence d'IatroSense vous fournit une explication médicale précise, basée sur votre programme académique.",
            },
            {
              icon: (
                <img
                  src={Icon2}
                  alt="Flashcards"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Transformation des cours en Flashcards",
              desc: "Convertissez n'importe quelle information en carte de révision interactive pour ancrer vos connaissances rapidement et efficacement.",
            },
            {
              icon: (
                <img
                  src={Icon3}
                  alt="Quiz"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Quiz interactifs intelligents",
              desc: "Testez-vous grâce à des questions générées par l'intelligence artificielle, adaptées à votre niveau et révélant vos points faibles.",
            },
            {
              icon: (
                <img
                  src={Icon4}
                  alt="Examens"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Explications d'examens précédents",
              desc: "Des réponses analysées aux examens des années passées pour vous offrir une vision plus claire et un entraînement réaliste.",
            },
            {
              icon: (
                <img
                  src={Icon5}
                  alt="Cas cliniques"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Cas cliniques interactifs",
              desc: "Vivez l'expérience du médecin à travers des scénarios réels qui développent votre raisonnement clinique.",
            },
            {
              icon: (
                <img
                  src={Icon6}
                  alt="Assistant"
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              ),
              title: "Assistant médical intelligent",
              desc: "Votre compagnon personnel toujours disponible : il répond à vos questions médicales, vous guide et vous fait gagner du temps.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-[#CEF7FF] rounded-2xl md:rounded-[30px] p-4 md:p-6 pt-12 md:pt-14 shadow-[0_4px_34px_5px_rgba(0,30,46,0.08)] hover:shadow-[0_6px_40px_8px_rgba(0,30,46,0.12)] transition-all duration-300 h-full flex flex-col relative min-h-64 md:min-h-72"
            >
              {/* Icon positioned on top border */}
              <div className="absolute -top-8 md:-top-6 left-1/2 transform -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-xl flex items-center justify-center shadow-lg">
                {service.icon}
              </div>

              <h3 className="text-xl md:text-2xl lg:text-3xl leading-12 font-bold text-primary mt-12 md:mt-16 mb-4 md:mb-5 font-manrope">
                {service.title}
              </h3>
              <p className="text-black text-base md:text-lg leading-6 md:leading-8 flex-grow font-manrope">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-16 md:py-20 px-4 md:px-16 font-manrope"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-7xl font-bold text-[#4A7FA7] ">
              Besoin d’aide ?
            </h2>
            <p className="text-2xl text-black max-w-xl">
              Si vous avez des questions n’hésitez pas à nous contacter, notre
              équipe est dans votre service !
            </p>

            <div className="flex items-center gap-4 text-black">
              <img src={Phone} alt="Phone" />
              <span className="text-2xl font-medium">+213 5566778899</span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img src={Mail} alt="Mail" />
              <span className="text-2xl font-medium">
                contact@iatrosense.ai
              </span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img src={Facebookcontact} alt="Facebook" />
              <span className="text-2xl font-medium underline">
                IatroSense Ai
              </span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img src={LinkedIncontact} alt="PhoneLinkedIn" />
              <span className="text-2xl font-medium underline">
                IatroSense Ai
              </span>
            </div>
          </div>
          <form className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4">Nom</h1>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4">Email</h1>
                <input
                  type="text"
                  placeholder="Entrez votre email"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4">
                  Numéro de téléphone
                </h1>
                <input
                  type="text"
                  placeholder="Entrez votre numéro de téléphone"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4">Sujet</h1>
                <input
                  type="text"
                  placeholder="C’est quoi le sujet du message"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-medium text-gray-700 pl-4">
                C’est quoi ton message ?
              </h1>
              <textarea
                placeholder="Entrez votre message"
                className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full h-32 placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button className="mt-10 flex items-center gap-4 md:gap-6 px-10 md:px-20 py-3 font-manrope font-semibold bg-primary text-base md:text-xl text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0077B6] text-white font-manrope">
        <div className="max-w-full px-6 md:px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mx-16 text-sm md:text-base gap-10">
            <div className="max-w-sm">
              <p>
                Abonnez-vous pour rester informé des nouveautés IatroSense AI et
                des dernières mises à jour médicales. C’est parti !
              </p>
            </div>
            <div className="flex-1 max-w-2xl">
              <p className="mb-4 max-w-md">
                Une expertise de haut niveau en apprentissage médical et
                intelligence artificielle, pour offrir une expérience d’étude
                claire, interactive et de qualité.
              </p>
              <div className="flex overflow-hidden max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 w-full bg-white focus:outline-none text-[#1B2B57] placeholder-[#B0B0B0]"
                />
                <button className="px-6 py-3 bg-[#CAF0F8] text-[#1B2B57] font-semibold hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="space-y-6 max-w-sm">
              <div>
                <p className="font-semibold mb-2">Suivez-nous !</p>
                <div className="flex gap-4 text-lg">
                  <a href="#" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold">Appelez-nous</p>
                <p>(334) 202-4792</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/30 my-10"></div>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sales and Refunds</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
