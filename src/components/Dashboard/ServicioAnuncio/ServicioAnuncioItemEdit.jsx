// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemEdit.jsx
import React from "react";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";

const ServicioAnuncioItemEdit = ({
  form,
  handleChange,
  toggleBeneficio,
  categorias,
  resaltadores,
  estados,
  handleExtraChange,
  addExtra,
  removeExtra,
  // nuevos props para servicios y plazos:
  handleServicioChange,
  addServicio,
  removeServicio,
  handlePlazoChange,
  addPlazo,
  removePlazo,
  EDITABLE_FIELDS,
  labelize,
}) => {
  const { data: benResp, loading: loadingBen } = useBeneficioRepartidor();
  const beneficiosOpc = benResp?.data || [];
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* 1) Campos editables */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(form)
          .filter(([k]) => EDITABLE_FIELDS[k])
          .map(([k]) => {
            const type = EDITABLE_FIELDS[k];

            // Fecha
            if (type === "date") {
              return (
                <div key={k} className="flex flex-col">
                  <label
                    htmlFor={k}
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    {labelize(k)}
                  </label>
                  <input
                    id={k}
                    type="date"
                    name={k}
                    min={today}
                    value={form[k] || ""}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              );
            }

            // Checkbox
            if (type === "checkbox") {
              return (
                <div key={k} className="flex items-center">
                  <input
                    id={k}
                    type="checkbox"
                    name={k}
                    checked={!!form[k]}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <label htmlFor={k} className="ml-2 text-sm text-gray-700">
                    {labelize(k)}
                  </label>
                </div>
              );
            }

            // Selects simples
            if (type.startsWith("select_")) {
              const options =
                type === "select_categoria"
                  ? categorias
                  : type === "select_resaltador"
                  ? resaltadores
                  : estados;
              const nameKey =
                type === "select_categoria"
                  ? "categoria_vehiculo_id"
                  : type === "select_resaltador"
                  ? "resaltador_anuncio_id"
                  : "estado_servicio_id";

              return (
                <div key={k} className="flex flex-col">
                  <label
                    htmlFor={nameKey}
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    {labelize(k)}
                  </label>
                  <select
                    id={nameKey}
                    name={nameKey}
                    value={form[nameKey] || ""}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  >
                    <option value="">Selecciona…</option>
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // text / number
            return (
              <div key={k} className="flex flex-col">
                <label
                  htmlFor={k}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {labelize(k)}
                </label>
                <input
                  id={k}
                  type={type}
                  name={k}
                  value={form[k] || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            );
          })}
      </dl>

      {/* 2) Beneficios */}
      <div className="sm:col-span-2 lg:col-span-3 mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Beneficios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {beneficiosOpc.map((b) => (
            <label
              key={b.id}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form.beneficios.includes(b.id)}
                onChange={() => toggleBeneficio(b.id)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <span className="text-gray-800 text-sm">{b.nombre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3) Campos Extra */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Campos Extra
        </h3>
        {form.campos_extra.map((c, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Nombre"
              value={c.nombre}
              onChange={(e) => handleExtraChange(i, "nombre", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="text"
              placeholder="Valor"
              value={c.valor}
              onChange={(e) => handleExtraChange(i, "valor", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              type="button"
              onClick={() => removeExtra(i)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExtra}
          className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Agregar campo extra
        </button>
      </section>

      {/* 4) Servicios asociados */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Servicios</h3>
        {form.servicio_servicios.map((s, i) => (
          <div key={s.id ?? i} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Nombre servicio"
              value={s.nombre}
              onChange={(e) =>
                handleServicioChange(i, "nombre", e.target.value)
              }
              className="flex-1 px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={s.descripcion}
              onChange={(e) =>
                handleServicioChange(i, "descripcion", e.target.value)
              }
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={() => removeServicio(i)}
              className="px-3 bg-red-600 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          onClick={addServicio}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Agregar servicio
        </button>
      </section>
      {/* 5) Plazos asociados */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Plazos</h3>
        {form.servicio_plazos.map((p, i) => (
          <div key={p.id || i} className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Nombre plazo"
              value={p.nombre}
              onChange={(e) => handlePlazoChange(i, "nombre", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={p.descripcion}
              onChange={(e) =>
                handlePlazoChange(i, "descripcion", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              type="button"
              onClick={() => removePlazo(i)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPlazo}
          className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Agregar plazo
        </button>
      </section>
    </>
  );
};

export default ServicioAnuncioItemEdit;
