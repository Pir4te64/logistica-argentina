import React, { useState, useContext } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "@/Api/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  // Si el usuario tiene rol 1 o 2, se ocultan los enlaces de Trabajos, Beneficios y Testimonios
  const hideHashLinks =
    user &&
    user.roles &&
    user.roles.some((role) => role.id === 1 || role.id === 2);

  return (
    <nav className="bg-custom-dark text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Sección Izquierda: Logo + Título */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-auto h-28 md:h-44" />
          </Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {!hideHashLinks && (
            <>
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
            </>
          )}
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              {user &&
                user.roles &&
                user.roles.some((role) => role.id === 1 || role.id === 2) && (
                  <Link
                    to="/dashboard"
                    className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              <button
                onClick={logout}
                className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          )}
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
        <div className="md:hidden bg-custom-dark px-4 pb-4 flex flex-col space-y-2    transition-all duration-300 ease-in-out">
          {!hideHashLinks && (
            <>
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
            </>
          )}
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              {user &&
                user.roles &&
                user.roles.some((role) => role.id === 1 || role.id === 2) && (
                  <Link
                    to="/dashboard"
                    className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              <button
                onClick={logout}
                className="bg-custom-red hover:bg-custom-red/80 px-4 py-2 rounded transition-colors"
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
