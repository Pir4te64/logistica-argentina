// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemEdit.jsx
import React from "react";

// Recibimos todo lo necesario como props:
const ServicioAnuncioItemEdit = ({
    form,
    handleChange,
    categorias,
    resaltadores,
    estados,
    handleExtraChange,
    addExtra,
    removeExtra,
    EDITABLE_FIELDS,
    labelize,
}) => {
    return (
        <>
            {/* 1) Los campos editables */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(form)
                    // Nos quedamos solo con los que estén en EDITABLE_FIELDS
                    .filter(([k]) => EDITABLE_FIELDS[k])
                    .map(([k, v]) => {
                        const type = EDITABLE_FIELDS[k];

                        // checkbox
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

                        // select categoría
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

                        // select resaltador
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

                        // select estado
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
            </dl>

            {/* 2) Edición de Campos Extra */}
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
        </>
    );
};

export default ServicioAnuncioItemEdit;
