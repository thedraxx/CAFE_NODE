const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validad-campos');
const { validationResult } = require('express-validator');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async (req, res = response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }


    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // verificar que el correo existe
    const existeEmail = await Usuario.findOne({
        correo
    });

    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya existe'
        });
    }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}