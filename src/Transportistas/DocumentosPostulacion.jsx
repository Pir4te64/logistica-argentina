// src/components/Trabajos/DocumentosPostulacion.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { BASE_URL } from "@/Api/Api";
import FileUploader from "@/components/Formulario/FileUploader";

const DocumentosPostulacion = ({
  detail,
  uploadedFiles,
  setUploadedFiles,
  submitting,
  handleSubmit,
}) => {
  const requiredFields = React.useMemo(() => {
    if (!detail) return [];
    return detail.usuario.roles[0].archivos_necesarios.map((doc) => ({
      id: doc.id,
      nombre: doc.nombre,
    }));
  }, [detail]);

  const archivosCargados = detail?.usuario?.archivos_cargados || [];
  const cargadosIds = new Set(archivosCargados.map((a) => a.tipo_archivos_id));
  const uploadedCount = uploadedFiles.length;
  const totalFields = requiredFields.length;
  const progress =
    totalFields > 0 ? Math.round((uploadedCount / totalFields) * 100) : 0;

  const handleFileAccepted = (id, fileData) => {
    const entries = Array.isArray(fileData)
      ? fileData.map((f) => ({ id, file: f }))
      : [{ id, file: fileData }];

    setUploadedFiles((prev) => {
      const filtered = prev.filter((x) => x.id !== id);
      return [...filtered, ...entries];
    });
  };

  return (
    <div className="space-y-6">
      {/* —— Archivos ya cargados —— */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-medium">
            Archivos Cargados ({archivosCargados.length})
          </span>
          <FiChevronDown className="transform group-open:rotate-180 transition" />
        </summary>
        <ul className="mt-2 space-y-2 ml-4">
          {archivosCargados.map((a) => {
            const tipoInfo = detail.usuario.roles[0].archivos_necesarios.find(
              (doc) => doc.id === a.tipo_archivos_id
            );
            const label = tipoInfo?.nombre ?? a.url.split("/").pop();
            return (
              <li key={a.id} className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-600" />
                <a
                  href={`${BASE_URL}/${a.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </details>

      {/* —— Uploaders para documentos faltantes —— */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-medium">
            Subir documentos faltantes ({uploadedCount}/{totalFields})
          </span>
          <FiChevronDown className="transform group-open:rotate-180 transition" />
        </summary>

        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div className="h-2 bg-red-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Solo los que faltan */}
        <div className="mt-4 space-y-4">
          {requiredFields
            .filter(({ id }) => !cargadosIds.has(id))
            .map(({ id, nombre }) => (
              <div key={id} className="p-2 border rounded">
                <div className="font-medium mb-2">{nombre}</div>
                <FileUploader
                  label={nombre}
                  multiple={false}
                  onFilesAccepted={(file) => handleFileAccepted(id, file)}
                />
              </div>
            ))}
        </div>
      </details>

      {/* —— Botón de envío —— */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={uploadedFiles.length === 0 || submitting}
          className={`px-6 py-2 rounded text-white transition ${
            uploadedFiles.length > 0
              ? submitting
                ? "bg-gray-500 cursor-wait"
                : "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {submitting ? "Enviando…" : "Enviar Documentos"}
        </button>
      </div>
    </div>
  );
};

export default DocumentosPostulacion;
