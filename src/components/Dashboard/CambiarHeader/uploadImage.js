// src/api/uploadImage.ts
import axios from "axios";
import { API_URL } from "@/Api/Api";

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
    console.log("🔽 Enviando FormData:");
    for (const [key, value] of formData.entries()) {
        // Si es un File, mostramos también su tamaño y tipo
        if (value instanceof File) {
            console.log(`${key}: File { name: ${value.name}, size: ${value.size} bytes, type: ${value.type} }`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(API_URL.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        console.log("🔽 Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error al subir la imagen:", error);
        throw error;
    }
};
