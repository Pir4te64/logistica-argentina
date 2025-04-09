import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { API_URL } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const FormularioDocumentacionChoferes = () => {
  // Nombres para cada tipo de documento
  const documentos = [
    "DNI (frente y dorso)",
    "LICENCIA (frente y dorso)",
    "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL",
  ];
  // Constantes que se enviarán en el formData (tipo_archivo)
  const dni = "1";
  const licencia = "2";
  const certificado = "3";

  // Estados para guardar los archivos seleccionados
  const [fileDNI, setFileDNI] = useState(null);
  const [fileLicencia, setFileLicencia] = useState(null);
  const [fileCertificado, setFileCertificado] = useState(null);

  // Estados para manejar drag & drop por tarjeta
  const [dragActiveDNI, setDragActiveDNI] = useState(false);
  const [dragActiveLicencia, setDragActiveLicencia] = useState(false);
  const [dragActiveCertificado, setDragActiveCertificado] = useState(false);

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // ----------------------
  // Funciones para DNI
  // ----------------------
  const handleDragOverDNI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNI(true);
  };

  const handleDragLeaveDNI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNI(false);
  };

  const handleDropDNI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNI(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileDNI(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickDNI = () => {
    document.getElementById("fileInputDNI").click();
  };

  const handleFileChangeDNI = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileDNI(file);
    }
  };

  // ----------------------
  // Funciones para Licencia
  // ----------------------
  const handleDragOverLicencia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicencia(true);
  };

  const handleDragLeaveLicencia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicencia(false);
  };

  const handleDropLicencia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicencia(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileLicencia(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickLicencia = () => {
    document.getElementById("fileInputLicencia").click();
  };

  const handleFileChangeLicencia = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileLicencia(file);
    }
  };

  // ----------------------
  // Funciones para Certificado
  // ----------------------
  const handleDragOverCertificado = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveCertificado(true);
  };

  const handleDragLeaveCertificado = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveCertificado(false);
  };

  const handleDropCertificado = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveCertificado(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileCertificado(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickCertificado = () => {
    document.getElementById("fileInputCertificado").click();
  };

  const handleFileChangeCertificado = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileCertificado(file);
    }
  };

  // ----------------------
  // Función para extraer email del usuario
  // ----------------------
  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.email || "";
      } catch (error) {
        console.error("Error al parsear usuario almacenado:", error);
        return "";
      }
    }
    return "";
  };

  // ----------------------
  // Función para imprimir en consola el contenido de un FormData
  // ----------------------
  const logFormData = (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  // ----------------------
  // Función para enviar los archivos uno a uno
  // ----------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    const email = getUserEmail();

    try {
      // Envío de DNI
      if (fileDNI) {
        const formDataDNI = new FormData();
        formDataDNI.append("file", fileDNI);
        formDataDNI.append("filename", fileDNI.name);
        formDataDNI.append("tipo_archivo", dni);
        formDataDNI.append("tipo_usuario", "6");
        if (email) formDataDNI.append("correo", email);

        console.log("Objeto enviado para DNI:");
        logFormData(formDataDNI);

        await axios.post(API_URL.UPLOAD_IMAGE, formDataDNI, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("DNI enviado");
      } else {
        console.warn("No se seleccionó archivo para DNI");
      }

      // Envío de Licencia
      if (fileLicencia) {
        const formDataLicencia = new FormData();
        formDataLicencia.append("file", fileLicencia);
        formDataLicencia.append("filename", fileLicencia.name);
        formDataLicencia.append("tipo_archivo", licencia);
        formDataLicencia.append("tipo_usuario", "6");
        if (email) formDataLicencia.append("correo", email);

        console.log("Objeto enviado para Licencia:");
        logFormData(formDataLicencia);

        await axios.post(API_URL.UPLOAD_IMAGE, formDataLicencia, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Licencia enviada");
      } else {
        console.warn("No se seleccionó archivo para Licencia");
      }

      // Envío de Certificado
      if (fileCertificado) {
        const formDataCertificado = new FormData();
        formDataCertificado.append("file", fileCertificado);
        formDataCertificado.append("filename", fileCertificado.name);
        formDataCertificado.append("tipo_archivo", certificado);
        formDataCertificado.append("tipo_usuario", "6");
        if (email) formDataCertificado.append("correo", email);

        console.log("Objeto enviado para Certificado:");
        logFormData(formDataCertificado);

        await axios.post(API_URL.UPLOAD_IMAGE, formDataCertificado, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Certificado enviado");
      } else {
        console.warn("No se seleccionó archivo para Certificado");
      }

      console.log("Todos los documentos han sido enviados secuencialmente");
      navigate("/mensaje");
    } catch (error) {
      console.error("Error al subir documentos:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-5xl mx-auto p-4'>
      {/* Contenedor de Tarjetas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-6'>
        {/* Tarjeta 1: DNI */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4'>
          <h3 className='text-xs md:text-base text-black'>{documentos[0]}</h3>
          <div
            className={`border-2 ${
              dragActiveDNI ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 md:h-40 cursor-pointer`}
            onClick={handleAreaClickDNI}
            onDragOver={handleDragOverDNI}
            onDragLeave={handleDragLeaveDNI}
            onDrop={handleDropDNI}>
            <FaUpload className='text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2' />
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              Arrastre y suelte su archivo o haga clic
            </p>
            <input
              type='file'
              id='fileInputDNI'
              className='hidden'
              accept='.jpg,.jpeg,.png,.pdf'
              onChange={handleFileChangeDNI}
            />
            {fileDNI && (
              <p className='mt-2 text-green-500 text-sm'>
                Archivo seleccionado: {fileDNI.name}
              </p>
            )}
          </div>
        </div>

        {/* Tarjeta 2: LICENCIA */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4'>
          <h3 className='text-xs md:text-base text-black'>{documentos[1]}</h3>
          <div
            className={`border-2 ${
              dragActiveLicencia ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 md:h-40 cursor-pointer`}
            onClick={handleAreaClickLicencia}
            onDragOver={handleDragOverLicencia}
            onDragLeave={handleDragLeaveLicencia}
            onDrop={handleDropLicencia}>
            <FaUpload className='text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2' />
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              Arrastre y suelte su archivo o haga clic
            </p>
            <input
              type='file'
              id='fileInputLicencia'
              className='hidden'
              accept='.jpg,.jpeg,.png,.pdf'
              onChange={handleFileChangeLicencia}
            />
            {fileLicencia && (
              <p className='mt-2 text-green-500 text-sm'>
                Archivo seleccionado: {fileLicencia.name}
              </p>
            )}
          </div>
        </div>

        {/* Tarjeta 3: CERTIFICADO (ocupa toda la fila en md) */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4 md:col-span-2'>
          <h3 className='text-xs md:text-base text-black'>{documentos[2]}</h3>
          <div
            className={`border-2 ${
              dragActiveCertificado ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 md:h-40 cursor-pointer`}
            onClick={handleAreaClickCertificado}
            onDragOver={handleDragOverCertificado}
            onDragLeave={handleDragLeaveCertificado}
            onDrop={handleDropCertificado}>
            <FaUpload className='text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2' />
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              Arrastre y suelte su archivo o haga clic
            </p>
            <input
              type='file'
              id='fileInputCertificado'
              className='hidden'
              accept='.jpg,.jpeg,.png,.pdf'
              onChange={handleFileChangeCertificado}
            />
            {fileCertificado && (
              <p className='mt-2 text-green-500 text-sm'>
                Archivo seleccionado: {fileCertificado.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botón Enviar Documentación */}
      <div className='text-center'>
        <button
          type='submit'
          disabled={uploading}
          className='bg-red-500 text-white px-4 py-1 md:px-6 md:py-2 rounded hover:bg-red-600 transition-colors text-xs md:text-sm'>
          {uploading ? "Enviando..." : "Enviar documentación"}
        </button>
      </div>
    </form>
  );
};

export default FormularioDocumentacionChoferes;
