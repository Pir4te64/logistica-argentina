export // Datos de los documentos que se requieren
const documentos = [
  { title: "DNI", campos: ["Frontal", "Dorso"] },
  { title: "LICENCIA", campos: ["Frontal", "Dorso"] },
  { title: "CEDULA VERDE", campos: ["Frontal", "Dorso"] },
  {
    title: "CEDULA AZUL / AUTORIZACION DE MANEJO",
    campos: ["Frontal", "Dorso"],
  },
  { title: "RTO, VTV, ITV", campos: [] },
  { title: "TITULO", campos: [] },
  { title: "POLIZA", campos: [] },
  { title: "FOTOS DEL VEHÍCULO", campos: ["Frente", "Laterales", "Trasera"] },
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
  },
  "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL": 16,
};
