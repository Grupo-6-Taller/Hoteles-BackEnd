const { Schema, model } = require("mongoose")

const ReservacionSchema = Schema({
    dias: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    servicio: [{
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        
    }],
     
})

module.exports = model('Reservacion', ReservacionSchema)