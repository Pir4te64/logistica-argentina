// src/hooks/useDragDrop.js
import { useCallback } from "react";
import Swal from "sweetalert2";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Hook para drag & drop y click-to-upload con validación de tamaño.
 *
 * @param {(file: File) => void} setFile        Setter del archivo seleccionado
 * @param {(active: boolean) => void} setDragActive Setter del estado drag activo
 * @param {string} inputID                      ID del input file oculto
 */
const useDragDrop = (setFile, setDragActive, inputID) => {
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    },
    [setDragActive]
  );

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    },
    [setDragActive]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          text: "El archivo no puede superar los 2 MB.",
          confirmButtonText: "Entendido",
        });
        return;
      }

      setFile(file);
    },
    [setFile, setDragActive]
  );

  const handleAreaClick = useCallback(() => {
    document.getElementById(inputID)?.click();
  }, [inputID]);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          text: "El archivo no puede superar los 2 MB.",
          confirmButtonText: "Entendido",
        });
        e.target.value = null;
        return;
      }

      setFile(file);
    },
    [setFile]
  );

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAreaClick,
    handleFileChange,
  };
};

export default useDragDrop;
