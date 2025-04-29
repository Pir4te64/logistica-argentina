// src/components/Dashboard/ServicioAnuncio/ServicesSection.jsx
import React from 'react';
import { Section, InputText } from '@/components/Dashboard/ServicioAnuncio/FormControls';
import { FaTrash } from 'react-icons/fa';

/**
 * Section para añadir servicios dinámicamente
 * Recibe:
 * - servicios: array de strings
 * - handleServicioChange: (index, value) => void
 * - addServicio: () => void
 * - removeServicio: (index) => void
 */
const ServicesSection = ({
  servicios,
  handleServicioChange,
  addServicio,
  removeServicio
}) => (
  <Section title="Servicios (Opcional)" className="mb-4">
    {servicios.map((serv, i) => (
      <div key={i} className="flex gap-2 mb-2 items-center">
        <InputText
          placeholder="Servicio"
          value={serv}
          onChange={e => handleServicioChange(i, e.target.value)}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => removeServicio(i)}
          aria-label="Eliminar servicio"
          className="flex-none bg-custom-red text-white p-2 rounded-md hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addServicio}
      className="bg-custom-blue text-white rounded px-3 py-1 hover:bg-blue-700 transition"
    >
      Agregar servicio
    </button>
  </Section>
);

export default ServicesSection;
