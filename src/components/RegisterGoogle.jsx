import React from "react";
import RegisterImg from "@/assets/Login.jpg"; // Ajusta la ruta de la imagen si es necesario

const RegisterGoogle = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen">
      {/* Sección izquierda: imagen (visible solo en pantallas md en adelante) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={RegisterImg}
          alt="Imagen de registro"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección derecha: formulario de registro */}
      <div className="w-full md:w-1/2 bg-custom-gray flex items-center justify-center">
        <div className="max-w-md w-full p-8 md:p-0">
          <h2 className="text-2xl font-bold mb-6 text-white">Registro</h2>

          {/* Provincia */}
          <div className="mb-4">
            <label
              htmlFor="provincia"
              className="block text-sm mb-2 text-white"
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

          {/* Ciudad */}
          <div className="mb-4">
            <label htmlFor="ciudad" className="block text-sm mb-2 text-white">
              Ciudad
            </label>
            <input
              id="ciudad"
              type="text"
              placeholder="Ingresa tu ciudad"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Vehículo */}
          <div className="mb-4">
            <label htmlFor="vehiculo" className="block text-sm mb-2 text-white">
              Vehículo
            </label>
            <input
              id="vehiculo"
              type="text"
              placeholder="Ingresa tu vehículo"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Número de Teléfono */}
          <div className="mb-6">
            <label htmlFor="telefono" className="block text-sm mb-2 text-white">
              Número de Teléfono
            </label>
            <input
              id="telefono"
              type="text"
              placeholder="Ingresa tu teléfono"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Botón Registrarme */}
          <button className="bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full">
            Registrarme
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterGoogle;
