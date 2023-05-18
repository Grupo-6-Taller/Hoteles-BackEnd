const Hotel = require('../models/HotelModel')

const Reservacion =require('../models/ReservacionModel')
const Habitacion =require('../models/HabitacionModel')


const { response, request } = require('express');
const { Promise } = require('mongoose');


const getHotel = async (req = request, res = response) => {
    
    
   
 

    const listaHotel = await Promise.all([
        Hotel.countDocuments(),
        Hotel.find().
        populate('evento', "evento")
    ])

    res.json({
        msg: 'Get Api de Usuarios',
        listaHotel
    })

}


const getHabitacionesHotel = async (req = request, res = response) => {

        const {id} = req.params

        
        const hotel = await Hotel.findOne({_id: id}).populate("habitacion")

        const habitaciones = hotel.habitacion 
        const habitacionesTrue = await Habitacion.aggregate([
            {
                $match: {
                  _id: { $in: hotel.habitacion },
                  estado: true,
                },
              }
        ])
        res.json({
            msg:'get Api Server',
            habitacionesTrue
        })


}

const hotelPorNombre = async(req = request, res = response) => {

    const { nombre } = req.body;
    const hotel = await Hotel.find( {nombre : nombre} )
    
    if (!hotel) {
        return res.status(404).json({
            msg: ` nombre no encontrado`
        })
    }

    res.json({
        msg: 'categoria por id',
        hotel
    });

}

const hotelPorDireccion = async(req = request, res = response) => {

    const { direccion } = req.body;
    const hotel = await Hotel.find( {direccion : direccion} )
    
    if (!hotel) {
        return res.status(404).json({
            msg: ` dirreciion no encontrado`
        })
    }

    res.json({
        msg: 'categoria por id',
        hotel
    });

}

const usuariosPorHotel = async(req = request, res = response) => {

    const { id } = req.params;
    const hotel = await Hotel.findOne({_id: id}).populate('reservacion').populate({
        path: "reservacion",
        populate: { path: "usuario" },
      })
    const reservaciones = hotel.reservacion

    res.json({
        msg: 'categoria por id',
        reservaciones
    });

}


const PostHoteles = async (req = request, res = response) => {


    const { estado, ...body } = req.body;
    const HotelDB = await Hotel.findOne({ nombre: body.nombre });
    const DireccionDb = await Hotel.findOne({ direccion: body.direccion });
    
    if (HotelDB) {
        return res.status(400).json({
            msg: `el Nombre ${HotelDB.nombre}. ya esxiste en la base de datos`
        })
    }

    if (DireccionDb) {
        return res.status(400).json({
            msg: `la dirreccion ${DireccionDb.direccion}. ya esxiste en la base de datos`
        })
    }
  
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const hotel = new Hotel(data)

    await hotel.save()

    res.status(201).json({
        msg: 'Post api',
        hotel
    })

}

const DeleteHotel = async (req = request, res = response) => {
    
    const { id } = req.params;
    
    const hoteloEditar = await Hotel.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        hoteloEditar
    })

}

const PutHotel = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, rol, estado, ...resto } = req.body;

    const hotelEditar = await Hotel.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put api',
        hotelEditar

    })

}

module.exports = {

    getHotel,
    PostHoteles,
    DeleteHotel,
    hotelPorNombre,
    PutHotel,
    hotelPorDireccion,
    getHabitacionesHotel,
    usuariosPorHotel

}

