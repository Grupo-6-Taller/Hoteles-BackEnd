const { response, request } = require('express');

const Evento = require('../models/EventoModel');
const { Promise } = require('mongoose');

const getEvento = async (req = request, res = response) => {

    const listaEvento = await Promise.all([
        Evento.countDocuments(),
        Evento.find().populate('evento' , 'nombre')
    ]);

    res.json({
        msg: 'Get Api de evento',
        listaEvento
    })
}

const getEventoId = async (req = request, res = response) => {

    const { id } = req.params;
    const evento = await Evento.findById(id).populate('usuario','nombre')

    res.json({
        msg: 'Get Api de evento',
        evento
    })
}

const postEvento = async (req = request, res = response) => {
    
    const {  ...body } = req.body;
    const eventoDB = await Evento.findOne({ nombre: body.evento });

    if (eventoDB) {
        return res.status(400).json({
            msg: `el habitacion ${eventoDB.evento}. ya esxiste en la base de datos`
        })
    }
    const data = {
        ...body,
        evento: body.evento.toUpperCase(),
    }


    const evento = new Evento(data)

    await evento.save()

    res.status(201).json({
        msg: 'Post api',
        evento
        
    })

}

const putEvento = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id,  ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id

    //edicion de evento 
    const editarEvento = await Evento.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg: "api para editar",
        editarEvento
    })
}

const deleteEvento = async (req = request, res = response) => {
    
    const { id } = req.params;

    
    let deleteEvento = await Evento.findOneAndDelete(id);

    res.json({
        msg: "api para borrar",
        deleteEvento
    })
}

module.exports = {
    getEvento,
    postEvento,
    putEvento,
    deleteEvento,
    getEventoId
    
}
