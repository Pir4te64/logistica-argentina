import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { API_URL } from "../../Api/Api";

const CategoriaVehiculos = () => {
  const [data, setData] = useState(null); // Respuesta de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  // Estados para la creación de un nuevo beneficio
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(API_URL.CATEGORIA_VEHICULOS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Respuesta de la API:", response.data);

      setData(response.data);
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejo de cambios en el formulario
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar el POST y crear un nuevo beneficio
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(API_URL.CATEGORIA_VEHICULOS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Se asume que la respuesta tiene la propiedad "data" con el nuevo beneficio
      setData({
        ...data,
        data: [...data.data, response.data.data],
      });
      setFormData({ nombre: "", descripcion: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear el beneficio:", err);
      setCreateError(err);
    } finally {
      setCreating(false);
    }
  };

  // Función para borrar un beneficio
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      // Se realiza la petición DELETE enviando el id en la URL
      await axios.delete(`${API_URL.CATEGORIA_VEHICULOS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Se actualiza la lista filtrando el beneficio eliminado
      setData({
        ...data,
        data: data.data.filter((beneficio) => beneficio.id !== id),
      });
    } catch (err) {
      console.error("Error al eliminar el beneficio:", err);
    }
  };

  if (loading) {
    return (
      <div className='px-4'>
        <h1 className='text-2xl font-bold mb-4'>Beneficio Repartidor</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='px-4'>
        <p>Error al obtener los datos.</p>
      </div>
    );
  }

  return (
    <div className='px-4'>
      {/* Encabezado y botón para abrir el formulario de creación */}
      <div className='flex flex-col sm:flex-row items-center justify-between mb-4'>
        <button
          onClick={() => setShowForm(!showForm)}
          className='flex items-center gap-2 px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-blue-medium transition-colors'>
          <FaPlus /> Agregar Vehiculo
        </button>
      </div>

      {/* Formulario para agregar un nuevo beneficio */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className='mb-4 p-4 rounded shadow bg-gray-100'>
          <div className='mb-2'>
            <label className='block mb-1 font-medium'>Nombre</label>
            <input
              type='text'
              name='nombre'
              value={formData.nombre}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block mb-1 font-medium'>Descripción</label>
            <textarea
              name='descripcion'
              value={formData.descripcion}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          {createError && (
            <p className='text-red-500 mb-2'>Error al crear el beneficio.</p>
          )}
          <button
            type='submit'
            disabled={creating}
            className='w-full sm:w-auto px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-blue-medium transition-colors'>
            {creating ? "Creando..." : "Crear Vehiculo"}
          </button>
        </form>
      )}

      {/* Tabla que lista los beneficios */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b'>Nombre</th>
              <th className='px-4 py-2 border-b'>Descripción</th>
              <th className='px-4 py-2 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data && data.data.length > 0 ? (
              data.data.map((beneficio) => (
                <tr key={beneficio.id}>
                  <td className='px-4 py-2 border-b'>{beneficio.nombre}</td>
                  <td className='px-4 py-2 border-b'>
                    {beneficio.descripcion}
                  </td>
                  <td className='px-4 py-2 border-b'>
                    <button
                      onClick={() => handleDelete(beneficio.id)}
                      className='text-red-500 hover:text-red-700'>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='px-4 py-2 border-b' colSpan='3'>
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriaVehiculos;
