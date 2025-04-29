// src/components/Dashboard/ServicioAnuncio/ConfigSections.jsx
import React from 'react';
import { Section, Select } from '@/components/Dashboard/ServicioAnuncio/FormControls';

const ConfigSections = ({
    form,
    categorias,
    beneficios,
    resaltadores,
    estados,
    loadingCat,
    loadingBen,
    loadingRes,
    loadingEst,
    handleChange,
    handleBeneficiosChange
}) => (
    <Section title="Configuraciones *">
        <Select
            label="Categoría de Vehículo"
            name="categoriaVehiculoId"
            value={form.categoriaVehiculoId}
            onChange={handleChange}
            loading={loadingCat}
            options={categorias}
        />
        <div>
            <Select
                label="Beneficios"
                name="beneficioIds"
                multiple
                value={form.beneficioIds}
                onChange={handleBeneficiosChange}
                loading={loadingBen}
                options={beneficios}
                tall
            />
            <p className="text-sm text-gray-500 mt-1">
                Puedes seleccionar más de una opción
            </p>
        </div>
        <Select
            label="Resaltador de Anuncio"
            name="resaltarId"
            value={form.resaltarId}
            onChange={handleChange}
            loading={loadingRes}
            options={resaltadores}
        />
        <Select
            label="Estado de Servicio"
            name="estadoServicioId"
            value={form.estadoServicioId}
            onChange={handleChange}
            loading={loadingEst}
            options={estados}
        />
    </Section>
);

export default ConfigSections;
