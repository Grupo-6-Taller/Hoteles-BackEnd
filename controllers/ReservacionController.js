const { response, request } = require('express');

const Reservacion = require('../models/ReservacionModel');


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

    const data = {
        ...body,
        usuario: req.usuario._id
    }


    const reservacion = new Reservacion(data)

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
    

    const agregarReservacion = await Reservacion.updateOne(
        {_id : data.reservacion},
        {$push: {servicio: req.body.servicio}},
        {new: true}


    )
   res.status(201).json({
        msg: 'Post api',
        agregarReservacion,
      
    })

}

module.exports = {

    GetReservacion,
    DeleteReservacion,
    PostReservacion,
    PutReservacion,
    PostServicio

}