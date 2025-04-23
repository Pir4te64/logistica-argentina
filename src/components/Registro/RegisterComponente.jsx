// src/components/Registro/RegisterComponente.jsx

import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import RegisterImg from "@/assets/Login.jpg"; // Ajusta la ruta según corresponda
import { API_URL } from "@/Api/Api";
import { initialValues, validationSchema } from "@/components/Registro/registerValidation";

const RegisterComponente = () => {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Preparamos los datos, renombrando passwordConfirmation a password_confirmation
      const data = {
        name: values.name,
        telefono: values.telefono,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        roles: values.roles,
      };

      try {
        const response = await axios.post(API_URL.REGISTER, data);
        console.log("Respuesta del servidor:", response.data);
        setMessage(response.data.message);
        alert("Registro exitoso, serás redirigido a la página de inicio de sesión");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error en registro:", error);
        setMessage("Error en el registro");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sección izquierda: imagen (visible en pantallas medianas en adelante) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={RegisterImg}
          alt="Imagen de registro"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección derecha: formulario de registro */}
      <div className="w-full md:w-1/2 bg-custom-gray flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Registro</h2>
          <form onSubmit={formik.handleSubmit}>

            {/* Apellido y Nombre */}
            <div className="mb-4 relative">
              <label htmlFor="name" className="block text-sm mb-2 text-white">
                Apellido y Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ingresa tu nombre completo"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Número de Teléfono */}
            <div className="mb-4 relative">
              <label htmlFor="telefono" className="block text-sm mb-2 text-white">
                Número de Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="text"
                placeholder="Ingresa tu número de teléfono"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.telefono && formik.errors.telefono && (
                <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                  {formik.errors.telefono}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <label htmlFor="email" className="block text-sm mb-2 text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Select de Roles */}
            <div className="mb-4 relative">
              <label htmlFor="roles" className="block text-sm mb-2 text-white">
                Selecciona un rol
              </label>
              <select
                id="roles"
                name="roles"
                {...formik.getFieldProps("roles")}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
              >
                <option value="">-- Elige uno --</option>
                <option value="Transportistas">Transportistas</option>
                <option value="Choferes y/o Acompañantes">Choferes y/o Acompañantes</option>
                <option value="Empresas">Empresas</option>
                <option value="Colaboradores">Colaboradores</option>
              </select>
              {formik.touched.roles && formik.errors.roles && (
                <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                  {formik.errors.roles}
                </div>
              )}
            </div>

            {/* Contraseña */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm mb-2 text-white">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Repetir Contraseña */}
            <div className="mb-6 relative">
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm mb-2 text-white"
              >
                Repetir Contraseña
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Repite tu contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation && (
                  <div className="absolute top-full left-0 mt-1 text-red-600 bg-white rounded-sm p-1 text-sm">
                    {formik.errors.passwordConfirmation}
                  </div>
                )}
            </div>

            {/* Botón Registrarme */}
            <button
              type="submit"
              className="bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full mt-5"
              disabled={formik.isSubmitting}
            >
              Registrarme
            </button>
          </form>

          {/* Mensaje de respuesta de la petición */}
          {message && (
            <div className="mt-4 text-center text-white">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterComponente;
