const Hotel = require('../models/HotelModel')

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

const hotelPorNombre = async(req = request, res = response) => {

    const { nombre } = req.body;
    const hotel = await Hotel.findById( nombre )
                                            

    res.json({
        msg: 'categoria por id',
        hotel
    });

}


const PostHoteles = async (req = request, res = response) => {


    const { estado, ...body } = req.body;
    const HotelDB = await Hotel.findOne({ nombre: body.nombre });

    if (HotelDB) {
        return res.status(400).json({
            msg: `el producto ${HotelDB.nombre}. ya esxiste en la base de datos`
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
        HotelDB,
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
    PutHotel

}

