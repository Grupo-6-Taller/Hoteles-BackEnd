const { Schema, model } = require("mongoose")

const HabitacionSchema = Schema({
    
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
  
    
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true

    },


    precio: {
        type: Number,
        required: [true, 'la descripcion es obligatorio']
    },
   
    estado: {
        type: Boolean,
        default: true,
    },

    descripcion: {
        type: String,},
   
})

module.exports = model('Habitacion', HabitacionSchema)