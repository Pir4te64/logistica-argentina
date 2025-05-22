// src/store/useModalStore.js
import { create } from "zustand";

/**
 * Store para manejar el estado del modal de postulaciones usando Zustand.
 * 
 * Este store proporciona:
 * - Estado: isPostulacionesOpen (boolean)
 * - Acciones: openPostulaciones y closePostulaciones
 * 
 * Uso:
 * const { isPostulacionesOpen, openPostulaciones, closePostulaciones } = useModalStore();
 * 
 * Para abrir el modal: openPostulaciones()
 * Para cerrar el modal: closePostulaciones()
 * Para verificar si está abierto: isPostulacionesOpen
 */
export const useModalStore = create((set) => ({
  // Estado que controla si el modal está abierto o cerrado
  isPostulacionesOpen: false,
  
  // Acción para abrir el modal
  openPostulaciones: () => set({ isPostulacionesOpen: true }),
  
  // Acción para cerrar el modal
  closePostulaciones: () => set({ isPostulacionesOpen: false }),
}));
