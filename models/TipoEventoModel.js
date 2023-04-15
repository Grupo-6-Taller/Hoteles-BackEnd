
const { Schema, model } = require("mongoose")

const TipoEventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    }

   
})

module.exports = model('TipoEvento', TipoEventoSchema)