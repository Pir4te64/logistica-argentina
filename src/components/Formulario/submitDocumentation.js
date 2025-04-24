import axios from "axios";
import { API_URL } from "@/Api/Api";

export const submitDocumentation = async (uploadedFiles) => {
  const userString = localStorage.getItem("user");
  let correo = null;
  if (userString) {
    try {
      const userObj = JSON.parse(userString);
      correo = userObj.email;
    } catch (error) {
      console.error("Error al parsear user:", error);
    }
  }

  const dataToSend = uploadedFiles.map((item) => ({
    file: item.file,
    filename: item.file.name,
    tipo_archivo: item.id,
    tipo_usuario: 3,
    correo: correo || "no-email@example.com",
  }));

  for (const data of dataToSend) {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("filename", data.filename);
    formData.append("tipo_archivo", data.tipo_archivo);
    formData.append("tipo_usuario", data.tipo_usuario);
    formData.append("correo", data.correo);

    try {
      await axios.post(API_URL.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(`Error subiendo ${data.filename}:`, error);
      // decidir si continuar o abortar
    }
  }

  console.log("Todos los archivos han sido procesados.");

  // redirijo a /mensaje
  window.location.href = "/mensaje";
};
