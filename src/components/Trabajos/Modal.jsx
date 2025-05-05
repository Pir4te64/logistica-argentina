// src/components/Trabajos/ServicioModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "@/Api/Api";

const ServicioModal = ({ servicio, onClose }) => {
  if (!servicio) return null;

  const formatDate = (iso) => {
    const [year, month, day] = iso.slice(0, 10).split("-");
    return `${month}/${day}/${year}`;
  };

  const {
    campos_extra = [],
    beneficios = [],
    servicios_servicio = [],
    servicios_plazo = [],
    imagenes = [],
  } = servicio;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div
        className="
          bg-white rounded-lg shadow-xl
          max-w-4xl w-full mx-4
          max-h-[90vh] md:max-h-none overflow-y-auto
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-custom-blue px-6 py-3 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">{servicio.empresa}</h2>
          <button
            onClick={onClose}
            className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            aria-label="Cerrar"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Columna izquierda: detalles */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Ciudad:</span> {servicio.ciudad}
            </p>
            <p>
              <span className="font-semibold">Vehículo:</span>{" "}
              {servicio.categoria_vehiculo.nombre}
            </p>
            <p>
              <span className="font-semibold">Tarifa:</span> $
              {servicio.tarifa_total}
            </p>
            <p>
              <span className="font-semibold">Inicio de Servicio:</span>{" "}
              {formatDate(servicio.fecha_inicio_servicio)}
            </p>
            <p>
              <span className="font-semibold">Retiro:</span>{" "}
              {servicio.direccion_recogida}
            </p>
            <p>
              <span className="font-semibold">Entrega:</span>{" "}
              {servicio.direccion_entrega}
            </p>

            {campos_extra.length > 0 && (
              <div>
                <h3 className="font-semibold">Información Adicional:</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {campos_extra.map((c) => (
                    <span
                      key={c.id}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {c.nombre}: {c.valor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {beneficios.length > 0 && (
              <div>
                <h3 className="font-semibold text-custom-blue">
                  ⭐ Beneficios
                </h3>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {beneficios.map((b) => (
                    <li key={b.id}>
                      <span className="font-medium">{b.nombre}</span>:{" "}
                      {b.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {servicios_servicio.length > 0 && (
              <div>
                <h3 className="font-semibold text-custom-blue">
                  🚚 Tipos de Servicio
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {servicios_servicio.map((s) => (
                    <span
                      key={s.id}
                      className="bg-custom-blue bg-opacity-10 text-custom-blue px-3 py-1 rounded-full text-sm"
                    >
                      {s.nombre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {servicios_plazo.length > 0 && (
              <div>
                <h3 className="font-semibold text-custom-blue">⏱️ Plazos</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {servicios_plazo.map((p) => (
                    <span
                      key={p.id}
                      className="bg-custom-blue bg-opacity-10 text-custom-blue px-3 py-1 rounded-full text-sm"
                    >
                      {p.nombre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha: imágenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {imagenes.length > 0 ? (
              imagenes.map((img) => (
                <img
                  key={img.id}
                  src={`${BASE_URL}/${img.imagen_url}`}
                  alt={`Servicio imagen ${img.id}`}
                  className="
                    w-full 
                    h-48 md:h-64 
                    object-cover rounded 
                    transition-transform duration-200 ease-in-out 
                    hover:scale-105 
                    active:scale-110 
                    cursor-pointer
                  "
                />
              ))
            ) : (
              <p className="text-center text-gray-400">No hay imágenes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicioModal;
