// src/components/Formulario/submitDocumentation.js
import axios from "axios";
import { API_URL } from "@/Api/Api";

/**
 * Sube un conjunto de archivos y opcionalmente redirige al finalizar.
 *
 * @param {Array<{ id: number, file: File }>} uploadedFiles — array de archivos con su tipo (id).
 * @param {boolean} [redirectOnComplete=true] — si es true, al terminar hace window.location.
 */
export const submitDocumentation = async (
  uploadedFiles,
  redirectOnComplete = true
) => {
  // 1) Extraer correo del localStorage
  let correo = null;
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      correo = JSON.parse(userString).email;
    } catch (err) {
      console.error("Error al parsear user:", err);
    }
  }

  // 2) Construir payload para cada archivo
  const dataToSend = uploadedFiles.map(({ id, file }) => ({
    file,
    filename: file.name,
    tipo_archivo: id,
    tipo_usuario: 3,
    correo: correo || "no-email@example.com",
  }));

  // 3) Subir uno a uno
  for (const data of dataToSend) {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("filename", data.filename);
    formData.append("tipo_archivo", data.tipo_archivo);
    formData.append("tipo_usuario", data.tipo_usuario);
    formData.append("correo", data.correo);

    try {
      console.log({ formData })
      await axios.post(API_URL.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error(`Error subiendo ${data.filename}:`, err);
      // aquí podrías decidir abortar o seguir con los siguientes
    }
  }



  // 4) Redirección opcional
  if (redirectOnComplete) {
    window.location.href = "/mensaje-transportista";
  }
};
