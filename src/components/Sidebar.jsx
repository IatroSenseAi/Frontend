import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FiMenu } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "cours",
      label: "Cours",
      icon: "cours-active.svg",
      inactiveIcon: "cours.svg",
      path: "/cours",
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: "flashcards-active.svg",
      inactiveIcon: "flashcards.svg",
      path: "/flashcards",
    },
    {
      id: "quizz",
      label: "Quizz",
      icon: "quizz.svg",
      inactiveIcon: "quizz.svg",
      path: "/quizz",
    },
    {
      id: "qcms",
      label: "QCMs",
      icon: "qcms.svg",
      inactiveIcon: "qcms.svg",
      path: "/qcms",
    },
    {
      id: "cas-cliniques",
      label: "Cas cliniques",
      icon: "cas-clinique.svg",
      inactiveIcon: "cas-clinique.svg",
      path: "/cas-cliniques",
    },
  ];

  const accountItems = [
    {
      id: "compte",
      label: "Mon compte",
      icon: "compte.svg",
      inactiveIcon: "compte.svg",
      path: "/mon-compte",
    },
    {
      id: "deconnecter",
      label: "Se déconnecter",
      icon: "logout.svg",
      inactiveIcon: "logout.svg",
      action: logout,
    },
  ];

  const handleNavigation = (path, action) => {
    if (action) {
      action();
    } else if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`bg-white font-manrope h-screen py-6 fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-40 shadow-[0_4px_20px_2px_rgba(0,0,0,0.15)]
          ${isHovered ? "w-80 rounded-r-4xl" : "w-20 rounded-r-4xl"}
          hidden md:block`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-1/2 p-4 transform -translate-y-1/2 z-10">
          <div className="w-12 h-24 flex items-center justify-center">
            <img
              src="opened.svg"
              alt="Toggle sidebar"
              className={`w-10 h-20 transition-transform duration-300 ${
                isHovered ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </div>
        {/* Logo */}
        <div className="p-6 flex items-center overflow-hidden">
          <img src="Logo.svg" alt="Logo" className="w-10 h-10" />
          {isHovered && (
            <h1 className="text-3xl ml-3 font-bold font-righteous text-secondary whitespace-nowrap">
              IATROSENSE <span className="text-primary">AI</span>
            </h1>
          )}
        </div>

        {/* Menu */}
        <div className="p-4 overflow-hidden">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center w-full p-2 cursor-pointer ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-noactive hover:text-primary"
                  }`}
                >
                  <img
                    src={
                      isActive(item.path) || hoveredItem === item.id
                        ? item.icon
                        : item.inactiveIcon
                    }
                    alt={item.label}
                    className="w-10 h-10"
                  />
                  {isHovered && (
                    <span className="ml-3 text-2xl font-bold">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div className="absolute bottom-0 w-full p-4 overflow-hidden">
          <ul className="space-y-1">
            {accountItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path, item.action)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center w-full p-2 cursor-pointer ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-noactive hover:text-primary"
                  }`}
                >
                  <img
                    src={
                      isActive(item.path) || hoveredItem === item.id
                        ? item.icon
                        : item.inactiveIcon
                    }
                    alt={item.label}
                    className="w-10 h-10"
                  />
                  {isHovered && (
                    <span className="ml-3 text-2xl font-bold">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-40 shadow-lg transform transition-transform duration-300 md:hidden rounded-r-3xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center">
          <img src="Logo.svg" alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-xl font-bold font-righteous text-secondary">
            IATROSENSE <span className="text-primary">AI</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full p-2 ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-noactive hover:text-primary"
                  }`}
                >
                  <img
                    src={isActive(item.path) ? item.icon : item.inactiveIcon}
                    alt={item.label}
                    className="w-8 h-8"
                  />
                  <span className="ml-3 text-lg font-bold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div className="absolute bottom-0 w-full p-4">
          <ul className="space-y-2">
            {accountItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path, item.action)}
                  className={`flex items-center w-full p-2 ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-noactive hover:text-primary"
                  }`}
                >
                  <img
                    src={isActive(item.path) ? item.icon : item.inactiveIcon}
                    alt={item.label}
                    className="w-8 h-8"
                  />
                  <span className="ml-3 text-lg font-bold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
