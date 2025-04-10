// FormularioDocumentacionChoferes.jsx (fragmento)
import React from "react";
import { useNavigate } from "react-router-dom";
import BotonEnviarDocumentacion from "@/components/FormularioChoferes/BotonEnviar";
import { documentos } from "@/components/FormularioChoferes/estaticos";
import useDocumentStore from "@/components/FormularioChoferes/useDocumentStore";
import useDragDrop from "@/components/FormularioChoferes/dragDropHandlers";
import { submitDocuments } from "@/components/FormularioChoferes/submitDocuments";
import CertificadoUploader from "@/components/FormularioChoferes/CertificadoUploader";
import DniUploader from "@/components/FormularioChoferes/DniUploader";
import LicenciaUploader from "@/components/FormularioChoferes/LicenciaUploader";
import { documentTypes } from "@/components/FormularioChoferes/documentConstants";

const FormularioDocumentacionChoferes = () => {
  // Constantes para identificar el tipo de archivo
  const { dni, licencia, certificado, dnidorso, licenciaDorso } = documentTypes;
  const navigate = useNavigate();

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
    // Estados para Certificado y carga
    fileCertificado,
    dragActiveCertificado,
    setFileCertificado,
    setDragActiveCertificado,
    uploading,
    setUploading,
  } = useDocumentStore();

  // Usamos el hook useDragDrop para cada input

  // Para DNI Frontal
  const {
    handleDragOver: handleDragOverDNIFrontal,
    handleDragLeave: handleDragLeaveDNIFrontal,
    handleDrop: handleDropDNIFrontal,
    handleAreaClick: handleAreaClickDNIFrontal,
    handleFileChange: handleFileChangeDNIFrontal,
  } = useDragDrop(
    setFileDNIFrontal,
    setDragActiveDNIFrontal,
    "fileInputDNIFrontal"
  );

  // Para DNI Dorso
  const {
    handleDragOver: handleDragOverDNIDorso,
    handleDragLeave: handleDragLeaveDNIDorso,
    handleDrop: handleDropDNIDorso,
    handleAreaClick: handleAreaClickDNIDorso,
    handleFileChange: handleFileChangeDNIDorso,
  } = useDragDrop(setFileDNIDorso, setDragActiveDNIDorso, "fileInputDNIDorso");

  // Para Licencia Frontal
  const {
    handleDragOver: handleDragOverLicenciaFrontal,
    handleDragLeave: handleDragLeaveLicenciaFrontal,
    handleDrop: handleDropLicenciaFrontal,
    handleAreaClick: handleAreaClickLicenciaFrontal,
    handleFileChange: handleFileChangeLicenciaFrontal,
  } = useDragDrop(
    setFileLicenciaFrontal,
    setDragActiveLicenciaFrontal,
    "fileInputLicenciaFrontal"
  );

  // Para Licencia Dorso
  const {
    handleDragOver: handleDragOverLicenciaDorso,
    handleDragLeave: handleDragLeaveLicenciaDorso,
    handleDrop: handleDropLicenciaDorso,
    handleAreaClick: handleAreaClickLicenciaDorso,
    handleFileChange: handleFileChangeLicenciaDorso,
  } = useDragDrop(
    setFileLicenciaDorso,
    setDragActiveLicenciaDorso,
    "fileInputLicenciaDorso"
  );

  // Para Certificado
  const {
    handleDragOver: handleDragOverCertificado,
    handleDragLeave: handleDragLeaveCertificado,
    handleDrop: handleDropCertificado,
    handleAreaClick: handleAreaClickCertificado,
    handleFileChange: handleFileChangeCertificado,
  } = useDragDrop(
    setFileCertificado,
    setDragActiveCertificado,
    "fileInputCertificado"
  );

  // Función para extraer el email del usuario (igual que antes)
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

  // ---------- handleSubmit extraído en submitDocuments.js ----------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    const email = getUserEmail();

    try {
      await submitDocuments({
        fileDNIFrontal,
        fileDNIDorso,
        fileLicenciaFrontal,
        fileLicenciaDorso,
        fileCertificado,
        email,
        dni,
        dnidorso,
        licencia,
        licenciaDorso,
        certificado,
      });
      console.log("Todos los documentos han sido enviados secuencialmente");
      navigate("/mensaje");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-5xl mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-6'>
        {/* Sección para DNI */}
        <DniUploader
          title={documentos[0]}
          dragActiveFrontal={dragActiveDNIFrontal}
          handleAreaClickFrontal={handleAreaClickDNIFrontal}
          handleDragOverFrontal={handleDragOverDNIFrontal}
          handleDragLeaveFrontal={handleDragLeaveDNIFrontal}
          handleDropFrontal={handleDropDNIFrontal}
          handleFileChangeFrontal={handleFileChangeDNIFrontal}
          fileFrontal={fileDNIFrontal}
          dragActiveDorso={dragActiveDNIDorso}
          handleAreaClickDorso={handleAreaClickDNIDorso}
          handleDragOverDorso={handleDragOverDNIDorso}
          handleDragLeaveDorso={handleDragLeaveDNIDorso}
          handleDropDorso={handleDropDNIDorso}
          handleFileChangeDorso={handleFileChangeDNIDorso}
          fileDorso={fileDNIDorso}
        />

        {/* Sección para Licencia */}
        <LicenciaUploader
          title={documentos[1]}
          dragActiveFrontal={dragActiveLicenciaFrontal}
          handleAreaClickFrontal={handleAreaClickLicenciaFrontal}
          handleDragOverFrontal={handleDragOverLicenciaFrontal}
          handleDragLeaveFrontal={handleDragLeaveLicenciaFrontal}
          handleDropFrontal={handleDropLicenciaFrontal}
          handleFileChangeFrontal={handleFileChangeLicenciaFrontal}
          fileFrontal={fileLicenciaFrontal}
          dragActiveDorso={dragActiveLicenciaDorso}
          handleAreaClickDorso={handleAreaClickLicenciaDorso}
          handleDragOverDorso={handleDragOverLicenciaDorso}
          handleDragLeaveDorso={handleDragLeaveLicenciaDorso}
          handleDropDorso={handleDropLicenciaDorso}
          handleFileChangeDorso={handleFileChangeLicenciaDorso}
          fileDorso={fileLicenciaDorso}
        />

        {/* Sección para Certificado */}
        <CertificadoUploader
          title={documentos[2]}
          dragActive={dragActiveCertificado}
          handleAreaClick={handleAreaClickCertificado}
          handleDragOver={handleDragOverCertificado}
          handleDragLeave={handleDragLeaveCertificado}
          handleDrop={handleDropCertificado}
          handleFileChange={handleFileChangeCertificado}
          file={fileCertificado}
        />
      </div>
      <BotonEnviarDocumentacion uploading={uploading} />
    </form>
  );
};

export default FormularioDocumentacionChoferes;
