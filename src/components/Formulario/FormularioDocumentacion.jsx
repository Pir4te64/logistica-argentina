// FormularioDocumentacion.jsx
import React, { useState } from "react";
import FileUploader from "@/components/Formulario/FileUploader"; // Asegúrate de ajustar la ruta según tu estructura
import { docMapping, documentos } from "@/components/Formulario/estaticos";
import { submitDocumentation } from "@/components/Formulario/submitDocumentation";

const FormularioDocumentacion = () => {
  // Estado para almacenar la información de cada archivo subido
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileAccepted = (docTitle, campo, fileData) => {
    // Se determina el id según el documento y, si existe, su subcampo.
    let docId = null;
    if (typeof docMapping[docTitle] === "object") {
      docId = docMapping[docTitle][campo];
    } else {
      docId = docMapping[docTitle];
    }

    if (Array.isArray(fileData)) {
      // Si se subieron múltiples archivos, se agregan todos
      setUploadedFiles((prev) => [
        ...prev,
        ...fileData.map((file) => ({ id: docId, docTitle, campo, file })),
      ]);
    } else {
      // Para carga única: se reemplaza cualquier archivo existente para ese documento/campo
      setUploadedFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter(
          (item) => item.docTitle !== docTitle || item.campo !== campo
        );
        return [
          ...updatedFiles,
          { id: docId, docTitle, campo, file: fileData },
        ];
      });
    }
  };

  // Se invoca la función externa para el envío cuando se presione el botón.
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitDocumentation(uploadedFiles);
      //window.location.href = "/mensaje";
    } catch (error) {
      console.error("Error al enviar documentación:", error);
      setIsSubmitting(false);
    }
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
                <FileUploader
                  label=''
                  multiple={doc.multiple || false}
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
        {isSubmitting ? (
          <div className='flex items-center justify-center space-x-2'>
            <svg
              className='animate-spin h-6 w-6 text-red-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v8H4z'></path>
            </svg>
            <span className='text-red-500 font-semibold'>
              Enviando documentación...
            </span>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className='bg-red-500 text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-red-600 transition-colors'>
            Enviar Documentación
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
