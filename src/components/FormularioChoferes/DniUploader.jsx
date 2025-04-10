// DniUploader.jsx
import React from "react";
import { FaUpload } from "react-icons/fa";

const DniUploader = ({
  title,
  // Parámetros para DNI Frontal
  dragActiveFrontal,
  handleAreaClickFrontal,
  handleDragOverFrontal,
  handleDragLeaveFrontal,
  handleDropFrontal,
  handleFileChangeFrontal,
  fileFrontal,
  // Parámetros para DNI Dorso
  dragActiveDorso,
  handleAreaClickDorso,
  handleDragOverDorso,
  handleDragLeaveDorso,
  handleDropDorso,
  handleFileChangeDorso,
  fileDorso,
}) => {
  return (
    <div className='bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4'>
      <h3 className='text-xs md:text-base text-black'>{title}</h3>
      <div className='grid grid-cols-2 gap-2'>
        {/* Sub-box: DNI Frontal */}
        <div
          className={`border-2 ${
            dragActiveFrontal ? "border-blue-500" : "border-gray-300"
          } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
          onClick={handleAreaClickFrontal}
          onDragOver={handleDragOverFrontal}
          onDragLeave={handleDragLeaveFrontal}
          onDrop={handleDropFrontal}>
          <FaUpload className='text-gray-400 text-2xl mb-1' />
          <p className='text-gray-500 text-xs text-center'>
            DNI Frontal: Arrastre y suelte o haga clic
          </p>
          <input
            type='file'
            id='fileInputDNIFrontal'
            className='hidden'
            accept='.jpg,.jpeg,.png,.pdf'
            onChange={handleFileChangeFrontal}
          />
          {fileFrontal && (
            // Muestra la imagen ocupando el tamaño del contenedor
            <img
              src={URL.createObjectURL(fileFrontal)}
              alt='Preview DNI Frontal'
              className='mt-2 w-10 h-10 object-cover'
            />
          )}
        </div>
        {/* Sub-box: DNI Dorso */}
        <div
          className={`border-2 ${
            dragActiveDorso ? "border-blue-500" : "border-gray-300"
          } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
          onClick={handleAreaClickDorso}
          onDragOver={handleDragOverDorso}
          onDragLeave={handleDragLeaveDorso}
          onDrop={handleDropDorso}>
          <FaUpload className='text-gray-400 text-2xl mb-1' />
          <p className='text-gray-500 text-xs text-center'>
            DNI Dorso: Arrastre y suelte o haga clic
          </p>
          <input
            type='file'
            id='fileInputDNIDorso'
            className='hidden'
            accept='.jpg,.jpeg,.png,.pdf'
            onChange={handleFileChangeDorso}
          />
          {fileDorso && (
            <img
              src={URL.createObjectURL(fileDorso)}
              alt='Preview DNI Dorso'
              className='mt-2 w-10 h-10 object-cover'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DniUploader;
