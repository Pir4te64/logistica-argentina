// src/components/Formulario/FileUploader.jsx
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import Swal from "sweetalert2"; // Solo esto

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const FileUploader = ({ label, onFilesAccepted, multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
      const invalidFiles = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);

      if (invalidFiles.length) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          html: `Los siguientes archivos superan los 2 MB:<br/><strong>${invalidFiles
            .map((f) => f.name)
            .join(", ")}</strong>`,
          confirmButtonText: "Entendido",
        });
      }

      if (!validFiles.length) return;

      if (multiple) {
        setFiles((prev) => {
          const combined = [...prev, ...validFiles];
          onFilesAccepted?.(combined);
          return combined;
        });
        const newPreviews = validFiles.map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        );
        setPreviews((prev) => [...prev, ...newPreviews]);
      } else {
        const file = validFiles[0];
        setFiles([file]);
        onFilesAccepted?.(file);
        setPreviews(
          file.type.startsWith("image/") ? [URL.createObjectURL(file)] : []
        );
      }
    },
    [multiple, onFilesAccepted]
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => p && URL.revokeObjectURL(p));
    };
  }, [previews]);

  const handleRemoveFile = (indexToRemove) => {
    setFiles((curr) => {
      const updated = curr.filter((_, i) => i !== indexToRemove);
      onFilesAccepted?.(multiple ? updated : updated[0] ?? null);
      return updated;
    });
    setPreviews((curr) => curr.filter((_, i) => i !== indexToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-auto"
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        multiple ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            {files.map((file, idx) => (
              <div key={idx} className="relative">
                {file.type.startsWith("image/") ? (
                  <img
                    src={previews[idx]}
                    alt="Preview"
                    className="object-cover w-full h-24 rounded"
                  />
                ) : (
                  <div className="p-2 border border-gray-300 rounded text-xs text-center text-gray-500">
                    {file.name}
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : files[0].type.startsWith("image/") ? (
          <img
            src={previews[0]}
            alt="Preview"
            className="object-cover h-20 w-20 rounded"
          />
        ) : (
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {files[0].name}
          </p>
        )
      ) : (
        <>
          <FaUpload className="text-2xl md:text-3xl text-gray-400 mb-1 md:mb-2" />
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {isDragActive
              ? "Suelta el archivo"
              : `${label ? `${label} – ` : ""}Arrastra y suelta o haz clic`}
          </p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
