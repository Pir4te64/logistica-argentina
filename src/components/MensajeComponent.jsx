import React from "react";
import MensajeImg from "@/assets/gracias.jpeg"; // Ajusta la ruta y nombre de tu imagen
import { Link } from "react-router-dom"; // Solo si deseas usar React Router

const Mensaje = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sección Izquierda: Imagen (oculta en mobile, visible en md en adelante) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={MensajeImg}
          alt="Mensaje"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección Derecha: Mensaje */}
      <div className="w-full  md:w-1/2 h-screen bg-custom-gray flex items-center justify-center py-10 md:py-0">
        <div className=" w-full p-8 text-center">
          <h1 className="md:text-6xl text-4xl mb-4 text-white whitespace-nowrap">
            ¡Muchas Gracias!
          </h1>
          <p className="mb-6 text-white md:text-2xl text-xl  w-full">
            Nos estaremos comunicando con vos para que finalices bien tu día.
          </p>

          {/* Botón Volver */}
          <Link
            to="/"
            className="inline-block bg-custom-red text-white py-2 px-6 rounded hover:bg-custom-red/80 w-1/2 transition-colors"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mensaje;
