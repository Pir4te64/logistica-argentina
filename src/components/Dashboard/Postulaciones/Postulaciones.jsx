// src/components/Dashboard/Postulaciones/Postulaciones.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { usePostulacionesStore } from "@/components/Dashboard/Postulaciones/usePostulacionesStore.JS";
import { API_URL } from "@/Api/Api";

import BooleanInline from "@/components/Dashboard/Postulaciones/BooleanInline";
import EditForm from "@/components/Dashboard/Postulaciones/EditForm";

const Postulaciones = () => {
  const { postulaciones, loading, error, fetchPostulaciones } =
    usePostulacionesStore();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  console.log(postulaciones);

  useEffect(() => {
    fetchPostulaciones();
  }, [fetchPostulaciones]);

  /* --------------------------- helpers & CRUD --------------------------- */

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

  const putPostulacion = async (id, payload) => {
    try {
      await axios.put(`${API_URL.POSTULACIONES}/${id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Swal.fire("Actualizado", "La postulación fue actualizada.", "success");
      fetchPostulaciones();
    } catch {
      Swal.fire("Error", "No se pudo actualizar.", "error");
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await putPostulacion(editing.id, form);
    setEditing(null);
  };

  const toggleBoolean = async (row, field, value) => {
    await putPostulacion(row.id, {
      fecha_inicio_servicio: row.fecha_inicio_servicio,
      fecha_fin_servicio: row.fecha_fin_servicio,
      cumple_requisitos:
        field === "cumple_requisitos" ? value : row.cumple_requisitos,
      asignado: field === "asignado" ? value : row.asignado,
      puntos: row.puntos,
    });
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

  /* -------------------------- estados de carga -------------------------- */

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Postulaciones
        </h1>
        <p className="text-gray-600">Cargando...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <p className="text-red-600">Error al obtener las postulaciones.</p>
      </section>
    );
  }

  /* ------------------------------ UI completa --------------------------- */

  return (
    <div className="container mx-auto px-2 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Postulaciones
      </h1>

      {/* Tabla */}
      <div className="w-full overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {[
                "Email",
                "Teléfono", // <‑‑ nuevo encabezado
                "Inicio",
                "Fin",
                "Cumple Req.",
                "Asignado",
                "Puntos",
                "Acciones",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center first:text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {postulaciones.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-700 break-words">
                  {p.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 text-center">
                  {p.usuario?.telefono ?? "-"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {p.fecha_inicio_servicio.slice(0, 10)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {p.fecha_fin_servicio.slice(0, 10)}
                </td>

                <td className="px-4 py-2 text-center text-sm text-gray-700">
                  <BooleanInline
                    row={p}
                    field="cumple_requisitos"
                    value={p.cumple_requisitos}
                    onToggle={toggleBoolean}
                  />
                </td>

                <td className="px-4 py-2 text-center text-sm text-gray-700">
                  <BooleanInline
                    row={p}
                    field="asignado"
                    value={p.asignado}
                    onToggle={toggleBoolean}
                  />
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
        <EditForm
          form={form}
          handleChange={handleChange}
          submitEdit={submitEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default Postulaciones;
