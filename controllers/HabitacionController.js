
const { response, request } = require('express');

const Habitacion = require('../models/HabitacionModel')
const Hotel = require('../models/HotelModel')
const { Promise } = require('mongoose');

const GetHabitacion = async (req = request, res = response) => {

    

    const listaHabitaciones = await Promise.all([
        Habitacion.countDocuments(),
        Habitacion.find().
            populate('hotel', "nombre")

    ])

    res.json({
        msg: 'Get Api de productos',
        listaHabitaciones
    })
}
const PostHabitacion = async (req = request, res = response) => {

    const { estado, ...body } = req.body;
    const HotelDB = await Habitacion.findOne({ nombre: body.nombre });
    
    if (HotelDB) {
        return res.status(400).json({
            msg: `el Nombre ${HotelDB.nombre}. ya esxiste en la base de datos`
        })
    }
    data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }
    
    console.log(data.hotel);
 

    const habitacion = new Habitacion(data)
  
    const agregarHabitacion = await Hotel.updateOne(
        {_id : data.hotel},
        {$push: {habitacion: habitacion._id}},
        {new: true}

    )

    await habitacion.save()

    res.status(201).json({
        msg: 'Post api',
        habitacion,
        agregarHabitacion
    })

}
const PutHabitacion = async (req = request, res = response) => {


    const { id } = req.params;

    const { _id,  ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

  

    //edicion de producto 

    const editarHabitacion = await Habitacion.findByIdAndUpdate(id, data, { new: true });



    res.json({
        msg: "api para editar",
        editarHabitacion
    })

}

const DeleteHabitacion = async (req = request, res = response) => {

    const { id } = req.params;

    const habitacionBorrar = await Habitacion.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        habitacionBorrar
    })

}
module.exports = {

    GetHabitacion,
    PostHabitacion,
    PutHabitacion,
    DeleteHabitacion,

}

