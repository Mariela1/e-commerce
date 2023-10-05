import {Router} from 'express';

const router = Router();
const carts = [];

// Funcion para generar un nuevo ID de carrito

let idCounter = 1;

function generateCartId() {

    // Generar un ID numerico aleatorio de longit

    const newId = idCounter;
    idCounter++; // Incrementa el contador para el proximo ID
    return newId;

}

router.post('/', (req, res) => {
    // Generar un nuevo ID para el carrito
    const newCartId = generateCartId();

    // Convertir el ID en entero
    const cartId = parseInt(newCartId);

    // Crear un nuevo carrito con la estructura especificada
    const newCart = {
        id: newCartId,
        products: [],
    };

    // Agregar el nuevo carrito al array de carritos
    carts.push(newCart);
    //res.send({status: "success"});
    // Responder con el nuevo carrito creado
    res.status(201).json(newCart);

    });

router.get('/:id', (req, res)=> {
    const cartId = parseInt(req.params.id);

// Verificar que cartId es un numero valido

if(isNaN(cartId)) {
    return res.status(400).json({message: "Invalid cart ID"});

}
    // Buscar el carrito por su ID
    console.log(cartId)
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
        return res.status(404).json({message: "Shopping cart not found"})
    }

    // Retornar los productos del carrito

    res.json(cart.products)
});

// Ruta POST para agregar un producto al carrito por su ID (cid)

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const {quantity} = req.body;

    // Buscar el carrito por su ID (cid)
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
        return res.status(404).json({message: "Shopping cart not found"});
    }
    
         
    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.products.find((p) => p.product === productId);
    if (existingProduct) {
        // Si el producto existe, incrementar la cantidad
        existingProduct.quantity += quantity || 1;
    } else {

        // Si el producto no existe, agregarlo al carrito
        cart.products.push({
            product: productId,
            quantity: quantity || 1,
        });
    }

    // Retornar el carrito actualizado
    res.json(cart);

  
})


export default router;