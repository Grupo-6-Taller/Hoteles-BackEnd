const { Schema, model } = require("mongoose")

const FacturaSchema = Schema({
       
    reservacion: {
        type: Schema.Types.ObjectId,
        ref: 'Reservacion',
        required: true
    },
    
    
    fecha:{
        type: Date,
        requiere: true,
    }

})

module.exports = model('Factura', FacturaSchema)