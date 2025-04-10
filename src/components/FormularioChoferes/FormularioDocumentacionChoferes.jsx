// FormularioDocumentacionChoferes.jsx
import React from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { API_URL } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import BotonEnviarDocumentacion from "./BotonEnviar";
import { documentos } from "./estaticos";
import useDocumentStore from "./useDocumentStore";

const FormularioDocumentacionChoferes = () => {
  // Constantes para identificar el tipo de archivo
  const dni = "1";
  const licencia = "2";
  const certificado = "3";
  const dnidorso = "4";
  const licenciaDorso = "5";

  const navigate = useNavigate();

  // Extraer estados y setters desde el store de Zustand
  const {
    // Estados para DNI
    fileDNIFrontal,
    dragActiveDNIFrontal,
    setFileDNIFrontal,
    setDragActiveDNIFrontal,
    fileDNIDorso,
    dragActiveDNIDorso,
    setFileDNIDorso,
    setDragActiveDNIDorso,

    // Estados para Licencia
    fileLicenciaFrontal,
    dragActiveLicenciaFrontal,
    setFileLicenciaFrontal,
    setDragActiveLicenciaFrontal,
    fileLicenciaDorso,
    dragActiveLicenciaDorso,
    setFileLicenciaDorso,
    setDragActiveLicenciaDorso,

    // Estados para Certificado
    fileCertificado,
    dragActiveCertificado,
    setFileCertificado,
    setDragActiveCertificado,

    // Estado de carga
    uploading,
    setUploading,
  } = useDocumentStore();

  // ---------- Funciones para DNI Frontal ----------
  const handleDragOverDNIFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIFrontal(true);
  };

  const handleDragLeaveDNIFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIFrontal(false);
  };

  const handleDropDNIFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIFrontal(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileDNIFrontal(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickDNIFrontal = () => {
    document.getElementById("fileInputDNIFrontal").click();
  };

  const handleFileChangeDNIFrontal = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileDNIFrontal(file);
    }
  };

  // ---------- Funciones para DNI Dorso ----------
  const handleDragOverDNIDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIDorso(true);
  };

  const handleDragLeaveDNIDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIDorso(false);
  };

  const handleDropDNIDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveDNIDorso(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileDNIDorso(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickDNIDorso = () => {
    document.getElementById("fileInputDNIDorso").click();
  };

  const handleFileChangeDNIDorso = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileDNIDorso(file);
    }
  };

  // ---------- Funciones para Licencia Frontal ----------
  const handleDragOverLicenciaFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaFrontal(true);
  };

  const handleDragLeaveLicenciaFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaFrontal(false);
  };

  const handleDropLicenciaFrontal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaFrontal(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileLicenciaFrontal(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickLicenciaFrontal = () => {
    document.getElementById("fileInputLicenciaFrontal").click();
  };

  const handleFileChangeLicenciaFrontal = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileLicenciaFrontal(file);
    }
  };

  // ---------- Funciones para Licencia Dorso ----------
  const handleDragOverLicenciaDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaDorso(true);
  };

  const handleDragLeaveLicenciaDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaDorso(false);
  };

  const handleDropLicenciaDorso = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLicenciaDorso(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileLicenciaDorso(e.dataTransfer.files[0]);
    }
  };

  const handleAreaClickLicenciaDorso = () => {
    document.getElementById("fileInputLicenciaDorso").click();
  };

  const handleFileChangeLicenciaDorso = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileLicenciaDorso(file);
    }
  };

  // ---------- Funciones para Certificado ----------
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

  // ---------- Función para extraer el email del usuario ----------
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

  // ---------- Función para imprimir el contenido de FormData ----------
  const logFormData = (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  // ---------- Función para enviar los archivos ----------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    const email = getUserEmail();

    try {
      // Enviar DNI Frontal
      if (fileDNIFrontal) {
        const formDataDNIFrontal = new FormData();
        formDataDNIFrontal.append("file", fileDNIFrontal);
        formDataDNIFrontal.append("filename", fileDNIFrontal.name);
        formDataDNIFrontal.append("tipo_archivo", dni);
        formDataDNIFrontal.append("detalle", "frontal");
        formDataDNIFrontal.append("tipo_usuario", "6");
        if (email) formDataDNIFrontal.append("correo", email);

        console.log("Enviando DNI Frontal:");
        logFormData(formDataDNIFrontal);
        await axios.post(API_URL.UPLOAD_IMAGE, formDataDNIFrontal, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("DNI Frontal enviado");
      } else {
        console.warn("No se seleccionó archivo para DNI Frontal");
      }

      // Enviar DNI Dorso
      if (fileDNIDorso) {
        const formDataDNIDorso = new FormData();
        formDataDNIDorso.append("file", fileDNIDorso);
        formDataDNIDorso.append("filename", fileDNIDorso.name);
        // Ahora se usa la constante "dnidorso" para el envío del dorso
        formDataDNIDorso.append("tipo_archivo", dnidorso);
        formDataDNIDorso.append("detalle", "dorso");
        formDataDNIDorso.append("tipo_usuario", "6");
        if (email) formDataDNIDorso.append("correo", email);

        console.log("Enviando DNI Dorso:");
        logFormData(formDataDNIDorso);
        await axios.post(API_URL.UPLOAD_IMAGE, formDataDNIDorso, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("DNI Dorso enviado");
      } else {
        console.warn("No se seleccionó archivo para DNI Dorso");
      }

      // Enviar Licencia Frontal
      if (fileLicenciaFrontal) {
        const formDataLicenciaFrontal = new FormData();
        formDataLicenciaFrontal.append("file", fileLicenciaFrontal);
        formDataLicenciaFrontal.append("filename", fileLicenciaFrontal.name);
        formDataLicenciaFrontal.append("tipo_archivo", licencia);
        formDataLicenciaFrontal.append("detalle", "frontal");
        formDataLicenciaFrontal.append("tipo_usuario", "6");
        if (email) formDataLicenciaFrontal.append("correo", email);

        console.log("Enviando Licencia Frontal:");
        logFormData(formDataLicenciaFrontal);
        await axios.post(API_URL.UPLOAD_IMAGE, formDataLicenciaFrontal, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Licencia Frontal enviado");
      } else {
        console.warn("No se seleccionó archivo para Licencia Frontal");
      }

      // Enviar Licencia Dorso
      if (fileLicenciaDorso) {
        const formDataLicenciaDorso = new FormData();
        formDataLicenciaDorso.append("file", fileLicenciaDorso);
        formDataLicenciaDorso.append("filename", fileLicenciaDorso.name);
        // Se usa la constante "licenciaDorso" para el envío del dorso
        formDataLicenciaDorso.append("tipo_archivo", licenciaDorso);
        formDataLicenciaDorso.append("detalle", "dorso");
        formDataLicenciaDorso.append("tipo_usuario", "6");
        if (email) formDataLicenciaDorso.append("correo", email);

        console.log("Enviando Licencia Dorso:");
        logFormData(formDataLicenciaDorso);
        await axios.post(API_URL.UPLOAD_IMAGE, formDataLicenciaDorso, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Licencia Dorso enviado");
      } else {
        console.warn("No se seleccionó archivo para Licencia Dorso");
      }

      // Enviar Certificado
      if (fileCertificado) {
        const formDataCertificado = new FormData();
        formDataCertificado.append("file", fileCertificado);
        formDataCertificado.append("filename", fileCertificado.name);
        formDataCertificado.append("tipo_archivo", certificado);
        formDataCertificado.append("tipo_usuario", "6");
        if (email) formDataCertificado.append("correo", email);

        console.log("Enviando Certificado:");
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
        {/* Tarjeta: DNI (Frontal y Dorso) */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4'>
          <h3 className='text-xs md:text-base text-black'>{documentos[0]}</h3>
          <div className='grid grid-cols-2 gap-2'>
            {/* Sub-box: DNI Frontal */}
            <div
              className={`border-2 ${
                dragActiveDNIFrontal ? "border-blue-500" : "border-gray-300"
              } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
              onClick={handleAreaClickDNIFrontal}
              onDragOver={handleDragOverDNIFrontal}
              onDragLeave={handleDragLeaveDNIFrontal}
              onDrop={handleDropDNIFrontal}>
              <FaUpload className='text-gray-400 text-2xl mb-1' />
              <p className='text-gray-500 text-xs text-center'>
                DNI Frontal: Arrastre y suelte o haga clic
              </p>
              <input
                type='file'
                id='fileInputDNIFrontal'
                className='hidden'
                accept='.jpg,.jpeg,.png,.pdf'
                onChange={handleFileChangeDNIFrontal}
              />
              {fileDNIFrontal && (
                <p className='mt-2 text-green-500 text-sm'>
                  {fileDNIFrontal.name}
                </p>
              )}
            </div>
            {/* Sub-box: DNI Dorso */}
            <div
              className={`border-2 ${
                dragActiveDNIDorso ? "border-blue-500" : "border-gray-300"
              } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
              onClick={handleAreaClickDNIDorso}
              onDragOver={handleDragOverDNIDorso}
              onDragLeave={handleDragLeaveDNIDorso}
              onDrop={handleDropDNIDorso}>
              <FaUpload className='text-gray-400 text-2xl mb-1' />
              <p className='text-gray-500 text-xs text-center'>
                DNI Dorso: Arrastre y suelte o haga clic
              </p>
              <input
                type='file'
                id='fileInputDNIDorso'
                className='hidden'
                accept='.jpg,.jpeg,.png,.pdf'
                onChange={handleFileChangeDNIDorso}
              />
              {fileDNIDorso && (
                <p className='mt-2 text-green-500 text-sm'>
                  {fileDNIDorso.name}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Tarjeta: Licencia (Frontal y Dorso) */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4'>
          <h3 className='text-xs md:text-base text-black'>{documentos[1]}</h3>
          <div className='grid grid-cols-2 gap-2'>
            {/* Sub-box: Licencia Frontal */}
            <div
              className={`border-2 ${
                dragActiveLicenciaFrontal
                  ? "border-blue-500"
                  : "border-gray-300"
              } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
              onClick={handleAreaClickLicenciaFrontal}
              onDragOver={handleDragOverLicenciaFrontal}
              onDragLeave={handleDragLeaveLicenciaFrontal}
              onDrop={handleDropLicenciaFrontal}>
              <FaUpload className='text-gray-400 text-2xl mb-1' />
              <p className='text-gray-500 text-xs text-center'>
                Licencia Frontal: Arrastre y suelte o haga clic
              </p>
              <input
                type='file'
                id='fileInputLicenciaFrontal'
                className='hidden'
                accept='.jpg,.jpeg,.png,.pdf'
                onChange={handleFileChangeLicenciaFrontal}
              />
              {fileLicenciaFrontal && (
                <p className='mt-2 text-green-500 text-sm'>
                  {fileLicenciaFrontal.name}
                </p>
              )}
            </div>
            {/* Sub-box: Licencia Dorso */}
            <div
              className={`border-2 ${
                dragActiveLicenciaDorso ? "border-blue-500" : "border-gray-300"
              } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
              onClick={handleAreaClickLicenciaDorso}
              onDragOver={handleDragOverLicenciaDorso}
              onDragLeave={handleDragLeaveLicenciaDorso}
              onDrop={handleDropLicenciaDorso}>
              <FaUpload className='text-gray-400 text-2xl mb-1' />
              <p className='text-gray-500 text-xs text-center'>
                Licencia Dorso: Arrastre y suelte o haga clic
              </p>
              <input
                type='file'
                id='fileInputLicenciaDorso'
                className='hidden'
                accept='.jpg,.jpeg,.png,.pdf'
                onChange={handleFileChangeLicenciaDorso}
              />
              {fileLicenciaDorso && (
                <p className='mt-2 text-green-500 text-sm'>
                  {fileLicenciaDorso.name}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Tarjeta: Certificado */}
        <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4 md:col-span-2'>
          <h3 className='text-xs md:text-base text-black'>{documentos[2]}</h3>
          <div
            className={`border-2 ${
              dragActiveCertificado ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 cursor-pointer`}
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
      <BotonEnviarDocumentacion uploading={uploading} />
    </form>
  );
};

export default FormularioDocumentacionChoferes;
