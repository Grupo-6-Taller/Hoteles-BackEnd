const { Schema, model } = require("mongoose")

const ReservacionSchema = Schema({
    dias: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },

    fecha:{
        type: Date,
        requiere: true,
    },


     habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Habitacion',
        required: true

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

    total:{
        type: Number,
        default: 0

    },

     
})

module.exports = model('Reservacion', ReservacionSchema)