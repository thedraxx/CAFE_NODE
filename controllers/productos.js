const { response } = require("express");
const { Producto } = require("../models");


// CrearCategoria - privado - cualquier persona con un token valido
const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    try {
        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre} ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id,
        }

        const producto = new Producto(data);

        // Guardar DB
        await producto.save();

        res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


// Obtener Productos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total, productos
    });
}

// Obtener Producto por ID - populate {}
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    if (!producto) {
        return res.status(401).json({
            msg: 'No existe un producto con ese id'
        })
    }

    res.json(producto);
}



// ActualizarCategoria - privado - cualquier persona con un token valido
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    // Esto viene del JWT, sirve para saber quien lo esta haciendo
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}


// BorrarProducto - Admin
const borrarProducto = async (req, res = response) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}





module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    borrarProducto,
    actualizarProducto
}
