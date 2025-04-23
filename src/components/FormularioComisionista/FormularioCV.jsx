import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { API_URL } from "@/Api/Api";
import { useNavigate } from "react-router-dom";

const FormularioCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  // Maneja la selección del archivo desde el input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Evento al arrastrar el archivo sobre el área
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  // Evento cuando se retira el archivo del área
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  // Evento al soltar el archivo en el área
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  // Abre el explorador de archivos al hacer clic en el área
  const handleAreaClick = () => {
    document.getElementById("fileInput").click();
  };

  // Envía el archivo y el email usando axios y FormData
  // FormularioCV.jsx (fragmento)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);
      formData.append("tipo_archivo", 25);

      // Agrega tipo_usuario = 6
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
        //console.log("Archivo subido correctamente", response.data);

        if (response.status === 200) {
          navigate("/mensaje");
        }
      } catch (error) {
        console.error("Error al subir el archivo", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-5xl mx-auto p-4'>
      {/* Tarjeta para subir el CV */}
      <div className='bg-white shadow-lg p-4 flex flex-col gap-2 rounded-md'>
        <h3 className='text-base text-black'>CURRICULUM VITAE</h3>

        {/* Área de subida con soporte para drag & drop */}
        <div
          className={`border-2 ${dragActive ? "border-blue-500" : "border-gray-300"
            } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 md:h-40 cursor-pointer`}
          onClick={handleAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <FaUpload className='text-gray-400 text-3xl mb-2' />
          <p className='text-gray-500 text-sm text-center'>
            Arrastre y suelte su archivo o haga clic
          </p>
          {selectedFile && (
            <p className='mt-2 text-green-500 text-sm'>
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
          {/* Input oculto para seleccionar archivo */}
          <input
            type='file'
            id='fileInput'
            className='hidden'
            onChange={handleFileChange}
            accept='.pdf,.doc,.docx'
          />
        </div>
      </div>

      {/* Botón de envío */}
      <div className='text-center mt-6'>
        <button
          type='submit'
          className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors'>
          Enviar documentación
        </button>
      </div>
    </form>
  );
};

export default FormularioCV;
