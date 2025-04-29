// src/components/FormularioCV.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const FormularioCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  // Maneja la selección vía input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          text: "El archivo no puede superar los 2 MB.",
          confirmButtonText: "Entendido",
        });
        event.target.value = null;
        return;
      }
      setSelectedFile(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          text: "El archivo no puede superar los 2 MB.",
          confirmButtonText: "Entendido",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAreaClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "No hay archivo",
        text: "Selecciona un archivo antes de enviar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filename", selectedFile.name);
    formData.append("tipo_archivo", 25);
    formData.append("tipo_usuario", 6);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email) {
        formData.append("correo", user.email);
      }
    }

    try {
      const response = await axios.post(API_URL.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        navigate("/mensaje");
      }
    } catch (error) {
      console.error("Error al subir el archivo", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir",
        text: error.response?.data?.message || error.message,
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-md">
        <h3 className="text-base text-black">CURRICULUM VITAE</h3>

        <div
          className={`border-2 ${
            dragActive ? "border-blue-500" : "border-gray-300"
          } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 md:h-40 cursor-pointer`}
          onClick={handleAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FaUpload className="text-gray-400 text-3xl mb-2" />
          <p className="text-gray-500 text-sm text-center">
            Arrastre y suelte su archivo o haga clic
          </p>
          {selectedFile && (
            <p className="mt-2 text-green-500 text-sm">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={!selectedFile}
          className={`px-6 py-2 rounded transition-colors ${
            selectedFile
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Enviar documentación
        </button>
      </div>
    </form>
  );
};

export default FormularioCV;
