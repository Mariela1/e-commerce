import {Router} from 'express';

const router = Router();
const products = [];
// Ruta GET para listar todos los productos, incluyendo la limitacion

router.get('/', (req, res)=> {
    const limit = req.query.limit || products.length;
    const products = products.slice(0, limit); 
    res.send({products});
})

// Ruta GET para obtener los productos por el ID proporcionado
router.get('/:id', (req, res)=> {
    const  ProductId = parseInt(req.params.id);
    const product = products.find((p)=> p.id ===  ProductId);

    if(!product) {
        res.status(404).json({message: "Producto no encontrado"});
    } else {
        res.json(product);
    }
})

// Funcion para generar un nuevo ID

function generateProductId() {
    const ids = products.map((product) => product.id);

    const maxId = Math.max(...ids);
    return maxId !== -Infinity ? maxId + 1: 1;
}


// Ruta POST para agregar un nuevo producto
router.post('/', (req, res)=> {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    
    // Verificar que todos los campos obligatorios esten presentes

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({message: "All required fields must be provided"});  
    }

    // Generar un nuevo ID 
    const newId = generateProductId();

    // Crear un nuevo producto
    
    const newProduct = {
        id: newId,
        title,
        description,
        code,
        price: parseFloat(price), // Convertir el precio a numero
        status: true, // Por default
        stock: parseInt(stock),
        category,
        thumbnails: thumbnails || [],
    }
    products.push(newProduct);
    if (products.includes(newProduct)) {
    
        res.status(201).json({status: "success", payload: newProduct});
    
    } else {
        res.status(500).json({status:"error", error: "an error ocurred to add the product"})
    
    }
    res.send({products})

})

// Ruta PUT para actualizar un producto por ID

router.put('/:id', (req, res)=> {
    const productId = parseInt(req.params.id);
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
// Buscar el producto por su ID
const productIndex = products.findIndex((p) => p.id === productId);

if (productIndex === -1) {
    return res.status(404).json({message: "Producto no encontrado"})
}

// Actualizar los campos del producto sin cambiar el ID

products[productIndex].title = title || products[productIndex].title;
products[productIndex].description = description || products[productIndex].description;
products[productIndex].code = code || products[productIndex].code;
products[productIndex].price = price || products[productIndex].price;
products[productIndex].status = status || products[productIndex].status;
products[productIndex].stock = stock || products[productIndex].stock;
products[productIndex].category = category || products[productIndex].category;

// Si se proporciona la propiedad "thumbnails" en el cuerpo de la solicitud, actualizala
if(thumbnails !== undefined) {
    products[productIndex].thumbnails = thumbnails;

}
res.json(products[productIndex]);
});

// Ruta DELETE para eliminar un producto por ID
router.delete('/:id', (req,res) => {
    const productId = parseInt(req.params.id);

    // Buscar el producto por su ID
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({message: "Product not found"});
    }
    // Elimina el producto del array

    products.splice(productIndex, 1);

    res.json({message: "Deleted product "})
});

export default router;

