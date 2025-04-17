// components/CategoriaVehiculos.jsx
import React from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import useTipoArchivos from "./useTipoArchivos";

const TipoArchivo = () => {
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
  } = useTipoArchivos();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Estado de Repartidor
        </h1>
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Error al obtener los datos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Tipo Archivos
      </h1>

      {/* Encabezado y botón para abrir el formulario de creación */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={isEditing}
          className={`flex items-center gap-2 px-5 py-2 rounded-md shadow-md transition-colors
            ${isEditing
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-custom-blue text-white hover:bg-custom-blue-medium"
            }`}
        >
          <FaPlus /> Agregar Tipo archivos
        </button>
      </div>

      {/* Formulario para agregar un nuevo vehículo (solo si no estamos editando) */}
      {showForm && !isEditing && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {createError && (
            <p className="mb-4 text-sm text-red-600">
              Error al crear el tipo de archivo.
            </p>
          )}
          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto px-5 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-custom-blue-medium transition-colors"
          >
            {creating ? "Creando..." : "Crear Archivo Nuevo"}
          </button>
        </form>
      )}

      {/* Formulario para editar un vehículo existente */}
      {isEditing && (
        <form
          onSubmit={handleEditSubmit}
          className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={editFormData.nombre}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={editFormData.descripcion}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={editing}
            className="w-full sm:w-auto px-5 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-custom-blue-medium transition-colors"
          >
            {editing ? "Actualizando..." : "Actualizar Archivo"}
          </button>
        </form>
      )}

      {/* Contenedor responsive */}
      <div className="w-full overflow-x-auto max-h-80">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data && data.data.length > 0 ? (
              data.data.map((vehiculo) => (
                <tr
                  key={vehiculo.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-2 text-sm text-gray-700 break-words">
                    {vehiculo.nombre}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 break-words">
                    {vehiculo.descripcion}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleDelete(vehiculo.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-2 text-center text-sm text-gray-500"
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

export default TipoArchivo;
