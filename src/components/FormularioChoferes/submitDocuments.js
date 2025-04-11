// submitDocuments.js
import axios from "axios";
import { API_URL } from "@/Api/Api";

export async function submitDocuments({
  fileDNIFrontal,
  fileDNIDorso,
  fileLicenciaFrontal,
  fileLicenciaDorso,
  fileCertificado,
  email,
  dni, // constante para DNI frontal
  dnidorso, // constante para DNI dorso
  licencia, // constante para Licencia frontal
  licenciaDorso, // constante para Licencia dorso
  certificado,
}) {
  try {
    // Enviar DNI Frontal
    if (fileDNIFrontal) {
      const formDataDNIFrontal = new FormData();
      formDataDNIFrontal.append("file", fileDNIFrontal);
      formDataDNIFrontal.append("filename", fileDNIFrontal.name);
      formDataDNIFrontal.append("tipo_archivo", dni);
      formDataDNIFrontal.append("detalle", "frontal");
      formDataDNIFrontal.append("tipo_usuario", "4");
      if (email) formDataDNIFrontal.append("correo", email);

      await axios.post(API_URL.UPLOAD_IMAGE, formDataDNIFrontal, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      console.warn("No se seleccionó archivo para DNI Frontal");
    }

    // Enviar DNI Dorso
    if (fileDNIDorso) {
      const formDataDNIDorso = new FormData();
      formDataDNIDorso.append("file", fileDNIDorso);
      formDataDNIDorso.append("filename", fileDNIDorso.name);
      formDataDNIDorso.append("tipo_archivo", dnidorso);
      formDataDNIDorso.append("detalle", "dorso");
      formDataDNIDorso.append("tipo_usuario", "4");
      if (email) formDataDNIDorso.append("correo", email);

      await axios.post(API_URL.UPLOAD_IMAGE, formDataDNIDorso, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      formDataLicenciaFrontal.append("tipo_usuario", "4");
      if (email) formDataLicenciaFrontal.append("correo", email);

      await axios.post(API_URL.UPLOAD_IMAGE, formDataLicenciaFrontal, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      console.warn("No se seleccionó archivo para Licencia Frontal");
    }

    // Enviar Licencia Dorso
    if (fileLicenciaDorso) {
      const formDataLicenciaDorso = new FormData();
      formDataLicenciaDorso.append("file", fileLicenciaDorso);
      formDataLicenciaDorso.append("filename", fileLicenciaDorso.name);
      formDataLicenciaDorso.append("tipo_archivo", licenciaDorso);
      formDataLicenciaDorso.append("detalle", "dorso");
      formDataLicenciaDorso.append("tipo_usuario", "4");
      if (email) formDataLicenciaDorso.append("correo", email);

      await axios.post(API_URL.UPLOAD_IMAGE, formDataLicenciaDorso, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      console.warn("No se seleccionó archivo para Licencia Dorso");
    }

    // Enviar Certificado
    if (fileCertificado) {
      const formDataCertificado = new FormData();
      formDataCertificado.append("file", fileCertificado);
      formDataCertificado.append("filename", fileCertificado.name);
      formDataCertificado.append("tipo_archivo", certificado);
      formDataCertificado.append("tipo_usuario", "4");
      if (email) formDataCertificado.append("correo", email);

      await axios.post(API_URL.UPLOAD_IMAGE, formDataCertificado, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      console.warn("No se seleccionó archivo para Certificado");
    }
  } catch (error) {
    console.error("Error al subir documentos:", error);
    throw error;
  }
}
