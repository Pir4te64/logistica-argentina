import React from "react";
import LoginImg from "../assets/Login.jpg";

// Importamos los íconos que usaremos
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const LoginComponente = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen">
      {/* Sección izquierda: imagen */}
      {/* Oculta en mobile (hidden), se muestra en pantallas medianas en adelante (md:block) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={LoginImg}
          alt="Imagen de login"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección derecha: formulario */}
      {/* En móvil ocupa todo el ancho (w-full), en desktop la mitad (md:w-1/2) */}
      <div className="w-full md:w-1/2 bg-custom-gray flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Iniciar sesión</h2>

          {/* Campo Provincia */}
          <div className="mb-4">
            <label
              className="block text-sm mb-2 text-white"
              htmlFor="provincia"
            >
              Provincia
            </label>
            <input
              id="provincia"
              type="text"
              placeholder="Ingresa tu provincia"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-4">
            <label className="block text-sm mb-2 text-white" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Olvidaste tu contraseña */}
          <div className="flex justify-end mb-4">
            <a href="#" className="text-sm text-white hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón Ingresar */}
          <button className="bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full mb-4">
            Ingresar
          </button>

          {/* Registro */}
          <p className="text-center text-sm mb-4 text-white">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-white hover:underline">
              Regístrate
            </a>
          </p>

          {/* Opciones de acceso adicionales */}
          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded py-2 px-4 hover:bg-gray-50">
              <FcGoogle size={20} />
              <span>Continuar con Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded py-2 px-4 hover:bg-gray-50">
              <MdEmail size={20} className="text-gray-600" />
              <span>Continuar con email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponente;
