const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total, usuarios
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
        rol,
        estado
    } = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol,
        estado
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({ usuario });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}