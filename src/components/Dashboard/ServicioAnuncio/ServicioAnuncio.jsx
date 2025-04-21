import React, { useState } from 'react';
import { useServicioAnuncio } from '@/components/Dashboard/ServicioAnuncio/useServicioAnuncio';
import ServicioAnuncioItem from '@/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem';
import ServicioAnuncioForm from '@/components/Dashboard/ServicioAnuncio/ServicioAnuncioForm';
import { FaChevronDown } from 'react-icons/fa';

const ServicioAnuncio = () => {
    const { servicios, loading, error, refetch } = useServicioAnuncio();
    const [showForm, setShowForm] = useState(false);

    if (loading) return <p>Cargando servicios…</p>;
    if (error) return <p>Error cargando servicios.</p>;
    if (!servicios.length && !showForm) return <p>No se encontraron servicios.</p>;

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="px-4 py-2 bg-custom-gray text-white rounded hover:bg-custom-gray/80 transition"
                >
                    {showForm ? 'Ver Servicios' : 'Crear Servicio'}
                </button>
            </div>

            {showForm ? (
                <ServicioAnuncioForm onSubmit={() => setShowForm(false)} />
            ) : (
                servicios.map((servicio, index) => (
                    <details
                        key={servicio.id}
                        className="group border rounded-lg bg-white shadow-sm transition-all
                       [&[open]]:shadow-md"
                    >
                        <summary
                            className="flex w-full items-center justify-between gap-2
                         cursor-pointer select-none p-4
                         text-gray-700 font-medium
                         marker:hidden"
                        >
                            <span className="text-base md:text-lg">
                                {servicio.titulo ?? `Servicio #${index + 1}`}
                            </span>
                            <FaChevronDown
                                className="w-5 h-5 shrink-0 transition-transform duration-300
                           group-open:-rotate-180"
                            />
                        </summary>

                        <div className="p-4 border-t text-sm text-gray-600">
                            <ServicioAnuncioItem
                                servicio={servicio}
                                index={index}
                                onUpdated={refetch}
                            />
                        </div>
                    </details>
                ))
            )}
        </div>
    );
};

export default ServicioAnuncio;
