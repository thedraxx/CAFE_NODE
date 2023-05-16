const { response } = require("express");
const Usuario = require("../models/Usuario");
const { Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const buscarProducto = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // TRUE

    if (isMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const isProducto = await Producto.find({ nombre: termino });

    if (!isProducto) {
        return res.status(400).json({
            msg: `No existe un producto con el nombre ${termino}`
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: productos
    })
}



const buscarCategoria = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // TRUE

    if (isMongoId) {
        const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const isName = await Categoria.find({ nombre: termino });

    if (!isName) {
        return res.status(400).json({
            msg: `No existe una categoria con el nombre ${termino}`
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: categorias
    })
}


const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    })

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res)
            break;

        case "categorias":
            buscarCategoria(termino, res)
            break;

        case "productos":
            buscarProducto(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscar
}