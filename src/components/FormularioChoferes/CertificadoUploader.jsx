// CertificadoUploader.jsx
import React from "react";
import { FaUpload } from "react-icons/fa";

const CertificadoUploader = ({
  title,
  dragActive,
  handleAreaClick,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
  file,
  inputId = "fileInputCertificado",
}) => {
  return (
    <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4 md:col-span-2'>
      <h3 className='text-xs md:text-base text-black'>{title}</h3>
      <div
        className={`border-2 ${
          dragActive ? "border-blue-500" : "border-gray-300"
        } border-dashed rounded-md p-6 md:p-4 flex flex-col items-center justify-center h-60 cursor-pointer`}
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <FaUpload className='text-gray-400 text-2xl md:text-3xl mb-1 md:mb-2' />
        <p className='text-gray-500 text-xs md:text-sm text-center'>
          Arrastre y suelte su archivo o haga clic
        </p>
        <input
          type='file'
          id={inputId}
          className='hidden'
          accept='.jpg,.jpeg,.png,.pdf'
          onChange={handleFileChange}
        />
        {file && (
          <p className='mt-2 text-green-500 text-sm'>
            Archivo seleccionado: {file.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificadoUploader;
