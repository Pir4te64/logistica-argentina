import React from "react";
import tarjeta from "../../assets/tarjeta.jpg";

const TarjetaAplicar = () => {
  return (
    <div className="relative w-full h-64 rounded shadow overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src={tarjeta}
        alt="Persona con paquete"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Capa con degradado de izquierda (azul) a derecha (transparente) */}
      <div className="absolute inset-0 bg-gradient-to-r from-custom-blue to-transparent"></div>

      {/* Contenido en primer plano */}
      <div className="relative z-10 p-4 h-full flex items-center justify-between text-white">
        {/* Texto a la izquierda */}
        <div className="max-w-sm">
          <h2 className="text-xl font-semibold">Corrientes Capital</h2>
          <p className="mt-2">
            <strong>Porte Chico:</strong> Descripción breve
          </p>
          <p>
            <strong>Información:</strong> Algún detalle adicional
          </p>
          <p>
            <strong>Tarifa:</strong> $999
          </p>
        </div>

        {/* Botón a la derecha */}
        <div className="absolute md:bottom-10 bottom-5 md:right-20 right-5">
          <button className="bg-custom-red  text-white w-32 px-4 py-2 rounded hover:bg-custom-red/80 transition-colors">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaAplicar;
