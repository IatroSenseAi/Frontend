import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4">
        <div className="w-full bg-white rounded-full shadow-md flex items-center justify-between px-4 md:px-10 py-3">
          <div className="flex items-center">
            <img
              src="Logo.svg"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-2 md:mr-3"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-righteous text-secondary whitespace-nowrap">
              IATROSENSE
              <span className="text-primary"> AI</span>
            </h1>
          </div>

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
              <nav className="flex-1 flex font-manrope justify-center items-center gap-4 lg:gap-8 xl:gap-12 text-secondary font-medium mx-2">
                {[
                  { id: "home", label: "Accueil" },
                  { id: "why", label: "Pourquoi nous ?" },
                  { id: "about", label: "À propos" },
                  { id: "services", label: "Nos Services" },
                ].map((link) => (
                  <div key={link.id} className="relative">
                    <a
                      onClick={() => handleScroll(link.id)}
                      className={`text-sm lg:text-base xl:text-lg cursor-pointer hover:text-primary ${
                        active === link.id ? "font-bold" : ""
                      }`}
                    >
                      {link.label}
                    </a>
                    {active === link.id && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 -bottom-2 h-1 bg-primary w-6 rounded-full"
                      />
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex flex-shrink-0 gap-2 md:gap-3">
                <Link to="/auth?type=signup">
                  <button className="px-4 md:px-6 lg:px-8 py-1.5 md:py-2 bg-primary text-white rounded-full text-xs md:text-sm font-bold hover:bg-secondary transition cursor-pointer whitespace-nowrap">
                    S'inscrire
                  </button>
                </Link>
                <Link to="/auth?type=login">
                  <button className="px-4 md:px-6 lg:px-8 py-1.5 md:py-2 bg-accent text-secondary rounded-full text-xs md:text-sm font-bold hover:bg-primary hover:text-white transition cursor-pointer whitespace-nowrap">
                    Se connecter
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 w-[90%] max-w-sm bg-white rounded-2xl shadow-md p-4 flex flex-col items-center space-y-4"
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
                className={`text-base cursor-pointer hover:text-primary ${
                  active === link.id ? "font-bold text-primary" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-2">
              <Link to="/auth?type=signup">
                <button className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-secondary transition cursor-pointer">
                  S'inscrire
                </button>
              </Link>
              <Link to="/auth?type=login">
                <button className="px-4 py-1.5 bg-accent text-secondary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition cursor-pointer">
                  Se connecter
                </button>
              </Link>
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
            IATROSENSE AI
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
          <Link to="/auth?type=signup">
            <button className="my-10 md:my-20 flex items-center gap-4 md:gap-6 px-10 md:px-20 py-3 font-manrope font-semibold bg-primary text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
              <span className="text-base md:text-xl">Essayer IatroSense</span>
              <span className="text-2xl md:text-4xl">→</span>
            </button>
          </Link>
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
                  className="w-64 sm:w-80 md:w-96 lg:w-[26rem] h-40 sm:h-52 md:h-64 lg:h-80 object-cover rounded-3xl sm:rounded-4xl"
                />
                <img
                  src="/why-fr.jpg"
                  alt="Laptop with Medical Graphics"
                  className="absolute -right-6 sm:-right-8 md:-right-12 bottom-0 w-1/2 sm:w-2/3 md:w-3/4 h-28 sm:h-36 md:h-52 lg:h-64 object-cover rounded-3xl sm:rounded-4xl z-10"
                />
                <div className="absolute -left-6 sm:-left-8 md:-left-12 -bottom-4 sm:-bottom-6 bg-[#CAF0F8] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-5 z-10 w-32 sm:w-40 md:w-48 lg:w-56 h-28 sm:h-32 md:h-36 lg:h-40">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-manrope text-primary">
                    +80%
                  </div>
                  <p className="text-xs sm:text-sx md:text-sm lg:text-base xl:text-xl font-bold font-manrope text-primary mt-2 sm:mt-3 md:mt-4">
                    de temps gagné sur tes révisions
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12">
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
          <Link to="/auth?type=signup">
            <button className="my-10 md:my-20 flex items-center gap-4 md:gap-6 px-10 md:px-20 py-3 font-manrope font-semibold bg-primary text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
              <span className="text-base md:text-xl">Essayer IatroSense</span>
              <span className="text-2xl md:text-4xl">→</span>
            </button>
          </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#4A7FA7]">
              Besoin d'aide ?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-black max-w-xl">
              Si vous avez des questions n'hésitez pas à nous contacter, notre
              équipe est dans votre service !
            </p>

            <div className="flex items-center gap-4 text-black">
              <img src={Phone} alt="Phone" className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl lg:text-2xl font-medium">
                +213 5566778899
              </span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img src={Mail} alt="Mail" className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl lg:text-2xl font-medium">
                contact@iatrosense.ai
              </span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img
                src={Facebookcontact}
                alt="Facebook"
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <span className="text-lg md:text-xl lg:text-2xl font-medium underline">
                IatroSense Ai
              </span>
            </div>
            <div className="flex items-center gap-4 text-black">
              <img
                src={LinkedIncontact}
                alt="LinkedIn"
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <span className="text-lg md:text-xl lg:text-2xl font-medium underline">
                IatroSense Ai
              </span>
            </div>
          </div>

          <form className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4 text-sm md:text-base">
                  Nom
                </h1>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4 text-sm md:text-base">
                  Email
                </h1>
                <input
                  type="text"
                  placeholder="Entrez votre email"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4 text-sm md:text-base">
                  Numéro de téléphone
                </h1>
                <input
                  type="text"
                  placeholder="Entrez votre numéro de téléphone"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-medium text-gray-700 pl-4 text-sm md:text-base">
                  Sujet
                </h1>
                <input
                  type="text"
                  placeholder="C'est quoi le sujet du message"
                  className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-medium text-gray-700 pl-4 text-sm md:text-base">
                C'est quoi ton message ?
              </h1>
              <textarea
                placeholder="Entrez votre message"
                className="px-4 py-3 bg-white border-2 border-[#EBEBEB] rounded-[30px] w-full h-32 placeholder-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#2F6FED] text-sm md:text-base"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button className="mt-6 md:mt-10 flex items-center gap-4 md:gap-6 px-8 md:px-16 lg:px-20 py-2 md:py-3 font-manrope font-semibold bg-primary text-sm md:text-base lg:text-xl text-white rounded-full shadow-md hover:bg-secondary transition cursor-pointer">
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
                <button className="px-6 py-3 bg-[#CAF0F8] text-[#1B2B57] font-semibold hover:opacity-90 transition cursor-pointer">
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
