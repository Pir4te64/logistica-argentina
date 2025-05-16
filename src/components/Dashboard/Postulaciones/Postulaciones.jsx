import React, { useEffect } from 'react'
import { FaTrash, FaEdit, FaRegStar, FaStar } from 'react-icons/fa'
import BooleanInline from './BooleanInline'
import { usePostulacionesStore } from './store/usePostulacionesStore'
import EditForm from './EditFormulario/EditForm'

const Postulaciones = () => {
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

  if (loading) return <p>Cargando…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="container mx-auto px-2 py-8 sm:px-4">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
        Postulaciones
      </h1>

      <div className="mb-6 w-full overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200 rounded-lg bg-white shadow">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {['Email','Teléfono','Inicio','Fin','Cumple Req.','Asignado','Puntos','Acciones'].map(h => (
                <th key={h} className="px-3 py-2 text-center text-xs font-medium text-gray-500 first:text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {postulaciones.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="break-words px-3 py-2 text-sm text-gray-700">{p.email}</td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">{p.usuario?.telefono ?? '-'}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{p.fecha_inicio_servicio.slice(0,10)}</td>
                <td className="px-3 py-2 text-sm text-gray-700">{p.fecha_fin_servicio.slice(0,10)}</td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  <BooleanInline row={p} field="cumple_requisitos" value={p.cumple_requisitos} onToggle={toggleBoolean} />
                </td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  <BooleanInline row={p} field="asignado" value={p.asignado} onToggle={toggleBoolean} />
                </td>
                <td className="px-3 py-2 text-center text-sm text-gray-700">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < p.puntos ? <FaStar key={i} className="inline-block h-4 w-4 text-yellow-400"/> : <FaRegStar key={i} className="inline-block h-4 w-4 text-gray-300"/>
                  )}
                </td>
                <td className="flex items-center justify-center gap-3 px-3 py-2">
                  <button onClick={() => startEdit(p.id)} title="Editar" className="text-indigo-600 hover:text-indigo-800"><FaEdit/></button>
                  <button onClick={() => deletePostulacion(p.id)} title="Eliminar" className="text-red-600 hover:text-red-800"><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditForm details={editing} form={form} handleChange={e => setFormField(e.target.name, e.target.value)} submitEdit={submitEdit} setEditing={() => usePostulacionesStore.setState({ editing: null })} />
      )}
    </div>
  )
}

export default Postulaciones
