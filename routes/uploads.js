const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validad-campos');
const { cargarArchivo } = require('../controllers/uploads');

const router = Router();


router.post('/', [



], cargarArchivo)


module.exports = router;