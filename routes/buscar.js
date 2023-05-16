const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validad-campos');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId, esAdminRole } = require('../middlewares');
const { buscar } = require('../controllers/buscar');


const router = Router();



// Buscar 

router.get(
    '/:coleccion/:termino', buscar
);







module.exports = router;