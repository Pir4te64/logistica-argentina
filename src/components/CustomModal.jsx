import { FaTimes } from "react-icons/fa";


const CustomModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full mx-4 overflow-hidden h-[calc(100%-58px)]">
        <div className="flex items-center justify-between bg-custom-blue px-6 py-3 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Detalles del Servicio</h2>
          <button
            onClick={onClose}
            className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            aria-label="Cerrar"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <div className="text-gray-700 h-full">{children}</div>
      </div>
    </div>
  )
}

export default CustomModal;