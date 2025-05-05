// src/components/Dashboard/Postulaciones/EditForm.jsx
import React from "react";
import Rating from "@/components/Dashboard/Postulaciones/Rating";
import { BASE_URL } from "@/Api/Api";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiChevronDown,
  FiFileText,
} from "react-icons/fi";
import { docMapping, labelAliases } from "@/components/Formulario/estaticos";

/* 2.  Diccionario inverso id → label legible                         */
const idToDoc = (() => {
  const map = {};
  for (const [doc, val] of Object.entries(docMapping)) {
    if (typeof val === "number") {
      map[val] = doc;
    } else {
      for (const [sub, id] of Object.entries(val)) {
        map[id] = `${doc} — ${sub.replace(/_/g, " ")}`;
      }
    }
  }
  return map;
})();

/* 4.  Helper final para mostrar el label                             */
const prettyLabel = (id) => labelAliases[id] ?? idToDoc[id] ?? `ID ${id}`;

/* ------------------------------------------------------------------ */
/* 5.  Componente                                                     */
/* ------------------------------------------------------------------ */
const EditForm = ({ details, form, handleChange, submitEdit, setEditing }) => {
  /* Datos procesados ---------------------------------------------------- */
  const archivosCargados = details.usuario?.archivos_cargados ?? [];
  const archivosNecesarios = (
    details.usuario?.roles?.flatMap((r) => r.archivos_necesarios) ?? []
  ).sort((a, b) => a.id - b.id);

  const cargadosIds = new Set(archivosCargados.map((a) => a.tipo_archivos_id));
  const urlById = (id) =>
    archivosCargados.find((a) => a.tipo_archivos_id === id)?.url ?? "";

  /* -------------------------------------------------------------------- */
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black bg-opacity-40"
        onClick={() => setEditing(null)}
      />

      {/* Sidebar */}
      <form
        onSubmit={submitEdit}
        className="w-full sm:w-[520px] h-full bg-white shadow-xl p-6 overflow-y-auto transition-all "
      >
        <h2 className="text-2xl font-semibold mb-4">
          Editar Postulación #{details.id}
        </h2>

        {/* Info básica --------------------------------------------------- */}
        <div className="mb-6 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-gray-800">Email:</span>{" "}
            {details.email}
          </p>
          <p>
            <span className="font-medium text-gray-800">Teléfono:</span>{" "}
            {details.usuario?.telefono ?? "-"}
          </p>
        </div>

        {/* Archivos necesarios -------------------------------------------- */}
        <details className="mb-6 group">
          <summary className="flex items-center justify-between cursor-pointer select-none text-lg font-medium text-gray-800 py-2">
            <span className="flex items-center gap-2">
              <FiFileText className="text-indigo-600" />
              Archivos cargados ({archivosCargados.length})
            </span>
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <ul className="list-disc list-inside space-y-1 text-sm ml-6 mt-2">
            {archivosCargados.length === 0 ? (
              <li className="text-gray-500">Sin archivos.</li>
            ) : (
              archivosCargados.map((a) => (
                <li key={a.id}>
                  <span className="font-medium text-gray-800">
                    {prettyLabel(a.tipo_archivos_id)}
                  </span>{" "}
                  –{" "}
                  <a
                    href={`${BASE_URL}/${a.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline break-all"
                  >
                    {a.url.split("/").pop()}
                  </a>
                </li>
              ))
            )}
          </ul>
        </details>

        {/* ------------------------------------------------- */
        /* ARCHIVOS NECESARIOS                                */
        /* ------------------------------------------------- */}
        <details className="mb-6 group">
          <summary className="flex items-center justify-between cursor-pointer select-none text-lg font-medium text-gray-800 py-2">
            <span className="flex items-center gap-2">
              <FiFileText className="text-indigo-600" />
              Archivos necesarios ({archivosNecesarios.length})
            </span>
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <ul className="space-y-1 text-sm ml-1 mt-2">
            {archivosNecesarios.map((n) => {
              const cubierto = cargadosIds.has(n.id);
              return (
                <li key={n.id} className="flex items-center gap-2 ml-5">
                  {cubierto ? (
                    <FiCheckCircle className="text-green-600 shrink-0" />
                  ) : (
                    <FiAlertCircle className="text-yellow-600 shrink-0" />
                  )}

                  <span
                    className={
                      cubierto
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {prettyLabel(n.id)}
                  </span>

                  {cubierto && (
                    <a
                      href={`${BASE_URL}/${urlById(n.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline break-all"
                    >
                      Ver archivo
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <hr className="my-4" />
        </details>
        {/* Fechas -------------------------------------------------------- */}
        {[
          { label: "Fecha Inicio", name: "fecha_inicio_servicio" },
          {
            label: "Fecha Fin",
            name: "fecha_fin_servicio",
            min: form.fecha_inicio_servicio,
          },
        ].map(({ label, name, min }) => (
          <div key={name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="date"
              name={name}
              min={min}
              value={form[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Booleans ------------------------------------------------------ */}
        {[
          { label: "Cumple Requisitos", field: "cumple_requisitos" },
          { label: "Asignado", field: "asignado" },
        ].map(({ label, field }) => (
          <div key={field} className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </span>
            <div className="flex items-center gap-6">
              {["Sí", "No"].map((txt, idx) => {
                const bool = idx === 0;
                return (
                  <label key={txt} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form[field] === bool}
                      onChange={() =>
                        handleChange({
                          target: { name: field, value: bool.toString() },
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      name={field}
                    />
                    {txt}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Puntos ------------------------------------------------------- */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Puntos
          </label>
          <Rating value={form.puntos} onChange={handleChange} />
        </div>

        {/* Botones ------------------------------------------------------ */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-5 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-custom-blue-medium transition-colors"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="flex-1 px-5 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
