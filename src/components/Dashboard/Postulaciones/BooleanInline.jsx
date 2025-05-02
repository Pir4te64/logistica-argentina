// src/components/Dashboard/Postulaciones/BooleanInline.jsx
import React from "react";

const BooleanInline = ({ row, field, value, onToggle }) => (
  <div className="flex items-center justify-center gap-3">
    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={value === true}
        onChange={() => onToggle(row, field, true)}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      Sí
    </label>
    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={value === false}
        onChange={() => onToggle(row, field, false)}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      No
    </label>
  </div>
);

export default BooleanInline;
