// src/components/Dashboard/Postulaciones/Postulaciones.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { usePostulacionesStore } from "@/components/Dashboard/Postulaciones/usePostulacionesStore.JS";
import { API_URL } from "@/Api/Api";
import Rating from "@/components/Dashboard/Postulaciones/Rating";

const Postulaciones = () => {
  const { postulaciones, loading, error, fetchPostulaciones } =
    usePostulacionesStore();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchPostulaciones();
  }, [fetchPostulaciones]);

  const startEdit = (p) => {
    setEditing(p);
    setForm({
      fecha_inicio_servicio: p.fecha_inicio_servicio.slice(0, 10),
      fecha_fin_servicio: p.fecha_fin_servicio.slice(0, 10),
      cumple_requisitos: p.cumple_requisitos,
      asignado: p.asignado,
      puntos: p.puntos,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "puntos"
          ? parseInt(value)
          : value === "true"
          ? true
          : value === "false"
          ? false
          : value,
    }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL.POSTULACIONES}/${editing.id}`,
        {
          fecha_inicio_servicio: form.fecha_inicio_servicio,
          fecha_fin_servicio: form.fecha_fin_servicio,
          cumple_requisitos: form.cumple_requisitos,
          asignado: form.asignado,
          puntos: form.puntos,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire("Actualizado", "La postulación fue actualizada.", "success");
      setEditing(null);
      fetchPostulaciones();
    } catch {
      Swal.fire("Error", "No se pudo actualizar.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar postulación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL.POSTULACIONES}/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          Swal.fire("Eliminado", "La postulación fue eliminada.", "success");
          fetchPostulaciones();
          if (editing?.id === id) setEditing(null);
        } catch {
          Swal.fire("Error", "No se pudo eliminar.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Postulaciones
        </h1>
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Error al obtener las postulaciones.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Postulaciones
      </h1>

      {/* Tabla de postulaciones */}
      <div className="w-full overflow-x-auto max-h-80 mb-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inicio
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fin
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cumple Req.
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asignado
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puntos
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {postulaciones.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-700 break-words">
                  {p.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {p.fecha_inicio_servicio.slice(0, 10)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {p.fecha_fin_servicio.slice(0, 10)}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700">
                  {p.cumple_requisitos ? "Sí" : "No"}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700">
                  {p.asignado ? "Sí" : "No"}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < p.puntos ? (
                      <FaStar
                        key={i}
                        className="inline-block w-4 h-4 text-yellow-400"
                      />
                    ) : (
                      <FaRegStar
                        key={i}
                        className="inline-block w-4 h-4 text-gray-300"
                      />
                    )
                  )}
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 flex items-center justify-center gap-3">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario de edición */}
      {editing && (
        <form
          onSubmit={submitEdit}
          className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Editar Postulación #{editing.id}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fecha_inicio_servicio"
                value={form.fecha_inicio_servicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin
              </label>
              <input
                type="date"
                name="fecha_fin_servicio"
                min={form.fecha_inicio_servicio}
                value={form.fecha_fin_servicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cumple Requisitos
              </label>
              <select
                name="cumple_requisitos"
                value={form.cumple_requisitos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asignado
              </label>
              <select
                name="asignado"
                value={form.asignado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puntos
              </label>
              <Rating value={form.puntos} onChange={handleChange} />
            </div>
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
      )}
    </div>
  );
};

export default Postulaciones;
