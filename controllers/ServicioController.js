const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Serevicio = require('../models/ServicioModel')

const GetSerevicio = async (req = request, res = response) => {

    const listaSerevicios = await Promise.all([
        Serevicio.countDocuments(),
        Serevicio.find()
    
    ])

    res.json({
        msg: 'Get Api de Serevicios',
        listaSerevicios
    })


}

const getSerevicioId = async (req = request, res = response) => {

    const { id } = req.params;
    const servicio = await Serevicio.findById(id).
    populate('usuario','nombre').
    populate('categoria', "nombre")

    res.json({
        msg: 'Get Api de categoria',
        servicio
    })
}
const PostSerevicio = async (req = request, res = response) => {

    const {  ...body } = req.body;
    const servicioDB = await Serevicio.findOne({ nombre: body.nombre });

    if (servicioDB) {
        return res.status(400).json({
            msg: `el Serevicio ${servicioDB.nombre}. ya esxiste en la base de datos`
        })
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }


    const servicio = new Serevicio(data)

    await servicio.save()

    res.status(201).json({
        msg: 'Post api',
        servicio
    })

}
const PutSerevicio = async (req = request, res = response) => {


    const { id } = req.params;

    const { _id,  ...data } = req.body;


    const editarSerevicio = await Serevicio.findByIdAndUpdate(id, data, { new: true });



    res.json({
        msg: "api para editar",
        editarSerevicio
    })

}

const DeleteSerevicio = async (req = request, res = response) => {

    const { id } = req.params;

    const serevicioBorrar = await Serevicio.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        serevicioBorrar
    })

}

module.exports = {

    GetSerevicio,
    DeleteSerevicio,
    PostSerevicio,
    PutSerevicio,

}