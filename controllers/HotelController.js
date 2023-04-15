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

const PostHoteles = async (req = request, res = response) => {


    const { nombre, direccion, evento } = req.body;
    const HotelDB = new Hotel({ nombre, direccion, evento  });

   
    await HotelDB.save();

    res.status(201).json({
        msg: 'Post api',
        HotelDB
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
    PutHotel

}

