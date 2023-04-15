const { Schema, model } = require("mongoose")

const EventoSchema = Schema({
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEvento',
        required: true
    },

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    }

})

module.exports = model('Evento', EventoSchema)