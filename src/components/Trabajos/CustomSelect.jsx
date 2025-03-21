// CustomSelect.jsx
import React from "react";

const CustomSelect = ({ label, name, formik, options }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-white">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="border rounded p-2"
      >
        <option value="">Seleccione una opción</option>
        {options.map((group) =>
          group.options ? (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            // Si no hay grupos (para "Empresas", por ejemplo)
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          )
        )}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-sm">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CustomSelect;
