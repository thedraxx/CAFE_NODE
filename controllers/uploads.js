const cargarArchivo = async (req, res = response) => {
    res.json({
        msg: 'Cargar archivo'
    })
}


module.exports = {
    cargarArchivo
}