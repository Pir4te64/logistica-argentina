import React, { useState } from 'react';
import { useServicioAnuncio } from './useServicioAnuncio';
import ServicioAnuncioItem from './ServicioAnuncioItem';
import ServicioAnuncioForm from './ServicioAnuncioForm';

const ServicioAnuncio = () => {
    const { servicios, loading, error } = useServicioAnuncio();
    const [showForm, setShowForm] = useState(false);
    console.log(servicios);

    if (loading) return <p>Cargando servicios…</p>;
    if (error) return <p>Error cargando servicios.</p>;
    if (!servicios.length && !showForm) return <p>No se encontraron servicios.</p>;

    return (
        <div className="space-y-8">
            {/* Botón para alternar entre lista y formulario */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="px-4 py-2 bg-custom-gray text-white rounded hover:bg-custom-gray/80 transition"
                >
                    {showForm ? 'Ver Servicios' : 'Crear Servicio'}
                </button>
            </div>

            {/* Mostrar formulario o lista de servicios */}
            {showForm ? (
                <ServicioAnuncioForm onSubmit={() => setShowForm(false)} />
            ) : (
                servicios.map((servicio, index) => (
                    <ServicioAnuncioItem
                        key={servicio.id ?? index}
                        servicio={servicio}
                        index={index}
                    />
                ))
            )}
        </div>
    );
};

export default ServicioAnuncio;
