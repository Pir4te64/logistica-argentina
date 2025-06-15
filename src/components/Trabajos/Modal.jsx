// src/components/Trabajos/ServicioModal.jsx
import React, { useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { BASE_URL } from "@/Api/Api";
import CustomModal from "@/components/CustomModal.jsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


// Componente auxiliar para manejar el loader
const ImageWithLoader = ({ src, alt, className, imgOpenedFn }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div onClick={() => imgOpenedFn(src)} className="relative w-full md:h-64">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <FaSpinner className="animate-spin text-2xl text-gray-400" />
        </div>
      )}
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};





const ServicioModal = ({ servicio, onClose }) => {
  const [imgOpened, setImgOpened] = useState(null);
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
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
        <div
          className="
          bg-white rounded-lg shadow-xl
          max-w-4xl w-full mx-4 overflow-x-hidden
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
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {servicios_servicio.map((s) => (
                      <li key={s.id}>
                        <span className="font-medium">{s.nombre}</span>{" "}
                        {s.descripcion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {servicios_plazo.length > 0 && (
                <div>
                  <h3 className="font-semibold text-custom-blue">⏱️ Plazos</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {servicios_plazo.map((p) => (
                      <li key={p.id}>
                        <span className="font-medium">{p.nombre}</span>:{" "}
                        {p.descripcion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Columna derecha: imágenes con loader */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imagenes.length > 0 ? (
                imagenes.map((img) => (
                  <ImageWithLoader
                    key={img.id}
                    imgOpenedFn={setImgOpened}
                    src={`${BASE_URL}/${img.imagen_url}`}
                    alt={`Servicio imagen ${img.id}`}
                    className="
                    w-full 
                    h-auto md:h-64 
                    object-cover rounded 
                    transition-transform duration-200 ease-in-out 
                    hover:scale-125
                    active:scale-120 
                    cursor-pointer
                    z-50
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

      {imgOpened && (
        <CustomModal onClose={() => setImgOpened(null)}>
          <TransformWrapper onInit={0} minScale={0} initialScale={1}
            initialPositionX={0}
            initialPositionY={0}>
            <TransformComponent >
              <img className="object-contain h-full w-full" src={imgOpened} alt="Imagen del servicio" />
            </TransformComponent>
          </TransformWrapper>
        </CustomModal>
      )}
    </>
  );
};

export default ServicioModal;
