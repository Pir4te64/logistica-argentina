import React from "react";

const BotonEnviarDocumentacion = ({ uploading }) => (
  <div className='text-center'>
    <button
      type='submit'
      disabled={uploading}
      className='bg-red-500 text-white px-4 py-1 md:px-6 md:py-2 rounded hover:bg-red-600 transition-colors text-xs md:text-sm'>
      {uploading ? "Enviando..." : "Enviar documentación"}
    </button>
  </div>
);

export default BotonEnviarDocumentacion;
