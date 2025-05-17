// src/components/Registro/RegisterComponente.jsx
import React from 'react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from '@/components/Registro/registerValidation'
import { useNavigate } from 'react-router-dom'
import { useRegisterStore } from '@/components/Registro/useRegisterStore'
import RegisterImage from '@/components/Registro/RegisterImage'
import TextInput from '@/components/Registro/Ui/TextInput'
import { roleOptions } from '@/components/Registro/utils/roleOptions'
import RolesSelect from '@/components/Registro/Ui/RolesSelect'
import CiudadSelect from '@/components/Registro/Ui/CiudadSelect'
import ProvinciaSelect from '@/components/Registro/Ui/ProvinciaSelect'

const RegisterComponente = () => {
  const navigate = useNavigate()
  const {
    name,
    telefono,
    email,
    password,
    passwordConfirmation,
    roles,
    direccion,
    provincia,
    ciudad,
    isSubmitting,
    setField,
    submit,
  } = useRegisterStore()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const result = await submit()
      if (result.success) navigate('/login')
    },
  })

  const handleChange = e => {
    const { name, value } = e.target
    formik.handleChange(e)
    setField(name, value)
  }

  return (
    <div className="flex h-screen flex-col overflow-y-auto md:flex-row">
      <RegisterImage />
      <div className="flex w-full items-center justify-center bg-custom-gray md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Registro</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="name"
              label="Apellido y Nombre"
              placeholder="Ingresa tu nombre completo"
              value={name}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
              error={formik.errors.name}
            />

            <TextInput
              id="telefono"
              label="Número de Teléfono"
              placeholder="Ingresa tu número de teléfono"
              value={telefono}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.telefono}
              error={formik.errors.telefono}
            />

            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              error={formik.errors.email}
            />

            <RolesSelect
              value={roles}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.roles}
              error={formik.errors.roles}
            />

            <TextInput
              id="direccion"
              label="Dirección"
              placeholder="Ingresa tu dirección"
              value={direccion}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.direccion}
              error={formik.errors.direccion}
            />

            <ProvinciaSelect
              value={provincia}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.provincia}
              error={formik.errors.provincia}
            />

            <CiudadSelect
              provincia={provincia}
              value={ciudad}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.ciudad}
              error={formik.errors.ciudad}
            />

            <TextInput
              id="password"
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              error={formik.errors.password}
            />

            <TextInput
              id="passwordConfirmation"
              type="password"
              label="Repetir Contraseña"
              placeholder="Repite tu contraseña"
              value={passwordConfirmation}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.passwordConfirmation}
              error={formik.errors.passwordConfirmation}
            />

            <button
              type="submit"
              className="mt-5 w-full rounded bg-custom-red px-4 py-2 text-white hover:bg-custom-red/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarme'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponente
