// components/BeneficioRepartidor.jsx
import React from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";

const BeneficioRepartidor = () => {
  const {
    data,
    loading,
    error,
    showForm,
    formData,
    creating,
    createError,
    isEditing,
    editFormData,
    editing,
    setShowForm,
    handleFormChange,
    handleFormSubmit,
    handleEditClick,
    handleEditFormChange,
    handleEditSubmit,
    handleDelete,
  } = useBeneficioRepartidor();

  if (loading) {
    return (
      <div className="container mx-auto px-2 py-8 sm:px-4">
        <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
          Beneficio Repartidor
        </h1>
        <p className="text-gray-600">Cargando...</p>
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

  return (
    <div className="container mx-auto px-2 py-8 sm:px-4">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
        Beneficio Repartidor
      </h1>

      {/* Botón para abrir el formulario de creación */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={isEditing}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-md shadow-md transition-colors
            ${
              isEditing
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-custom-blue text-white hover:bg-custom-blue-medium"
            }`}
        >
          <FaPlus /> Agregar Beneficio
        </button>
      </div>

      {/* Formulario para crear o editar un beneficio */}
      {(showForm || isEditing) && (
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
                className="w-full whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={isEditing ? editFormData.descripcion : formData.descripcion}
                onChange={isEditing ? handleEditFormChange : handleFormChange}
                className="w-full whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          {((!isEditing && createError) || (isEditing && editing && createError)) && (
            <p className="mb-4 text-sm text-red-600">
              Error al {isEditing ? "guardar el beneficio" : "crear el beneficio"}.
            </p>
          )}
          <button
            type="submit"
            disabled={isEditing ? editing : creating}
            className="w-full rounded-md bg-custom-blue px-4 py-2 text-white shadow transition-colors hover:bg-custom-blue-medium sm:w-auto sm:px-5"
          >
            {isEditing
              ? editing
                ? "Guardando..."
                : "Guardar Cambios"
              : creating
              ? "Creando..."
              : "Crear Beneficio"}
          </button>
        </form>
      )}

      {/* Tabla que lista los beneficios con scroll horizontal */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max table-auto divide-y divide-gray-200 whitespace-nowrap rounded-lg bg-white shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Nombre
              </th>
              <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Descripción
              </th>
              <th className="whitespace-nowrap px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data && data.data.length > 0 ? (
              data.data.map((beneficio) => (
                <tr
                  key={beneficio.id}
                  className="transition-colors hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 sm:px-6">
                    {beneficio.nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 sm:px-6">
                    {beneficio.descripción}
                  </td>
                  <td className="flex items-center justify-center gap-3 whitespace-nowrap px-3 py-4 text-sm text-gray-700 sm:px-6">
                    <button
                      onClick={() => handleEditClick(beneficio)}
                      className="text-indigo-600 transition-colors hover:text-indigo-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(beneficio.id)}
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
                  className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 sm:px-6"
                  colSpan="3"
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

export default BeneficioRepartidor;