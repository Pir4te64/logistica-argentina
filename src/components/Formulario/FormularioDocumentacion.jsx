import React, { useState } from "react";
import FileUploader from "./FileUploader"; // Asegúrate de ajustar la ruta si es necesario

const FormularioDocumentacion = () => {
  // Estado para almacenar la información de cada carga
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Función para manejar la actualización de los archivos
  const handleFileAccepted = (docTitle, campo, file) => {
    setUploadedFiles((prevFiles) => {
      // Se busca si ya existe un archivo para ese docTitle y campo,
      // en cuyo caso se actualiza, o si se agrega uno nuevo.
      const updatedFiles = prevFiles.filter(
        (item) => item.docTitle !== docTitle || item.campo !== campo
      );
      return [...updatedFiles, { docTitle, campo, file }];
    });
  };

  // Datos de los documentos que se requieren
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

  // Función para manejar la acción del botón de envío.
  const handleSubmit = () => {
    // Por ahora mostramos la información en consola,
    // pero también se puede renderizar en la interfaz.
    console.log("Archivos subidos:", uploadedFiles);
  };

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
                    onFilesAccepted={(file) =>
                      handleFileAccepted(doc.title, campo, file)
                    }
                  />
                ))
              ) : (
                // Renderiza un único input para documentos sin sub-campos
                <FileUploader
                  label=''
                  onFilesAccepted={(file) =>
                    handleFileAccepted(doc.title, "", file)
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-4 md:mt-8'>
        <button
          onClick={handleSubmit}
          className='bg-red-500 text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-red-600 transition-colors'>
          Enviar Documentación
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
