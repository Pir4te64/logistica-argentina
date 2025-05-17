// src/components/Ui/RolesSelect.jsx
import React from 'react'
import Select from 'react-select'
import { roleOptions } from '@/components/Registro/utils/roleOptions'

/**
 * Props:
 *  - value: el valor actual (string)
 *  - onChange: función que recibe un event-like ({ target: { name, value } })
 *  - onBlur: función que recibe un event-like ({ target: { name } })
 *  - touched: boolean (Formik.touched.roles)
 *  - error: string (Formik.errors.roles)
 */
const RolesSelect = ({ value, onChange, onBlur, touched, error }) => {
  // Encuentra la opción seleccionada en base al valor
  const selectedOption = roleOptions.find(opt => opt.value === value) || null

  // Cuando cambia react-select, lo transformamos a un "event" compatible
  const handleChange = option => {
    onChange({ target: { name: 'roles', value: option?.value || '' } })
  }

  // Al perder foco, avisamos a Formik
  const handleBlur = () => {
    onBlur({ target: { name: 'roles' } })
  }

  return (
    <div className="mb-4">
      <label htmlFor="roles" className="mb-2 block text-sm text-white">
        Selecciona un rol
      </label>
      <Select
        inputId="roles"
        name="roles"
        options={roleOptions}
        value={selectedOption}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full"
        classNamePrefix="react-select"
        placeholder="Elige un rol..."
      />
      {touched && error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
    </div>
  )
}

export default RolesSelect
