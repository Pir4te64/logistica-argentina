// src/components/Trabajos/CustomSelect.jsx
import React from "react";

const CustomSelect = ({
  label,
  name,
  options,
  value,
  onChange,
  className = "",
}) => {
  const handleChange = (e) => onChange(e.target.value);
  const isGrouped = options.length > 0 && options[0].options;

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm font-medium text-gray-200">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full bg-white text-gray-800 p-2 rounded"
      >
        <option value="">— Todas —</option>
        {isGrouped
          ? options.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))
          : options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
      </select>
    </div>
  );
};

export default CustomSelect;
