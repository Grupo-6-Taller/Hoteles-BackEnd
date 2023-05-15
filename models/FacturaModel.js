const { Schema, model } = require("mongoose")

const FacturaSchema = Schema({
       
    reservacion: {
        type: Schema.Types.ObjectId,
        ref: 'Reservacion',
        required: true
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
    
    fecha:{
        type: Date,
        requiere: true,
    },

    total: {
        type: Number
    },
    
 

})

module.exports = model('Factura', FacturaSchema)