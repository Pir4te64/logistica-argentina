// src/components/Dashboard/Postulaciones/EditForm.jsx
import React from "react";
import Rating from "@/components/Dashboard/Postulaciones/Rating";

const EditForm = ({ form, handleChange, submitEdit, setEditing }) => (
  <form
    onSubmit={submitEdit}
    className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
  >
    <h2 className="text-2xl font-semibold mb-4">Editar Postulación</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Fechas */}
      {[
        {
          label: "Fecha Inicio",
          name: "fecha_inicio_servicio",
          min: undefined,
        },
        {
          label: "Fecha Fin",
          name: "fecha_fin_servicio",
          min: form.fecha_inicio_servicio,
        },
      ].map(({ label, name, min }) => (
        <div key={name}>
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

      {/* Booleans */}
      {[
        { label: "Cumple Requisitos", field: "cumple_requisitos" },
        { label: "Asignado", field: "asignado" },
      ].map(({ label, field }) => (
        <div key={field}>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </span>
          <div className="flex items-center gap-4">
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

      {/* Puntos */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Puntos
        </label>
        <Rating value={form.puntos} onChange={handleChange} />
      </div>

      {/* Botones */}
      <div className="md:col-span-2 flex space-x-4">
        <button
          type="submit"
          className="px-5 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-custom-blue-medium transition-colors"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </form>
);

export default EditForm;
