
const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

    try {
        subirArchivo(req.files)
    } catch (error) {
        res.json(400).json({
            msg: "algo salio mal"
        })
    }
}


module.exports = {
    cargarArchivo
}