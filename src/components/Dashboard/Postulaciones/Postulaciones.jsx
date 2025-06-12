import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaRegStar, FaStar } from 'react-icons/fa'
import BooleanInline from '@/components/Dashboard/Postulaciones/BooleanInline'
import { usePostulacionesStore } from '@/components/Dashboard/Postulaciones/store/usePostulacionesStore'
import EditForm from '@/components/Dashboard/Postulaciones/EditFormulario/EditForm'

const Postulaciones = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [itemsToShow, setItemsToShow] = useState(10);

  const {
    postulaciones,
    loading,
    error,
    fetchPostulaciones,
    startEdit,
    editing,
    form,
    setFormField,
    submitEdit,
    toggleBoolean,
    deletePostulacion
  } = usePostulacionesStore()

  useEffect(() => {
    fetchPostulaciones()
  }, [fetchPostulaciones])

  useEffect(() => {
    setItemsToShow(10);
  }, [postulaciones]);



  const filteredPostulaciones = postulaciones.filter((u) => {
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);
    const userDate = new Date(u.fecha_inicio_servicio); // Cambia esto según el campo de fecha en tu API
    const isDateInRange =
      (!date.startDate || userDate >= startDate) &&
      (!date.endDate || userDate <= endDate);
    if (date.startDate || date.endDate) {
      return isDateInRange
    }
    return true
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setDate({
      startDate: "",
      endDate: "",
    });
  };
  const today = new Date().toISOString().split('T')[0];
  const validateStartDate = date.startDate ? new Date(date.startDate).toISOString().split('T')[0] : '';
  const validateEndDate = date.endDate ? new Date(date.endDate).toISOString().split('T')[0] : '';

  const visiblePostulaciones = filteredPostulaciones.slice(0, itemsToShow);


  if (loading) return <p>Cargando…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="container mx-auto px-2 py-8 sm:px-4">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
        Postulaciones
      </h1>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-x-5">
          <input
            className="p-2 border rounded"
            type="date"
            name="startDate"
            value={date.startDate}
            onChange={handleChange}
            max={date.endDate ? validateEndDate : today}

            placeholder="Selecciona la fecha de inicio"
            required
          />
          <input
            className="p-2 border rounded"
            type="date"
            name="endDate"
            value={date.endDate}
            onChange={handleChange}
            max={today}
            min={validateStartDate}
            placeholder="Selecciona la fecha de fin"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="mb-6 w-full overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200 rounded-lg bg-white shadow">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {['Email', 'Teléfono', 'Inicio', 'Fin', 'Cumple Req.', 'Asignado', 'Puntos', 'Acciones'].map(h => (
                <th key={h} className="px-3 py-2 text-center text-xs font-medium text-gray-500 first:text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visiblePostulaciones.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="break-words px-3 py-2 text-sm text-gray-700">{p.email}</td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">{p.usuario?.telefono ?? '-'}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{p.fecha_inicio_servicio.slice(0, 10)}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{p.fecha_fin_servicio.slice(0, 10)}</td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  <BooleanInline row={p} field="cumple_requisitos" value={p.cumple_requisitos} onToggle={toggleBoolean} />
                </td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  <BooleanInline row={p} field="asignado" value={p.asignado} onToggle={toggleBoolean} />
                </td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < p.puntos ? <FaStar key={i} className="inline-block h-4 w-4 text-yellow-400" /> : <FaRegStar key={i} className="inline-block h-4 w-4 text-gray-300" />
                  )}
                </td>
                <td className="flex items-center justify-center gap-3 px-3 py-2">
                  <button onClick={() => startEdit(p.id)} title="Editar" className="text-indigo-600 hover:text-indigo-800"><FaEdit /></button>
                  <button onClick={() => deletePostulacion(p.id)} title="Eliminar" className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {
              visiblePostulaciones.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No hay postulaciones disponibles.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      {editing && (
        <EditForm details={editing} form={form} handleChange={e => setFormField(e.target.name, e.target.value)} submitEdit={submitEdit} setEditing={() => usePostulacionesStore.setState({ editing: null })} />
      )}
      {/* Botón Mostrar más */}
      {filteredPostulaciones.length > itemsToShow && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setItemsToShow((prev) => prev + 10)}
            className="rounded bg-custom-blue-medium px-4 py-2 text-white hover:bg-custom-blue"
          >
            Mostrar más
          </button>
        </div>
      )}
    </div>
  )
}

export default Postulaciones
