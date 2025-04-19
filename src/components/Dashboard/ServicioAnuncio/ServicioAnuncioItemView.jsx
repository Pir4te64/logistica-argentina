// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItemView.jsx
import React from "react";

const FLAGS = ["fragil", "liquido", "requiere_refrigeracion"];

/**
 * Componente de solo lectura para ServicioAnuncioItem.
 * Muestra:
 *  - Campos simples y flags como checkbox deshabilitado
 *  - Secciones anidadas: categoría, resaltador, estado
 *  - Listas: beneficios, imágenes, campos_extra, video
 */
const ServicioAnuncioItemView = ({
    form,
    labelize,
    OMITIR,
    OMITIR_NESTED,
}) => (
    <>
        {/* Campos simples (read-only), incluyendo flags */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(form)
                .filter(
                    ([k, v]) =>
                        !OMITIR.includes(k) &&
                        typeof v !== "object" &&
                        !k.endsWith("_id") &&
                        k !== "id"
                )
                .map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                        <dt className="text-sm text-gray-500">{labelize(k)}</dt>
                        {FLAGS.includes(k) ? (
                            <dd className="mt-1">
                                <input
                                    type="checkbox"
                                    disabled
                                    checked={v === 1}
                                    className="h-5 w-5 text-blue-600"
                                />
                            </dd>
                        ) : (
                            <dd className="mt-1 text-gray-900">{String(v)}</dd>
                        )}
                    </div>
                ))}
        </dl>

        {/* Nested: categoría de vehículo */}
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

        {/* Nested: resaltador */}
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

        {/* Nested: estado */}
        {form.estado && (
            <section>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Estado</h3>
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

        {/* Lista de beneficios */}
        {form.beneficios?.length > 0 && (
            <section>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Beneficios</h3>
                <ul className="list-disc list-inside space-y-1">
                    {form.beneficios.map((b) => (
                        <li key={b.id} className="text-gray-900">
                            {b.nombre}
                        </li>
                    ))}
                </ul>
            </section>
        )}

        {/* Lista de imágenes */}
        {form.imagenes?.length > 0 && (
            <section>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Imágenes</h3>
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

        {/* Lista de campos extra */}
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

        {/* Enlace a video */}
        {form.video_url && (
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
    </>
);

export default ServicioAnuncioItemView;
