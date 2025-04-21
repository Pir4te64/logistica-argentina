// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemEdit.jsx
import React from "react";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";

const ServicioAnuncioItemEdit = ({
  form,
  handleChange,
  handleBeneficiosChange, // <--- nuevo
  categorias,
  resaltadores,
  estados,
  handleExtraChange,
  addExtra,
  removeExtra,
  EDITABLE_FIELDS,
  labelize,
}) => {
  // cargo opciones de beneficios
  const { data: benResp, loading: loadingBen } = useBeneficioRepartidor();
  const beneficiosOpc = benResp?.data || [];

  return (
    <>
      {/* 1) Campos editables */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(form)
          .filter(([k]) => EDITABLE_FIELDS[k])
          .map(([k, v]) => {
            const type = EDITABLE_FIELDS[k];

            if (type === "checkbox") {
              return (
                <div key={k} className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    {labelize(k)}
                  </label>
                  <input
                    type="checkbox"
                    name={k}
                    checked={!!form[k]}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600"
                  />
                </div>
              );
            }

            if (type === "select_categoria") {
              return (
                <div key={k} className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    {labelize(k)}
                  </label>
                  <select
                    name="categoria_vehiculo_id"
                    value={form.categoria_vehiculo_id || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Selecciona...</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (type === "select_resaltador") {
              return (
                <div key={k} className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    {labelize(k)}
                  </label>
                  <select
                    name="resaltador_anuncio_id"
                    value={form.resaltador_anuncio_id || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Selecciona...</option>
                    {resaltadores.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (type === "select_estado") {
              return (
                <div key={k} className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    {labelize(k)}
                  </label>
                  <select
                    name="estado_servicio_id"
                    value={form.estado_servicio_id || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Selecciona...</option>
                    {estados.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // text, date, number
            return (
              <div key={k} className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">
                  {labelize(k)}
                </label>
                <input
                  type={type}
                  name={k}
                  value={form[k] ?? ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>
            );
          })}

        {/* Nuevo: select múltiple para Beneficios */}
        <div className="col-span-full flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Beneficios</label>
          {loadingBen ? (
            <p>Cargando beneficios…</p>
          ) : (
            <select
              multiple
              name="beneficio_repartidor_ids"
              value={form.beneficio_repartidor_ids}
              onChange={handleBeneficiosChange}
              className="p-2 border rounded h-32"
            >
              {beneficiosOpc.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          )}
          <p className="text-sm text-gray-500 mt-1">
            (Mantén presionada Ctrl o Cmd para seleccionar varios)
          </p>
        </div>
      </dl>

      {/* 2) Edición de Campos Extra */}
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Campos Extra</h3>
        {form.campos_extra.map((c, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Nombre"
              value={c.nombre}
              onChange={(e) => handleExtraChange(i, "nombre", e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Valor"
              value={c.valor}
              onChange={(e) => handleExtraChange(i, "valor", e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeExtra(i)}
              className="bg-custom-red text-white px-3 rounded-md"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExtra}
          className="bg-custom-blue text-white rounded px-3 py-1"
        >
          Agregar campo extra
        </button>
      </section>
    </>
  );
};

export default ServicioAnuncioItemEdit;
