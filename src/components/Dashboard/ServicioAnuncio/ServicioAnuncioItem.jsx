// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem.jsx
import React, { useState } from "react";
import axios from "axios";
import {
    FaEdit,     // ✏️
    FaTimes,    // ✖️
    FaCheck,    // 💾
    FaTrash,    // 🗑️
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
    key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const renderObject = (obj, titulo) => (
    <fieldset className="border p-4 rounded" key={titulo}>
        <legend className="font-medium">{titulo}</legend>
        <ul className="list-disc list-inside">
            {Object.entries(obj)
                .filter(([k]) => !OMITIR_NESTED.includes(k))
                .map(([k, v]) => (
                    <li key={k}>
                        <span className="font-medium">{labelize(k)}:</span> {String(v)}
                    </li>
                ))}
        </ul>
    </fieldset>
);

const ServicioAnuncioItem = ({ servicio, index, onUpdated }) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(servicio);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

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

    /* ---- Renderizado de campos ---- */

    const renderField = (k, v) => {
        if (!editMode || !EDITABLE_FIELDS[k]) {
            return (
                <p key={k}>
                    <span className="font-medium">{labelize(k)}:</span> {String(v)}
                </p>
            );
        }
        const type = EDITABLE_FIELDS[k];
        return (
            <label key={k} className="block">
                <span className="font-medium">{labelize(k)}:</span>
                {type === "checkbox" ? (
                    <input
                        type="checkbox"
                        name={k}
                        checked={!!form[k]}
                        onChange={handleChange}
                        className="ml-2 align-middle"
                    />
                ) : (
                    <input
                        type={type}
                        name={k}
                        value={form[k] ?? ""}
                        onChange={handleChange}
                        className="mt-1 p-1 border rounded w-full"
                    />
                )}
            </label>
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
            {/* Header con botones */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Detalle de Servicio #{index + 1}
                </h2>

                {!editMode ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setEditMode(true)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                            <FaEdit /> Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 disabled:opacity-60"
                        >
                            <FaTrash /> {deleting ? "Eliminando…" : "Eliminar"}
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1 disabled:opacity-60"
                        >
                            <FaCheck size={14} /> {saving ? "Guardando…" : "Guardar"}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
                        >
                            <FaTimes size={14} /> Cancelar
                        </button>
                    </div>
                )}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            {/* Campos simples */}
            <div className="space-y-2">
                {Object.entries(form)
                    .filter(
                        ([k, v]) =>
                            !OMITIR.includes(k) &&
                            typeof v !== "object" &&
                            !k.endsWith("_id") &&
                            k !== "id"
                    )
                    .map(([k, v]) => renderField(k, v))}
            </div>

            {/* Objetos anidados sólo lectura */}
            {!editMode && (
                <>
                    {form.categoria_vehiculo &&
                        renderObject(form.categoria_vehiculo, "Categoría de Vehículo")}
                    {form.resaltador &&
                        renderObject(form.resaltador, "Resaltador")}
                    {form.estado &&
                        renderObject(form.estado, "Estado")}
                </>
            )}

            {/* Video */}
            {!editMode && form.video_url && (
                <div>
                    <span className="font-medium">Video:</span>{" "}
                    <a
                        href={form.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Ver video
                    </a>
                </div>
            )}

            {/* Listas sólo lectura */}
            {!editMode && form.beneficios?.length > 0 && (
                <fieldset className="border p-4 rounded">
                    <legend className="font-medium">Beneficios</legend>
                    <ul className="list-disc list-inside">
                        {form.beneficios.map((b) => (
                            <li key={b.id}>{b.nombre}</li>
                        ))}
                    </ul>
                </fieldset>
            )}
            {!editMode && form.imagenes?.length > 0 && (
                <fieldset className="border p-4 rounded">
                    <legend className="font-medium">Imágenes</legend>
                    <ul className="list-disc list-inside">
                        {form.imagenes.map((img) => (
                            <li key={img.id}>{img.imagen_url}</li>
                        ))}
                    </ul>
                </fieldset>
            )}
            {!editMode && form.campos_extra?.length > 0 && (
                <fieldset className="border p-4 rounded">
                    <legend className="font-medium">Campos Extra</legend>
                    <ul className="list-disc list-inside">
                        {form.campos_extra.map((c) => (
                            <li key={c.id}>
                                {c.nombre}: {c.valor}
                            </li>
                        ))}
                    </ul>
                </fieldset>
            )}
        </div>
    );
};

export default ServicioAnuncioItem;
