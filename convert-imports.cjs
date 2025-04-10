// convert-imports.cjs
const fs = require("fs");
const path = require("path");

// Carpeta raíz de tu proyecto (donde se encuentra la carpeta 'src')
const projectRoot = process.cwd();
const srcFolder = path.join(projectRoot, "src");

// Extensiones a procesar
const validExtensions = [".js", ".jsx", ".ts", ".tsx"];

// Regex para encontrar declaraciones de import que usan rutas relativas
// Captura la comilla y el string interno.
const importRegex = /from\s+(['"])(\.{1,2}\/[^'"]+)\1/g;

/**
 * Convierte una ruta relativa al alias absoluto usando "@/..."
 * @param {string} filePath - Ruta completa al archivo actual
 * @param {string} relativeImport - Ruta del import relativo (ej.: ./components/Button)
 * @returns {string} - La nueva ruta de import absoluto
 */
function convertRelativeToAbsolute(filePath, relativeImport) {
  // Directorio donde se encuentra el archivo
  const fileDir = path.dirname(filePath);
  // Resolver la ruta absoluta del import
  const absolutePath = path.resolve(fileDir, relativeImport);
  // Calcular la ruta relativa desde la carpeta src
  let relativeToSrc = path.relative(srcFolder, absolutePath);
  // Para compatibilidad con importaciones, usar siempre "/" como separador
  relativeToSrc = relativeToSrc.split(path.sep).join("/");
  // Retornar la ruta con alias "@/..." (asegurarse de que la ruta resultante no empiece con "..")
  return `@/${relativeToSrc}`;
}

/**
 * Procesa un archivo: lee su contenido, realiza la conversión de imports y lo sobreescribe.
 * @param {string} filePath - Ruta completa al archivo a procesar.
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let hasChanged = false;

  // Reemplazamos las rutas relativas en cada import
  content = content.replace(importRegex, (match, quote, relPath) => {
    // Convertir la ruta relativa a absoluta (usando alias "@/")
    const newPath = convertRelativeToAbsolute(filePath, relPath);
    hasChanged = true;
    return `from ${quote}${newPath}${quote}`;
  });

  // Sobrescribir el archivo si hubo cambios
  if (hasChanged) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Modificado: ${filePath}`);
  }
}

/**
 * Recorre recursivamente la carpeta src, procesando archivos con las extensiones definidas.
 * @param {string} folder - Carpeta actual a recorrer
 */
function traverseFolder(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      traverseFolder(fullPath);
    } else if (
      entry.isFile() &&
      validExtensions.includes(path.extname(entry.name))
    ) {
      processFile(fullPath);
    }
  }
}

// Iniciar la transformación desde la carpeta src
console.log("Comenzando la conversión de imports relativos a absolutos...");
traverseFolder(srcFolder);
console.log("Conversión completada.");
