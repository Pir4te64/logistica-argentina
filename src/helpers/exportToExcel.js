import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/**
 * Exporta una lista de objetos a un archivo Excel.
 * @param {Array} data - Lista de objetos a exportar.
 * @param {Array} columns - Configuración de columnas: [{ header: 'Nombre', key: 'name', width: 20 }, ...]
 * @param {string} fileName - Nombre del archivo Excel.
 */
export const exportToExcel = async (data, columns, fileName = 'export.xlsx') => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Datos');

  sheet.columns = columns;

  data.forEach((item) => {
    sheet.addRow(item);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, fileName);
};
