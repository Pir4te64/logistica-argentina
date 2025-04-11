import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

const FileUploader = ({ label, onFilesAccepted, multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (multiple) {
        // Acumular archivos previos y nuevos
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        const newPreviews = acceptedFiles.map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        );
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        if (onFilesAccepted) onFilesAccepted([...files, ...acceptedFiles]);
      } else {
        // Modo individual sigue igual
        const selectedFile = acceptedFiles[0];
        setFiles([selectedFile]);
        if (selectedFile.type.startsWith("image/")) {
          setPreviews([URL.createObjectURL(selectedFile)]);
        } else {
          setPreviews([]);
        }
        if (onFilesAccepted) onFilesAccepted(selectedFile);
      }
    },
    [multiple, onFilesAccepted, files]
  );

  useEffect(() => {
    // Revoca las URLs para evitar fugas de memoria
    return () => {
      previews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);
  const handleRemoveFile = (indexToRemove) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
    setPreviews((currentPreviews) =>
      currentPreviews.filter((_, index) => index !== indexToRemove)
    );
    if (onFilesAccepted)
      onFilesAccepted(files.filter((_, idx) => idx !== indexToRemove));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: multiple, // habilita o deshabilita la carga múltiple
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-auto'>
      <input {...getInputProps()} />
      {files.length > 0 ? (
        multiple ? (
          <div className='grid grid-cols-2 gap-2 w-full'>
            {files.map((file, index) => (
              <div key={index} className='relative'>
                {file.type.startsWith("image/") ? (
                  <img
                    src={previews[index]}
                    alt='Preview'
                    className='object-cover w-full h-24 rounded'
                  />
                ) : (
                  <div className='p-2 border border-gray-300 rounded text-xs text-center text-gray-500'>
                    {file.name}
                  </div>
                )}
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  X
                </button>
              </div>
            ))}
          </div>
        ) : files[0].type.startsWith("image/") ? (
          <img
            src={previews[0]}
            alt='Preview'
            className='object-cover h-20 w-20 rounded'
          />
        ) : (
          <p className='text-gray-500 text-xs md:text-sm text-center'>
            {files[0].name}
          </p>
        )
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
