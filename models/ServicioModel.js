const { Schema, model } = require("mongoose")

const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
     
    },
    precio: {
        type: Number,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    },
    
})

module.exports = model('Servicio', ServicioSchema)