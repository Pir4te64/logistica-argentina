import React from "react";
import { FaUpload } from "react-icons/fa";

const FormularioDocumentacionChoferes = () => {
  const documentos = [
    "DNI (frente y dorso)",
    "LICENCIA (frente y dorso)",
    "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL",
  ];

  return (
    <div className="w-full  max-w-5xl mx-auto p-4">
      {/* Contenedor de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-6">
        {/* Tarjeta 1: DNI */}
        <div className="bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4">
          <h3 className="text-xs md:text-base text-black">{documentos[0]}</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-4 flex flex-col items-center justify-center   h-60 md:h-40">
            <FaUpload className="text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2" />
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Arrastre y suelte su archivo o haga clic
            </p>
          </div>
        </div>

        {/* Tarjeta 2: LICENCIA */}
        <div className="bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4">
          <h3 className="text-xs md:text-base text-black">{documentos[1]}</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-4 flex flex-col items-center justify-center   h-60 md:h-40">
            <FaUpload className="text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2" />
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Arrastre y suelte su archivo o haga clic
            </p>
          </div>
        </div>

        {/* Tarjeta 3: CERTIFICADO (ocupa toda la fila en md) */}
        <div className="bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4 md:col-span-2">
          <h3 className="text-xs md:text-base text-black">{documentos[2]}</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-4 flex flex-col items-center justify-center   h-60 md:h-40">
            <FaUpload className="text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2" />
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Arrastre y suelte su archivo o haga clic
            </p>
          </div>
        </div>
      </div>

      {/* Botón Enviar Documentación */}
      <div className="text-center">
        <button className="bg-red-500 text-white px-4 py-1 md:px-6 md:py-2 rounded hover:bg-red-600 transition-colors text-xs md:text-sm">
          Enviar documentación
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacionChoferes;
