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
  FaImage
} from "react-icons/fa";
import Logo from "@/assets/Logo.png";

// Definir vistas con iconos
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
  /* { key: "cambiarHeader", label: "Cambiar Header", icon: FaImage }, */
];

const DashboardIndex = () => {
  return (
    <div
      className="relative flex h-full flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Logo})` }}
    >
      {/* Overlay para atenuar el fondo */}
      <div className="absolute inset-0 bg-white opacity-90"></div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {views.map(({ key, label, icon: Icon }) => (
            <NavLink
              key={key}
              to={`/dashboard/${key}`}
              className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow transition-transform duration-200 hover:scale-105 hover:bg-custom-blue hover:shadow-lg sm:p-6"
            >
              <Icon className="mb-2 h-10 w-10 text-gray-700 sm:h-12 sm:w-12" />
              <span className="text-center text-base text-gray-800 sm:text-lg">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;