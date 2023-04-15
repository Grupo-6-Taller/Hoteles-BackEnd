const { Schema, model } = require("mongoose")

const HotelSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
     
    },
    direccion: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    },

    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento',
    },

    estado: {
        type: Boolean,
        default: true,
    },

    
})

module.exports = model('Hotel', HotelSchema)