// src/api/uploadImage.ts
import axios from "axios";
import { API_URL } from "../../../Api/Api";

export const uploadImage = async (
    file,
    tipoArchivo,
    correo,
    tipoUsuario
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    formData.append("tipo_archivo", tipoArchivo.toString());
    formData.append("correo", correo);
    formData.append("tipo_usuario", tipoUsuario.toString());
    console.log(formData);
    try {
        const token = localStorage.getItem("token"); // si tu API lo requiere
        const response = await axios.post(API_URL.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error al subir la imagen:", error);
        throw error;
    }
};
