// components/TipoArchivo.jsx
import React, { useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useTipoArchivosStore } from "@/components/Dashboard/TipoArchivos/store/useTipoArchivos";
const TipoArchivo = () => {
  const {
    data,
    loading,
    error,
    formData,
    creating,
    createError,
    isEditing,
    editFormData,
    editing,
    handleFormChange,
    handleFormSubmit,
    handleEditClick,
    handleEditFormChange,
    handleEditSubmit,
    handleDelete,
    fetchData,
  } = useTipoArchivosStore();

  useEffect(() => {
    fetchData();
  }, []);
  /* ─────────── estados de carga / error ─────────── */
  if (loading) {
    return (
      <div className="container mx-auto px-2 py-8 sm:px-4">
        <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
          Tipo&nbsp;Archivos
        </h1>
        <p className="text-gray-600">Cargando…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-2 py-8 sm:px-4">
        <p className="text-red-600">Error al obtener los datos.</p>
      </div>
    );
  }

  /* ───────────────── UI ───────────────── */
  return (
    <div className="container mx-auto px-2 py-8 sm:px-4">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
        Tipo&nbsp;Archivos
      </h1>

      {/* FORM CREAR / EDITAR */}
      {isEditing && (
        <form
          onSubmit={isEditing ? handleEditSubmit : handleFormSubmit}
          className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
        >
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={isEditing ? editFormData.nombre : formData.nombre}
                onChange={isEditing ? handleEditFormChange : handleFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={
                  isEditing ? editFormData.descripcion : formData.descripcion
                }
                onChange={isEditing ? handleEditFormChange : handleFormChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {createError && (
            <p className="mb-4 text-sm text-red-600">
              Error al {isEditing ? "guardar" : "crear"} el tipo de archivo.
            </p>
          )}

          <button
            type="submit"
            disabled={isEditing ? editing : creating}
            className="w-full rounded-md bg-custom-blue px-4 py-2 text-white shadow transition-colors hover:bg-custom-blue-medium sm:w-auto sm:px-5"
          >
            {isEditing
              ? editing
                ? "Guardando…"
                : "Guardar Cambios"
              : creating
              ? "Creando…"
              : "Crear Tipo"}
          </button>
        </form>
      )}

      {/* TABLA + SCROLL HORIZONTAL */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200 rounded-lg bg-white shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Nombre
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Descripción
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.length ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-100"
                >
                  <td className="px-3 py-4 text-sm text-gray-700 sm:px-6">
                    {item.nombre}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-700 sm:px-6">
                    {item.descripcion}
                  </td>
                  <td className="flex items-center justify-center gap-3 px-3 py-4 text-sm text-gray-700 sm:px-6">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-indigo-600 transition-colors hover:text-indigo-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 transition-colors hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-3 py-4 text-center text-sm text-gray-500 sm:px-6"
                >
                  No hay registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoArchivo;
