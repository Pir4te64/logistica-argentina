// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem.jsx
import React, { useState } from "react";
import axios from "axios";
import {
    FaEdit,
    FaTimes,
    FaCheck,
    FaTrash,
} from "react-icons/fa";
import { API_URL } from "../../../Api/Api";
import useCategoriaVehiculos from "../Categoria/useCategoriaVehiculos";
import useResaltarAnuncio from "../ResaltarAnuncio/useResaltarAnuncio";
import useEstadoServicio from "../EstadoServicio/useEstadoServicio";
import ItemActions from "./ItemActions";
import useServicioAnuncioItem from "./useServicioAnuncioItem";

const OMITIR = [
    "created_at",
    "updated_at",
    "beneficios",
    "categoria_vehiculo",
    "resaltador",
    "estado",
    "imagenes",
    "campos_extra",
    "video_url",
];
const OMITIR_NESTED = ["id", "created_at", "updated_at"];

/**
 * Definimos qué campos son editables y de qué tipo.
 * Ya no incluimos video_url, beneficios ni imágenes.
 */
const EDITABLE_FIELDS = {
    empresa: "text",
    fecha_inicio_servicio: "date",
    tarifa_total: "number",
    periodo_nombre: "text",
    periodo_valor: "number",
    direccion_recogida: "text",
    direccion_entrega: "text",
    telefono_contacto: "text",
    cantidad_productos: "number",
    cantidad_vehiculos: "number",
    peso: "number",
    dimensiones: "text",
    fragil: "checkbox",
    liquido: "checkbox",
    requiere_refrigeracion: "checkbox",
    ciudad: "text",
    categoria_vehiculo_id: "select_categoria",
    resaltador_anuncio_id: "select_resaltador",
    estado_servicio_id: "select_estado",
};

const labelize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

const ServicioAnuncioItem = ({ servicio, index, onUpdated }) => {
    const {
        form,
        editMode,
        saving,
        deleting,
        error,
        setEditMode,
        handleChange,
        handleExtraChange,
        addExtra,
        removeExtra,
        handleCancel,
        handleSave,
        handleDelete
    } = useServicioAnuncioItem(servicio, onUpdated);

    const { data: catResp, loading: loadingCat } = useCategoriaVehiculos();
    const { data: resResp, loading: loadingRes } = useResaltarAnuncio();
    const { data: estResp, loading: loadingEst } = useEstadoServicio();
    const categorias = catResp?.data || [];
    const resaltadores = resResp?.data || [];
    const estados = estResp?.data || [];


    // Render dinámico de un campo según esté en edición y su tipo
    const renderField = (k, v) => {
        const type = EDITABLE_FIELDS[k];
        if (!editMode || !type) {
            return (
                <div key={k} className="flex flex-col">
                    <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                    <dd className="mt-1 text-base text-gray-900">{String(v)}</dd>
                </div>
            );
        }

        if (type === "checkbox") {
            return (
                <div key={k} className="flex flex-col">
                    <label className="text-sm text-gray-500 mb-1">{labelize(k)}</label>
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
                <label className="text-sm text-gray-500 mb-1">{labelize(k)}</label>
                <input
                    type={type}
                    name={k}
                    value={form[k] ?? ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg space-y-6">
            {/* Header con acciones */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Servicio #{index + 1}
                </h2>
                <ItemActions
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleDelete={handleDelete}
                    deleting={deleting}
                    handleSave={handleSave}
                    saving={saving}
                    handleCancel={handleCancel}
                />
            </header>

            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Campos simples */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(form)
                    .filter(
                        ([k, v]) =>
                            !OMITIR.includes(k) &&
                            typeof v !== "object" &&
                            !k.endsWith("_id") &&
                            k !== "id"
                    )
                    .map(([k, v]) => renderField(k, v))}
            </dl>

            {/* Edición de campos extra */}
            {editMode && (
                <section>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Campos Extra
                    </h3>
                    {form.campos_extra.map((c, i) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={c.nombre}
                                onChange={(e) =>
                                    handleExtraChange(i, "nombre", e.target.value)
                                }
                                className="flex-1 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Valor"
                                value={c.valor}
                                onChange={(e) =>
                                    handleExtraChange(i, "valor", e.target.value)
                                }
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
            )}

            {/* Secciones read-only anidadas y listas */}
            {!editMode && (
                <>
                    {form.categoria_vehiculo && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Categoría de Vehículo
                            </h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(form.categoria_vehiculo)
                                    .filter(([k]) => !OMITIR_NESTED.includes(k))
                                    .map(([k, v]) => (
                                        <div key={k} className="flex flex-col">
                                            <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                                            <dd className="mt-1 text-gray-900">{String(v)}</dd>
                                        </div>
                                    ))}
                            </dl>
                        </section>
                    )}

                    {form.resaltador && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Resaltador
                            </h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(form.resaltador)
                                    .filter(([k]) => !OMITIR_NESTED.includes(k))
                                    .map(([k, v]) => (
                                        <div key={k} className="flex flex-col">
                                            <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                                            <dd className="mt-1 text-gray-900">{String(v)}</dd>
                                        </div>
                                    ))}
                            </dl>
                        </section>
                    )}

                    {form.estado && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Estado
                            </h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(form.estado)
                                    .filter(([k]) => !OMITIR_NESTED.includes(k))
                                    .map(([k, v]) => (
                                        <div key={k} className="flex flex-col">
                                            <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                                            <dd className="mt-1 text-gray-900">{String(v)}</dd>
                                        </div>
                                    ))}
                            </dl>
                        </section>
                    )}

                    {form.beneficios?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Beneficios
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {form.beneficios.map((b) => (
                                    <li key={b.id} className="text-gray-900">
                                        {b.nombre}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {form.imagenes?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Imágenes
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {form.imagenes.map((img) => (
                                    <li key={img.id} className="text-gray-900">
                                        <a
                                            href={img.imagen_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {img.imagen_url}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {form.campos_extra?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Campos Extra
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {form.campos_extra.map((c) => (
                                    <li key={c.id} className="text-gray-900">
                                        <span className="font-medium">{c.nombre}:</span> {c.valor}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {form.video_url && (
                        <section>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Video
                            </h3>
                            <a
                                href={form.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Ver video
                            </a>
                        </section>
                    )}
                </>
            )}
        </div>
    );
};

export default ServicioAnuncioItem;
