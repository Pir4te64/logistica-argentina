// src/components/Shared/FormHelpers.jsx
import React from "react";
import { FaChevronDown } from "react-icons/fa";

/**
 * Sección colapsable reutilizable con etiqueta summary/details
 */
export const Section = ({ title, children, defaultOpen = false }) => (
  <details open={defaultOpen} className="group border rounded-lg">
    <summary className="cursor-pointer select-none bg-gray-100 px-3 py-2 font-medium flex justify-between items-center">
      <span>{title}</span>
      <FaChevronDown className="ml-2 transition-transform group-open:rotate-180" />
    </summary>
    <div className="space-y-4 px-3 py-4">{children}</div>
  </details>
);

/**
 * Input de texto genérico
 */
export const InputText = ({ label, className = "", ...props }) => (
  <div className={className}>
    {label && <label className="block font-medium">{label}</label>}
    <input {...props} className="w-full mt-1 p-2 border rounded" />
  </div>
);

/**
 * Checkbox con etiqueta
 */
export const Check = ({ label, ...props }) => (
  <label className="inline-flex items-center">
    <input type="checkbox" className="form-checkbox" {...props} />
    <span className="ml-2">{label}</span>
  </label>
);

/**
 * Select genérico, con loading y opción múltiple
 */
export const Select = ({ label, loading, options = [], tall, ...props }) => (
  <div className="w-full">
    <label className="block font-medium">{label}</label>
    {loading ? (
      <p>Cargando {label.toLowerCase()}…</p>
    ) : (
      <select
        {...props}
        className={`w-full mt-1 p-2 border rounded ${tall ? "h-32" : ""}`}
      >
        {!props.multiple && <option value="">Selecciona</option>}
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nombre}
          </option>
        ))}
      </select>
    )}
  </div>
);
