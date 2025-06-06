import React, { useState, useMemo } from 'react';
import { useServicioAnuncio } from '@/components/Dashboard/ServicioAnuncio/useServicioAnuncio';
import ServicioAnuncioItem from '@/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem';
import ServicioAnuncioForm from '@/components/Dashboard/ServicioAnuncio/ServicioAnuncioForm';
import { FaChevronDown } from 'react-icons/fa';
import { InputText } from '@/components/Dashboard/ServicioAnuncio/FormControls';

const ServicioAnuncio = () => {
    const { servicios, loading, error, refetch } = useServicioAnuncio();
    const [showForm, setShowForm] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const serviciosFiltered = useMemo(() => {
        if (searchInput === '') return servicios;
        return servicios.filter(servicio => {
            const fullText = `${servicio.empresa} - ${servicio.direccion_recogida} - ${servicio.categoria_vehiculo.nombre}`
            return fullText.toLowerCase().includes(searchInput.toLowerCase())
        }
        );
    }, [servicios, searchInput]);

    const handleInputValue = (value) => {
        setSearchInput(value.target.value);
    }

    if (loading) return <p>Cargando servicios…</p>;
    if (error) return <p>Error cargando servicios.</p>;
    if (!servicios.length && !showForm) return <p>No se encontraron servicios.</p>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between">

                <InputText
                    disabled={showForm}
                    name="searchInput"
                    value={searchInput}
                    onChange={handleInputValue}
                    placeholder="Ingresa el nombre de la empresa"
                    className="w-full max-w-xs"
                />
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
                serviciosFiltered.map((servicio, index) => (
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
                                {servicio.empresa ? `${servicio.empresa} - ${servicio.direccion_recogida} - ${servicio.categoria_vehiculo.nombre}` : `Anuncio #${index + 1}`}
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
