const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/UsuarioModel')

const { Promise } = require('mongoose');

const GetUsuarios = async (req = request, res = response) => {



    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ])

    res.json({
        msg: 'Get Api de Usuarios',
        listaUsuarios
    })
}

const PostUsuarios = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);
    await usuarioDB.save();


    res.status(201).json({
        msg: 'Post api',
        usuarioDB
    })

}
const DeleteUsuarios = async (req = request, res = response) => {
    
    const { id } = req.params;
    
    const usuarioEditar = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        usuarioEditar
    })

}
const PutUsuarios = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, rol, ...resto } = req.body;


    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const usuarioEditar = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'Put api',
        usuarioEditar

    })

}
module.exports = {

    GetUsuarios,
    DeleteUsuarios,
    PostUsuarios,
    PutUsuarios

}