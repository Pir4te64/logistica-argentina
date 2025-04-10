import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

const FileUploader = ({ label, onFilesAccepted }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);

        // Si es una imagen, creamos un URL para la previsualización.
        if (selectedFile.type.startsWith("image/")) {
          const previewURL = URL.createObjectURL(selectedFile);
          setPreview(previewURL);
        } else {
          setPreview(null);
        }
        if (onFilesAccepted) onFilesAccepted(acceptedFiles);
      }
    },
    [onFilesAccepted]
  );

  useEffect(() => {
    // Cuando el componente se desmonte o el archivo cambie, revocamos el objeto URL si existe.
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-32'>
      <input {...getInputProps()} />
      {file ? (
        <>
          {file.type.startsWith("image/") ? (
            <img
              src={preview}
              alt='Preview'
              className='object-cover h-20 w-20 rounded'
            />
          ) : (
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              {file.name}
            </p>
          )}
        </>
      ) : (
        <>
          <FaUpload className='text-2xl md:text-3xl text-gray-400 mb-1 md:mb-2' />
          {isDragActive ? (
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              Suelta el archivo
            </p>
          ) : (
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              {label ? `${label} - ` : ""}Arrastra y suelta o haz clic
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;
