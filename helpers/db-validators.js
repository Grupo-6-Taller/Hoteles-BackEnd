const Usuario = require('../models/UsuarioModel')
const Habitacion = require('../models/HabitacionModel')
const Hotel = require('../models/HotelModel')
const Role = require('../models/role')
const Servicio = require('../models/ServicioModel')
const Tipo = require('../models/TipoEventoModel')
const Reservacion = require('../models/ReservacionModel')


const emailExiste = async(correo = '') =>{
    // verificar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne({correo})
    if (existeEmailDeUsuario ) {
        throw new Error(`el correo ${correo}, ya existe`)
    }
        
}

const esRoleValido =async(rol = '') =>{
    
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el rol ${rol}, no existe en la db`)
    }
}

const existIdOfUser = async(id)=>{
    const existIdOfUser = await Usuario.findById(id)
    if (!existIdOfUser) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const idHabitacion = async(id)=>{
    const idHabitacion = await Habitacion.findById(id)
    if (!idHabitacion) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}

const IdServicio = async(id)=>{
    const IdServicio = await Servicio.findById(id)
    if (!IdServicio) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}

const idHotel = async(id)=>{
    const idHotel = await Hotel.findById(id)
    if (!idHotel) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}

const idTipo = async(id)=>{
    const idTipo = await Tipo.findById(id)
    if (!idTipo) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}

const idReservacion = async(id)=>{
    const idReservacion = await Reservacion.findById(id)
    if (!idReservacion) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}


module.exports ={
    emailExiste,
    esRoleValido,
    existIdOfUser,
    idHabitacion,
    idHotel,
    IdServicio,
    idTipo,
    idReservacion
  
}