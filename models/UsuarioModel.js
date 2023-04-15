const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el corre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'el contraseña es obligatorio']
        
    },
   
    rol: {
        type: String,
        required: true,
    },
  
})

module.exports = model('Usuario', UsuarioSchema);