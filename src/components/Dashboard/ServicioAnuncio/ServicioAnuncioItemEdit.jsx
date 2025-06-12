// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemEdit.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import {
  InputText,
} from "@/components/Dashboard/ServicioAnuncio/FormControls";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";
import { config } from "@/config";

const ServicioAnuncioItemEdit = ({
  form,
  handleChange,
  toggleBeneficio,
  categorias,
  contactPhones,
  resaltadores,
  estados,
  handleExtraChange,
  addExtra,
  removeExtra,
  handleServicioChange,
  addServicio,
  removeServicio,
  handlePlazoChange,
  addPlazo,
  removePlazo,
  EDITABLE_FIELDS,
  labelize,
  handleFileChange,
  removeImage,
}) => {
  const { data: benResp } = useBeneficioRepartidor();
  const beneficiosOpc = benResp?.data || [];
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* ───────── 1) CAMPOS EDITABLES ───────── */}
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(form)
          .filter(([k]) => EDITABLE_FIELDS[k])
          .map(([k]) => {
            const type = EDITABLE_FIELDS[k];

            /* --- date --- */
            if (type === "date") {
              return (
                <div key={k} className="flex flex-col">
                  <label
                    htmlFor={k}
                    className="mb-1 text-sm font-medium text-gray-700"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              );
            }

            /* --- checkbox --- */
            if (type === "checkbox") {
              return (
                <div key={k} className="flex items-center">
                  <input
                    id={k}
                    type="checkbox"
                    name={k}
                    checked={!!form[k]}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 transition focus:ring-2 focus:ring-indigo-500"
                  />
                  <label htmlFor={k} className="ml-2 text-sm text-gray-700">
                    {labelize(k)}
                  </label>
                </div>
              );
            }

            /* --- selects --- */
            if (type.startsWith("select_")) {
              const options =
                type === "select_categoria"
                  ? categorias
                  : type === "select_contacto"
                    ? contactPhones
                    : type === "select_resaltador"
                      ? resaltadores
                      : estados;

              const nameKey =
                type === "select_categoria"
                  ? "categoria_vehiculo_id"
                  : type === "select_contacto"
                    ? "soporte_telefonico"
                    : type === "select_resaltador"
                      ? "resaltador_anuncio_id"
                      : "estado_servicio_id";

              return (
                <div key={k} className="flex flex-col">
                  <label
                    htmlFor={nameKey}
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    {labelize(k)}
                  </label>
                  <select
                    id={nameKey}
                    name={nameKey}
                    value={form[nameKey] || ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            /* --- text / number --- */
            return (
              <div key={k} className="flex flex-col">
                <label
                  htmlFor={k}
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  {labelize(k)}
                </label>
                <input
                  id={k}
                  type={type}
                  name={k}
                  value={form[k] || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            );
          })}
      </dl>

      {/* ───────── 2) BENEFICIOS ───────── */}
      <section className="mt-6 sm:col-span-2 lg:col-span-3">
        <h3 className="mb-2 text-sm font-medium text-gray-700">Beneficios</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {beneficiosOpc.map((b) => (
            <label
              key={b.id}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <input
                type="checkbox"
                checked={form.beneficios.includes(b.id)}
                onChange={() => toggleBeneficio(b.id)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 transition focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-800">{b.nombre}</span>
            </label>
          ))}
        </div>
      </section>

      {/* ───────── 3) CAMPOS EXTRA ───────── */}
      <section className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Campos&nbsp;Extra
        </h3>
        {form.campos_extra.map((c, i) => (
          <div key={i} className="mb-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Nombre"
              value={c.nombre}
              onChange={(e) => handleExtraChange(i, "nombre", e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Valor"
              value={c.valor}
              onChange={(e) => handleExtraChange(i, "valor", e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeExtra(i)}
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExtra}
          className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Agregar&nbsp;campo&nbsp;extra
        </button>
      </section>

      {/* ───────── 4) SERVICIOS ───────── */}
      <section className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Servicios</h3>
        {form.servicios_servicio.map((s, i) => (
          <div key={s.id ?? i} className="mb-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Nombre servicio"
              value={s.nombre}
              onChange={(e) =>
                handleServicioChange(i, "nombre", e.target.value)
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={s.descripcion}
              onChange={(e) =>
                handleServicioChange(i, "descripcion", e.target.value)
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeServicio(i)}
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addServicio}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Agregar&nbsp;servicio
        </button>
      </section>

      {/* ───────── 5) PLAZOS ───────── */}
      <section className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Plazos</h3>
        {form.servicios_plazo.map((p, i) => (
          <div
            key={p.id ?? i}
            className="mb-3 flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Nombre plazo"
              value={p.nombre}
              onChange={(e) => handlePlazoChange(i, "nombre", e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={p.descripcion}
              onChange={(e) =>
                handlePlazoChange(i, "descripcion", e.target.value)
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removePlazo(i)}
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPlazo}
          className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Agregar&nbsp;plazo
        </button>
      </section>

      {/* ───────── 6) MULTIMEDIA ───────── */}
      <section className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Multimedia</h3>
        <InputText
          name="video_url"
          label="Video"
          type="text"
          value={form.video_url}
          onChange={handleChange}
          placeholder="Ingresa la URL del video"
        />
        {form.imagenes?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {form.imagenes.map((file, idx) => {
              return (
                <div key={file.id ? file.id : `file-${idx}`} className="group relative">
                  <img
                    src={file.id ? `${config.baseUrl}/${file.imagen_url}` : URL.createObjectURL(file.file)}
                    alt={`Preview ${file.id}`}
                    className="h-32 w-full rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <FaTimes />
                  </button>
                </div>
              )
            }
            )}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 w-full rounded border p-2"
        />

      </section>
      {/* ───────── 7) BANNER-CARD ───────── */}
      <section className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Banner del Servicio</h3>
        {form.bannerImage && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            <div key={form.bannerImage.id ? form.bannerImage.id : `bannerImage`} className="group relative">
              <img
                src={form.bannerImage.id ? `https://backend.logisticaargentinasrl.com.ar/${form.bannerImage.imagen_url}` : URL.createObjectURL(form.bannerImage.file)}
                alt={`Preview ${form.bannerImage.id}`}
                className="h-32 w-full rounded object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(0, 'banner')}
                className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
        <input
          id="banner-input"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, 'banner')}
          className="mt-1 w-full rounded border p-2"
        />

      </section>
    </>
  );
};

export default ServicioAnuncioItemEdit;
