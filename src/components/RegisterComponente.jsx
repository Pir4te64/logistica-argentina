import React, { useState } from "react";
import axios from "axios";
import RegisterImg from "../assets/Login.jpg"; // Ajusta la ruta de la imagen según corresponda
import { API_URL } from "../Api/Api";

const RegisterComponente = () => {
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      telefono,
      email,
      password,
      password_confirmation: passwordConfirmation,
      roles: "User", // Se establece por defecto el rol "User"
    };
    try {
      const response = await axios.post(API_URL.REGISTER, data);
      console.log("Respuesta del servidor:", response.data);
      setMessage(response.data.message);
      // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
      alert(
        "Registro exitoso, serás redirigido a la página de inicio de sesión"
      );
      window.location.href = "/login"; // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error en registro:", error);
      setMessage("Error en el registro");
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Sección izquierda: imagen (visible en pantallas medianas en adelante) */}
      <div className='hidden md:block md:w-1/2'>
        <img
          src={RegisterImg}
          alt='Imagen de registro'
          className='h-full w-full object-cover'
        />
      </div>

      {/* Sección derecha: formulario de registro */}
      <div className='w-full md:w-1/2 bg-custom-gray flex items-center justify-center'>
        <div className='max-w-md w-full p-8'>
          <h2 className='text-2xl font-bold text-white mb-6'>Registro</h2>
          <form onSubmit={handleSubmit}>
            {/* Apellido y Nombre */}
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm mb-2 text-white'>
                Apellido y Nombre
              </label>
              <input
                id='name'
                type='text'
                placeholder='Ingresa tu nombre completo'
                className='w-full px-3 py-2 border border-gray-300 rounded'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Número de Teléfono */}
            <div className='mb-4'>
              <label
                htmlFor='telefono'
                className='block text-sm mb-2 text-white'>
                Número de Teléfono
              </label>
              <input
                id='telefono'
                type='text'
                placeholder='Ingresa tu número de teléfono'
                className='w-full px-3 py-2 border border-gray-300 rounded'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm mb-2 text-white'>
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='Ingresa tu email'
                className='w-full px-3 py-2 border border-gray-300 rounded'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm mb-2 text-white'>
                Contraseña
              </label>
              <input
                id='password'
                type='password'
                placeholder='Ingresa tu contraseña'
                className='w-full px-3 py-2 border border-gray-300 rounded'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Repetir Contraseña */}
            <div className='mb-6'>
              <label
                htmlFor='passwordConfirmation'
                className='block text-sm mb-2 text-white'>
                Repetir Contraseña
              </label>
              <input
                id='passwordConfirmation'
                type='password'
                placeholder='Repite tu contraseña'
                className='w-full px-3 py-2 border border-gray-300 rounded'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>

            {/* Botón Registrarme */}
            <button
              type='submit'
              className='bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full'>
              Registrarme
            </button>
          </form>

          {/* Mensaje de respuesta de la petición */}
          {message && (
            <div className='mt-4 text-center text-white'>{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterComponente;
