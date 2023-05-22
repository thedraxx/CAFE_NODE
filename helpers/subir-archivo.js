const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ["png", "jpg", "jpeg", "gif", "txt"]) => {


    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]

        // Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject
        }


        const nombreTemp = uuidv4() + "." + extension
        const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).json({ err });
            }

            return resolve({ msg: 'File uploaded to ' + uploadPath });
        });
    })
}

module.exports = {
    subirArchivo
}