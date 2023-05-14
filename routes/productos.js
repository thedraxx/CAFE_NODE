const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validad-campos');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId, esAdminRole } = require('../middlewares');

const router = Router();

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],
    crearProducto
);

// Obtener todos los productos - publico
router.get('/',
    obtenerProductos
);

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', "no es un id de Mongo Valido").isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],
    obtenerProducto
);


// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un id de Mongo Valido").isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],
    borrarProducto
);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
],
    actualizarProducto
);





module.exports = router;