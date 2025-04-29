// src/components/Dashboard/ServicioAnuncio/DniUploader.jsx
import React from "react";
import { FaUpload, FaFilePdf } from "react-icons/fa";

const DniUploader = ({
  title,
  // parámetros para DNI Frontal
  dragActiveFrontal,
  handleAreaClickFrontal,
  handleDragOverFrontal,
  handleDragLeaveFrontal,
  handleDropFrontal,
  handleFileChangeFrontal,
  fileFrontal,
  // parámetros para DNI Dorso
  dragActiveDorso,
  handleAreaClickDorso,
  handleDragOverDorso,
  handleDragLeaveDorso,
  handleDropDorso,
  handleFileChangeDorso,
  fileDorso,
}) => {
  const renderPreview = (file) => {
    if (!file) return null;
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={`Preview ${file.name}`}
          className="mt-2 w-16 h-16 object-cover rounded"
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <div className="mt-2 flex flex-col items-center text-gray-700">
          <FaFilePdf className="text-4xl" />
          <p className="text-xs mt-1 truncate w-16 text-center">{file.name}</p>
        </div>
      );
    } else {
      return (
        <p className="mt-2 text-xs text-gray-500 truncate w-16 text-center">
          {file.name}
        </p>
      );
    }
  };

  return (
    <div className="bg-white p-2 md:p-4 rounded shadow flex flex-col gap-2 md:gap-4">
      <h3 className="text-xs md:text-base text-black">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {/* DNI Frontal */}
        <div
          className={`border-2 ${
            dragActiveFrontal ? "border-blue-500" : "border-gray-300"
          } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
          onClick={handleAreaClickFrontal}
          onDragOver={handleDragOverFrontal}
          onDragLeave={handleDragLeaveFrontal}
          onDrop={handleDropFrontal}
        >
          <FaUpload className="text-gray-400 text-2xl mb-1" />
          <p className="text-gray-500 text-xs text-center">
            DNI Frontal: arrastra o haz clic
          </p>
          <input
            type="file"
            id="fileInputDNIFrontal"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChangeFrontal}
          />
          {renderPreview(fileFrontal)}
        </div>

        {/* DNI Dorso */}
        <div
          className={`border-2 ${
            dragActiveDorso ? "border-blue-500" : "border-gray-300"
          } border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 cursor-pointer`}
          onClick={handleAreaClickDorso}
          onDragOver={handleDragOverDorso}
          onDragLeave={handleDragLeaveDorso}
          onDrop={handleDropDorso}
        >
          <FaUpload className="text-gray-400 text-2xl mb-1" />
          <p className="text-gray-500 text-xs text-center">
            DNI Dorso: arrastra o haz clic
          </p>
          <input
            type="file"
            id="fileInputDNIDorso"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChangeDorso}
          />
          {renderPreview(fileDorso)}
        </div>
      </div>
    </div>
  );
};

export default DniUploader;
