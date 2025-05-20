import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaGift,
  FaCar,
  FaRoute,
  FaUserCheck,
  FaFileAlt,
  FaHighlighter,
  FaBullhorn,
  FaClipboardList,
  FaKey,
  FaTimes,
  FaImage
} from "react-icons/fa";

// Define cada vista con su icono correspondiente
const views = [
  { key: "beneficioRepartidor", label: "Beneficio repartidor", icon: FaGift },
  { key: "categoriaVehiculos", label: "Categoría Vehículos", icon: FaCar },
  { key: "estadoServicio", label: "Estado Servicio", icon: FaRoute },
  { key: "estadoRepartidor", label: "Estado Repartidor", icon: FaUserCheck },
  { key: "tipoArchivo", label: "Tipo Archivo", icon: FaFileAlt },
  { key: "resaltadoAnuncio", label: "Resaltado Anuncio", icon: FaHighlighter },
  { key: "servicioAnuncio", label: "Servicio Anuncio", icon: FaBullhorn },
  { key: "postulaciones", label: "Postulaciones", icon: FaClipboardList },
  { key: "cambiar", label: "Cambiar Contraseña", icon: FaKey },
  { key: "cambiarHeader", label: "Cambiar Header", icon: FaImage },
];

const Sidebar = ({ sidebarOpen, onToggle }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 p-5 border-r border-gray-300 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}
    >
      {/* Botón cerrar en móvil */}
      <button
        className="mb-4 text-gray-700 md:hidden"
        onClick={onToggle}
        aria-label="Cerrar menú"
      >
        <FaTimes size={24} />
      </button>
      {views.map(({ key, label, icon: Icon }) => (
        <NavLink
          key={key}
          to={`/dashboard/${key}`}
          className={({ isActive }) =>
            `flex items-center w-full mb-4 px-4 py-2 rounded transition-colors ${isActive
              ? "bg-custom-gray text-custom-dark"
              : "bg-custom-dark text-white hover:bg-custom-gray"
            }`
          }
        >
          <Icon className="mr-2" />
          <span>{label}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
