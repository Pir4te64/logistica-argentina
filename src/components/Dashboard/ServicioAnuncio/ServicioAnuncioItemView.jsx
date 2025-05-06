// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemView.jsx
import React from "react";
import { FaCheck } from "react-icons/fa";

const FLAGS = ["fragil", "liquido", "requiere_refrigeracion"];

/**
 * Componente de solo lectura para ServicioAnuncioItem.
 */
const ServicioAnuncioItemView = ({ form, labelize, OMITIR, OMITIR_NESTED }) => {
  return (
    <div className="space-y-6">
      {/* 1) Campos simples, flags y campo ‘orden’ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(form)
          .filter(
            ([k, v]) =>
              !OMITIR.includes(k) &&
              typeof v !== "object" &&
              !k.endsWith("_id") &&
              k !== "id"
          )
          .map(([k, v]) => (
            <div
              key={k}
              className="bg-white p-4 rounded-md shadow-sm flex flex-col"
            >
              <dt className="text-xs font-medium text-gray-500">
                {labelize(k)}
              </dt>
              {FLAGS.includes(k) ? (
                <dd className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    disabled
                    checked={v === 1}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded transition"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {v === 1 ? "Sí" : "No"}
                  </span>
                </dd>
              ) : (
                <dd className="mt-2 text-sm text-gray-800">{String(v)}</dd>
              )}
            </div>
          ))}
      </div>

      {/* 2) Categoría, resaltador y estado como secciones tipo tarjeta */}
      {["categoria_vehiculo", "resaltador", "estado"].map((key) =>
        form[key] ? (
          <section
            key={key}
            className="bg-white p-6 rounded-md shadow-sm space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {labelize(key)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(form[key])
                .filter(([k]) => !OMITIR_NESTED.includes(k))
                .map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-xs font-medium text-gray-500">
                      {labelize(k)}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800">{String(v)}</dd>
                  </div>
                ))}
            </div>
          </section>
        ) : null
      )}

      {/* 3) Beneficios como badges */}
      {form.beneficios?.length > 0 && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Beneficios
          </h3>
          <div className="flex flex-wrap gap-2">
            {form.beneficios.map((b) => (
              <span
                key={b}
                className="inline-flex items-center px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
              >
                <FaCheck className="mr-1 text-indigo-600" /> {b}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 4) Imágenes */}
      {form.imagenes?.length > 0 && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Imágenes</h3>
          <ul className="list-disc list-inside space-y-1">
            {form.imagenes.map((img) => {
              const fullUrl = `https://backend.logisticaargentinasrl.com.ar/${img.imagen_url}`;
              return (
                <li key={img.id} className="text-sm">
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Ver Imagen
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* 5) Campos extra */}
      {form.campos_extra?.length > 0 && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Campos Extra
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {form.campos_extra.map((c) => (
              <li key={c.id} className="text-sm text-gray-800">
                <span className="font-medium">{c.nombre}:</span> {c.valor}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6) Servicios */}
      {form.servicios_servicio?.length > 0 && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Servicios
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {form.servicios_servicio.map((s) => (
              <li key={s.id} className="text-sm text-gray-800">
                <span className="font-medium">{s.nombre}:</span> {s.descripcion}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7) Plazos */}
      {form.servicios_plazo?.length > 0 && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Plazos</h3>
          <ul className="list-disc list-inside space-y-1">
            {form.servicios_plazo.map((p) => (
              <li key={p.id} className="text-sm text-gray-800">
                <span className="font-medium">{p.nombre}:</span> {p.descripcion}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8) Video */}
      {form.video_url && (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Video</h3>
          <a
            href={form.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-indigo-600 hover:underline text-sm"
          >
            Ver video
          </a>
        </section>
      )}
    </div>
  );
};

export default ServicioAnuncioItemView;
