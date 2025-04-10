import React from "react";
import FileUploader from "./FileUploader"; // Asegúrate de ajustar la ruta si es necesario

const FormularioDocumentacion = () => {
  // Estructura que define cada documento y, si aplica, sus campos separados.
  const documentos = [
    { title: "DNI", campos: ["Frontal", "Dorso"] },
    { title: "LICENCIA", campos: ["Frontal", "Dorso"] },
    { title: "CEDULA VERDE", campos: ["Frontal", "Dorso"] },
    {
      title: "CEDULA AZUL / AUTORIZACION DE MANEJO",
      campos: ["Frontal", "Dorso"],
    },
    { title: "RTO, VTV, ITV", campos: [] },
    { title: "TITULO", campos: [] },
    { title: "POLIZA", campos: [] },
    { title: "FOTOS DEL VEHÍCULO", campos: ["Frente", "Laterales", "Trasera"] },
    { title: "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL", campos: [] },
  ];

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <h2 className='text-center text-2xl mb-6'>Documentación Requerida</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {documentos.map((doc, i) => (
          <div
            key={i}
            className='bg-white shadow-lg p-2 md:p-4 flex flex-col gap-2 md:gap-4 rounded-md'>
            <h3 className='text-sm md:text-lg font-bold text-center'>
              {doc.title}
            </h3>

            <div className='flex flex-col gap-2'>
              {doc.campos.length > 0 ? (
                // Renderiza múltiples inputs si existen sub-campos
                doc.campos.map((campo, j) => (
                  <FileUploader
                    key={j}
                    label={campo}
                    onFilesAccepted={(files) =>
                      console.log(`${doc.title} ${campo}:`, files)
                    }
                  />
                ))
              ) : (
                // Un único input para documentos sin sub-campos
                <FileUploader
                  label=''
                  onFilesAccepted={(files) =>
                    console.log(`${doc.title}:`, files)
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-4 md:mt-8'>
        <button className='bg-red-500 text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-red-600 transition-colors'>
          Enviar Documentación
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
