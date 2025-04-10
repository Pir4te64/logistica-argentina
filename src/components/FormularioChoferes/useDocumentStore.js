import { create } from "zustand";

const useDocumentStore = create((set) => ({
  // --- Estados para DNI ---
  fileDNIFrontal: null,
  dragActiveDNIFrontal: false,
  setFileDNIFrontal: (file) => set({ fileDNIFrontal: file }),
  setDragActiveDNIFrontal: (state) => set({ dragActiveDNIFrontal: state }),

  fileDNIDorso: null,
  dragActiveDNIDorso: false,
  setFileDNIDorso: (file) => set({ fileDNIDorso: file }),
  setDragActiveDNIDorso: (state) => set({ dragActiveDNIDorso: state }),

  // --- Estados para Licencia ---
  fileLicenciaFrontal: null,
  dragActiveLicenciaFrontal: false,
  setFileLicenciaFrontal: (file) => set({ fileLicenciaFrontal: file }),
  setDragActiveLicenciaFrontal: (state) =>
    set({ dragActiveLicenciaFrontal: state }),

  fileLicenciaDorso: null,
  dragActiveLicenciaDorso: false,
  setFileLicenciaDorso: (file) => set({ fileLicenciaDorso: file }),
  setDragActiveLicenciaDorso: (state) =>
    set({ dragActiveLicenciaDorso: state }),

  // --- Estados para Certificado ---
  fileCertificado: null,
  dragActiveCertificado: false,
  setFileCertificado: (file) => set({ fileCertificado: file }),
  setDragActiveCertificado: (state) => set({ dragActiveCertificado: state }),

  // --- Estado para la carga ---
  uploading: false,
  setUploading: (state) => set({ uploading: state }),
}));

export default useDocumentStore;
