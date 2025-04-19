// src/components/Dashboard/ServicioAnuncio/ExtraFieldsSection.jsx
import React from 'react';
import { Section, InputText } from './FormControls';

const ExtraFieldsSection = ({
    camposExtra,
    handleCampoExtraChange,
    addCampoExtra,
    removeCampoExtra
}) => (
    <Section title="Campos extra">
        {camposExtra.map((c, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                <InputText
                    placeholder="Nombre del campo"
                    value={c.nombre}
                    onChange={e => handleCampoExtraChange(i, 'nombre', e.target.value)}
                    className="flex-1"
                />
                <InputText
                    placeholder="Valor del campo"
                    value={c.valor}
                    onChange={e => handleCampoExtraChange(i, 'valor', e.target.value)}
                    className="flex-1"
                />
                <button
                    type="button"
                    onClick={() => removeCampoExtra(i)}
                    className="bg-custom-red text-white px-3 rounded-md"
                >
                    Eliminar
                </button>
            </div>
        ))}
        <button
            type="button"
            onClick={addCampoExtra}
            className="bg-custom-blue text-white rounded px-3 py-1"
        >
            Agregar campo extra
        </button>
    </Section>
);

export default ExtraFieldsSection;
