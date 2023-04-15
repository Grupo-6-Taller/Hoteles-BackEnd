const { response, request } = require('express');

const Tipo = require('../models/TipoEventoModel');
const { Promise } = require('mongoose');

const getTipo = async (req = request, res = response) => {

   
  
    const listaTipo = await Promise.all([
        Tipo.countDocuments(),
        Tipo.find()
    ]);

    res.json({
        msg: 'Get Api de Tipo eventoria',
        listaTipo
    })
}

const getTipoId = async (req = request, res = response) => {

    const { id } = req.params;
    const tipo = await Tipo.findById(id).populate('usuario','nombre')

    res.json({
        msg: 'Get Api de Tipo eventoria',
        tipo
    })
}

const postTipo = async (req = request, res = response) => {
    const  nombre  = req.body.nombre.toUpperCase()
    
    const tipoDB = await Tipo.findOne({nombre});
    
    if (tipoDB) {
        return res.status(400).json({
            msg: `la Tipo eventoria ${tipoDB.nombre}, ya existe en la db`
        })
    }

    const data ={
        nombre,
       // req.usuario._id
    }

    const tipoAgregada = new Tipo(data);

    await tipoAgregada.save()

    res.status(201).json({
        msg: 'Post api',
        tipoAgregada,
        
    })

}

const putTipo = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado , usuario , ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
   // resto.usuario = req.usuario._id

    //edicion de Tipo eventoria 
    const editarTipo= await Tipo.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg: "api para editar",
        editarTipo
    })
}

const deleteTipo = async (req = request, res = response) => {
    
    const { id } = req.params;
 
    let deleteTipo = await Tipo.findOneAndDelete({_id: id});

    res.json({
        msg: "api para borrar",
         deleteTipo
    })
}



module.exports = {
    getTipo,
    postTipo,
    putTipo,
    deleteTipo,
  
    
}