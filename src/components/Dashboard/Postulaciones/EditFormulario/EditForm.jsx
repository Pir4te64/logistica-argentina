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
import {  labelAliases } from "@/components/Formulario/estaticos";
import BasicInfo from "@/components/Dashboard/Postulaciones/EditFormulario/BasicInfo";
import { idToDoc } from "@/components/Dashboard/Postulaciones/utils/estaticos";

/* 2.  Diccionario inverso id → label legible                         */


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
        className="h-full w-full overflow-y-auto bg-white p-6 shadow-xl transition-all sm:w-[520px]"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Editar Postulación #{details.id}
        </h2>

        {/* Info básica --------------------------------------------------- */}
       <BasicInfo details={details} />
        {/* Archivos necesarios -------------------------------------------- */}
        <details className="group mb-6">
          <summary className="flex cursor-pointer select-none items-center justify-between py-2 text-lg font-medium text-gray-800">
            <span className="flex items-center gap-2">
              <FiFileText className="text-indigo-600" />
              Archivos cargados ({archivosCargados.length})
            </span>
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <ul className="ml-6 mt-2 list-inside list-disc space-y-1 text-sm">
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
                    className="break-all text-indigo-600 hover:underline"
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
        <details className="group mb-6">
          <summary className="flex cursor-pointer select-none items-center justify-between py-2 text-lg font-medium text-gray-800">
            <span className="flex items-center gap-2">
              <FiFileText className="text-indigo-600" />
              Archivos necesarios ({archivosNecesarios.length})
            </span>
            <FiChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <ul className="ml-1 mt-2 space-y-1 text-sm">
            {archivosNecesarios.map((n) => {
              const cubierto = cargadosIds.has(n.id);
              return (
                <li key={n.id} className="ml-5 flex items-center gap-2">
                  {cubierto ? (
                    <FiCheckCircle className="shrink-0 text-green-600" />
                  ) : (
                    <FiAlertCircle className="shrink-0 text-yellow-600" />
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
                      className="break-all text-indigo-600 hover:underline"
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="date"
              name={name}
              min={min}
              value={form[name]}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Booleans ------------------------------------------------------ */}
        {[
          { label: "Cumple Requisitos", field: "cumple_requisitos" },
          { label: "Asignado", field: "asignado" },
        ].map(({ label, field }) => (
          <div key={field} className="mb-4">
            <span className="mb-1 block text-sm font-medium text-gray-700">
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
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Puntos
          </label>
          <Rating value={form.puntos} onChange={handleChange} />
        </div>

        {/* Botones ------------------------------------------------------ */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 rounded-md bg-custom-blue px-5 py-2 text-white shadow transition-colors hover:bg-custom-blue-medium"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="flex-1 rounded-md bg-gray-300 px-5 py-2 text-gray-800 shadow transition-colors hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
