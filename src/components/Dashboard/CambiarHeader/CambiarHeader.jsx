import React, { useCallback, useState } from "react";
import { uploadImage } from "@/components/Dashboard/CambiarHeader/uploadImage";
import Swal from "sweetalert2";

const ZONAS = [
  { key: "transportistas", label: "Transportistas" },
  { key: "choferes", label: "Choferes y Acompañantes" },
  { key: "comisionistas", label: "Comisionistas" },
];

const CambiarHeader = () => {
  const [imagenes, setImagenes] = useState({
    transportistas: null,
    choferes: null,
    comisionistas: null,
  });
  const [loading, setLoading] = useState({
    transportistas: false,
    choferes: false,
    comisionistas: false,
  });

  const handleDrop = useCallback(async (e, tipo) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validarYGuardar(file, tipo);
  }, []);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    validarYGuardar(file, tipo);
  };

  const validarYGuardar = (file, tipo) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen debe pesar menos de 2MB.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 1920 || img.height < 1080) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La imagen debe tener una resolución mínima de 1080p (1920x1080).",
        });
        return;
      }

      setImagenes((prev) => ({
        ...prev,
        [tipo]: {
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    };
  };
  const handleCambiarHeader = async (tipo) => {
    const imagen = imagenes[tipo];
    if (!imagen) return;

    const tipoArchivoMap = {
      transportistas: 26,
      choferes: 27,
      comisionistas: 28,
    };

    const tipo_archivo = tipoArchivoMap[tipo];
    const tipo_usuario = 2;

    const user = {
      email: JSON.parse(localStorage.getItem("user")).email,
    };

    const correo = user.email;

    try {
      setLoading(prev => ({ ...prev, [tipo]: true }));
      await uploadImage(imagen.file, tipo_archivo, correo, tipo_usuario);

      Swal.fire({
        icon: "success",
        title: "¡Imagen enviada!",
        text: `La imagen de ${tipo} fue subida correctamente.`,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al subir la imagen.",
      });
    } finally {
      setLoading(prev => ({ ...prev, [tipo]: false }));
    }
  };




  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {ZONAS.map((zona) => (
        <div
          key={zona.key}
          onDrop={(e) => handleDrop(e, zona.key)}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
          onDragLeave={preventDefaults}
          className="relative rounded-lg border-2 border-dashed border-gray-300 bg-white p-4 text-center shadow-md"
        >
          <label className="mb-3 block text-lg font-semibold">{zona.label}</label>

          {imagenes[zona.key]?.preview ? (
            <img
              src={imagenes[zona.key].preview}
              alt={`Preview ${zona.label}`}
              className="mb-3 h-48 w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-gray-500">
              <span className="mb-2">Arrastrá una imagen aquí</span>
              <span className="text-sm text-gray-400">o hacé clic abajo</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="mt-2 w-full cursor-pointer"
            onChange={(e) => handleFileChange(e, zona.key)}
          />
          <p className="mt-2 text-xs text-gray-500">Mínimo 1920x1080px • Máx 2MB</p>

          <button
            onClick={() => handleCambiarHeader(zona.key)}
            disabled={!imagenes[zona.key] || loading[zona.key]}
            className={`mt-4 w-full py-2 rounded-md text-white font-medium shadow transition-colors ${imagenes[zona.key] && !loading[zona.key]
              ? "bg-custom-blue hover:bg-custom-blue-medium"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {loading[zona.key] ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="ml-2">Subiendo...</span>
              </div>
            ) : (
              "Cambiar Header"
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CambiarHeader;
