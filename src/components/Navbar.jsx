import React, { useState, useContext } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Logo from "@/assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "@/Api/AuthContext";
import { useModalStore } from "@/store/useModalStore";

const Navbar = ({ selected, setFormSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const openPost = useModalStore((s) => s.openPostulaciones);
  const location = useLocation();
  const navigate = useNavigate();

  // Roles
  const hideHashLinks =
    user &&
    user.roles &&
    user.roles.some((role) => role.id === 1 || role.id === 2);

  const isTransportista =
    user &&
    user.roles &&
    user.roles.some((role) => role.name.toLowerCase() === "transportistas");
  // Link dinámico del logo
  const logoLink =
    hideHashLinks && location.pathname.startsWith("/dashboard")
      ? "/dashboard"
      : "/";

  const handleOnChange = (e) => {
    setFormSelect(e.target.value);
    window.localStorage.setItem("formSelect", e.target.value);
    if (e.target.value === "formulario-choferes") navigate('/formulario-choferes');
    if (e.target.value === "formulario-comisionista") navigate('/formulario-comisionista');
  }

  return (
    <nav className="bg-custom-dark text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Izquierda: logo */}
        <div className="flex items-center space-x-2">
          <Link to={logoLink}>
            <img src={Logo} alt="Logo" className="h-28 w-auto md:h-44" />
          </Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden items-center space-x-6 md:flex">
          {!hideHashLinks && (
            <>
              <HashLink
                smooth
                to="/#trabajos"
                className="transition-colors hover:text-gray-300"
              >
                Trabajos
              </HashLink>
              <HashLink
                smooth
                to="/#beneficios"
                className="transition-colors hover:text-gray-300"
              >
                Beneficios
              </HashLink>
              <HashLink
                smooth
                to="/#testimonios"
                className="transition-colors hover:text-gray-300"
              >
                Testimonios
              </HashLink>
              <select
                name="forms"
                id="formSelect"
                className="bg-custom-dark text-white rounded px-3 py-2 transition-colors hover:bg-gray-700 focus:outline-none"
                value={selected}
                onChange={handleOnChange}
              >
                <option value="" disabled>
                  Formularios
                </option>
                <option value="formulario-choferes">
                  Chofer
                </option>
                <option value="formulario-comisionista">
                  Comisionista
                </option>
              </select>
            </>
          )}

          {isTransportista && (
            <Link
              onClick={openPost}
              className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
            >
              Postulaciones
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/register"
                className="text-custom-red transition-colors hover:text-gray-300"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
              >
                Iniciar sesión
              </Link>
            </>
          ) : (
            <>
              {user.roles.some((role) => role.id === 1 || role.id === 2) && (
                <Link
                  to={location.pathname === "/dashboard" ? "/" : "/dashboard"}
                  className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
                >
                  {location.pathname === "/dashboard" ? "Inicio" : "Dashboard"}
                </Link>
              )}
              <button
                onClick={logout}
                className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          )}
        </div>

        {/* Hamburgesa Mobile */}
        <button
          className="text-xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Menú Mobile */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 bg-custom-dark px-4 pb-4 transition-all duration-300 ease-in-out md:hidden">
          {!hideHashLinks && (
            <>
              <HashLink
                smooth
                to="/#trabajos"
                className="transition-colors hover:text-gray-300"
              >
                Trabajos
              </HashLink>
              <HashLink
                smooth
                to="/#beneficios"
                className="transition-colors hover:text-gray-300"
              >
                Beneficios
              </HashLink>
              <HashLink
                smooth
                to="/#testimonios"
                className="transition-colors hover:text-gray-300"
              >
                Testimonios
              </HashLink>

              <select
                name="forms"
                id="formSelect"
                className="bg-custom-dark text-white rounded pr-3 py-2 transition-colors hover:bg-gray-700 focus:outline-none"
                value={selected}
                onChange={handleOnChange}
              >
                <option value="" disabled>
                  Formularios
                </option>
                <option value="formulario-choferes">
                  Chofer
                </option>
                <option value="formulario-comisionista">
                  Comisionista
                </option>
              </select>

            </>
          )}

          {isTransportista && (
            <Link
              onClick={openPost}
              className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
            >
              Postulaciones
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/register"
                className="text-custom-red transition-colors hover:text-gray-300"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
              >
                Iniciar sesión
              </Link>
            </>
          ) : (
            <>
              {user.roles.some((role) => role.id === 1 || role.id === 2) && (
                <Link
                  to="/dashboard"
                  className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="rounded bg-custom-red px-4 py-2 transition-colors hover:bg-custom-red/80"
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
