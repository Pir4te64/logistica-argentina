// src/components/Layout/Sidebar.tsx
import React from "react";

const Sidebar = ({ sidebarOpen, handleViewChange }) => {
  if (!sidebarOpen) return null;

  const views = [
    { key: "beneficioRepartidor", label: "Beneficio repartidor" },
    { key: "categoriaVehiculos", label: "Categoria Vehículos" },
    { key: "estadoServicio", label: "Estado Servicio" },
    { key: "estadoRepartidor", label: "Estado Repartidor" },
    { key: "tipoArchivo", label: "Tipo Archivo" },
    { key: "resaltadoAnuncio", label: "Resaltado Anuncio" },
    { key: "servicioAnuncio", label: "Servicio Anuncio" },
    { key: "postulaciones", label: "Postulaciones" },
    { key: "cambiar", label: "Cambiar Contraseña" },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-5 border-r border-gray-300">
      {views.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleViewChange(key)}
          className="block w-full mb-4 px-4 py-2 bg-custom-dark text-white rounded hover:bg-custom-gray transition-colors"
        >
          {label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
