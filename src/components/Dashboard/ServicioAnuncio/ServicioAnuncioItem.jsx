// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem.jsx
import React from 'react';

// Campos a omitir en listado simple
const OMITIR = [
    'created_at', 'updated_at',
    'beneficios', 'categoria_vehiculo', 'resaltador', 'estado',
    'imagenes', 'campos_extra'
];
const OMITIR_NESTED = ['created_at', 'updated_at'];

// Convierte snake_case a "Snake Case"
const labelize = key =>
    key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// Renderiza un objeto anidado en un fieldset
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

/**
 * Componente que renderiza los detalles de un servicio
 * extraído de la iteración en ServicioAnuncio.jsx
 */
const ServicioAnuncioItem = ({ servicio, index }) => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">
            Detalle de Servicio #{index + 1}
        </h2>

        {/* Listado simple de campos */}
        <ul className="list-disc list-inside space-y-1">
            {Object.entries(servicio)
                .filter(([k, v]) => !OMITIR.includes(k) && typeof v !== 'object')
                .map(([k, v]) => (
                    <li key={k}>
                        <span className="font-medium">{labelize(k)}:</span> {String(v)}
                    </li>
                ))}
        </ul>

        {/* Secciones compuestas */}
        {servicio.categoria_vehiculo &&
            renderObject(servicio.categoria_vehiculo, 'Categoría de Vehículo')}
        {servicio.resaltador &&
            renderObject(servicio.resaltador, 'Resaltador')}
        {servicio.estado && renderObject(servicio.estado, 'Estado')}

        {/* Enlace de video */}
        {servicio.video_url && (
            <div>
                <span className="font-medium">Video:</span>{' '}
                <a
                    href={servicio.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    Ver video
                </a>
            </div>
        )}

        {/* Arrays */}
        {servicio.beneficios?.length > 0 && (
            <fieldset className="border p-4 rounded">
                <legend className="font-medium">Beneficios</legend>
                <ul className="list-disc list-inside">
                    {servicio.beneficios.map(b => (
                        <li key={b.id}>{b.nombre}</li>
                    ))}
                </ul>
            </fieldset>
        )}
        {servicio.imagenes?.length > 0 && (
            <fieldset className="border p-4 rounded">
                <legend className="font-medium">Imágenes</legend>
                <ul className="list-disc list-inside">
                    {servicio.imagenes.map(img => (
                        <li key={img.id}>{img.imagen_url}</li>
                    ))}
                </ul>
            </fieldset>
        )}
        {servicio.campos_extra?.length > 0 && (
            <fieldset className="border p-4 rounded">
                <legend className="font-medium">Campos Extra</legend>
                <ul className="list-disc list-inside">
                    {servicio.campos_extra.map(c => (
                        <li key={c.id}>{`${c.nombre}: ${c.valor}`}</li>
                    ))}
                </ul>
            </fieldset>
        )}
    </div>
);

export default ServicioAnuncioItem;
