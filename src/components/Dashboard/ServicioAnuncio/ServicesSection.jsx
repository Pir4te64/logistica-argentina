// src/components/Dashboard/ServicioAnuncio/ServicesSection.jsx
import React from "react";
import {
  Section,
  InputText,
} from "@/components/Dashboard/ServicioAnuncio/FormControls";
import { FaTrash } from "react-icons/fa";

const ServicesSection = ({
  servicios,
  handleServicioChange,
  addServicio,
  removeServicio,
}) => (
  <Section title="Servicios adicionales" className="mb-4">
    {servicios.map((svc, i) => (
      <div
        key={svc.id}
        className="flex flex-col sm:flex-row gap-2 mb-2 items-center"
      >
        <InputText
          placeholder="Nombre del servicio"
          value={svc.nombre}
          onChange={(e) => handleServicioChange(i, "nombre", e.target.value)}
          className="flex-1"
        />
        <InputText
          placeholder="Descripción del servicio"
          value={svc.descripcion}
          onChange={(e) =>
            handleServicioChange(i, "descripcion", e.target.value)
          }
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
