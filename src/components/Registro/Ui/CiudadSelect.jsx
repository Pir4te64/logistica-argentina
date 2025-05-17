// src/components/Ui/CiudadSelect.jsx
import React, { useMemo } from 'react'
import Select from 'react-select'
import provinciasYCiudades from '@/components/Registro/utils/provinciasYCiudades'

const CiudadSelect = ({
    provincia,
    value,
    onChange,
    onBlur,
    touched,
    error
}) => {
    const options = useMemo(() => {
        const entry = provinciasYCiudades.find(([prov]) => prov === provincia)
        return entry
            ? entry[1].map(ciudad => ({ value: ciudad, label: ciudad }))
            : []
    }, [provincia])

    const handleChange = option => {
        onChange({ target: { name: 'ciudad', value: option?.value || '' } })
    }
    const handleBlur = () => {
        onBlur({ target: { name: 'ciudad' } })
    }

    return (
        <div className="mb-4">
            <label htmlFor="ciudad" className="mb-2 block text-sm text-white">
                Ciudad
            </label>
            <Select
                inputId="ciudad"
                name="ciudad"
                options={options}
                value={options.find(o => o.value === value) || null}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={
                    provincia ? 'Elige una ciudad...' : 'Selecciona provincia primero'
                }
                isDisabled={!provincia}
                className="w-full"
                classNamePrefix="react-select"
            />
            {touched && error && (
                <div className="mt-1 text-sm text-red-600">{error}</div>
            )}
        </div>
    )
}

export default CiudadSelect
