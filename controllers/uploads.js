
const { response } = require("express");
const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

    try {
        const nombre = await subirArchivo(req.files, undefined, "imgs")
        res.status(200).json({ nombre })
    } catch (error) {
        res.json(400).json({
            msg: "algo salio mal"
        })
    }
}


module.exports = {
    cargarArchivo
}