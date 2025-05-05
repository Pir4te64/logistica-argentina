// src/store/useModalStore.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  isPostulacionesOpen: false,
  openPostulaciones: () => set({ isPostulacionesOpen: true }),
  closePostulaciones: () => set({ isPostulacionesOpen: false }),
}));
