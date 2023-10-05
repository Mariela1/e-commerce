import fs from 'fs';
const rutaProductos = './data/productos.json';
// Leer el archivo JSON de productos
export function leerArchivo(filePath) {
    try {
        const contenido = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.error(`Error to read the file ${filePath}: ${error.message}`);
        return null;
    }
}

// Function para escribir en un archivo JSON
export function escribirArchivo(filePath, datos) {
    try {
        const datos = JSON.stringify(datos, null, 2);
        fs.writeFileSync(filePath, datos,'utf-8');
    } catch (error) {
        console.error(`Error to write in the file ${filePath}:`, error);
    }
}
