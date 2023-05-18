const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/UsuarioModel')

const { Promise } = require('mongoose');



const defaultAdmin = async () => {
    try {
        let user = new Usuario();
        user.nombre = "ElPokejairo";
        user.correo = "jairoalvarado2005@gmail.com";
        user.password = "123456";
        user.rol = "ADMIN";
        const userEncontrado = await Usuario.findOne({ correo: user.correo });
        if (userEncontrado) return console.log("El administrador está listo");
        user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        user = await user.save();
        if (!user) return console.log("El administrador no está listo!");
        return console.log("El administrador está listo!");
    } catch (err) {
        throw new Error(err);
    }
};




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

const PostCliente = async (req = request, res = response) => {
 
    req.body.rol = "USUARIO"
  

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
const borrarCliente = async(req = request, res = response) => {
   const {id} = req.params;
  
   const usuario = req.usuario._id;

   const idUsuario = usuario.toString();

   if(id === idUsuario){
       const usuarioEliminado = await Usuario.findByIdAndDelete(id);
       res.status(200).json({
           msg: 'usuario borrado',
           usuarioEliminado
       })
   }else{
       res.status(401).json({
           msg: 'no puedes borrar cuentas de alguien mas'

       })
   }
   
}

const PutCliente = async (req = request, res = response) => {
   const {id} = req.params;
   const usuario = req.usuario._id;
   const idUsuario = usuario.toString();

   if (id === idUsuario) {
       const {_id, role,...resto} = req.body;
       const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync(resto.password, salt);
       const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, {new: true});
       res.status(200).json({
           msg: 'usuario actualizado',
           usuarioEditado
       })
   } else{
       res.status(401).json({
           msg: 'solo puedes borrar tu usuario'

       })
   }

}
module.exports = {
   
    GetUsuarios,
    DeleteUsuarios,
    PostUsuarios,
    PutUsuarios,
    borrarCliente,
    PutCliente,
    PostCliente,
    defaultAdmin
}