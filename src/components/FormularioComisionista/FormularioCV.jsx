import React from "react";
import { FaUpload } from "react-icons/fa";

const FormularioCV = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Tarjeta para subir el CV */}
      <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-md ">
        <h3 className="text-base text-black">CURRICULUM VITAE</h3>

        {/* Área de subida más grande en mobile */}
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-4 flex flex-col items-center justify-center   h-60 md:h-40">
          <FaUpload className="text-gray-400 text-3xl mb-2" />
          <p className="text-gray-500 text-sm text-center">
            Arrastre y suelte su archivo o haga clic
          </p>
        </div>
      </div>

      {/* Botón de envío */}
      <div className="text-center mt-6">
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors">
          Enviar documentación
        </button>
      </div>
    </div>
  );
};

export default FormularioCV;
