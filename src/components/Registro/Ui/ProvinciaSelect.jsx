// src/components/Ui/ProvinciaSelect.jsx
import React from 'react'
import Select from 'react-select'
import provinciasYCiudades from '@/components/Registro/utils/provinciasYCiudades'
const ProvinciaSelect = ({ value, onChange, onBlur, touched, error }) => {
    const options = provinciasYCiudades.map(([prov]) => ({
        value: prov,
        label: prov
    }))

    const handleChange = option => {
        onChange({ target: { name: 'provincia', value: option?.value || '' } })
    }
    const handleBlur = () => {
        onBlur({ target: { name: 'provincia' } })
    }

    return (
        <div className="mb-4">
            <label htmlFor="provincia" className="mb-2 block text-sm text-white">
                Provincia
            </label>
            <Select
                inputId="provincia"
                name="provincia"
                options={options}
                value={options.find(o => o.value === value) || null}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Elige una provincia..."
                className="w-full"
                classNamePrefix="react-select"
            />
            {touched && error && (
                <div className="mt-1 text-sm text-red-600">{error}</div>
            )}
        </div>
    )
}

export default ProvinciaSelect
