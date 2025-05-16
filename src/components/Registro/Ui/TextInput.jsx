// src/components/Form/TextInput.jsx
import React from 'react'

export default function TextInput({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
}) {
  return (
    <div className="relative mb-4">
      <label htmlFor={id} className="mb-2 block text-sm text-white">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && (
        <div className="absolute left-0 top-full mt-1 rounded-sm bg-white p-1 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}
