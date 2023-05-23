const dbValidator = require("./db-validators")
const generarJWT = require("./generarJWT")
const subirArchivo = require("./subir-archivo")



module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...subirArchivo
}