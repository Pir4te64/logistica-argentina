import axios from "axios";
import { API_URL } from "@/Api/Api";



export const submitDocumentation = async (uploadedFiles) => {
  // Obtención del objeto usuario desde el localStorage.
  const userString = localStorage.getItem("user");
  let correo = null;
  if (userString) {
    try {
      const userObj = JSON.parse(userString);
      correo = userObj.email; // Correo del usuario (si existe)
    } catch (error) {
      console.error("Error al parsear el objeto user en localStorage:", error);
    }
  }

  // Construir la data final (aunque ya debería estar armada en el componente,
  // se pueden ajustar datos aquí si se desea)
  const dataToSend = uploadedFiles.map((item) => ({
    file: item.file, // Objeto File
    filename: item.file.name, // Nombre del archivo
    tipo_archivo: item.id, // ID del documento (por ejemplo, DNI Frontal, DNI Dorso, etc.)
    tipo_usuario: 3,
    // Si deseas usar el userId del usuario del localStorage, reemplaza el valor estático:
    correo: correo || "no-email@example.com",
  }));

  // Enviar cada archivo de forma secuencial
  for (const data of dataToSend) {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("filename", data.filename);
    formData.append("tipo_archivo", data.tipo_archivo);
    formData.append("tipo_usuario", data.tipo_usuario);
    formData.append("correo", data.correo);

    try {
      await axios.post(API_URL.UPLOAD_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(`Error subiendo ${data.filename}:`, error);
      // Aquí podrías decidir si detener la secuencia en caso de error o seguir con el siguiente archivo.
    }
  }

  console.log("Todos los archivos han sido procesados.");
  // Redirige a la página /mensaje si se completó la operación
};
