// src/components/Trabajos/PostulacionesModal.jsx
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useModalStore } from "@/store/useModalStore";
import { BASE_URL } from "@/Api/Api";
import { usePostulacionDetail } from "./usePostulacionDetail";
import FileUploader from "@/components/Formulario/FileUploader";
import { submitDocumentation } from "@/components/Formulario/submitDocumentation";

const PostulacionesModal = () => {
  // 1️⃣ Hooks (siempre en el mismo orden)
  const isOpen = useModalStore((s) => s.isPostulacionesOpen);
  const close = useModalStore((s) => s.closePostulaciones);
  const { detail, loading, error } = usePostulacionDetail(isOpen);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // 2️⃣ Obtenemos los documentos requeridos desde el rol
  const requiredFields = useMemo(() => {
    if (!detail) return [];
    return detail.usuario.roles[0].archivos_necesarios.map((doc) => ({
      id: doc.id,
      nombre: doc.nombre,
    }));
  }, [detail]);

  // 3️⃣ Archivos ya subidos y sus IDs
  const archivosCargados = detail?.usuario?.archivos_cargados || [];
  const cargadosIds = new Set(archivosCargados.map((a) => a.tipo_archivos_id));

  // 4️⃣ Handler al aceptar un archivo
  const handleFileAccepted = (id, fileData) => {
    const entries = Array.isArray(fileData)
      ? fileData.map((f) => ({ id, file: f }))
      : [{ id, file: fileData }];

    setUploadedFiles((prev) => {
      const filtered = prev.filter((x) => x.id !== id);
      return [...filtered, ...entries];
    });
  };

  // 5️⃣ Progreso
  const uploadedCount = uploadedFiles.length;
  const totalFields = requiredFields.length;
  const progress =
    totalFields > 0 ? Math.round((uploadedCount / totalFields) * 100) : 0;

  // 6️⃣ Envío de los archivos nuevos
  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;
    setSubmitting(true);
    try {
      const toSend = uploadedFiles.map(({ id, file }) => ({ id, file }));
      await submitDocumentation(toSend, false);
      await Swal.fire({
        icon: "success",
        title: "¡Enviado!",
        text: "Tus documentos se enviaron correctamente.",
        confirmButtonText: "Aceptar",
      });
      // Limpio el estado y cierro el modal
      setUploadedFiles([]);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  // 7️⃣ Si el modal está cerrado, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Botón Cerrar */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-4">Documentos</h2>
        {loading && <p className="text-center">Cargando…</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && !detail && (
          <p className="text-center text-gray-600">
            No hay postulación activa.
          </p>
        )}

        {detail && (
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
                  const tipoInfo =
                    detail.usuario.roles[0].archivos_necesarios.find(
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
                  <div
                    className="h-2 bg-red-500"
                    style={{ width: `${progress}%` }}
                  />
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
        )}
      </div>
    </div>
  );
};

export default PostulacionesModal;
