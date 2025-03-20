import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-custom-dark text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Sección Izquierda: Logo + Título */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-full h-32" />
          </Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <HashLink
            smooth
            to="/#trabajos"
            className="hover:text-gray-300 transition-colors"
          >
            Trabajos
          </HashLink>
          <HashLink
            smooth
            to="/#beneficios"
            className="hover:text-gray-300 transition-colors"
          >
            Beneficios
          </HashLink>
          <HashLink
            smooth
            to="/#testimonios"
            className="hover:text-gray-300 transition-colors"
          >
            Testimonios
          </HashLink>
          <Link
            to="/register"
            className="hover:text-gray-300 text-custom-red transition-colors"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
          >
            Iniciar sesión
          </Link>
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
          <HashLink
            smooth
            to="/#trabajos"
            className="hover:text-gray-300 transition-colors"
          >
            Trabajos
          </HashLink>
          <HashLink
            smooth
            to="/#beneficios"
            className="hover:text-gray-300 transition-colors"
          >
            Beneficios
          </HashLink>
          <HashLink
            smooth
            to="/#testimonios"
            className="hover:text-gray-300 transition-colors"
          >
            Testimonios
          </HashLink>
          <Link
            to="/register"
            className="hover:text-gray-300 text-custom-red  transition-colors"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
