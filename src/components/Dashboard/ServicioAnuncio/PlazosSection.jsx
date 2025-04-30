// src/components/Dashboard/ServicioAnuncio/PlazosSection.jsx
import React from "react";
import {
  Section,
  InputText,
} from "@/components/Dashboard/ServicioAnuncio/FormControls";
import { FaTrash } from "react-icons/fa";

const PlazosSection = ({
  plazos,
  handlePlazoChange,
  addPlazo,
  removePlazo,
}) => (
  <Section title="Plazos de servicio" className="mb-4">
    {plazos.map((plazo, i) => (
      <div
        key={plazo.id}
        className="flex flex-col sm:flex-row gap-2 mb-2 items-center"
      >
        <InputText
          placeholder="Nombre del plazo"
          value={plazo.nombre}
          onChange={(e) => handlePlazoChange(i, "nombre", e.target.value)}
          className="flex-1"
        />
        <InputText
          placeholder="Descripción del plazo"
          value={plazo.descripcion}
          onChange={(e) => handlePlazoChange(i, "descripcion", e.target.value)}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => removePlazo(i)}
          aria-label="Eliminar plazo"
          className="flex-none bg-custom-red text-white p-2 rounded-md hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addPlazo}
      className="bg-custom-blue text-white rounded px-3 py-1 hover:bg-blue-700 transition"
    >
      Agregar plazo
    </button>
  </Section>
);

export default PlazosSection;
