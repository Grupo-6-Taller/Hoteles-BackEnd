const { Schema, model } = require("mongoose")

const EventoSchema = Schema({
    tipo: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    },

    evento: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    }

})

module.exports = model('Evento', EventoSchema)