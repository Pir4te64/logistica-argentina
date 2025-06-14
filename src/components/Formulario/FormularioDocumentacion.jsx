// src/components/Formulario/FormularioDocumentacion.jsx
import React, { useState, useMemo } from "react";
import FileUploader from "@/components/Formulario/FileUploader";
import { docMapping, documentos } from "@/components/Formulario/estaticos";
import { submitDocumentation } from "@/components/Formulario/store/submitDocumentation";
import { FaSpinner, FaWhatsapp } from "react-icons/fa";
import { config } from "../../config";
import axios from "axios";
import { API_URL } from "@/Api/Api";



const FormularioDocumentacion = ({ service }) => {
  console.log("Servicio recibido:", service);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneNumber = service.soporte_telefonico || config.phoneNumberDefault;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    'Hola, me gustaría obtener más información sobre el servicio de ' +
    service.empresa +
    '. ¿Podrías ayudarme?'
  )}`;
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = storedUser ? JSON.parse(storedUser) : null;


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
    try {
      setIsSubmitting(true);
      const payload = {
        servicios_id: service.id,
        users_id: user.id,
        email: user.email,
        fecha_inicio_servicio: service.fecha_inicio_servicio,
        fecha_fin_servicio: service.fecha_inicio_servicio,
        cumple_requisitos: false,
        asignado: false,
        puntos: 0,
      };
      await submitDocumentation(uploadedFiles, false);
      await axios.post(API_URL.POSTULACIONES, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      window.location.href = "/mensaje-transportista";

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsappClick = () => {
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-center text-2xl">Documentación Requerida</h2>
        <button
          type="button"
          onClick={handleWhatsappClick}
          className="cursor-pointer flex gap-2 rounded-md bg-green-500 py-2 px-4 text-white shadow-lg transition-transform hover:bg-green-600"
          aria-label="Chat en WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
          Más información
        </button>
      </div>

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
        {documentos.map((doc) => (
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
      <div className="text-center w-full flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
              py-2 px-6 rounded transition-colors flex items-center justify-center
              ${isSubmitting
                        ? "bg-gray-500 cursor-wait"
                        : "bg-red-500 hover:bg-red-600"
                      }
              text-white
            `}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin h-5 w-5" />
          ) : (
            "Enviar Documentación"
          )}
        </button>
      </div>
    </div>
  );
};

export default FormularioDocumentacion;
