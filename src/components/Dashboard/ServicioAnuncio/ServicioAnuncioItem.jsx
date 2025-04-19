// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem.jsx
import React, { useState } from "react";
import axios from "axios";
import {
    FaEdit,    // ✏️
    FaTimes,   // ✖️
    FaCheck,   // 💾
    FaTrash,   // 🗑️
} from "react-icons/fa";
import { API_URL } from "../../../Api/Api";

/* ---------- Config ---------- */

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
    video_url: "text",
};

const labelize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

const ServicioAnuncioItem = ({ servicio, index, onUpdated }) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(servicio);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    //console.log("servicio", servicio);

    /* ---- Handlers ---- */

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleCancel = () => {
        setForm(servicio);
        setEditMode(false);
        setError("");
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            const token = localStorage.getItem("token");
            await axios.put(
                `${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditMode(false);
            onUpdated();
        } catch {
            setError("No se pudo guardar. Intenta nuevamente.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro querés eliminar este servicio?")) return;
        try {
            setDeleting(true);
            setError("");
            const token = localStorage.getItem("token");
            await axios.delete(
                `${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onUpdated();
        } catch {
            setError("No se pudo eliminar. Intenta nuevamente.");
        } finally {
            setDeleting(false);
        }
    };

    /* ---- Rendering fields ---- */

    const renderField = (k, v) => {
        if (!editMode || !EDITABLE_FIELDS[k]) {
            return (
                <div key={k} className="flex flex-col">
                    <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                    <dd className="mt-1 text-base text-gray-900">{String(v)}</dd>
                </div>
            );
        }
        const type = EDITABLE_FIELDS[k];
        return (
            <div key={k} className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">{labelize(k)}</label>
                {type === "checkbox" ? (
                    <input
                        type="checkbox"
                        name={k}
                        checked={!!form[k]}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600"
                    />
                ) : (
                    <input
                        type={type}
                        name={k}
                        value={form[k] ?? ""}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg  space-y-6">
            {/* Header with actions */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Servicio #{index + 1}
                </h2>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                    {!editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <FaEdit /> <span className="ml-1">Editar</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex items-center text-custom-red hover:text-custom-red/80 disabled:opacity-50"
                            >
                                <FaTrash />{" "}
                                <span className="ml-1">
                                    {deleting ? "Eliminando…" : "Eliminar"}
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-custom-blue-medium disabled:opacity-50"
                            >
                                <FaCheck />{" "}
                                <span className="ml-2">
                                    {saving ? "Guardando…" : "Guardar"}
                                </span>
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                <FaTimes /> <span className="ml-2">Cancelar</span>
                            </button>
                        </>
                    )}
                </div>
            </header>

            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Main fields */}
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

            {/* Nested objects (read-only) */}
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
                </>
            )}

            {/* Lists (read-only) */}
            {!editMode && form.beneficios?.length > 0 && (
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

            {!editMode && form.imagenes?.length > 0 && (
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

            {!editMode && form.campos_extra?.length > 0 && (
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

            {/* Video link */}
            {!editMode && form.video_url && (
                <section>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Video</h3>
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
        </div>
    );
};

export default ServicioAnuncioItem;
