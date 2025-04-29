// src/components/Dashboard/ServicioAnuncio/ExtraFieldsSection.jsx
import React from 'react';
import { Section, InputText } from '@/components/Dashboard/ServicioAnuncio/FormControls';
import { FaTrash } from 'react-icons/fa';

const ExtraFieldsSection = ({
  camposExtra,
  handleCampoExtraChange,
  addCampoExtra,
  removeCampoExtra
}) => (
  <Section title="Campos extra" className="mb-4">
    {camposExtra.map((c, i) => (
      <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2 items-center">
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
          aria-label="Eliminar campo extra"
          className="flex-none bg-custom-red text-white p-2 rounded-md hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addCampoExtra}
      className="bg-custom-blue text-white rounded px-3 py-1 hover:bg-blue-700 transition"
    >
      Agregar campo extra
    </button>
  </Section>
);

export default ExtraFieldsSection;
