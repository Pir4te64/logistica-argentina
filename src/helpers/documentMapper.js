// ---------- helpers/documentMapper.js (por ejemplo) ----------

import { docMapping } from "@/components/Formulario/estaticos";

/**
 * Función que crea un mapeo bidireccional entre IDs y nombres de documentos.
 * 
 * Esta función toma el objeto docMapping que contiene la estructura de documentos
 * y sus IDs, y crea un objeto que permite buscar el nombre del documento a partir
 * de su ID.
 * 
 * El objeto docMapping puede tener dos formatos:
 * 1. Un número directo como valor (ej: { "DNI": 1 })
 * 2. Un objeto con subcampos (ej: { "Pasaporte": { "Vigente": 2, "Vencido": 3 } })
 * 
 * @returns {Object} Un objeto donde las claves son IDs y los valores son los nombres
 *                   de los documentos. Para subcampos, el formato es "Documento — Subcampo"
 */
export const idToDoc = (() => {
    const map = {};
    for (const [doc, val] of Object.entries(docMapping)) {
        if (typeof val === "number") {
            map[val] = doc;
        } else {
            // val es { Subcampo: id, ... }
            for (const [sub, id] of Object.entries(val)) {
                map[id] = `${doc} — ${sub.replace(/_/g, " ")}`;
            }
        }
    }
    return map;
})();
