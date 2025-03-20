import React from "react";
import { FaUpload } from "react-icons/fa";

const FormularioDocumentacion = () => {
  // Lista de documentos requeridos
  const documentos = [
    "DNI (frente y dorso)",
    "LICENCIA (frente y dorso)",
    "CEDULA VERDE (frente y dorso)",
    "CEDULA AZUL/AUTORIZACION DE MANEJO (frente y dorso)",
    "RVTV Y Identificación, NO oblea",
    "TITULO",
    "POLIZA",
    "FOTOS DEL VEHÍCULO (frente, laterales, trasera y 1 interior)",
    "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL",
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Título o descripción adicional */}
      <h2 className="text-center text-2xl mb-6">Documentación Requerida</h2>

      {/* Grid con 9 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {documentos.map((doc, i) => (
          <div
            key={i}
            className="bg-white shadow-lg p-2 md:p-4 flex flex-col justify-between gap-2 md:gap-4 rounded-md h-64 md:h-80"
          >
            {/* Título del documento */}
            <h3 className="text-sm md:text-lg">{doc}</h3>

            {/* Zona para subir archivo */}
            <div className="flex flex-col items-center justify-center  border-2 border-dashed border-gray-300 rounded-md p-6 md:p-4   h-60 md:h-40">
              <FaUpload className="text-2xl md:text-3xl text-gray-400 mb-1 md:mb-2" />
              <p className="text-gray-500 text-xs md:text-sm text-center">
                Arrastre y suelte su archivo o haga clic
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón al final, por ejemplo para “Enviar Documentación” */}
      <div className="text-center mt-4 md:mt-8">
        <button className="bg-red-500 text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-red-600 transition-colors">
          Enviar Documentación
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
