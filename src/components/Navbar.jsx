import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/Logo.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-custom-dark text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Sección Izquierda: Logo + Título */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-full h-28" />
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-custom-red transition-colors"
          >
            Registrarse
          </a>
          <button className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors">
            Iniciar sesión
          </button>
        </div>

        {/* Botón Hamburguesa (Mobile) */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Menú Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-custom-dark px-4 pb-4 flex flex-col space-y-2">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Usuario
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-custom-red  transition-colors"
          >
            Registrarse
          </a>
          <button className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors">
            Iniciar sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
