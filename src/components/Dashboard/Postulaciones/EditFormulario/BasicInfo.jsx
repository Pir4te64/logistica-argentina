// src/components/Dashboard/Postulaciones/BasicInfo.jsx
import React from 'react'

export default function BasicInfo({ details }) {
  return (
    <div className="mb-6 space-y-1 text-sm text-gray-600">
      <p>
        <span className="font-medium text-gray-800">Email:</span>{' '}
        {details.email}
      </p>
      <p>
        <span className="font-medium text-gray-800">Teléfono:</span>{' '}
        {details.usuario?.telefono ?? '-'}
      </p>
      <p>
        <span className="font-medium text-gray-800">Dirección:</span>{' '}
        {details.usuario?.direccion ?? '-'}
      </p>
      <p>
        <span className="font-medium text-gray-800">Ciudad:</span>{' '}
        {details.usuario?.ciudad ?? '-'}
      </p>
      <p>
        <span className="font-medium text-gray-800">Provincia:</span>{' '}
        {details.usuario?.provincia ?? '-'}
      </p>
    </div>
  )
}
