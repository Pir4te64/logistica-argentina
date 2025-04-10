// FormularioDocumentacion.jsx
import React, { useState } from "react";
import FileUploader from "./FileUploader"; // Asegúrate de ajustar la ruta según tu estructura
import { docMapping, documentos } from "./estaticos";
import { submitDocumentation } from "./submitDocumentation";

const FormularioDocumentacion = () => {
  // Estado para almacenar la información de cada archivo subido
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Función para manejar la actualización de los archivos subidos desde FileUploader
  const handleFileAccepted = (docTitle, campo, file) => {
    // Se determina el id según el documento y (si existe) su subcampo
    let docId = null;
    if (typeof docMapping[docTitle] === "object") {
      docId = docMapping[docTitle][campo];
    } else {
      docId = docMapping[docTitle];
    }

    setUploadedFiles((prevFiles) => {
      // Se reemplaza o agrega el archivo para ese documento y campo
      const updatedFiles = prevFiles.filter(
        (item) => item.docTitle !== docTitle || item.campo !== campo
      );
      return [...updatedFiles, { id: docId, docTitle, campo, file }];
    });
  };

  // Se invoca la función externa para el envío cuando se presione el botón.
  const handleSubmit = () => {
    submitDocumentation(uploadedFiles);
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
                // Para documentos con subcampos (ejemplo: DNI: Frontal y Dorso)
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
                // Para documentos sin subcampos
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
