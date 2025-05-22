// src/components/Trabajos/PostulacionesModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import { useModalStore } from "@/store/useModalStore";
import { usePostulacionDetail } from "@/Transportistas/usePostulacionDetail";
import { submitDocumentation } from "@/components/Formulario/store/submitDocumentation";
import DocumentosPostulacion from "@/Transportistas/DocumentosPostulacion";
import CambiarPasswordForm from "@/Transportistas/CambiarPasswordForm"; // Importa el nuevo componente

const PostulacionesModal = () => {
  const isOpen = useModalStore((s) => s.isPostulacionesOpen);
  const close = useModalStore((s) => s.closePostulaciones);
  const { detail, loading, error } = usePostulacionDetail(isOpen);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("documentos"); // Estado para controlar la pestaña activa

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
      setUploadedFiles([]);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto p-6 relative flex">
        {/* Botón Cerrar */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar"
        >
          <FaTimes size={20} />
        </button>

        {/* Sidebar */}
        <aside className="w-48 border-r pr-4">
          <h3 className="text-lg font-semibold mb-2">Opciones</h3>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`block py-2 text-left ${
              activeTab === "documentos"
                ? "font-bold text-red-500"
                : "hover:text-gray-700"
            }`}
          >
            Cargar Documentos
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`block py-2 text-left ${
              activeTab === "password"
                ? "font-bold text-red-500"
                : "hover:text-gray-700"
            }`}
          >
            Cambiar Contraseña
          </button>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 pl-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            {activeTab === "documentos" ? "Documentos" : "Cambiar Contraseña"}
          </h2>
          {loading && <p className="text-center">Cargando…</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && !detail && (
            <p className="text-center text-gray-600">
              No hay postulación activa.
            </p>
          )}

          {detail && activeTab === "documentos" && (
            <DocumentosPostulacion
              detail={detail}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              submitting={submitting}
              handleSubmit={handleSubmit}
            />
          )}

          {detail && activeTab === "password" && <CambiarPasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default PostulacionesModal;
