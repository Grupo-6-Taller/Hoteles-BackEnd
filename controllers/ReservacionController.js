const { response, request } = require('express');

const Reservacion = require('../models/ReservacionModel');
const Servicio =require('../models/ServicioModel')
const Habitacion = require('../models/HabitacionModel')
const Hotel = require('../models/HotelModel')

const { Promise } = require('mongoose');


const GetReservacion = async (req = request, res = response) => {

    const listaReservacion = await Promise.all([
        Reservacion.countDocuments(),
        Reservacion.find().
            populate('usuario', "nombre")

    ])

    res.json({
        msg: 'Get Api de Reservacions',
        listaReservacion
    })


}


const getReservacionId = async (req = request, res = response) => {

    const { id } = req.params;
    const Reservacion = await Reservacion.findById(id).
        populate('usuario', 'nombre').
        populate('servicio', "nombre")

    res.json({
        msg: 'Get Api de reservacion',
        Reservacion
    })
}

const PostReservacion = async (req = request, res = response) => {

    const { servicio, usuario, ...body } = req.body;
    const {habitacion} = req.body
    
    const data = {
        ...body,
        usuario: req.usuario._id

    }

 const habitacionHotel = await Habitacion.findOneAndUpdate({_id: habitacion}, {estado: false})
   

    let precioHabitacion = await Habitacion.findOne({_id: habitacion})

 
    data.total = precioHabitacion.precio * data.dias 
    const reservacion = new Reservacion(data)
    console.log(reservacion);
    // obtener id de hotel
    
   const rev = await Hotel.updateOne(
        {_id: habitacionHotel.hotel},
        {$push: { reservacion:  reservacion._id}
        }
        )


    //obtener id de la reservacion
    await reservacion.save()

    res.status(201).json({
        msg: 'Post api',
        reservacion
    })

}
const PutReservacion = async (req = request, res = response) => {


    const { id } = req.params;

    const { _id, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id

    //edicion de Reservacion 

    const editarReservacion = await Reservacion.findByIdAndUpdate(id, data, { new: true });



    res.json({
        msg: "api para editar",
        editarReservacion
    })

}

const DeleteReservacion = async (req = request, res = response) => {

    const { id } = req.params;


    const rev = await Reservacion.findOne({_id: id})
    await Habitacion.findOneAndUpdate({_id: rev.habitacion}, {estado: true})
    const reservacionborrar = await Reservacion.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        reservacionborrar
    })

}

const PostServicio = async (req = request, res = response) => {
    
    
    const data = {
        usuario: req.usuario._id,
        reservacion: req.params
    }
    const {servicio} = req.body
    

   let totalReservacion = 0

    const reservacion = await Reservacion.findOne({_id: data.reservacion})
     totalReservacion = reservacion.total
   console.log(reservacion);
 
        const servicios = await Servicio.findOne({ _id: servicio })
        totalReservacion = totalReservacion + servicios.precio
        console.log(servicios.precio);
        const agregarReservacion = await Reservacion.updateOne(
            {_id : data.reservacion},
            {$push: {servicio: servicio}},
            {new: true}
    
        )

        const totalServicio = await Reservacion.findOneAndUpdate(
            {_id: data.reservacion},
            {total: totalReservacion},
            {new: true}
        )

    



   res.status(201).json({
        msg: 'Post api',
        agregarReservacion,
        totalServicio
    })

}

module.exports = {

    GetReservacion,
    DeleteReservacion,
    PostReservacion,
    PutReservacion,
    PostServicio

}