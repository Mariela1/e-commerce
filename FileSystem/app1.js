import { leerArchivo, escribirArchivo } from './utils/fileManager';


// Definir la ruta al archivo JSON de productos 
const rutaProductos = './data/productos.json';

// Leer el archivo JSON de productos
const productos = leerArchivo(rutaProductos);

if (productos !== null) {
    // Hacer operaciones con los datos, agregar un nuevo producto
    const nuevoProducto = {
        id: 4,
        nombre: 'Producto 4',
        precio: 15.99,
    };

    productos.push(nuevoProducto);

    // Luego, guarda los datos actualizados en el archivo
    escribirArchivo(rutaProductos, productos);
}
