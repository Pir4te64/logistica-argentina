// src/components/Formulario/FormularioDocumentacion.jsx
import React, { useState, useMemo } from "react";
import FileUploader from "@/components/Formulario/FileUploader";
import { docMapping, documentos } from "@/components/Formulario/estaticos";
import { submitDocumentation } from "@/components/Formulario/submitDocumentation";

const FormularioDocumentacion = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // — Sólo nos interesan los primeros 3 documentos:
  const requiredDocs = useMemo(() => documentos.slice(0, 3), []);

  // Construyo lista de campos requeridos (sólo de esos 3)
  const requiredFields = useMemo(() => {
    return requiredDocs.flatMap((doc) =>
      doc.campos.length > 0
        ? doc.campos.map((campo) => ({ docTitle: doc.title, campo }))
        : [{ docTitle: doc.title, campo: "" }]
    );
  }, [requiredDocs]);

  // Extrae id de docMapping
  const getDocId = (docTitle, campo) => {
    const mapping = docMapping[docTitle];
    if (typeof mapping === "object") {
      const key = campo.replace(/\s+/g, "_");
      return mapping[key];
    }
    return mapping;
  };

  // Comprueba si ya hay archivo para ese campo
  const isUploaded = (docTitle, campo) => {
    const id = getDocId(docTitle, campo);
    return uploadedFiles.some((item) => item.id === id && item.campo === campo);
  };

  // Conteo y porcentaje (ahora totalFields === 6 si cada doc tiene 2 campos)
  const uploadedCount = requiredFields.reduce(
    (cnt, { docTitle, campo }) => (isUploaded(docTitle, campo) ? cnt + 1 : cnt),
    0
  );
  const totalFields = requiredFields.length;
  const progressPercent = Math.round((uploadedCount / totalFields) * 100);
  const allUploaded = uploadedCount === totalFields;

  const handleFileAccepted = (docTitle, campo, fileData) => {
    const id = getDocId(docTitle, campo);
    const entries = Array.isArray(fileData)
      ? fileData.map((f) => ({ id, docTitle, campo, file: f }))
      : [{ id, docTitle, campo, file: fileData }];

    setUploadedFiles((prev) => {
      const filtered = prev.filter(
        (x) => !(x.docTitle === docTitle && x.campo === campo)
      );
      return [...filtered, ...entries];
    });
  };

  const handleSubmit = async () => {
    if (!allUploaded) return;
    setIsSubmitting(true);
    try {
      await submitDocumentation(uploadedFiles);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl mb-6">Documentación Requerida</h2>

      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 bg-red-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {uploadedCount} de {totalFields} cargados ({progressPercent}%)
        </p>
      </div>

      {/* Grid de uploaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentos.map((doc, idx) => (
          <div key={doc.title} className="bg-white shadow-lg p-4 rounded-md">
            <h3 className="text-lg font-bold text-center mb-4">{doc.title}</h3>

            {/* Siempre muestro todos, pero sólo los primeros 3 cuentan para el progreso */}
            {doc.campos.length > 0 ? (
              doc.campos.map((campo) => (
                <div key={campo} className="mb-3">
                  <FileUploader
                    label={campo}
                    onFilesAccepted={(file) =>
                      handleFileAccepted(doc.title, campo, file)
                    }
                  />
                </div>
              ))
            ) : (
              <div className="mb-3">
                <FileUploader
                  label=""
                  multiple={doc.multiple || false}
                  onFilesAccepted={(file) =>
                    handleFileAccepted(doc.title, "", file)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón Enviar */}
      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={!allUploaded || isSubmitting}
          className={`
            py-2 px-6 rounded transition-colors
            ${
              allUploaded
                ? isSubmitting
                  ? "bg-gray-500 cursor-wait"
                  : "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }
            text-white
          `}
        >
          {isSubmitting
            ? "Enviando... Espere un momento"
            : "Enviar Documentación"}
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
