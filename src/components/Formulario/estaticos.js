export const documentos = [
  { title: "DNI", campos: ["Frontal", "Dorso"] },
  { title: "LICENCIA", campos: ["Frontal", "Dorso"] },
  { title: "CEDULA VERDE", campos: ["Frontal", "Dorso"] },
  {
    title: "CEDULA AZUL / AUTORIZACION DE MANEJO",
    campos: ["Frontal", "Dorso"],
  },
  { title: "RTO, VTV, ITV", campos: [], multiple: true },
  { title: "TITULO", campos: [], multiple: true },
  { title: "POLIZA", campos: [], multiple: true },
  {
    title: "FOTOS DEL VEHÍCULO",
    campos: ["Frente", "Laterales", "Trasera", "Laterales dos"],
  },
  { title: "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL", campos: [] },
];

export // Diccionario para mapear cada documento y subcampo a un ID
const docMapping = {
  DNI: {
    Frontal: 1,
    Dorso: 4,
  },
  LICENCIA: {
    Frontal: 2,
    Dorso: 5,
  },
  "CEDULA VERDE": {
    Frontal: 6,
    Dorso: 7,
  },
  "CEDULA AZUL / AUTORIZACION DE MANEJO": {
    Frontal: 8,
    Dorso: 9,
  },
  "RTO, VTV, ITV": 10,
  TITULO: 11,
  POLIZA: 12,
  "FOTOS DEL VEHÍCULO": {
    Frente: 13,
    Laterales: 14,
    Trasera: 15,
    Laterales_dos: 17,
  },
  "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL": 16,
};
