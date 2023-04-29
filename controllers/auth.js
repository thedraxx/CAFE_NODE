const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar email 
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            })
        }


        //Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no esta activo'
            })
        }

        //Verificar el password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar el JWT    
        const token = await generarJWT(usuario.id)

        if (!token) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo generar el token'
            })
        }


        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}